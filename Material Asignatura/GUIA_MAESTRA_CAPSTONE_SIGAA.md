# Guía maestra CAPSTONE PTY4614 — SIGAA

Fecha de revisión: 25 de agosto de 2026  
Curso: CAPSTONE PTY4614, sección CAPSTONE_003V  
Proyecto vigente: SIGAA — Sistema Integral de Gestión Académica y Alertas Tempranas  
Equipo: Joel López, Agustín Sorolla y Matías Martínez

## 1. Conclusión ejecutiva

SIGAA es una propuesta pertinente y suficientemente integral para Capstone: aborda una problemática real del contexto escolar, permite evidenciar desarrollo de software, datos, arquitectura, seguridad, pruebas y gestión de proyecto, y ya cuenta con un prototipo funcional desplegable con Docker.

Al 25 de agosto de 2026 el curso está oficialmente en la **semana 3 de la Fase 1**. La evaluación sumativa de definición del proyecto corresponde a la semana 4, del **31 de agosto al 5 de septiembre de 2026**. El cronograma no fija una hora o día exacto de entrega y el Campus Virtual no muestra vencimiento configurado; ese dato debe confirmarse con el docente.

El mayor riesgo no es técnico, sino de entrega: el repositorio público usa `main` como rama predeterminada, pero las evidencias actualizadas están en `fase-1-evidencias`. Además, el README de la raíz todavía presenta otro proyecto, InmoGest IA. Antes de entregar el enlace al profesor debe decidirse cómo publicar SIGAA y sus evidencias en la rama que revisará el script institucional.

## 2. Fuentes revisadas

### Adjuntos del mensaje del profesor

Se descargaron y revisaron los diez archivos enviados el 13 de agosto de 2026:

1. `2026.02_Cronograma_Capstone_PTY4614.xlsx`.
2. `1.1_APT122_AutoevaluacionCompetenciasFase1.docx`.
3. `1.2_APT122_DiarioReflexionFase1.docx`.
4. `1.3_APT122_AutoevaluacionFase1.docx`.
5. `1.4_APT122_FormativaFase1.docx`.
6. `1.5_GuiaEstudiante_Fase 1_Definicion Proyecto APT.docx`.
7. `PLANILLA DE EVALUACIÓN FASE 1.xlsx`.
8. `Listado de documentos.xlsx`.
9. `Instructivo CAPSTONE 2026.pdf`.
10. `Configuración de GitHub.mkv`.

También se contrastó el `Programa de Asignatura PTY4614.pdf` descargado del Campus Virtual.

Ubicación de los originales: `Fase 1/Material Asignatura/Documentos del docente/`.

## 3. Ruta oficial del semestre

| Hito | Semanas | Fechas 2026 | Evaluación | Ponderación |
|---|---:|---|---|---:|
| Fase 1 — definición del Proyecto APT | 1–4 | 10 ago–5 sep | Encargo con presentación | 20% |
| Retroalimentación e inicio de desarrollo | 5 | 7–12 sep | Formativa | 0% |
| Fase 2 — desarrollo e informe de avance | 5–10 | 7 sep–17 oct | Encargo sin presentación | 20% |
| Retroalimentación de avance | 11 | 19–24 oct | Formativa | 0% |
| Fase 2 — informe final | 12–15 | 26 oct–21 nov | Encargo con presentación | 30% |
| Retroalimentación final | 16 | 23–28 nov | Formativa | 0% |
| Fase 3 — defensa ante comisión | 17–18 | 30 nov–12 dic | Presentación individual | 30% |

### Semana actual

- Semana 3: 24 al 29 de agosto.
- Actividad: definir y mejorar el proyecto, cronograma y tecnologías; realizar la autoevaluación Fase 1.
- Próximo hito: presentación grupal y entrega sumativa de Fase 1 durante la semana 4.
- No hay una fecha/hora exacta visible en el Campus. No debe inventarse.

## 4. Qué exige la Fase 1

La definición del proyecto debe cubrir:

- antecedentes del equipo;
- nombre, área de desempeño y competencias;
- problema, contexto, usuarios o beneficiarios y aporte de valor;
- descripción de la solución;
- relación con el perfil de egreso;
- relación individual con los intereses profesionales;
- factibilidad en 18 semanas;
- objetivo general y objetivos específicos;
- metodología, roles y responsabilidades;
- evidencias de avance y finales, con justificación;
- plan de trabajo con actividades, recursos, duración, responsable y observaciones;
- carta Gantt de las semanas 1 a 18;
- presentación grupal;
- abstract grupal en español e inglés;
- conclusiones y reflexión individual en inglés.

El proyecto debe integrar al menos tres competencias de especialidad, involucrar a dos o tres integrantes, ser una solución completa y abordable en el semestre, y dejar contribuciones individuales comprobables en código, base de datos y documentación.

## 5. Rúbrica operativa del profesor

La planilla `PLANILLA DE EVALUACIÓN FASE 1.xlsx` es el instrumento operativo más específico para preparar la sumativa. Distribuye 100 puntos en trece indicadores:

### Componente grupal — 70 puntos

| Indicador | Puntos |
|---|---:|
| Descripción y relevancia laboral | 10 |
| Relación con competencias del perfil de egreso | 5 |
| Factibilidad | 5 |
| Objetivos | 5 |
| Metodología | 10 |
| Plan de trabajo con recursos, duración, facilitadores y obstáculos | 10 |
| Evidencias y justificación | 5 |
| Redacción, ortografía, citas y referencias | 5 |
| Cumplimiento de la plantilla | 5 |
| Plan temporal con hitos verificables | 10 |

### Componente individual — 30 puntos por integrante

| Indicador | Puntos |
|---|---:|
| Relación con intereses profesionales | 10 |
| Exposición y dominio técnico | 10 |
| Colaboración y trabajo en equipo | 10 |

La hoja de evaluación combina 75% de desempeño disciplinar (IEP/IEE) y 25% de empleabilidad. La rúbrica muestra `Logro incipiente -30%`; esta cifra negativa parece una configuración o rotulación anómala del archivo y debe confirmarse con el docente antes de interpretar descuentos.

### Jerarquía de instrumentos

- `1.3_APT122_AutoevaluacionFase1.docx`: autoevaluación individual de semana 3, sin ponderación.
- `1.4_APT122_FormativaFase1.docx`: pauta formativa del docente, sin ponderación.
- `PLANILLA DE EVALUACIÓN FASE 1.xlsx`: pauta operativa de la sumativa.
- `Instructivo CAPSTONE 2026.pdf`: reglas generales del curso y ponderaciones del semestre.

Las diferencias entre las plantillas no deben mezclarse: se usa cada instrumento para el propósito indicado.

## 6. Documentación obligatoria al trabajar con Scrum

El listado oficial solicita:

### Línea base del proyecto

- análisis del caso;
- squad y responsabilidades;
- mapa mental;
- mapa de actores;
- visión del proyecto y cuatro pilares;
- épicas;
- historias de usuario con criterios de aceptación y estimación;
- Impact Mapping;
- Product Backlog priorizado;
- User Story Mapping;
- retrospectiva del proyecto.

### Por cada sprint

- Sprint Planning;
- Sprint Backlog;
- Scrumboard;
- Burndown Chart;
- registro de Daily Meeting;
- registro de impedimentos;
- release;
- Sprint Review;
- Sprint Retrospective.

### Evidencia técnica transversal

- documento de diseño;
- diagrama de arquitectura y comunicación entre servicios;
- modelo de datos;
- UML mínimo: casos de uso, clases cuando corresponda, secuencia principal y componentes;
- requisitos no funcionales de seguridad, rendimiento, escalabilidad, disponibilidad y portabilidad;
- Dockerfile, Compose, variables de entorno y procedimiento de arranque;
- pruebas unitarias, integración, rendimiento y seguridad;
- sección de innovación;
- manual técnico/despliegue.

## 7. Reglas de GitHub explicadas por el profesor

El video de 4 minutos y 34 segundos confirma que la estructura de carpetas y nombres se procesa automáticamente. Las reglas son:

1. Repositorio público desde la Experiencia 1 hasta la semana 18.
2. Mismo enlace de repositorio para todos los integrantes.
3. La raíz debe contener `Fase 1`, `Fase 2`, `Fase 3` y un README.
4. Cada fase debe separar `Evidencias Grupales`, `Evidencias Individuales` y, cuando corresponda, `Evidencias Proyecto`.
5. Los archivos individuales comienzan con `Apellido_Nombre_` y continúan con el nombre oficial de la plantilla.
6. Los archivos extra pueden conservarse, pero el script solo contabiliza los nombres esperados.
7. Si hay varios repositorios, deben informarse todos.
8. Si cambia el nombre del repositorio, se debe avisar al docente.
9. El README debe indicar nombre, problema, usuarios, tecnologías, ejecución local, integrantes y roles, metodología y arquitectura.

### Estructura esperada para Fase 1

```text
Fase 1/
├── Evidencias Individuales/
│   ├── Apellido_Nombre_1.1_APT122_AutoevaluacionCompetenciasFase1.docx
│   ├── Apellido_Nombre_1.2_APT122_DiarioReflexionFase1.docx
│   └── Apellido_Nombre_1.3_APT122_AutoevaluacionFase1.docx
├── Evidencias Grupales/
│   ├── 1.4_APT122_FormativaFase1.docx
│   ├── 1.5_GuiaEstudiante_Fase 1_Definicion Proyecto APT (Español).docx
│   ├── PLANILLA DE EVALUACIÓN FASE 1.xlsx
│   └── Presentación Proyecto.pptx
└── README.md
```

La versión inglesa de la guía 1.5 es optativa. Un PDF de la presentación puede mantenerse como apoyo, pero no reemplaza el PPTX exigido.

## 8. Estado de SIGAA frente a lo solicitado

| Área | Estado | Evidencia / observación |
|---|---|---|
| Problema y Product Vision | Preparado | `SIGAA/docs/01-product-vision.md` |
| Actores e Impact Mapping | Preparado | `SIGAA/docs/02-actores-impact-mapping.md` |
| Épicas, historias y backlog | Preparado | `SIGAA/docs/03-product-backlog.md` |
| Riesgos | Preparado | `SIGAA/docs/04-riesgos.md` |
| Definition of Done | Preparado | `SIGAA/docs/scrum/definition-of-done.md` |
| Sprint 0 | Documentado; aprobación PO pendiente | Expediente completo en `SIGAA/docs/scrum/sprint-0/` |
| Sprint 1 | Avance semana 3 preparado | Planning, backlog, tablero, Daily, burndown y evidencias |
| Arquitectura y contenedores | Preparado | `SIGAA/docs/design/` y Docker Compose |
| Modelo de datos | Preparado e implementado parcialmente | scripts PostgreSQL y documento ER |
| UML | Preparado | casos de uso y secuencia principal |
| Prototipo web | Funcional | login por roles, vista docente y estudiante |
| Docker | Funcional | web, API y PostgreSQL |
| Guía 1.5 | Preparada para revisión | `SIGAA/entregables/fase-1/` |
| Presentación Fase 1 | Preparada para revisión | `SIGAA/entregables/fase-1/` |
| Evidencias individuales | Parciales | cada integrante debe validar y completar personalmente |
| Validación externa | Pendiente | falta docente, contraparte o usuarios representativos |
| Datos formales | Pendiente | RUT, docente, sección, número de equipo y contraparte |
| Publicación para revisión automática | Riesgo crítico | evidencias en rama no predeterminada; README raíz no corresponde a SIGAA |

## 9. Brechas que impedirían una entrega segura

### Críticas

1. Confirmar sección y número de equipo.
2. Corregir el README raíz para que describa SIGAA, no InmoGest IA.
3. Asegurar que la rama predeterminada o el enlace entregado al docente muestre las carpetas de evidencias.
4. Validar que los nombres exactos de archivos y carpetas se conserven en GitHub.
5. Completar RUT y antecedentes de portada.
6. Cada integrante debe revisar y firmar su contenido individual; no puede automatizarse su reflexión.

### Importantes para obtener nivel completamente logrado

1. Vincular cada competencia con una tarea, evidencia y responsable concreto.
2. Justificar la factibilidad con tiempo, recursos, obstáculos y mitigaciones.
3. Mostrar hitos verificables en el plan de trabajo y Gantt.
4. Ensayar la presentación para que los tres integrantes dominen la propuesta.
5. Obtener feedback real y registrar los ajustes realizados.
6. Añadir citas y referencias donde se sustenten contexto, seguridad o prácticas técnicas.

## 10. Próxima secuencia recomendada

1. Cerrar y aprobar formalmente el Sprint 0 como Product Owner.
2. Revisar el documento 1.5 contra los diez criterios grupales de la planilla.
3. Validar las tres evidencias individuales con cada integrante.
4. Completar datos formales y confirmar fecha exacta con el docente.
5. Corregir publicación GitHub y README raíz.
6. Ejecutar Review del Sprint 1 con demo funcional.
7. Realizar ensayo de presentación y registrar preguntas/respuestas.
8. Congelar una versión candidata de entrega con hash de commit y verificación de archivos.

## 11. Criterio de verdad para futuras consultas

Cuando existan diferencias entre materiales se aplicará este orden:

1. instrucciones directas y posteriores del docente;
2. planilla de evaluación específica de la entrega;
3. cronograma oficial del periodo 2026.02;
4. instructivo CAPSTONE 2026;
5. programa de asignatura;
6. plantillas formativas y autoevaluaciones;
7. documentación interna del proyecto.

Toda fecha no publicada, aprobación no ocurrida, validación no realizada o decisión no ratificada se mantendrá como pendiente y no se presentará como hecho.
