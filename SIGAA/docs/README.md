# Índice y control documental

## Propósito

Este directorio conserva la documentación viva de SIGAA. Los documentos entregables en formatos Word, Excel, PDF o imagen se guardan en `../entregables/`; las decisiones, actas y evidencias trazables se mantienen aquí en Markdown para facilitar su revisión en GitHub.

## Estado de la línea base

| Código | Documento | Estado | Responsable propuesto | Última actualización |
|---|---|---|---|---|
| DOC-01 | Product Vision | Borrador para validar | Product Owner | 2026-08-21 |
| DOC-02 | Actores e Impact Mapping | Borrador para validar | Equipo | 2026-08-21 |
| DOC-03 | Product Backlog | Borrador priorizado | Product Owner | 2026-08-21 |
| DOC-04 | Registro de riesgos | Abierto | Equipo | 2026-08-21 |
| DOC-05 | Flujo Git y evidencias | Propuesto | Scrum Master | 2026-08-21 |
| DOC-06 | Definition of Done | Propuesta | Equipo | 2026-08-21 |
| F1-01 | Formativa Fase 1 | Borrador grupal | Equipo | 2026-08-21 |
| SP0-01 | Sprint Planning 0 | Borrador | Equipo | 2026-08-21 |
| SP0-02 | Sprint Backlog 0 | En curso | Equipo | 2026-08-21 |
| SP0-03 | Scrumboard 0 | En curso | Scrum Master | 2026-08-21 |
| SP0-04 | Daily e impedimentos | Activo | Scrum Master | 2026-08-21 |
| SP0-05 | [Informe de cierre Sprint 0](../output/pdf/Informe_Cierre_Sprint_0_SIGAA.pdf) | Pendiente de aprobación PO | Product Owner | 2026-08-21 |
| SP1-01 | Sprint Planning 1 | En ejecución simulada | Equipo | 2026-08-28 |
| SP1-02 | Backlog, tablero, Daily y burndown | Preparado para Review | Scrum Master propuesto | 2026-08-28 |
| ADR-001 | Stack tecnológico | Aceptado técnicamente; ratificación pendiente | Equipo | 2026-08-28 |
| ADR-002 | Entorno Docker | Aceptado | Equipo | 2026-08-21 |
| DIS-001 | Arquitectura, ER y UML | En revisión | Arquitectura | 2026-08-28 |
| DIS-002 | [Modelo ER objetivo escolar](design/05-modelo-er-objetivo-escolar.md) | Arquitectura objetivo | Arquitectura | 2026-08-21 |
| DIS-003 | [Modelo funcional del profesor](design/06-modelo-profesor.md) | Incremento demo implementado | Arquitectura | 2026-08-21 |
| DIS-004 | [Modelo funcional del estudiante](design/07-modelo-estudiante.md) | Incremento demo implementado | Arquitectura | 2026-08-21 |
| PRO-001 | Prototipo navegable Sprint 1 | Verificado internamente | Equipo | 2026-08-28 |
| F1-02 | Documento 1.5 y presentación | Preparados para revisión | Equipo | 2026-08-28 |
| F1-03 | [Autoevaluación de competencias de Joel contextualizada a SIGAA](../output/docx/Lopez_Joel_1.1_AutoevaluacionCompetencias_Fase1_SIGAA.docx) | Completada y verificada visualmente | Joel López | 2026-08-26 |
| TEC-001 | Guía de ejecución Docker | Verificado | DevOps | 2026-08-21 |
| TEC-002 | [Manual Docker y servidor seguro](07-manual-equipo-y-servidor-seguro.md) | Configuración validada; activación pendiente | DevOps | 2026-08-24 |
| TEC-003 | [Manual PDF de instalación y colaboración](../output/pdf/Manual_Instalacion_Desarrollo_y_Colaboracion_SIGAA.pdf) | Generado y verificado visualmente | Equipo | 2026-08-24 |
| CAP-001 | [Matriz de cumplimiento CAPSTONE](08-matriz-cumplimiento-capstone.md) | Auditada contra material oficial | Product Owner | 2026-08-25 |
| CAP-002 | [Plan PDF de trabajo, calendario y responsabilidades](../output/pdf/Plan_de_Trabajo_Calendario_y_Responsabilidades_SIGAA.pdf) | Generado y verificado visualmente | Product Owner | 2026-08-25 |
| CAP-003 | [Carta Gantt alineada al cronograma oficial](../output/pdf/Carta_Gantt_SIGAA_Alineada_Cronograma_Oficial_2026.pdf) | Corregida y verificada contra Excel docente | Product Owner | 2026-08-26 |
| CAP-004 | [Informe de tecnologías a utilizar](../output/pdf/Informe_Tecnologias_a_Utilizar_SIGAA.pdf) | Generado y verificado visualmente | Equipo | 2026-08-26 |
| CAP-005 | [Manual de actividades alineado al cronograma oficial](../output/pdf/Manual_Actividades_Gantt_Alineado_Cronograma_Oficial_2026.pdf) | Corregido y verificado visualmente | Equipo | 2026-08-26 |

## Reglas de trazabilidad

1. Todo avance material se registra en `bitacora/AAAA-MM-DD-descripcion.md`.
2. Cada ítem del Product Backlog conserva un identificador estable `PB-XXX`.
3. Cada evidencia debe indicar fecha, responsable, historia relacionada y ubicación.
4. Los acuerdos no confirmados se rotulan como `propuesto`, `pendiente` o `por validar`.
5. Las reflexiones individuales no se completan en nombre de otra persona.
6. Una historia solo pasa a `Terminado` cuando cumple la Definition of Done.
7. Las actas de Review y Retrospective se cierran al finalizar el sprint, no anticipadamente.

## Estructura por sprint

Cada sprint debe contener:

- Sprint Planning y objetivo.
- Sprint Backlog comprometido.
- Captura o vínculo del Scrumboard.
- Registro Daily.
- Registro de impedimentos.
- Evidencias de pruebas.
- Sprint Review y versión entregada.
- Sprint Retrospective y acciones de mejora.

## Decisiones pendientes

- Confirmar establecimiento o contraparte validadora.
- Product Owner confirmado: Joel López. Falta ratificar Scrum Master y responsabilidades técnicas.
- Completar RUT, docente y sección.
- Ratificar con el equipo la decisión técnica registrada en ADR-001.
- Ejecutar validación externa del prototipo y registrar feedback real.
- Aceptar o devolver PB-006 a PB-010 en Sprint Review.
