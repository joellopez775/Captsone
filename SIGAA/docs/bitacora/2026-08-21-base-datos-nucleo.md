# Implementación del núcleo de base de datos

Fecha: 21 de agosto de 2026  
Sprint: 1  
Versión de esquema: `0.2.0`

## Objetivo

Transformar el modelo ER documentado en una estructura PostgreSQL ejecutable,
versionada y preparada para conectar la API de SIGAA.

## Alcance

La migración `002_core_academic.sql` crea el núcleo universitario:

- Identidad: usuarios, roles y asignaciones con alcance.
- Estructura académica: programas, períodos, asignaturas y secciones.
- Operación docente: evaluaciones, calificaciones y sesiones de clase.
- Estudiantes: fichas, matrículas y asistencia.
- Alertas: reglas versionadas, casos, responsables e intervenciones.
- Gobierno: eventos de auditoría inmutables.

## Roles iniciales

1. Administrador.
2. Dirección Académica.
3. Coordinador o jefe de carrera.
4. Docente.
5. Registro Académico.
6. Estudiante.

## Integridad incorporada

- Correos únicos sin distinción de mayúsculas.
- Fechas y estados controlados mediante restricciones.
- Escala de calificaciones entre 1,0 y 7,0.
- Ponderaciones de evaluación mayores que 0 y hasta 100.
- Una matrícula activa por estudiante y sección.
- Una calificación por evaluación y estudiante.
- Un registro de asistencia por sesión y estudiante.
- Eventos de auditoría inmutables.
- Intervenciones históricas no eliminables.

## Verificación local

La migración se ejecutó sobre una base temporal limpia junto con
`001_schema.sql`.

- Transacción completada sin errores.
- 19 tablas disponibles en el esquema público.
- Seis roles institucionales cargados.
- `schema_version = 0.2.0`.
- Base temporal eliminada después de la validación.

## Límite actual

La aplicación todavía consume datos sintéticos desde la API. La creación de la
base no implica que login, dashboard o portal del estudiante ya persistan datos.
El siguiente incremento debe implementar repositorios SQL y migrar los datos de
demostración.
