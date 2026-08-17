# Contexto y diagnóstico inicial

## 1. Problema observado

Una operación inmobiliaria suele fragmentar la información entre planillas, mensajería, portales, sitio web y memoria de los ejecutivos. Esto produce publicaciones inconsistentes, pérdida de prospectos, seguimientos tardíos y poca visibilidad del embudo comercial.

El producto propuesto debe unir cuatro ámbitos:

1. inventario de propiedades;
2. gestión comercial y de clientes;
3. exposición pública de la oferta;
4. atención automatizada y derivación humana.

## 2. Resultado de negocio esperado

- Reducir el tiempo entre una consulta y la primera respuesta.
- Evitar duplicación e inconsistencias en los datos de propiedades.
- Aumentar la conversión de consultas en visitas y oportunidades.
- Entregar visibilidad del estado de cada prospecto y operación.
- Habilitar atención fuera de horario sin perder control humano.
- Medir origen, calidad y resultado de cada lead.

## 3. Actores preliminares

| Actor | Necesidad principal | Acceso esperado |
|---|---|---|
| Visitante | Buscar y comparar propiedades | Sitio público |
| Prospecto | Consultar, dejar datos y coordinar contacto | Sitio y canales conversacionales |
| Corredor o ejecutivo | Gestionar propiedades, leads y actividades | Aplicación interna |
| Supervisor comercial | Distribuir trabajo y revisar el embudo | CRM y reportes |
| Administrador | Configurar usuarios, permisos e integraciones | Consola administrativa |
| Operaciones/soporte | Monitorear servicios, respaldos e incidentes | Herramientas operativas |
| Agente de IA | Consultar oferta autorizada y registrar interacciones | API restringida por herramientas |

## 4. Contexto confirmado

- Se requiere una plataforma completa de gestión inmobiliaria.
- Debe existir una base de datos de propiedades.
- Se requiere un CRM.
- Se requiere una web vitrina conectada al inventario y al CRM.
- Se requiere un agente de IA alojado en un VPS para atención a clientes.
- La solución y el proceso deben documentarse a nivel de ingeniería.
- La gestión del trabajo utilizará Scrum.

## 5. Supuestos de trabajo por validar

- El primer incremento atenderá a una sola organización inmobiliaria, pero el diseño evitará impedir una evolución multiempresa.
- El MVP se enfocará en venta y arriendo de propiedades; administración de contratos, cobranza y contabilidad quedan fuera inicialmente.
- El canal inicial del agente será el chat web. WhatsApp, correo, telefonía y portales se priorizarán después de conocer las necesidades reales.
- Existirán roles diferenciados y los ejecutivos solo verán la información permitida por la organización.
- Las fotografías y documentos se almacenarán fuera de la base de datos, mediante almacenamiento de objetos.
- El VPS alojará componentes de aplicación y del agente, pero los respaldos se guardarán en una ubicación independiente.
- La jurisdicción, las reglas de consentimiento y los plazos de retención aún deben ser confirmados.

## 6. Restricciones y decisiones pendientes

| Tema | Pregunta que debe resolverse | Impacto |
|---|---|---|
| Negocio | ¿Venta, arriendo, administración o los tres? | Dominio y alcance del MVP |
| Usuarios | ¿Cuántas sucursales, ejecutivos y propiedades? | Capacidad, permisos y costos |
| País | ¿En qué jurisdicción operará? | Privacidad, contratos y tratamiento de datos |
| Canales | ¿Web, WhatsApp, correo, voz u otros? | Integraciones y presupuesto |
| CRM | ¿Se construye o se integra uno existente? | Arquitectura, plazo y licencias |
| Portales | ¿Qué portales inmobiliarios deben sincronizarse? | Formatos, APIs y operación |
| Agenda | ¿Se integra Google/Outlook o se crea agenda propia? | Autorización y experiencia del usuario |
| IA | ¿Qué proveedor/modelo, presupuesto y política de datos se permiten? | Privacidad, latencia y calidad |
| Infraestructura | ¿Proveedor, región, SLA y presupuesto del VPS? | Disponibilidad y recuperación |
| Identidad | ¿Inicio de sesión local, Google o Microsoft? | Seguridad y administración |

## 7. Riesgos iniciales

| Riesgo | Probabilidad | Impacto | Respuesta inicial |
|---|---:|---:|---|
| Alcance demasiado amplio para un primer release | Alta | Alto | MVP por flujo de valor y control de cambios |
| Datos de propiedades incompletos o inconsistentes | Alta | Alto | Validaciones, estados y responsable de calidad |
| Respuestas incorrectas del agente | Media | Alto | Herramientas restringidas, fuentes verificadas y derivación |
| Exposición de datos personales | Media | Crítico | Privacidad por diseño, permisos, cifrado y auditoría |
| Dependencia de integraciones externas | Media | Alto | Adaptadores, reintentos, colas y monitoreo |
| Caída del único VPS | Media | Alto | Backups externos, recuperación ensayada y evolución a alta disponibilidad |
| Baja adopción del CRM | Media | Alto | Diseño con usuarios, métricas de uso y capacitación |

## 8. Métricas de éxito propuestas

Las metas numéricas deben fijarse después de obtener una línea base.

- Tiempo mediano de primera respuesta.
- Porcentaje de consultas registradas automáticamente en el CRM.
- Conversión de lead a contacto efectivo, visita y cierre.
- Porcentaje de propiedades con ficha completa y vigente.
- Tiempo desde actualización interna hasta publicación web.
- Tasa de resolución automática y tasa de derivación del agente.
- Precisión de respuestas del agente en un set de evaluación controlado.
- Disponibilidad, tasa de errores y tiempo de recuperación del servicio.
