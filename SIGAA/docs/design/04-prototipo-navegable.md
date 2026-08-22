# Prototipo navegable - Sprint 1

Estado: implementado y verificado internamente con datos sintéticos; pendiente de prueba externa.

## Objetivo

Validar navegación, jerarquía de información y explicabilidad antes de construir autenticación, roles y persistencia productiva.

## Pantallas

1. Acceso demo: identifica el carácter sintético y permite ingresar sin credenciales reales.
2. Dashboard: indicadores, estudiantes prioritarios y alertas recientes.
3. Estudiantes: búsqueda y listado con asistencia, promedio y nivel de riesgo.
4. Ficha: contexto académico, indicadores, alertas e historial de intervención.
5. Alertas: bandeja filtrable con severidad, regla y evidencia.

## Navegación de prueba

1. Ingresar en modo demostración.
2. Abrir el dashboard y confirmar cuatro indicadores.
3. Seleccionar un estudiante prioritario.
4. Revisar la causa de su alerta.
5. Volver a la bandeja y filtrar por severidad.

## Criterios de aceptación internos

- Navegación sin recargar entre las vistas del prototipo.
- Diseño usable desde 320 px de ancho.
- Estados vacío, carga y error identificables.
- Datos rotulados como sintéticos.
- Cada alerta muestra regla, valor observado y umbral.
- La aplicación conserva el healthcheck de API y base de datos.

## Límites

- El acceso demo no autentica usuarios.
- Las acciones no persisten cambios productivos.
- Las reglas y umbrales son ejemplos por validar.
- No se utilizan datos personales reales.

## Prueba interna

| Caso | Resultado esperado | Estado |
|---|---|---|
| Ingreso demo | Mostrar dashboard | Aprobado en navegador |
| Buscar estudiante | Filtrar por nombre, identificador o sección | Aprobado: 1 resultado para Camila |
| Abrir ficha | Mostrar indicadores y alertas | Aprobado: evidencia de asistencia visible |
| Filtrar alertas | Reducir resultados visibles | Aprobado: 2 alertas de severidad alta |
| API no disponible | Mostrar aviso controlado | Cubierto por estado de error; prueba de interrupción pendiente |
| Vista móvil | Sin desbordamiento horizontal | Aprobado a 390 x 844 px |

## Evidencia de verificación

- Build web: aprobado con Vite.
- Pruebas API: 6 aprobadas, 0 fallidas.
- Docker Compose: web, API y PostgreSQL saludables.
- Consola del navegador: 0 errores durante los flujos revisados.
