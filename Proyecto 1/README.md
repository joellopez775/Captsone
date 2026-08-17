# InmoGest IA

> La entrega académica con la estructura oficial para revisión automática se encuentra en [`../Fase 1`](../Fase%201/README.md). Esta carpeta conserva la documentación de ingeniería y los respaldos técnicos del proyecto.

Repositorio documental y técnico de **InmoGest IA: Plataforma Integral de Gestión Inmobiliaria, CRM y Atención Inteligente**. El proyecto centraliza propiedades, relaciones con clientes, oportunidades y publicación de oferta inmobiliaria, con asistencia de IA y operación sobre infraestructura controlada.

## Estado

**Fase actual:** descubrimiento y definición inicial del producto.

Esta línea base se construyó a partir del contexto inicial entregado. No representa todavía una especificación contractual. Las hipótesis están señaladas como supuestos y deben validarse con el Product Owner y los usuarios del negocio.

## Capacidades solicitadas

- Catálogo y gestión de propiedades.
- CRM inmobiliario para contactos, oportunidades, actividades y seguimiento.
- Sitio web público tipo vitrina, sincronizado con el sistema de gestión.
- Agente de IA desplegado en un VPS para atención inicial de clientes.
- Integración trazable entre sitio web, CRM, propiedades y agente de IA.
- Documentación técnica y de producto a nivel de ingeniería.

## Documentación

1. [Contexto y diagnóstico](docs/00-contexto-y-diagnostico.md)
2. [Visión, alcance y requisitos](docs/01-vision-alcance-y-requisitos.md)
3. [Arquitectura de referencia](docs/02-arquitectura-de-referencia.md)
4. [Dominio y datos](docs/03-dominio-y-datos.md)
5. [Agente de IA y atención](docs/04-agente-ia-y-atencion.md)
6. [Seguridad, operación y calidad](docs/05-seguridad-operacion-y-calidad.md)
7. [Marco de trabajo Scrum](docs/scrum/README.md)
8. [Product Backlog inicial](docs/scrum/product-backlog.md)
9. [Roadmap y plan de releases](docs/scrum/roadmap.md)

## Capstone - Fase 1

- [Control de entrega](docs/fase-1/00-checklist-fase-1.md).
- [Definición del Proyecto APT - fuente versionable](docs/fase-1/01-definicion-proyecto-apt.md).
- [Trazabilidad con la rúbrica](docs/fase-1/02-trazabilidad-rubrica.md).
- [Informe editable basado en la guía Duoc](entregables/fase-1/01_Definicion_Proyecto_APT_InmoGest_IA.docx).
- [Informe PDF de Fase 1](output/pdf/09_definicion_proyecto_apt_inmogest_ia.pdf).
- [Plan integral de Fase 1](planillas/04_plan_fase_1_inmogest_ia.xlsx): resumen, Gantt de 18 semanas, plan de trabajo, evidencias, RACI, riesgos, backlog y validaciones.

Los RUT, autoevaluaciones, diarios de reflexión y conclusiones individuales en inglés permanecen pendientes hasta que cada integrante aporte y valide su información personal.

## Informes PDF

- [Informe maestro centralizado](output/pdf/00_informe_maestro_plataforma_inmobiliaria.pdf): documento completo con índice navegable, hipervínculos a informes, fuentes y Excel, marcadores PDF y diagramas de arquitectura, procesos, IA, datos, Scrum, roadmap y entrega continua.
- [Contexto y diagnóstico](output/pdf/00_contexto_y_diagnostico.pdf).
- [Visión, alcance y requisitos](output/pdf/01_vision_alcance_y_requisitos.pdf).
- [Arquitectura de referencia](output/pdf/02_arquitectura_de_referencia.pdf).
- [Dominio y datos](output/pdf/03_dominio_y_datos.pdf).
- [Agente de IA y atención](output/pdf/04_agente_ia_y_atencion.pdf).
- [Seguridad, operación y calidad](output/pdf/05_seguridad_operacion_y_calidad.pdf).
- [Marco de trabajo Scrum](output/pdf/06_scrum_marco_de_trabajo.pdf).
- [Product Backlog](output/pdf/07_scrum_product_backlog.pdf).
- [Roadmap y plan de releases](output/pdf/08_scrum_roadmap.pdf).

Los archivos Markdown se conservan como fuentes editables y versionables. Los PDF son los entregables formateados para lectura, revisión o presentación.

## Diagramas incluidos

Los diagramas están escritos en Mermaid y GitHub los renderiza directamente dentro de los informes:

- Diagrama de contexto y contenedores lógicos: [Arquitectura de referencia](docs/02-arquitectura-de-referencia.md).
- Secuencia completa desde consulta hasta derivación: [Arquitectura de referencia](docs/02-arquitectura-de-referencia.md).
- Modelo conceptual entidad–relación: [Dominio y datos](docs/03-dominio-y-datos.md).
- Flujo de integración y entrega continua: [Seguridad, operación y calidad](docs/05-seguridad-operacion-y-calidad.md).

## Planillas Excel

- [Gestión Scrum](planillas/01_gestion_scrum.xlsx): dashboard, backlog, épicas, spikes, roadmap, Sprints y definiciones de calidad.
- [Matrices de ingeniería](planillas/02_matrices_ingenieria.xlsx): requisitos, riesgos, decisiones, actores, trazabilidad y escalas de cálculo.
- [Modelo de datos](planillas/03_modelo_datos.xlsx): entidades, 80 campos conceptuales, reglas, clasificación, retención y catálogos.

Las planillas utilizan fórmulas, filtros, validaciones de datos y gráficos nativos. Son artefactos vivos: deben actualizarse junto con los documentos que representan.

## Principios de producto

1. **Una fuente de verdad:** la propiedad se administra una vez y se publica en los canales autorizados.
2. **Trazabilidad completa:** cada contacto, conversación, consentimiento y cambio relevante queda auditado.
3. **IA con límites:** el agente consulta información autorizada, no inventa datos y deriva a una persona cuando corresponde.
4. **Seguridad y privacidad desde el diseño:** mínimo privilegio, separación de datos, respaldo y retención definida.
5. **Entrega incremental:** primero se valida el flujo comercial esencial; luego se agregan automatizaciones y optimizaciones.

## Próxima decisión

Validar los puntos abiertos del diagnóstico y aprobar el alcance del MVP antes de seleccionar tecnologías definitivas o comenzar el desarrollo.
