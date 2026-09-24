# Sprint Backlog 3 y estructura Jira

## Flujo del tablero

Backlog -> Seleccionada -> En curso -> En revisión -> Terminada.

Límite acordado propuesto: máximo tres historias en curso y una por integrante.

## Historias y criterios principales

### PB-011 - Autenticación segura

Como usuario de SIGAA, quiero iniciar una sesión segura para acceder solamente a mi información.

- Contraseña almacenada con hash.
- Sesión revocable y con expiración.
- Error genérico ante credenciales inválidas.
- Secretos fuera del repositorio.

### PB-012 - Roles y permisos

Como establecimiento, quiero restringir acciones por rol y alcance para proteger los datos escolares.

- Estudiante consulta únicamente su información.
- Profesor opera solo sus cursos y asignaturas.
- Acceso indebido devuelve 403.
- Casos positivos y negativos automatizados.

### PB-015 - Gestión de estudiantes

Como personal autorizado, quiero crear y actualizar estudiantes para mantener registros vigentes.

- Persistencia en PostgreSQL.
- Validación de identificador, estado y campos obligatorios.
- Duplicados rechazados de forma controlada.
- Auditoría del actor y fecha.

### PB-016 - Matrículas

Como encargado académico, quiero matricular un estudiante en un curso y periodo para establecer su contexto escolar.

- Curso y periodo válidos.
- Duplicidad activa impedida.
- Estado e historial conservados.
- Consulta posterior al reinicio de la API.

## Reglas Jira

- Cada Story contiene descripción, criterios, puntos y responsable.
- Las Tasks describen implementación, prueba y documentación.
- Todo Bug indica pasos, resultado esperado y evidencia.
- Cada tarjeta Terminada enlaza commit, prueba y evidencia.
- La aceptación del Product Owner se registra en Sprint Review.
