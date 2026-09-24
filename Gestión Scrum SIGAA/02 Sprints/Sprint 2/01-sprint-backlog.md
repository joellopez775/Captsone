# Sprint Backlog 2 — reconstrucción documental

Periodo: 7 al 19 de septiembre de 2026.
Fecha de regularización: 24 de septiembre de 2026.

Este backlog se reconstruye desde el Product Backlog, el incremento disponible y
la Sprint Review 2. No se presenta como una captura contemporánea del compromiso.

## Objetivo reconstruido

Establecer la base de seguridad, estructura escolar y ejecución reproducible que
permita conectar la demostración con persistencia real.

| Historia | Puntos | Resultado observado al cierre | Disposición |
|---|---:|---|---|
| PB-011 Autenticación segura | 8 | Login demostrativo; no cumple seguridad productiva | Arrastrada a Sprint 3 |
| PB-012 Roles y permisos | 8 | Roles simulados; falta RBAC en API | Arrastrada a Sprint 3 |
| PB-013 Estructura escolar | 8 | Modelo físico adelantado | Revisión y continuidad |
| PB-014 Entorno Docker reproducible | 5 | Configuración y manual disponibles | En revisión |

Total reconstruido: 29 puntos.

## Trabajo técnico identificado

- Diseñar sesión segura, expiración y cierre de sesión.
- Definir y aplicar permisos por rol y alcance.
- Consolidar establecimiento, niveles, cursos y asignaturas.
- Verificar web, API y PostgreSQL mediante Docker.
- Probar desde un clon limpio y registrar evidencia.

## Resultado

El objetivo no se considera cumplido completamente: Docker y el modelo escolar
redujeron riesgo, pero PB-011 y PB-012 permanecieron abiertas. La decisión final
debe ser ratificada por el Product Owner en la Review correspondiente.
