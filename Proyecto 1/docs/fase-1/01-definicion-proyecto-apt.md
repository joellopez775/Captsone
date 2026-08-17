# InmoGest IA

## Plataforma Integral de Gestión Inmobiliaria, CRM y Atención Inteligente

**Asignatura:** Capstone PTY4614
**Carrera:** Ingeniería en Informática
**Sede:** Plaza Vespucio
**Año de ingreso:** 2023
**Integrantes:** Joel López, Agustín Sorolla y Matías Martínez
**Organización:** Corredora Metropolitana SpA (caso simulado)
**Territorio piloto:** sector suroriente de Santiago

## Resumen ejecutivo

InmoGest IA propone una plataforma web para centralizar la administración de propiedades, contactos, oportunidades comerciales, publicaciones y conversaciones de una corredora inmobiliaria pequeña o mediana. La solución integrará un sistema de gestión de propiedades, un CRM, una vitrina web sincronizada y un agente de inteligencia artificial para atención inicial y derivación responsable. El proyecto se desarrollará incrementalmente con Scrum durante 18 semanas, con trazabilidad en GitHub, pruebas en cada incremento y despliegue reproducible en un VPS mediante contenedores.

## Abstract

InmoGest IA is a web platform designed to centralize property management, customer relationships, sales opportunities, listings, and client conversations for a small or medium-sized real estate agency. The solution will integrate a property management module, a CRM, a synchronized public property website, and an AI assistant for initial customer support and responsible human handoff. The project will be developed incrementally using Scrum over eighteen weeks, with GitHub traceability, testing in every increment, and reproducible deployment on a VPS using containers.

## 1. Descripción del Proyecto APT

### Nombre

InmoGest IA: Plataforma Integral de Gestión Inmobiliaria, CRM y Atención Inteligente.

### Áreas de desempeño

- Desarrollo de software full-stack.
- Gestión de proyectos informáticos.
- Diseño, construcción y administración de datos.
- Aseguramiento de calidad y pruebas.
- Integración de servicios, inteligencia artificial y operación en infraestructura.

### Competencias del perfil de egreso

- C1: diseñar, ejecutar y mejorar pruebas de certificación de productos y procesos de software.
- C2: gestionar proyectos informáticos y controlar su avance de acuerdo con requerimientos organizacionales.
- C3: construir e implementar modelos de datos pertinentes, normalizados y escalables.
- C4: desarrollar, integrar, desplegar y mantener una solución de software que responda a objetivos definidos.
- C5: comunicar elementos técnicos y reflexivos en inglés en los entregables exigidos.

## 2. Fundamentación

### Problema y relevancia

Las corredoras inmobiliarias pequeñas y medianas suelen administrar propiedades, clientes y consultas mediante herramientas separadas: planillas, correo, mensajería y publicaciones manuales. Esta fragmentación genera datos duplicados o desactualizados, consultas sin seguimiento, tiempos elevados de respuesta, pérdida de oportunidades y escasa trazabilidad. Resolver este problema es relevante porque la operación inmobiliaria depende de información vigente, coordinación comercial y atención oportuna.

### Usuarios y contexto

El cliente principal son corredoras pequeñas y medianas, agentes independientes y administradores de propiedades. Los usuarios secundarios son propietarios y personas interesadas en comprar o arrendar. El piloto se sitúa en La Florida, Macul, Peñalolén y Puente Alto, con posibilidad de expansión a la Región Metropolitana y posteriormente a Chile.

### Solución propuesta

La plataforma dispondrá de módulos para propiedades, contactos, oportunidades, actividades, publicación web, consultas y atención asistida por IA. La propiedad se administrará desde una única fuente de verdad; la vitrina mostrará solamente registros publicables y vigentes. Cada consulta originará un registro trazable en el CRM. El agente IA consultará información autorizada, declarará sus límites y derivará a una persona ante incertidumbre, riesgo o solicitud explícita.

### Pertinencia con el perfil de egreso

El proyecto integra planificación, análisis, modelado de datos, desarrollo web, APIs, pruebas, seguridad, despliegue y documentación. La arquitectura y las decisiones técnicas permiten evidenciar las competencias C1-C4, mientras el abstract, las conclusiones y la presentación individual permiten demostrar C5. GitHub registrará contribuciones de los tres integrantes en código, datos, pruebas y documentación.

### Intereses profesionales

Como equipo, el proyecto se relaciona con desarrollo full-stack, arquitectura de software, experiencia de usuario, datos, inteligencia artificial, automatización, seguridad y DevOps. La relación personal de cada integrante con estas áreas deberá redactarse individualmente en su diario de reflexión y autoevaluación.

### Factibilidad

El MVP es factible en 18 semanas si se limita a autenticación y roles, gestión de propiedades, CRM básico, vitrina sincronizada, captura de consultas, agente IA acotado, auditoría y despliegue en VPS. Se utilizarán tecnologías abiertas y servicios desacoplados. Los principales riesgos son el exceso de alcance, aprendizaje técnico, costos o límites del proveedor de IA, tratamiento de datos personales e integración tardía. Se mitigarán con entregas quincenales, datos sintéticos, contratos de API tempranos, adaptador intercambiable de IA y pruebas desde el inicio.

## 3. Objetivos

### Objetivo general

Desarrollar y validar, durante el semestre académico, una plataforma web integral que centralice la gestión de propiedades, clientes y oportunidades de una corredora inmobiliaria, publique una vitrina sincronizada, proporcione atención inicial asistida por IA y pueda desplegarse de forma segura y reproducible en un VPS.

### Objetivos específicos

1. Analizar y documentar antes de la semana 4 los actores, requisitos, alcance, arquitectura, modelo de datos, riesgos y plan de trabajo.
2. Implementar antes de la semana 8 la autenticación, autorización, auditoría, base de datos y API para la gestión de propiedades y contactos.
3. Integrar antes de la semana 10 el CRM básico, la vitrina pública y la captura trazable de consultas.
4. Incorporar antes de la semana 12 un agente IA acotado que consulte propiedades autorizadas, registre conversaciones y permita derivación humana.
5. Desplegar antes de la semana 14 una versión integrada en un VPS mediante contenedores, HTTPS, variables de entorno, respaldos y monitoreo básico.
6. Verificar antes de la semana 15 los flujos críticos mediante pruebas unitarias, de integración, aceptación, seguridad y rendimiento, entregando evidencias y manuales reproducibles.

## 4. Alcance del MVP

### Incluido

- Acceso autenticado y control por roles.
- CRUD y ciclo de publicación de propiedades.
- Contactos, oportunidades, actividades y estados comerciales.
- Vitrina web con búsqueda y filtros esenciales.
- Formularios de consulta conectados al CRM.
- Agente IA limitado a información aprobada y derivación humana.
- Registro de auditoría y consentimientos básicos.
- Despliegue contenedorizado, respaldo y documentación operativa.

### Fuera del MVP

- Pagos, firma electrónica y contratos legales.
- Integración automática con todos los portales inmobiliarios.
- Tasación automática o decisiones autónomas de crédito.
- Aplicaciones móviles nativas.
- Modelo de IA propio entrenado desde cero.
- Analítica predictiva avanzada y operación nacional en producción.

## 5. Metodología

El equipo aplicará Scrum con ciclos de dos semanas. Joel López asumirá Product Owner y liderazgo de arquitectura; Agustín Sorolla facilitará Scrum y liderará frontend/UX; Matías Martínez liderará datos, IA y calidad. Los tres actuarán como desarrolladores y compartirán código, pruebas, revisión y documentación.

Cada sprint contendrá planificación, refinamiento, seguimiento frecuente, revisión y retrospectiva. El Product Backlog se priorizará por valor, riesgo y dependencia. Una historia solo ingresará al sprint si tiene propósito, criterios de aceptación, dependencias conocidas y tamaño razonable. Se considerará terminada cuando su código esté revisado, probado, documentado, integrado y demostrable, sin secretos ni defectos críticos conocidos.

Las fases académicas y Scrum convivirán de este modo: definición y diseño durante semanas 1-4; construcción incremental y entregas de avance/final durante semanas 5-15; estabilización y presentación durante semanas 16-18.

## 6. Arquitectura tecnológica propuesta

- Frontend y vitrina: Next.js, React y TypeScript.
- API modular: NestJS con REST y OpenAPI.
- Datos: PostgreSQL y Prisma ORM.
- Agente IA: servicio desacoplado mediante adaptador de proveedor.
- Archivos: almacenamiento compatible con S3.
- Infraestructura: VPS Linux, Docker Compose, proxy HTTPS y respaldos.
- Calidad: Jest, Supertest, Playwright y GitHub Actions.

La solución comenzará como un monolito modular con servicios auxiliares, evitando microservicios prematuros. Esta decisión reduce el esfuerzo operativo sin impedir separar componentes en el futuro.

## 7. Evidencias comprometidas

### Informe de avance

- Documento de definición, Product Backlog priorizado y planificación actualizada.
- Arquitectura, modelo entidad-relación, diccionario de datos y diagramas UML principales.
- Prototipos de interfaz y flujo de navegación.
- Incremento ejecutable con autenticación, propiedades, contactos y trazabilidad básica.
- Reporte de pruebas y evidencia de integración continua.

### Informe final

- Plataforma integrada con CRM, vitrina, consultas y agente IA acotado.
- Repositorio público con historial de contribuciones de los tres integrantes.
- Scripts de base de datos, Dockerfiles, Docker Compose y configuración documentada.
- Plan y resultados de pruebas unitarias, integración, aceptación, seguridad y rendimiento.
- Manual técnico, despliegue, respaldo, recuperación y manual de usuario.
- Evidencia de Sprint Reviews, retrospectivas, impedimentos y decisiones de arquitectura.

## 8. Plan general de trabajo

1. Semanas 1-2: definición, competencias, actores, problema, alcance y tecnologías.
2. Semanas 3-4: arquitectura, modelo de datos, prototipo, backlog y presentación de Fase 1.
3. Semanas 5-6: base técnica, autenticación, autorización, auditoría y CI.
4. Semanas 7-8: propiedades, contactos y archivos.
5. Semanas 9-10: CRM, vitrina, captura de consultas y entrega de avance.
6. Semanas 11-12: agente IA, conocimiento autorizado y derivación humana.
7. Semanas 13-14: integración, seguridad, rendimiento y despliegue en VPS.
8. Semana 15: pruebas finales, manuales, entrega y demostración.
9. Semana 16: correcciones y consolidación de evidencias.
10. Semanas 17-18: presentación ante comisión.

El detalle de actividades, recursos, responsables, riesgos, evidencias y Gantt se mantiene en `planillas/04_plan_fase_1_inmogest_ia.xlsx`.

## 9. Criterios de éxito

- Una propiedad se administra una vez y se refleja correctamente en la vitrina.
- Toda consulta genera un contacto u oportunidad trazable.
- El equipo puede demostrar el recorrido desde una consulta hasta su seguimiento.
- El agente IA responde solo con información autorizada y deriva cuando corresponde.
- El sistema puede instalarse en un ambiente limpio siguiendo el README.
- Los flujos críticos superan las pruebas acordadas sin defectos bloqueantes.
- Cada integrante demuestra contribuciones en GitHub y dominio del proyecto.

## 10. Conclusiones y reflexiones individuales en inglés

Esta sección debe ser completada personalmente por cada integrante. No debe reemplazarse por texto generado sin que el estudiante lo revise y adapte a su propia experiencia.

### Joel López

Pending: individual conclusion and reflection in English.

### Agustín Sorolla

Pending: individual conclusion and reflection in English.

### Matías Martínez

Pending: individual conclusion and reflection in English.

## 11. Decisiones pendientes de validación docente

- Aprobación del escenario simulado y del territorio piloto.
- Confirmación de evidencias para avance y entrega final.
- Correspondencia exacta de las competencias con la malla 2023.
- Confirmación del archivo sumativo de Fase 1 y formato de presentación.
- Validación de tecnología de IA según costos, privacidad y capacidad del VPS.
