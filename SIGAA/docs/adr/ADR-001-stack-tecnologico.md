# ADR-001 — Stack tecnológico del MVP

- Estado: propuesto; pendiente de aprobación del equipo.
- Fecha: 2026-08-21.
- Historias relacionadas: PB-006, PB-007, PB-011 y PB-014.

## Contexto

SIGAA necesita una aplicación web demostrable en 18 semanas, con control de acceso, datos relacionales, pruebas automatizadas y despliegue reproducible. El equipo debe reducir la cantidad de tecnologías nuevas y privilegiar herramientas que pueda mantener durante el semestre.

## Decisión propuesta

- Frontend: React con TypeScript.
- Backend/API: Node.js con TypeScript y un framework estructurado que el equipo domine.
- Base de datos: PostgreSQL.
- Autenticación: sesiones seguras o tokens de corta duración, definidos durante el diseño de seguridad.
- Pruebas: unitarias y de integración en el ecosistema seleccionado; pruebas end-to-end para flujos críticos.
- Infraestructura local: Docker y Docker Compose.
- Control de versiones y CI: GitHub y GitHub Actions.
- Diagramas y documentación: Mermaid/PlantUML y Markdown versionado.

## Razones

- TypeScript permite compartir lenguaje y modelos entre frontend y backend.
- PostgreSQL es adecuado para relaciones académicas e integridad de datos.
- Docker reduce diferencias entre ambientes y facilita la evaluación.
- GitHub concentra código, issues, evidencia y automatización.

## Alternativas a evaluar

| Alternativa | Ventaja | Costo/riesgo |
|---|---|---|
| Django + PostgreSQL | Administración y ORM maduros | Dos lenguajes si frontend usa TypeScript |
| Spring Boot + PostgreSQL | Estructura empresarial robusta | Mayor carga inicial y configuración |
| Supabase como backend | Velocidad de prototipo | Dependencia externa y menor control del backend |

## Consecuencias

- El equipo debe acordar el framework backend específico.
- Las variables se documentarán en `.env.example` sin secretos.
- Las migraciones serán versionadas.
- El diseño deberá separar interfaz, aplicación, dominio e infraestructura.
- La decisión se reconsiderará si una prueba técnica de Sprint 1 revela un bloqueo.

## Criterios de aprobación

- Todos los integrantes pueden ejecutar un proyecto mínimo.
- Existe soporte para pruebas y migraciones.
- El despliegue funciona mediante Docker Compose.
- El stack permite implementar RBAC y auditoría.
- El docente no identifica una incompatibilidad con los resultados de aprendizaje.
