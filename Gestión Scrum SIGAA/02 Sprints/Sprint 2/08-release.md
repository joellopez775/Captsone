# Release y entrega técnica - Sprint 2

Corte de regularización: 15 de octubre de 2026. Base técnica: commit 899aab6. Fuente operativa: Jira SIGAA, tablero 1. Esta actualización documenta evidencia existente; no acredita reuniones ni aceptación del Product Owner.

Plan histórico: 7 al 19 de septiembre. Jira conserva Sprint 2 - Histórico en estado future, sin fechas. Ese contenedor no acredita inicio ni cierre de una ceremonia.

## Línea histórica

No hay evidencia suficiente de una release formal aceptada al 19 de septiembre. Se preserva el incremento de prototipo y sus límites, sin crear una etiqueta ni backdatear una publicación.

## Evidencia técnica y límites

- 62fbcba: sesiones, permisos, estudiantes y matrículas persistentes.
- dfa0461: PostgreSQL aislado en el Mac servidor y respaldo verificado.
- f48fbc3: publicación HTTPS y cuentas de demostración por rol.
- 899aab6: asistencia, evaluaciones, calificaciones y anotaciones persistentes.
- Pruebas conservadas: 4 unitarias y 30 de integración en Docker / PostgreSQL 16, sin fallos; 14 recorridos en navegador local y 4 recorridos de lectura/login en HTTPS. No son pruebas ejecutadas nuevamente durante esta regularización.
- Evidencias: SIGAA/output/evidence/academic-docker-tests.json, academic-browser-tests.json y academic-hosted-tests.json.
- Alertas, justificaciones completas, cálculo oficial de promedios, carga, accesibilidad integral y validación escolar siguen pendientes. Un esquema SQL no acredita una función conectada.

## Operación de la demostración

La aplicación usa HTTPS mediante un túnel temporal Cloudflare y una base privada en el Mac servidor. Las cuentas existentes se mantienen; sus contraseñas no se incluyen en informes ni Git. El enlace puede cambiar y depende del servidor.

Revisar el manual de despliegue y los informes técnicos 10, 11 y 12 del Sprint 3. No restaurar una base ni ejecutar seeds de prueba sobre la demo pública. No se despliega código en este trabajo documental.

## Cierre

Entregar documentación no cierra el sprint. La release aceptada, validación escolar y aprobación del PO siguen pendientes donde no constan.
