# SIGAA — Sistema Integral de Gestión Académica y Alertas Tempranas

Proyecto Capstone 2026 de Ingeniería en Informática, sede Plaza Vespucio.

## Inicio rápido con Docker

El único requisito de ejecución es Docker Desktop o Docker Engine con Compose.

```bash
cd SIGAA
docker compose up --build
```

- Aplicación: <http://localhost:8088>
- API: <http://localhost:3000/health>
- Diagnóstico de base de datos: <http://localhost:3000/db-health>

La guía completa está en [`docs/06-docker-entorno.md`](docs/06-docker-entorno.md).
El procedimiento para el equipo y el despliegue aislado está en
[`docs/07-manual-equipo-y-servidor-seguro.md`](docs/07-manual-equipo-y-servidor-seguro.md).

Para comprobar los servicios después de levantarlos:

```bash
sh scripts/verify-docker.sh
```

## Accesos de demostración

El mismo formulario de inicio de sesión resuelve el rol y abre la experiencia
correspondiente:

| Perfil | Correo | Contraseña |
|---|---|---|
| Docente | `docente@sigaa.demo` | `Docente2026!` |
| Estudiante | `estudiante@sigaa.demo` | `Estudiante2026!` |

Estas cuentas son sintéticas y se incluyen únicamente para el prototipo local.
No deben reutilizarse en ambientes productivos.

La plantilla de integración continua está en `ci/sigaa-ci.yml.example`. Para activarla se debe copiar a `.github/workflows/sigaa-ci.yml` usando una credencial de GitHub con permiso `workflow`.

## Estado

Sprint 1 avanzado en la semana simulada del 24 al 28 de agosto de 2026. Existen decisiones de arquitectura, modelo lógico, UML, un prototipo navegable verificado internamente y artefactos de Fase 1 preparados para revisión. Las historias no se consideran aceptadas hasta registrar la decisión del Product Owner.

Product Owner confirmado: Joel López. Los demás roles continúan propuestos hasta ratificación del equipo.

## Entregables iniciales

- `entregables/fase-1/1.5_Definicion_Proyecto_APT_SIGAA.docx`: definición del proyecto en la plantilla oficial.
- `entregables/fase-1/Presentacion_SIGAA_Fase_1_Sprint1.pptx`: presentación editable del avance y decisiones solicitadas al Product Owner.
- `entregables/gestion/Plan_Maestro_Scrum_SIGAA.xlsx`: calendario oficial, roadmap de sprints, Product Backlog, carta Gantt, matriz de entregables, cobertura de rúbrica, RACI, riesgos, Definition of Done y plantilla de burndown.
- `entregables/gestion/Cronograma_Sprints_SIGAA_2026.png`: infografía del cronograma y los sprints.

## Documentación viva

- [`docs/README.md`](docs/README.md): índice y reglas de trazabilidad.
- [`docs/01-product-vision.md`](docs/01-product-vision.md): visión, alcance y cuatro pilares.
- [`docs/02-actores-impact-mapping.md`](docs/02-actores-impact-mapping.md): actores, necesidades e Impact Mapping.
- [`docs/03-product-backlog.md`](docs/03-product-backlog.md): épicas y backlog priorizado.
- [`docs/04-riesgos.md`](docs/04-riesgos.md): riesgos, mitigaciones y disparadores.
- [`docs/05-git-y-evidencias.md`](docs/05-git-y-evidencias.md): flujo Git y estándar de evidencias.
- [`docs/06-docker-entorno.md`](docs/06-docker-entorno.md): ejecución reproducible y diagnóstico.
- [`docs/fase-1/01-formativa-fase-1.md`](docs/fase-1/01-formativa-fase-1.md): contenido base para la evaluación formativa.
- [`docs/scrum/definition-of-done.md`](docs/scrum/definition-of-done.md): Definition of Done.
- [`docs/scrum/sprint-0/`](docs/scrum/sprint-0/): expediente del Sprint 0.
- [`docs/scrum/sprint-0/07-informe-cierre.md`](docs/scrum/sprint-0/07-informe-cierre.md): informe auditado para decisión del Product Owner.
- [`docs/scrum/sprint-0/08-acta-aprobacion-po.md`](docs/scrum/sprint-0/08-acta-aprobacion-po.md): acta de aprobación pendiente.
- [`docs/scrum/sprint-1/`](docs/scrum/sprint-1/): Planning, backlog, tablero, Daily y burndown del Sprint 1.
- [`docs/design/00-arquitectura-preliminar.md`](docs/design/00-arquitectura-preliminar.md): diseño técnico inicial.
- [`docs/design/01-arquitectura-contenedores.md`](docs/design/01-arquitectura-contenedores.md): arquitectura de contenedores.
- [`docs/design/02-modelo-er-diccionario.md`](docs/design/02-modelo-er-diccionario.md): modelo lógico y diccionario de datos.
- [`docs/design/03-uml-casos-de-uso.md`](docs/design/03-uml-casos-de-uso.md): casos de uso y secuencia principal.
- [`docs/design/04-prototipo-navegable.md`](docs/design/04-prototipo-navegable.md): alcance y verificación del prototipo.
- [`docs/adr/ADR-001-stack-tecnologico.md`](docs/adr/ADR-001-stack-tecnologico.md): decisión tecnológica propuesta.
- [`docs/adr/ADR-002-entorno-docker.md`](docs/adr/ADR-002-entorno-docker.md): decisión de usar Docker Compose.
- [`docs/bitacora/2026-08-21-avance-inicial.md`](docs/bitacora/2026-08-21-avance-inicial.md): primer registro de avance.

## Alcance MVP propuesto

SIGAA centraliza estudiantes, matrículas, calificaciones y asistencia; aplica reglas configurables de riesgo; genera alertas explicables; asigna responsables; registra intervenciones; y muestra indicadores de seguimiento con control de acceso y auditoría.

Quedan fuera de la primera versión la analítica predictiva, integraciones avanzadas con plataformas externas y una aplicación móvil nativa.

## Cadencia

- Sprint 0: descubrimiento, visión, backlog, DoD, riesgos y repositorio.
- Sprints 1–7: incrementos quincenales alineados con los hitos Duoc.
- Release final: semanas 17–18, defensa, correcciones y cierre de evidencias.

Cada sprint debe dejar Sprint Planning, Sprint Backlog, tablero, seguimiento diario, impedimentos, burndown, pruebas, Review, release y Retrospective.

Todo cambio material debe actualizar una entrada de bitácora y enlazar la evidencia correspondiente. Una tarea no puede pasar a `Terminado` si la evidencia no está registrada.

## Datos pendientes

- RUT de cada integrante.
- Confirmación de la contraparte o establecimiento validador.
- Sección, docente y datos formales de portada que correspondan.
- Validación formal con una contraparte o usuarios representativos.
- Ratificación del stack tecnológico por el equipo.
- Ratificación de los roles propuestos: Joel (Product Owner/arquitectura), Agustín (Scrum Master/frontend-UX) y Matías (datos/calidad); los tres como Developers.

## Próximos documentos

1. Product Vision y cuatro pilares.
2. Análisis del caso, mapa de actores, mapa mental e Impact Mapping.
3. Épicas, historias de usuario, criterios de aceptación y Story Map.
4. Sprint 0 y Sprint 1: Planning, Sprint Backlog, tablero y evidencias.
5. Documento de diseño: arquitectura, ER, UML y requisitos no funcionales.
6. Plan de pruebas, manual técnico/de despliegue y manual de usuario.
