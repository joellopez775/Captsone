# Actores e Impact Mapping

Estado: borrador; requiere validación con una contraparte educativa.

## Mapa de actores

| Actor | Influencia | Interés | Participación esperada | Riesgo si no participa |
|---|---|---|---|---|
| Dirección/UTP | Alta | Alta | Prioriza indicadores y valida utilidad | Producto sin valor de gestión |
| Docentes | Media | Alta | Valida registro de notas y alertas | Flujo poco usable |
| Inspectoría/orientación | Media | Alta | Valida asistencia y seguimiento | Casos sin acciones realistas |
| Administrador | Alta | Media | Valida estructura, usuarios y permisos | Configuración inconsistente |
| Estudiantes | Baja | Alta | Beneficiarios; retroalimentación indirecta | Intervenciones desconectadas |
| Docente Capstone | Alta | Alta | Retroalimenta alcance y evidencias | Incumplimiento académico |
| Equipo de desarrollo | Alta | Alta | Diseña, implementa, prueba y documenta | Desviación de calidad/plazo |

## Impact Mapping

### Objetivo

Detectar y gestionar oportunamente estudiantes en riesgo académico mediante información centralizada y acciones trazables.

```mermaid
flowchart LR
    O["Objetivo: detección y seguimiento oportunos"]
    O --> A1["Dirección / UTP"]
    O --> A2["Docentes"]
    O --> A3["Inspectoría / orientación"]
    O --> A4["Administración"]

    A1 --> I1["Prioriza casos críticos"]
    A1 --> I2["Monitorea tendencias"]
    A2 --> I3["Registra datos oportunamente"]
    A2 --> I4["Comprende por qué existe una alerta"]
    A3 --> I5["Asigna y registra intervenciones"]
    A3 --> I6["Cierra casos con evidencia"]
    A4 --> I7["Mantiene estructura y permisos"]

    I1 --> D1["Bandeja de alertas priorizada"]
    I2 --> D2["Dashboard y reportes"]
    I3 --> D3["Notas y asistencia"]
    I4 --> D4["Reglas explicables"]
    I5 --> D5["Gestión de seguimiento"]
    I6 --> D6["Historial y auditoría"]
    I7 --> D7["Catálogos y RBAC"]
```

## Resultados esperados por actor

### Dirección y UTP

- Reducir el tiempo necesario para identificar casos críticos.
- Visualizar el estado de las alertas y acciones pendientes.
- Revisar indicadores agregados por periodo, curso o asignatura.

### Docentes

- Registrar o importar información con validaciones claras.
- Consultar alertas sin tener que interpretar fórmulas ocultas.
- Evitar duplicación de datos y correcciones no trazadas.

### Inspectoría y orientación

- Recibir casos priorizados.
- Registrar llamadas, entrevistas, acuerdos y resultados.
- Distinguir alertas nuevas, en seguimiento y cerradas.

## Preguntas de validación

1. ¿Qué datos se utilizan hoy para identificar riesgo académico?
2. ¿Quién decide que un caso necesita intervención?
3. ¿Qué umbrales de notas y asistencia son útiles?
4. ¿Qué acciones se registran actualmente y dónde?
5. ¿Qué información debe ocultarse según el rol?
6. ¿Qué indicadores necesita revisar dirección semanalmente?
7. ¿Qué significaría una alerta incorrecta o tardía?

## Evidencia requerida

- Minuta de entrevista o taller.
- Lista de participantes y roles.
- Cambios introducidos a la Product Vision.
- Reglas de negocio preliminares aceptadas o descartadas.
- Fecha de próxima validación.
