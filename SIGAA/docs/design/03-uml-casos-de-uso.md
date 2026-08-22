# UML y casos de uso principales - Sprint 1

Estado: listo para revisión funcional.

## Actores

- Docente: registra información y consulta alertas de sus secciones.
- Coordinación o UTP: prioriza, asigna y supervisa seguimiento.
- Administrador: configura usuarios, roles, periodos y reglas.
- Servicio de alertas: evalúa reglas versionadas con datos académicos.

## Casos de uso

```mermaid
flowchart LR
    DOC[Docente] --> UC1((Consultar dashboard))
    DOC --> UC2((Buscar estudiante))
    DOC --> UC3((Registrar intervención))
    UTP[Coordinación] --> UC1
    UTP --> UC4((Priorizar y asignar alerta))
    UTP --> UC5((Cerrar o descartar alerta))
    ADM[Administrador] --> UC6((Gestionar estructura académica))
    ADM --> UC7((Versionar regla de alerta))
    MOTOR[Servicio de alertas] --> UC8((Evaluar datos y generar alerta))
    UC8 --> UC1
```

## UC-01 Consultar dashboard

- Actor: docente o coordinación.
- Precondición: sesión válida y ámbito autorizado.
- Flujo: seleccionar periodo; API filtra por rol; sistema muestra estudiantes, asistencia, promedio, alertas abiertas y tendencia.
- Alternativa: sin datos, mostrar estado vacío y fecha de última actualización.
- Resultado: resumen visible sin exponer información fuera del ámbito del usuario.

## UC-02 Consultar ficha de estudiante

- Actor: docente o coordinación.
- Precondición: acceso a la sección del estudiante.
- Flujo: buscar por identificador o nombre; abrir ficha; revisar matrícula, indicadores, alertas e intervenciones.
- Excepción: acceso no autorizado devuelve 403 y registra auditoría.
- Resultado: información contextual y trazable.

## UC-03 Gestionar alerta

- Actor: docente o coordinación.
- Precondición: alerta abierta y permiso de seguimiento.
- Flujo: revisar regla y evidencia; asignar responsable; registrar intervención; cambiar estado.
- Excepción: una transición inválida se rechaza sin modificar historial.
- Resultado: alerta actualizada con evento de auditoría.

## Secuencia principal de alerta

```mermaid
sequenceDiagram
    participant D as Docente
    participant W as Web
    participant A as API
    participant B as PostgreSQL
    participant M as Motor de alertas
    participant C as Coordinación

    D->>W: Registra nota o asistencia
    W->>A: Envía dato validado
    A->>A: Autoriza por rol y sección
    A->>B: Persiste dato y auditoría
    A->>M: Solicita evaluación
    M->>B: Lee regla vigente y contexto
    M->>M: Calcula severidad y evidencia
    M->>B: Crea o actualiza alerta deduplicada
    C->>W: Abre bandeja priorizada
    W->>A: GET /alertas
    A->>B: Filtra por ámbito y estado
    B-->>A: Alertas con evidencia
    A-->>W: JSON autorizado
    W-->>C: Muestra causa, umbral y acciones
```

## Transiciones de alerta

```mermaid
stateDiagram-v2
    [*] --> Abierta
    Abierta --> Asignada
    Asignada --> EnSeguimiento
    EnSeguimiento --> Resuelta
    Abierta --> Descartada
    Asignada --> Descartada
    Resuelta --> Abierta: nueva evidencia
```

## Reglas de autorización

- Docente: solo secciones asignadas y acciones de seguimiento permitidas.
- Coordinación: secciones dentro de su ámbito y capacidad de asignar/cerrar.
- Administrador: configuración; no obtiene acceso irrestricto a observaciones sensibles por defecto.
- Todo cambio de estado conserva actor, fecha, estado anterior y motivo.
