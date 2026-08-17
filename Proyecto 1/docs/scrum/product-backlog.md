# Product Backlog inicial

## 1. Convenciones

- Prioridad: **Must**, **Should**, **Could** para el MVP.
- Puntos: estimación inicial de referencia; el equipo debe reestimar en refinamiento.
- Una historia no entra al Sprint solo por aparecer en esta tabla: debe cumplir la política de refinamiento y alinearse con el Sprint Goal.

## 2. Épicas

| ID | Épica | Resultado |
|---|---|---|
| EP-01 | Descubrimiento y experiencia | Flujo validado con usuarios y métricas base |
| EP-02 | Plataforma y seguridad | Base desplegable, observable y protegida |
| EP-03 | Identidad y acceso | Usuarios operan según responsabilidades |
| EP-04 | Inventario inmobiliario | Propiedades consistentes y publicables |
| EP-05 | Web vitrina | Prospectos encuentran oferta vigente |
| EP-06 | CRM | Consultas se convierten en seguimiento trazable |
| EP-07 | Atención con IA | Respuesta verificada y continuidad humana |
| EP-08 | Analítica y operación | Negocio y equipo conocen desempeño y salud |

## 3. Historias ordenadas

| Orden | ID | Historia resumida | Épica | Prioridad | Puntos |
|---:|---|---|---|---|---:|
| 1 | US-001 | Como PO, quiero validar el flujo actual y sus métricas para fijar una línea base | EP-01 | Must | 5 |
| 2 | US-002 | Como equipo, queremos registrar decisiones críticas para controlar supuestos y riesgos | EP-01 | Must | 3 |
| 3 | US-003 | Como operador, quiero ambientes y entrega automatizada para liberar cambios repetibles | EP-02 | Must | 8 |
| 4 | US-004 | Como administrador, quiero iniciar sesión de forma segura para acceder a la plataforma | EP-03 | Must | 5 |
| 5 | US-005 | Como administrador, quiero gestionar usuarios y roles para aplicar mínimo privilegio | EP-03 | Must | 8 |
| 6 | US-006 | Como ejecutivo, quiero crear y editar una propiedad para mantener el inventario | EP-04 | Must | 8 |
| 7 | US-007 | Como responsable, quiero validar campos obligatorios para evitar fichas incompletas | EP-04 | Must | 5 |
| 8 | US-008 | Como ejecutivo, quiero cargar y ordenar imágenes para presentar una propiedad | EP-04 | Must | 5 |
| 9 | US-009 | Como supervisor, quiero publicar o retirar una propiedad para controlar su exposición | EP-04 | Must | 8 |
| 10 | US-010 | Como visitante, quiero buscar y filtrar propiedades para encontrar opciones relevantes | EP-05 | Must | 8 |
| 11 | US-011 | Como visitante, quiero ver una ficha adaptable para evaluar una propiedad | EP-05 | Must | 5 |
| 12 | US-012 | Como visitante, quiero dejar una consulta y consentimiento para recibir contacto | EP-05 | Must | 5 |
| 13 | US-013 | Como ejecutivo, quiero ver contactos y leads para trabajar cada consulta | EP-06 | Must | 8 |
| 14 | US-014 | Como supervisor, quiero asignar leads para equilibrar el seguimiento | EP-06 | Must | 5 |
| 15 | US-015 | Como ejecutivo, quiero registrar actividades y tareas para mantener continuidad | EP-06 | Must | 5 |
| 16 | US-016 | Como ejecutivo, quiero convertir un lead en oportunidad para gestionar el embudo | EP-06 | Must | 5 |
| 17 | US-017 | Como visitante, quiero conversar en la web para resolver dudas iniciales | EP-07 | Must | 8 |
| 18 | US-018 | Como agente IA, quiero consultar solo propiedades publicadas para responder con datos vigentes | EP-07 | Must | 8 |
| 19 | US-019 | Como prospecto, quiero que mis preferencias se registren con consentimiento para continuar la atención | EP-07 | Must | 8 |
| 20 | US-020 | Como prospecto, quiero solicitar una persona sin repetir el contexto | EP-07 | Must | 8 |
| 21 | US-021 | Como responsable de calidad, quiero evaluar regresiones del agente antes de liberarlo | EP-07 | Must | 8 |
| 22 | US-022 | Como operador, quiero logs, métricas y alertas para detectar fallos | EP-08 | Must | 8 |
| 23 | US-023 | Como operador, quiero respaldar y restaurar los datos para recuperarme de una pérdida | EP-08 | Must | 8 |
| 24 | US-024 | Como supervisor, quiero ver inventario y embudo para tomar decisiones | EP-08 | Should | 8 |
| 25 | US-025 | Como ejecutivo, quiero recibir notificaciones de asignación y vencimiento | EP-06 | Should | 5 |
| 26 | US-026 | Como administrador, quiero importar propiedades con validación para acelerar la carga | EP-04 | Could | 8 |
| 27 | US-027 | Como visitante, quiero guardar favoritos para comparar propiedades | EP-05 | Could | 5 |
| 28 | US-028 | Como ejecutivo, quiero sincronizar visitas con calendario para evitar doble registro | EP-06 | Could | 8 |
| 29 | US-029 | Como supervisor, quiero deduplicación asistida de contactos para mejorar calidad de datos | EP-06 | Could | 5 |
| 30 | US-030 | Como administrador, quiero integrar un canal externo priorizado para centralizar conversaciones | EP-07 | Could | 13 |

## 4. Criterios de aceptación de historias críticas

### US-009 — Publicar o retirar una propiedad

- Dada una propiedad incompleta, cuando se intenta publicar, entonces se informa cada validación pendiente y no se expone.
- Dada una propiedad válida, cuando un usuario autorizado publica, entonces la ficha queda disponible por identificador público y se registra auditoría.
- Dada una propiedad publicada, cuando se retira o cierra, entonces deja de aparecer en búsqueda, ficha y herramientas del agente dentro del tiempo acordado.
- Un usuario sin permiso no puede publicar ni retirar, incluso invocando directamente la API.

### US-012 — Capturar consulta

- El formulario identifica la propiedad y el origen sin confiar en campos manipulables del cliente.
- Se validan datos mínimos y se presenta el texto vigente de consentimiento.
- El envío crea o relaciona contacto y lead sin duplicación silenciosa.
- El usuario recibe confirmación y la falla de integración queda en reintento observable.

### US-018 — Consultar propiedades desde IA

- La herramienta devuelve únicamente campos y propiedades publicables de la organización correcta.
- Precio, moneda, operación, estado y fecha de actualización provienen de la API, no de memoria del modelo.
- Si la propiedad no existe o no está publicada, la respuesta no revela sus datos.
- Cada llamada posee correlación, límite de tiempo, métricas y manejo seguro de errores.

### US-020 — Derivación humana

- El prospecto puede solicitar una persona en cualquier momento.
- La derivación crea una actividad/asignación y conserva propiedad, intención y canal.
- El resumen se identifica como generado por IA y enlaza la conversación fuente.
- Si no existe ejecutivo disponible, se informa expectativa realista y la solicitud permanece visible.

### US-023 — Respaldo y restauración

- Base de datos, objetos y configuración necesaria tienen backup cifrado fuera del VPS.
- Las tareas fallidas generan alertas.
- Una restauración en ambiente aislado demuestra integridad y mide RPO/RTO.
- El procedimiento, responsables y evidencia quedan documentados.

## 5. Spikes recomendados

| ID | Pregunta | Evidencia esperada | Timebox |
|---|---|---|---|
| SP-001 | ¿CRM propio o integración? | Matriz de capacidades, costos, APIs, riesgos y recomendación | 3 días |
| SP-002 | ¿Qué modelo/proveedor cumple calidad, privacidad, latencia y costo? | Prototipo y resultados sobre set inicial | 5 días |
| SP-003 | ¿Qué canal conversacional inicia el MVP? | Journey, restricciones, costo y esfuerzo | 2 días |
| SP-004 | ¿El VPS objetivo soporta carga y recuperación esperadas? | Prueba de despliegue, carga, backup y restauración | 3 días |
| SP-005 | ¿Qué búsqueda satisface catálogo y SEO del MVP? | Prueba con datos representativos y presupuesto de latencia | 2 días |
