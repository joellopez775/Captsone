# Expediente documental SIGAA

Corte vigente: 15 de octubre de 2026. Proyecto escolar para colegios y liceos. Esta edición regulariza evidencia; no acredita reuniones ni aprobaciones no registradas.

## Documentos vigentes y ubicaciones únicas

| Bloque | Ubicación PDF | Situación |
|---|---|---|
| Producto y mapas | PDF/01 Producto | Mapas gráficos corregidos; estados del backlog conciliados con Jira |
| Sprint 2 | PDF/02 Sprints/Sprint 2 | Nueve documentos; reconstrucción explícita, no ceremonia acreditada |
| Sprint 3 | PDF/02 Sprints/Sprint 3 | Diez documentos de gestión actualizados; informes técnicos históricos 10-12 conservados |
| Sprint 4 e informe Fase 2 | SIGAA/output/pdf/Sprint 4 (desde raíz del repo) | Diez PDF existentes actualizados, sin segunda copia |
| Reflexión Fase 2 | PDF/02 Sprints/Reflexión Fase 2.pdf | Base factual para validar en equipo, no entrega firmada |
| Arquitectura de software y datos | SIGAA/output/pdf (desde raíz del repo) | Documentos independientes actualizados |
| Evidencia académica reciente | PDF/03 Implementación | Informe de persistencia de asistencia, notas y anotaciones |

Las fuentes editables del Sprint 4 están en 02 Sprints/Sprint 4; sus PDF permanecen en la ruta existente indicada. No se crean archivos con sufijos final, v2 o copia. Los enlaces de documentos antiguos remiten a la fuente única actualizada cuando corresponde.

## Lectura del avance

Sprint 2: 13 puntos actuales, 8 en curso y 5 en revisión. Sprint 3: 29 puntos en revisión; 12 subtareas técnicas terminadas. Sprint 4: 34 puntos, 21 en curso y 13 en revisión. No hay historias terminadas dentro de esos tres conjuntos al corte. Esto no equivale a ausencia de implementación.

Jira mantiene id 3 para Sprint 2, id 2 para Sprint 3 e id 37 para Sprint 4. Los sprints históricos 0-2 aparecen future; Sprints 3 y 4 siguen activos. No se cerraron, iniciaron, renombraron ni duplicaron sprints en esta regularización.

## Históricos que no describen la versión actual

Los Sprints 0 y 1, los informes técnicos de entregas previas, la Gantt base y los documentos generales de defensa de septiembre conservan su contexto histórico. No usarlos como parte de estado actual sin leer este índice y los expedientes actualizados. No se borra su evidencia ni se retrofechan aprobaciones.

La referencia actual de arquitectura es Arquitectura de Software - SIGAA.pdf y Arquitectura de Base de Datos - SIGAA.pdf. La guía general de defensa y su compilación de septiembre son históricas y no prevalecen sobre estos documentos. El modelo ER objetivo continúa siendo objetivo, no prueba de implementación completa.

:::pagebreak

## Pendientes humanos y académicos

- Confirmar responsabilidades y disponibilidad reales.
- Revisar y aceptar o devolver historias como Product Owner.
- Registrar retrospectivas y Daily cuando ocurran, con participantes efectivos.
- Validar flujos y umbrales con una contraparte educativa.
- Validar las respuestas grupales de reflexión Fase 2.
- Registrar entrega en Campus y feedback docente. No se ha realizado esa entrega desde esta regularización.

## Fuentes y mantenimiento

Estados: 04 Evidencias/jira-corte-2026-10-15.json. Código: commit 899aab6 y antecedentes 62fbcba, dfa0461, f48fbc3. Pruebas: SIGAA/output/evidence. Generación selectiva reproducible: scripts/generate-scrum-pdfs.py --manifest scripts/document-regularization.json. Los PDF se actualizan sobre sus rutas canónicas.
