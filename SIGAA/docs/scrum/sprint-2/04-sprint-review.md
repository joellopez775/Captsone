# Sprint Review 2 - borrador de regularización

Estado: preparada para revisión y ratificación; no debe presentarse como ceremonia realizada.

Periodo: 7 al 19 de septiembre de 2026.

## Objetivo esperado

Iniciar la Fase 2 con autenticación, roles, permisos y una plataforma reproducible.

## Evidencia disponible

- Docker Compose con web, API y PostgreSQL.
- Red privada para PostgreSQL y configuración de servidor con Cloudflare Tunnel.
- Login y diferenciación de vistas docente/estudiante en modo demostración.
- Esquema escolar PostgreSQL 0.5.0.
- Healthchecks y endpoint de diagnóstico de base de datos.

## Decisión honesta por historia

| Historia | Resultado | Recomendación al PO |
|---|---|---|
| PB-011 Autenticación segura | Solo existe login de demostración con credenciales en código | Devolver y arrastrar a Sprint 3 |
| PB-012 Roles y permisos | Existe simulación por cabeceras, no sesión productiva | Devolver y arrastrar a Sprint 3 |
| PB-014 Docker reproducible | Implementado y documentado | Aceptar si el equipo valida desde clon limpio |
| PB-040 Aislamiento del servidor | Configuración creada | Aceptar condicionado a prueba operacional |

## Conclusión

No corresponde declarar Sprint 2 completamente logrado. La infraestructura redujo riesgos, pero seguridad y persistencia siguen incompletas. El Product Owner debe ratificar estas decisiones durante la Review real.
