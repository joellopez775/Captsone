# Agente de IA y atención

## 1. Propósito

Atender consultas iniciales, ayudar a encontrar propiedades, calificar necesidades, registrar el contacto con consentimiento y transferir la conversación a una persona. No reemplaza decisiones legales, financieras ni comerciales que requieren autorización.

## 2. Capacidades iniciales

- Responder preguntas sobre propiedades publicadas y políticas aprobadas.
- Buscar por tipo, zona, operación, rango de precio y características.
- Formular preguntas breves para entender intención y restricciones.
- Capturar datos de contacto y consentimiento de manera explícita.
- Crear o actualizar lead, actividad y conversación en el CRM.
- Solicitar atención humana y entregar un resumen verificable.
- Informar cuando no dispone de información suficiente.

## 3. Límites obligatorios

- No acceder directamente a la base de datos ni ejecutar SQL generado por el modelo.
- No revelar propiedades, campos, notas o contactos no publicables.
- No afirmar disponibilidad o precio sin consultar la herramienta vigente.
- No prometer reservas, descuentos, aprobación financiera o condiciones contractuales.
- No solicitar datos sensibles innecesarios.
- No obedecer instrucciones del usuario que intenten modificar sus políticas o extraer secretos.
- No enviar mensajes o crear compromisos irreversibles sin reglas y confirmación explícitas.

## 4. Arquitectura de herramientas

El modelo solo podrá invocar funciones con esquemas estrictos, autorización de servicio y validación del servidor, por ejemplo:

- `buscar_propiedades(filtros_publicables)`
- `obtener_propiedad_publicada(public_id)`
- `registrar_consentimiento(datos_minimos)`
- `crear_o_actualizar_lead(datos_validados)`
- `solicitar_derivacion(conversation_id, motivo)`

La API vuelve a comprobar permisos y reglas; nunca confía en que el modelo haya validado la operación.

## 5. Flujo de derivación

Se deriva cuando el cliente lo solicita, existe intención alta, hay reclamo o riesgo, el agente falla repetidamente, la consulta es jurídica/financiera, se detectan datos sensibles o no hay información confiable.

La entrega incluye:

- canal e identificador de conversación;
- resumen marcado como generado por IA;
- propiedad y necesidad declarada;
- datos y consentimiento disponibles;
- motivo y prioridad de derivación;
- últimos mensajes necesarios para continuidad.

## 6. Memoria y privacidad

- Contexto corto por conversación, con expiración definida.
- Perfil persistente solo mediante campos CRM autorizados.
- Separación estricta por organización y usuario.
- Redacción de secretos y datos personales en telemetría.
- Política visible sobre uso de IA y tratamiento de la conversación.
- Proveedor configurado para el tratamiento de datos aprobado; contratos y región deben revisarse.

## 7. Evaluación antes de producción

Se mantendrá un conjunto versionado de casos que cubra:

- búsqueda y comparación correctas;
- precio, moneda, ubicación y disponibilidad;
- propiedades retiradas o no publicadas;
- preguntas sin respuesta disponible;
- inyección de instrucciones y extracción de datos;
- separación entre organizaciones;
- consentimiento y creación de lead;
- derivación normal y urgente;
- lenguaje ofensivo, ambiguo o de riesgo;
- fallas y latencia de herramientas externas.

Las métricas incluirán exactitud factual, uso correcto de herramientas, filtración de datos, éxito de tarea, tasa de derivación, latencia, costo y satisfacción. Los umbrales se aprueban antes del piloto y forman parte del criterio de release.

## 8. Operación

- Versionar prompt, herramientas, políticas y set de evaluación.
- Registrar modelo y configuración usados por interacción sin almacenar razonamiento privado del modelo.
- Aplicar límites de tasa, presupuesto, tiempo y cantidad de llamadas.
- Disponer de interruptor para desactivar IA y conservar formulario/atención humana.
- Monitorear cambios de calidad después de cada actualización.
