# Arquitectura de software - SIGAA

Corte de regularización: 15 de octubre de 2026. Base técnica: commit 899aab6. Fuente operativa: Jira SIGAA, tablero 1. Esta actualización documenta evidencia existente; no acredita reuniones ni aceptación del Product Owner.

## Vista implementada

Monolito modular web: React y Nginx presentan la interfaz; Node.js y Express validan identidad, permisos y reglas; PostgreSQL 16 conserva registros. Docker aísla servicios. No se conectan navegadores directamente a la base.

:::diagram architecture

## Responsabilidades y controles

| Componente | Responsabilidad implementada | Límite |
|---|---|---|
| React | Formularios, navegación y estado de consulta | No autoriza operaciones por sí solo |
| Nginx | Servir web y dirigir /api al backend | No publica acceso a PostgreSQL |
| Express | Sesión, CSRF, rol, alcance, validación y transacciones | Alertas y justificaciones completas no integradas |
| PostgreSQL | Restricciones, sesiones, auditoría y datos académicos | Usuario de API limitado, red privada |
| Cloudflare | Acceso público HTTPS y túnel | URL temporal, depende del Mac y Docker |

## Seguridad y operación

Las contraseñas usan hash scrypt con sal. La sesión guarda un hash del token y puede expirar o revocarse. En modo HTTPS la cookie es Secure, HttpOnly y SameSite Strict. Las mutaciones exigen origen esperado y token CSRF. Las consultas verifican matrícula activa y asignación docente.

No hay puertos de la base publicados al exterior. El enlace público y el túnel están cifrados; no se afirma que la conexión interna API-PostgreSQL use TLS. El aislamiento de red no equivale a cifrado de todos los tramos.

Los módulos de prototipo conservados no prueban funciones productivas. La aplicación segura permite estudiantes/matrículas al administrador y operación académica al docente; el estudiante consulta sus propios registros publicados. Otros roles escolares requieren implementación y validación adicional.

## Defensa de la decisión

Un monolito modular reduce complejidad operativa para tres integrantes. Docker fija el entorno y PostgreSQL aplica integridad y transacciones. Los módulos permiten separar reglas sin introducir despliegues independientes innecesarios. La arquitectura se evalúa por pruebas y límites explícitos, no por número de componentes.

## Evidencia técnica y límites

- 62fbcba: sesiones, permisos, estudiantes y matrículas persistentes.
- dfa0461: PostgreSQL aislado en el Mac servidor y respaldo verificado.
- f48fbc3: publicación HTTPS y cuentas de demostración por rol.
- 899aab6: asistencia, evaluaciones, calificaciones y anotaciones persistentes.
- Pruebas conservadas: 4 unitarias y 30 de integración en Docker / PostgreSQL 16, sin fallos; 14 recorridos en navegador local y 4 recorridos de lectura/login en HTTPS. No son pruebas ejecutadas nuevamente durante esta regularización.
- Evidencias: SIGAA/output/evidence/academic-docker-tests.json, academic-browser-tests.json y academic-hosted-tests.json.
- Alertas, justificaciones completas, cálculo oficial de promedios, carga, accesibilidad integral y validación escolar siguen pendientes. Un esquema SQL no acredita una función conectada.

## Pendientes

Backups periódicos, restauración operativa recurrente, rotación de credenciales administrativas, validación escolar, carga, accesibilidad integral y navegación Safari/Firefox. La demo no constituye una autorización de producción escolar.
