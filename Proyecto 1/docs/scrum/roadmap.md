# Roadmap y plan de releases

## 1. Advertencia de planificación

Este roadmap ordena resultados y riesgos; no es una promesa de fechas. La duración real depende del equipo, integraciones, alcance aprobado y velocidad observada. Se asumen Sprints de dos semanas y un equipo multidisciplinario estable.

## 2. Roadmap orientado a resultados

| Horizonte | Objetivo | Evidencia de salida |
|---|---|---|
| Descubrimiento habilitante | Confirmar problema, usuarios, restricciones y decisiones críticas | Flujo validado, métricas base, ADR iniciales y backlog refinado |
| Release 1 — Inventario | Gestionar y publicar propiedades con seguridad | Propiedad creada, validada, publicada y retirada con auditoría |
| Release 2 — Captación y CRM | Convertir visitas web en seguimiento comercial | Consulta vinculada a contacto/lead, asignación, actividad y embudo |
| Release 3 — IA controlada | Atender y derivar con datos verificables | Chat evaluado, herramientas restringidas, consentimiento y handoff |
| Release 4 — Piloto operacional | Operar con usuarios reales y medir valor | SLO, recuperación, capacitación, métricas y feedback del piloto |
| Evolución | Optimizar conversión y sumar canales/integraciones | Decisiones basadas en datos del piloto |

## 3. Hipótesis de Sprint Goals

| Sprint | Objetivo hipotético | Historias candidatas |
|---:|---|---|
| 0 | Reducir incertidumbre suficiente para comenzar una entrega segura | US-001, US-002 y spikes prioritarios |
| 1 | Permitir acceso seguro y crear una propiedad válida | US-003, US-004, US-006, US-007 |
| 2 | Publicar una ficha de propiedad con imágenes | US-005, US-008, US-009, US-011 |
| 3 | Encontrar propiedades y convertir una consulta en lead | US-010, US-012, US-013 |
| 4 | Dar seguimiento comercial con asignación, actividades y oportunidades | US-014, US-015, US-016 |
| 5 | Responder consultas usando únicamente inventario publicado | US-017, US-018, parte de US-021 |
| 6 | Registrar preferencias y derivar a un ejecutivo con contexto | US-019, US-020, completar US-021 |
| 7 | Preparar piloto medible y recuperable | US-022, US-023, US-024 y hardening |

La selección final se hace en cada Sprint Planning según capacidad, dependencias y Definition of Done. Algunas historias deberán dividirse durante refinamiento.

## 4. Gates de release

### Release interno

- Flujo demostrable en staging.
- Pruebas críticas aprobadas.
- Sin vulnerabilidades críticas conocidas.
- Datos sintéticos y observabilidad mínima.

### Piloto controlado

- Alcance, usuarios y soporte definidos.
- Consentimiento, privacidad y términos aprobados por responsables competentes.
- Evaluación IA sobre umbral acordado.
- Backup restaurado con evidencia.
- Runbooks, alertas y rollback probados.
- Capacitación y canal de feedback disponibles.

### Producción ampliada

- Métricas del piloto revisadas.
- Capacidad y SLO ajustados.
- Riesgos críticos aceptados o mitigados.
- Plan de continuidad y soporte financiado.
- Backlog de hallazgos priorizado.

## 5. Primer Sprint Review esperado

Demostrar, con un flujo navegable y no solo diapositivas, que un usuario autorizado puede ingresar, crear una propiedad con validaciones y dejarla lista para publicación. Recoger feedback sobre lenguaje, campos, permisos y carga operativa para reordenar el backlog.
