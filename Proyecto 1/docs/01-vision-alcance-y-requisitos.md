# Visión, alcance y requisitos

## 1. Visión del producto

Para inmobiliarias y corredores que necesitan operar y atender clientes desde una única plataforma, la solución centraliza propiedades, clientes y oportunidades; publica automáticamente el inventario autorizado y ofrece atención asistida por IA con trazabilidad y control humano.

## 2. Objetivo del MVP

Demostrar un flujo completo y medible:

> Un administrador publica una propiedad; un visitante la encuentra en la web, realiza una consulta, el agente entrega información verificada, el CRM crea o actualiza el contacto y un ejecutivo continúa el seguimiento hasta coordinar una visita.

## 3. Alcance del MVP

### Incluido

- Autenticación y roles básicos: administrador, supervisor y ejecutivo.
- CRUD de propiedades, características, ubicación, precio, estado y multimedia.
- Flujo de borrador, publicada, reservada, cerrada e inactiva.
- Catálogo público con búsqueda, filtros, ficha y formulario de contacto.
- CRM con contactos, leads, oportunidades, etapas, actividades y responsable.
- Captura del origen y consentimiento del lead.
- Chat web con respuestas basadas en datos vigentes de propiedades.
- Creación o actualización de lead desde el chat y derivación a ejecutivo.
- Historial de conversaciones y auditoría de acciones críticas.
- Panel mínimo con inventario, leads, embudo y tiempos de atención.
- Despliegue reproducible, monitoreo, respaldos y procedimiento de recuperación.

### Fuera del MVP

- Contabilidad, facturación, remuneraciones y conciliación bancaria.
- Firma electrónica y gestión jurídica completa de contratos.
- Cobranza y administración mensual de arriendos.
- Aplicaciones móviles nativas.
- Motor de tasación automática.
- Sincronización con todos los portales inmobiliarios.
- Telefonía o agente de voz.
- Alta disponibilidad multirregión.

Lo anterior puede incorporarse al Product Backlog después de validar valor, costo y dependencias.

## 4. Requisitos funcionales de alto nivel

| ID | Requisito | Prioridad MVP |
|---|---|---|
| RF-01 | Administrar usuarios, roles y estado de acceso | Must |
| RF-02 | Crear, editar, validar y archivar propiedades | Must |
| RF-03 | Gestionar imágenes y documentos autorizados | Must |
| RF-04 | Publicar o retirar una propiedad en la web | Must |
| RF-05 | Buscar y filtrar propiedades públicas | Must |
| RF-06 | Registrar contactos y consentimiento | Must |
| RF-07 | Gestionar leads, oportunidades, etapas y responsables | Must |
| RF-08 | Registrar notas, tareas, llamadas, mensajes y visitas | Must |
| RF-09 | Atender consultas con IA usando datos autorizados | Must |
| RF-10 | Derivar conversaciones a una persona con contexto | Must |
| RF-11 | Medir fuentes, tiempos y conversión del embudo | Should |
| RF-12 | Notificar asignaciones y tareas vencidas | Should |
| RF-13 | Importar y exportar datos con validación | Could |
| RF-14 | Integrar calendarios y canales externos | Could |

## 5. Requisitos no funcionales iniciales

| ID | Atributo | Criterio inicial sujeto a validación |
|---|---|---|
| RNF-01 | Seguridad | TLS, mínimo privilegio, secretos fuera del código, registro de acceso y MFA para administradores |
| RNF-02 | Privacidad | Consentimiento trazable, minimización, exportación/eliminación según política aplicable y redacción de datos en logs |
| RNF-03 | Disponibilidad | Objetivo inicial mensual de 99,5% para el MVP |
| RNF-04 | Rendimiento | p95 menor a 2 s en consultas web normales; búsquedas complejas se presupuestan por separado |
| RNF-05 | Recuperación | RPO inicial de 24 h y RTO de 4 h, a validar con negocio |
| RNF-06 | Accesibilidad | Interfaz pública orientada a WCAG 2.2 nivel AA |
| RNF-07 | Observabilidad | Logs estructurados, métricas, trazas/correlación y alertas accionables |
| RNF-08 | Mantenibilidad | Pruebas automatizadas, migraciones versionadas, revisión de código y documentación de decisiones |
| RNF-09 | Compatibilidad | Web adaptable para versiones vigentes de navegadores principales |
| RNF-10 | IA | Respuestas con fuente interna trazable, límites de herramienta, evaluación y derivación segura |

## 6. Criterios de aceptación del MVP

El MVP se considera apto para piloto cuando:

1. el flujo completo definido en el objetivo funciona en un ambiente productivo controlado;
2. ninguna propiedad no publicada puede ser expuesta por la web o el agente;
3. toda consulta crea o relaciona un registro trazable en el CRM;
4. el agente puede derivar con resumen, datos de contacto y propiedad consultada;
5. los roles impiden operaciones no autorizadas;
6. existen respaldo restaurable, monitoreo y runbook de incidentes;
7. las pruebas críticas y la evaluación del agente cumplen los umbrales aprobados;
8. Product Owner acepta el incremento y no quedan defectos críticos abiertos.

## 7. Matriz de trazabilidad propuesta

Cada historia deberá enlazar:

`Objetivo de negocio → Épica → Historia → Criterios de aceptación → Prueba → Release`

Los IDs de requisitos y backlog permanecerán estables aunque cambie el orden de prioridad.
