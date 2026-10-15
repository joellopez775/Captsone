# Arquitectura de base de datos - SIGAA

Corte de regularización: 15 de octubre de 2026. Base técnica: commit 899aab6. Fuente operativa: Jira SIGAA, tablero 1. Esta actualización documenta evidencia existente; no acredita reuniones ni aceptación del Product Owner.

## Modelo vigente y alcance

PostgreSQL 16, dominio escolar. Las migraciones versionadas 001 a 007 incluyen estructura escolar, modelos docente/estudiante, preparación de alertas/justificaciones y seguridad. La migración 007 agrega sesiones e intentos de login y autoría en estudiantes/matrículas. La API informa versión 0.7.0; este número no sustituye la secuencia de migraciones.

:::diagram data

## Diccionario operativo resumido

| Entidad | Datos esenciales | Integridad y uso |
|---|---|---|
| usuario, rol, usuario_rol | email, hash, estado, rol y vigencia | Identidad y permisos determinados por servidor |
| sesion_usuario | token_hash, usuario_id, fechas, revocada_en | Hash como clave; FK a usuario; expiración posterior a creación |
| limite_login | clave, intentos, ventana | Control persistente de intentos, clave derivada no identificador abierto |
| establecimiento, periodo_escolar, nivel_educativo | RBD, año, fechas, nivel | Contexto escolar, unicidad y fechas válidas |
| curso, asignatura, curso_asignatura | periodo, nivel, letra, asignatura | Oferta escolar y relaciones válidas |
| funcionario, asignacion_docente | usuario, asignatura, vigencia, capacidades | Define alcance de profesor titular y apoyo |
| estudiante | identificador, nombres, estado, usuario | Duplicados rechazados; creación/cambio con actor |
| matricula | estudiante, curso, estado, cierre | API impide activa duplicada en el mismo periodo y valida capacidad |
| sesion_clase, asistencia | asignatura, fecha, bloque, estudiante, estado | Un registro por clase/estudiante; no asistencia futura |
| evaluacion, calificacion | asignatura, fecha, peso, estudiante, nota, publicación | Nota 1-7; suma de pesos controlada en transacción; privacidad |
| anotacion_estudiante | estudiante, autor, tipo, detalle, visibilidad | Privada por defecto; anulación por autor con motivo y auditoría |
| evento_auditoria | actor, acción, entidad, antes/después, fecha | Historial generado por API, no editable por usuario común |
| justificacion_ausencia | estudiante, sesion_id, motivo, revisión | Estructura disponible; flujo completo aún pendiente |
| regla_alerta, alerta, intervencion | regla, evidencia, estudiante, seguimiento | Modelo objetivo; no declarar integración completa por existir tablas |

El SQL versionado es la referencia exacta de tipos, claves e índices. Este resumen no reemplaza los scripts ni presenta el modelo objetivo como completamente operativo.

## Consistencia de datos

Las escrituras compuestas usan transacciones. Asistencia, calificaciones y anotaciones comprueban versiones para evitar sobrescribir formularios antiguos. Las notas se guardan privadas hasta publicación explícita y las correcciones requieren motivo. El estudiante no puede modificar sus registros. La baja de una matrícula conserva historial.

## Despliegue y evolución

La base en el servidor usa volumen persistente y red privada. La API utiliza un usuario de privilegios limitados. El cambio académico 899aab6 reutiliza las tablas existentes y no reinicializa la base. No ejecutar la migración histórica de dominio 003 contra una base operativa ni cargar seeds de pruebas sobre el servidor público.

No se afirma que existan notas o asistencias reales cargadas. Los tests usan datos sintéticos en bases temporales separadas. Se conservó respaldo previo al despliegue; los respaldos periódicos y su procedimiento operativo siguen pendientes.

## Verificación y evidencia

Las pruebas de integración en Docker/PostgreSQL 16 comprueban restricciones, permisos, concurrencia, auditoría y persistencia tras reinicio. Ver SIGAA/output/evidence/academic-docker-tests.json y los informes técnicos del Sprint 3. La aceptación funcional del PO sigue separada de la validación técnica.
