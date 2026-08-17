# Marco de trabajo Scrum

## 1. Propósito

Scrum se utilizará para inspeccionar y adaptar el producto mediante incrementos utilizables. No reemplaza el análisis de arquitectura, seguridad ni operación: esos trabajos se incorporan al mismo Product Backlog y a la Definition of Done.

## 2. Scrum Team propuesto

| Responsabilidad | Cuenta por | Estado |
|---|---|---|
| Product Owner | Valor, orden del Product Backlog, objetivo de producto y aceptación | Persona pendiente |
| Scrum Master | Efectividad de Scrum, facilitación y remoción de impedimentos | Persona pendiente |
| Developers | Diseño, desarrollo, datos, IA, pruebas, seguridad, UX y operación | Equipo pendiente |

Un tamaño inicial de 5 a 7 personas es un supuesto de planificación, no un requisito. Las responsabilidades pueden ser multidisciplinarias, pero deben tener dueños claros.

## 3. Cadencia propuesta

- Sprints de dos semanas.
- Sprint Planning: máximo 4 horas.
- Daily Scrum: 15 minutos.
- Product Backlog Refinement: una o dos sesiones semanales; actividad continua.
- Sprint Review: máximo 2 horas con stakeholders y demostración del incremento.
- Sprint Retrospective: máximo 90 minutos.

La Sprint Review no es una aprobación tardía: el Product Owner colabora durante todo el Sprint.

## 4. Objetivo de producto inicial

Habilitar a una inmobiliaria piloto para publicar inventario vigente, capturar y gestionar demanda y atender consultas mediante IA con continuidad humana, trazabilidad y operación segura.

## 5. Artefactos y compromisos

- **Product Backlog / Product Goal:** única lista ordenada de trabajo orientada al objetivo.
- **Sprint Backlog / Sprint Goal:** trabajo seleccionado y plan adaptable del Sprint.
- **Increment / Definition of Done:** resultado integrado, verificable y potencialmente liberable.

## 6. Definition of Ready (política de refinamiento)

Scrum no exige una Definition of Ready, pero el equipo usará esta lista para reducir incertidumbre. No debe convertirse en una barrera administrativa.

Una historia candidata al Sprint:

- expresa actor, necesidad y valor;
- tiene criterios de aceptación observables;
- identifica dependencias, datos, permisos y riesgos relevantes;
- es suficientemente pequeña para completarse en un Sprint;
- cuenta con diseño o spike cuando la incertidumbre lo requiere;
- puede estimarse por el equipo;
- no contiene una decisión externa crítica sin responsable y fecha.

## 7. Definition of Done

Un ítem está terminado cuando, según corresponda:

- cumple sus criterios de aceptación y fue aceptado en el flujo del equipo;
- código y configuración están revisados e integrados;
- pruebas unitarias, integración, contrato y E2E críticas pasan;
- autorización, privacidad, errores y observabilidad fueron consideradas;
- no contiene secretos ni defectos críticos/altos conocidos;
- migraciones y rollback están preparados y probados;
- documentación técnica, operativa y de usuario está actualizada;
- el incremento está desplegado en staging y es demostrable;
- el Product Owner puede decidir liberarlo sin trabajo técnico oculto.

## 8. Estimación y capacidad

- Usar puntos relativos para complejidad, incertidumbre y esfuerzo; no convertirlos en horas ni medir desempeño individual.
- Las primeras estimaciones son hipótesis. La velocidad solo se usa después de varios Sprints del mismo equipo.
- Reservar capacidad explícita para defectos, deuda, seguridad y descubrimiento cuando corresponda.
- Dividir verticalmente por valor; evitar Sprints separados solo por capas técnicas.

## 9. Gestión del backlog

- El Product Owner ordena por valor, riesgo, aprendizaje y dependencia.
- `Must/Should/Could/Won't` ayuda a conversar sobre release; el orden del backlog sigue siendo único.
- Todo defecto, deuda relevante, trabajo de infraestructura o cumplimiento debe ser visible.
- Los cambios urgentes se negocian contra el Sprint Goal; no se agregan silenciosamente.
- Un spike produce evidencia y decisión, no funcionalidad de producción.

## 10. Métricas saludables

- Cumplimiento del Sprint Goal.
- Lead time y cycle time por tipo de trabajo.
- Throughput y trabajo en curso.
- Defectos escapados y tiempo de recuperación.
- Frecuencia de despliegue y tasa de fallos de cambio.
- Tendencia de valor de producto: respuesta, conversión, vigencia y satisfacción.

La velocidad no se compara entre equipos ni se utiliza como meta.

## 11. Sprint 0: descubrimiento habilitante

No se plantea como una fase extensa antes de entregar valor. Su objetivo, con timebox máximo de dos semanas, es despejar los riesgos que impiden comenzar:

1. confirmar Product Owner, usuarios, jurisdicción, alcance y métrica base;
2. mapear el flujo actual desde captación hasta cierre;
3. decidir CRM propio o integrado y canal inicial;
4. validar prototipo del flujo principal con usuarios;
5. ejecutar spikes de IA, identidad e infraestructura;
6. acordar arquitectura, seguridad, DoD y estrategia de ambientes;
7. refinar historias suficientes para el primer Sprint de entrega.
