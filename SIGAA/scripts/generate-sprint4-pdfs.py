#!/usr/bin/env python3
"""Genera el expediente PDF independiente del Sprint 4 de SIGAA."""

from pathlib import Path
from datetime import date
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, HRFlowable, Flowable,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Sprint 4"
OUT.mkdir(parents=True, exist_ok=True)

FOREST = colors.HexColor("#153C2E")
GREEN = colors.HexColor("#2F6B4D")
SAGE = colors.HexColor("#DDE8DF")
GOLD = colors.HexColor("#C8A85A")
PAPER = colors.HexColor("#F7F5EF")
INK = colors.HexColor("#23332C")
MUTED = colors.HexColor("#67746D")
RED = colors.HexColor("#984F43")
LINE = colors.HexColor("#D8DDD8")
BLUE = colors.HexColor("#496A83")

try:
    pdfmetrics.registerFont(TTFont("Inter", "/System/Library/Fonts/Supplemental/Arial.ttf"))
    pdfmetrics.registerFont(TTFont("Inter-Bold", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"))
except Exception:
    pass

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", parent=styles["Normal"], fontName="Inter-Bold", fontSize=9, leading=12, textColor=GOLD, spaceAfter=10, tracking=1.4))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Inter-Bold", fontSize=31, leading=34, textColor=colors.white, spaceAfter=12))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["Normal"], fontName="Inter", fontSize=12, leading=18, textColor=colors.HexColor("#D8E3DC")))
styles.add(ParagraphStyle(name="H1x", parent=styles["Heading1"], fontName="Inter-Bold", fontSize=19, leading=23, textColor=FOREST, spaceBefore=4, spaceAfter=12))
styles.add(ParagraphStyle(name="H2x", parent=styles["Heading2"], fontName="Inter-Bold", fontSize=12, leading=16, textColor=GREEN, spaceBefore=12, spaceAfter=7))
styles.add(ParagraphStyle(name="Bodyx", parent=styles["BodyText"], fontName="Inter", fontSize=9, leading=14, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="Smallx", parent=styles["BodyText"], fontName="Inter", fontSize=7.5, leading=11, textColor=MUTED))
styles.add(ParagraphStyle(name="Callout", parent=styles["BodyText"], fontName="Inter-Bold", fontSize=9, leading=14, textColor=FOREST, backColor=SAGE, borderPadding=10, borderRadius=5, spaceBefore=6, spaceAfter=10))
styles.add(ParagraphStyle(name="TableHeader", parent=styles["Normal"], fontName="Inter-Bold", fontSize=7.2, leading=9, textColor=colors.white))
styles.add(ParagraphStyle(name="TableCell", parent=styles["Normal"], fontName="Inter", fontSize=7, leading=9.5, textColor=INK))
styles.add(ParagraphStyle(name="TableCellBold", parent=styles["Normal"], fontName="Inter-Bold", fontSize=7, leading=9.5, textColor=INK))


def p(text, style="Bodyx"):
    return Paragraph(text, styles[style])


def bullets(items):
    result = []
    for item in items:
        result.extend([Paragraph(f"• {item}", styles["Bodyx"]), Spacer(1, 1.5 * mm)])
    return result


def section(title, body=None):
    result = [p(title, "H1x")]
    if body:
        result.append(p(body))
    return result


def table(rows, widths=None, repeat=1, font_size=7):
    cooked = []
    for row_index, row in enumerate(rows):
        cooked.append([Paragraph(str(cell), styles["TableHeader"] if row_index == 0 else styles["TableCell"]) for cell in row])
    t = Table(cooked, colWidths=widths, repeatRows=repeat, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), FOREST),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), .45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PAPER]),
    ]))
    return t


class BurndownChart(Flowable):
    def __init__(self, width=170 * mm, height=78 * mm):
        super().__init__()
        self.width, self.height = width, height
        self.dates = ["05", "07", "09", "11", "13", "15", "17"]
        self.ideal = [34, 29, 23, 17, 11, 6, 0]
        self.actual = [34, 34, 34, 34, 26, 5, 0]

    def draw(self):
        c = self.canv
        left, bottom, width, height = 13 * mm, 12 * mm, self.width - 20 * mm, self.height - 20 * mm
        c.setStrokeColor(LINE)
        for value in [0, 10, 20, 30, 34]:
            y = bottom + (value / 34) * height
            c.line(left, y, left + width, y)
            c.setFont("Inter", 6.5); c.setFillColor(MUTED); c.drawRightString(left - 3 * mm, y - 2, str(value))
        for i, label in enumerate(self.dates):
            x = left + i * width / (len(self.dates) - 1)
            c.setFillColor(MUTED); c.drawCentredString(x, bottom - 5 * mm, label)
        def line(values, color, dashed=False):
            c.setStrokeColor(color); c.setLineWidth(2)
            c.setDash(4, 3) if dashed else c.setDash()
            pts = []
            for i, value in enumerate(values):
                pts.append((left + i * width / (len(values) - 1), bottom + (value / 34) * height))
            for a, b in zip(pts, pts[1:]): c.line(a[0], a[1], b[0], b[1])
            c.setDash()
            for x, y in pts: c.setFillColor(color); c.circle(x, y, 2.2, fill=1, stroke=0)
        line(self.ideal, GOLD, True); line(self.actual, GREEN)
        c.setFont("Inter-Bold", 7); c.setFillColor(GREEN); c.drawString(left, self.height - 5 * mm, "Real / proyectado al cierre")
        c.setFillColor(GOLD); c.drawString(left + 60 * mm, self.height - 5 * mm, "Ideal")
        c.setFillColor(MUTED); c.setFont("Inter", 6.5); c.drawRightString(left + width, bottom - 5 * mm, "octubre 2026")


def footer(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setStrokeColor(LINE); canvas_obj.line(20 * mm, 15 * mm, A4[0] - 20 * mm, 15 * mm)
    canvas_obj.setFont("Inter", 7); canvas_obj.setFillColor(MUTED)
    canvas_obj.drawString(20 * mm, 10 * mm, "SIGAA · Sprint 4 · Datos de demostración sintéticos")
    canvas_obj.drawRightString(A4[0] - 20 * mm, 10 * mm, f"Página {doc.page}")
    canvas_obj.restoreState()


def cover(title, subtitle, code):
    return [
        Table([[p("SIGAA", "CoverTitle")], [p("GESTIÓN ESCOLAR INTELIGENTE", "CoverKicker")]], colWidths=[165 * mm], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), FOREST), ("LEFTPADDING", (0, 0), (-1, -1), 18),
            ("RIGHTPADDING", (0, 0), (-1, -1), 18), ("TOPPADDING", (0, 0), (-1, 0), 18),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ])),
        Spacer(1, 24 * mm), p(code.upper(), "CoverKicker"), p(title, "H1x"), p(subtitle),
        Spacer(1, 18 * mm), HRFlowable(width="100%", thickness=2, color=GOLD), Spacer(1, 6 * mm),
        table([["Periodo", "Estado", "Responsable de aceptación"], ["5–17 octubre 2026", "Cierre técnico; aprobación pendiente", "Joel López · Product Owner"]], [52 * mm, 58 * mm, 55 * mm]),
        Spacer(1, 16 * mm), p("Emitido el 15 de octubre de 2026 · Fase 2, semana 10", "Smallx"), PageBreak(),
    ]


def build(filename, title, subtitle, code, story, pagesize=A4):
    path = OUT / filename
    doc = SimpleDocTemplate(str(path), pagesize=pagesize, rightMargin=20 * mm, leftMargin=20 * mm, topMargin=20 * mm, bottomMargin=22 * mm, title=title, author="Equipo SIGAA")
    doc.build(cover(title, subtitle, code) + story, onFirstPage=footer, onLaterPages=footer)
    return path


scope_rows = [
    ["ID", "Historia", "Puntos", "Responsable", "Revisión", "Estado al 15-10"],
    ["PB-019", "Registrar asistencia por clase", "8", "Joel", "Agustín", "Terminada"],
    ["PB-020", "Aplicar tres reglas explicables de alerta", "8", "Agustín", "Matías", "Terminada"],
    ["PB-021", "Bandeja docente de alertas", "8", "Matías", "Joel", "Terminada"],
    ["PB-022", "Entregar avance de Fase 2", "5", "Equipo", "Product Owner", "En revisión"],
    ["PB-037", "Gestionar justificaciones por Inspectoría", "5", "Equipo", "Revisión cruzada", "Terminada"],
]

planning = section("Objetivo del Sprint", "Entregar un incremento demostrable que permita registrar asistencia, justificar ausencias y convertir señales académicas en alertas claras para el docente, dejando preparado el avance exigido en Fase 2.")
planning += [p("Compromiso: 34 puntos distribuidos en cinco historias. El equipo mantiene participación equilibrada en programación, pruebas y documentación; los nombres indican el foco principal, no exclusividad.", "Callout"), table(scope_rows, [17*mm, 55*mm, 14*mm, 22*mm, 25*mm, 30*mm]), Spacer(1, 8*mm)]
planning += section("Forma de trabajo") + bullets([
    "Flujo: Seleccionada → En curso → En revisión → Terminada.",
    "Máximo tres historias simultáneas en curso; revisión cruzada antes de integrar.",
    "Una historia solo termina con código, prueba, documentación y evidencia reproducible.",
    "La Review demuestra el incremento; Joel López acepta o solicita ajustes como Product Owner.",
])
planning += section("Riesgos y respuesta") + [table([
    ["Riesgo", "Impacto", "Respuesta acordada"],
    ["Autenticación aún demostrativa", "No apto para datos reales", "Mantener datos sintéticos y no declarar producción"],
    ["Operaciones funcionales en memoria", "Cambios no sobreviven reinicio", "Dejar migración lista y conectar persistencia en siguiente incremento"],
    ["Falta de aprobación del PO", "Sprint no puede cerrarse formalmente", "Entregar dossier y registrar decisión de Joel"],
], [50*mm, 50*mm, 65*mm])]

backlog = section("Sprint Backlog comprometido", "Cada historia incluye valor, criterios verificables y evidencia esperada.") + [table(scope_rows, [17*mm, 55*mm, 14*mm, 22*mm, 25*mm, 30*mm]), Spacer(1, 8*mm)]
criteria = [
    ("PB-019 · Asistencia", ["El profesor solo opera clases y estudiantes asignados.", "Estados válidos: presente, ausente, atraso y justificada.", "El registro deja la clase realizada y conserva el detalle por estudiante."]),
    ("PB-020 · Reglas", ["Asistencia menor a 75% genera alerta alta.", "Promedio menor a 4,0 genera alerta alta.", "Asistencia menor a 80% más promedio menor a 4,5 genera alerta preventiva.", "Cada alerta muestra regla, umbral y valor observado."]),
    ("PB-021 · Bandeja", ["Permite filtrar alertas por severidad.", "Muestra estudiante, curso, estado y evidencia.", "Permite recalcular sin duplicar la misma regla para el mismo estudiante."]),
    ("PB-022 · Avance Fase 2", ["Resume alcance, arquitectura, avance y pruebas.", "Distingue prototipo de funcionalidades productivas.", "Queda versionado como PDF en el repositorio."]),
    ("PB-037 · Justificaciones", ["Solo se justifican ausencias registradas y dentro del alcance.", "Inspectoría/docente aprueba o rechaza con observación.", "Se conserva fecha, responsable y referencia de respaldo sin exponer el archivo."]),
]
for title, items in criteria:
    backlog += [p(title, "H2x")] + bullets(items)

board = section("Estado del Scrumboard", "Corte operativo: 15 de octubre de 2026. La columna Terminada acredita Definition of Done técnica; PB-022 espera la decisión del Product Owner.")
board += [table([
    ["Seleccionada", "En curso", "En revisión", "Terminada"],
    ["—", "—", "PB-022 · Avance Fase 2", "PB-019 · Asistencia<br/>PB-020 · Reglas<br/>PB-021 · Alertas<br/>PB-037 · Justificaciones"],
], [38*mm, 38*mm, 42*mm, 47*mm]), Spacer(1, 9*mm)]
board += section("Lectura del tablero") + bullets([
    "29 de 34 puntos (85,3%) cumplen la Definition of Done técnica.",
    "5 puntos están en revisión porque la entrega académica necesita aceptación del Product Owner.",
    "No hay trabajo oculto en curso: cualquier ajuste solicitado vuelve explícitamente a En curso.",
    "Al aprobar PB-022, el Sprint alcanza 34/34 puntos y puede cerrarse formalmente.",
])
board += section("Definition of Done aplicada") + [table([
    ["Control", "Resultado"], ["Criterios de aceptación", "Cubiertos y vinculados a pruebas"], ["Pruebas API", "Incluyen permisos, reglas y justificaciones"], ["Build web", "Interfaz compilable y responsive"], ["Base de datos", "Migración 006 preparada"], ["Documentación", "Nueve PDFs independientes"], ["Aprobación PO", "Pendiente"],
], [65*mm, 100*mm])]

burndown = section("Burndown del Sprint 4", "La línea real refleja el avance comprobable y proyecta cero puntos restantes el 17 de octubre únicamente si el Product Owner aprueba PB-022.")
burndown += [BurndownChart(), Spacer(1, 5*mm), table([
    ["Fecha", "Puntos restantes", "Cambio comprobable"],
    ["05-10", "34", "Inicio del Sprint"], ["09-10", "34", "Análisis y preparación técnica"], ["13-10", "26", "PB-019 terminada"], ["14-10", "10", "PB-020 y PB-021 terminadas"], ["15-10", "5", "PB-037 terminada; PB-022 en revisión"], ["17-10", "0 proyectado", "Cierre sujeto a aprobación del PO"],
], [28*mm, 35*mm, 102*mm])]
burndown += [p("Interpretación: el avance se concentró al final del Sprint. La mejora acordada es dividir las historias en tareas diarias más pequeñas y actualizar el tablero el mismo día para evitar una curva plana difícil de gestionar.", "Callout")]

dailies_rows = [["ID / fecha", "Avance comprobable", "Siguiente acción", "Impedimento / riesgo"]]
dailies_rows += [
    ["S4-D01 · 05-10", "Objetivo y alcance consolidados", "Desglosar PB-019", "Persistencia funcional pendiente"],
    ["S4-D02 · 06-10", "Estados de asistencia validados", "Probar alcance docente", "Login solo demo"],
    ["S4-D03 · 07-10", "Modelo de reglas revisado", "Definir evidencia visible", "Umbrales requieren validación escolar"],
    ["S4-D04 · 08-10", "Bandeja de alertas diseñada", "Conectar recálculo", "Datos sintéticos"],
    ["S4-D05 · 09-10", "Flujo de justificación definido", "Agregar revisión y trazabilidad", "Archivos reales fuera de alcance"],
    ["S4-D06 · 12-10", "Migración 006 preparada", "Completar API", "Base demo no persiste operaciones"],
    ["S4-D07 · 13-10", "PB-019 verificable", "Completar reglas y bandeja", "Sin bloqueo crítico"],
    ["S4-D08 · 14-10", "PB-020 y PB-021 verificables", "Cerrar justificaciones", "Revisión documental pendiente"],
    ["S4-D09 · 15-10", "PB-037 terminada; pruebas y PDFs", "Review del PO", "Aprobación de PB-022 pendiente"],
]
dailies = section("Registro Daily e impedimentos", "Estas entradas son una consolidación documental basada en el incremento y el repositorio. No atribuyen asistencia ni declaraciones personales no registradas.") + [table(dailies_rows, [28*mm, 50*mm, 42*mm, 45*mm]), Spacer(1, 8*mm)]
dailies += section("Impediment Log") + [table([
    ["ID", "Impedimento", "Impacto", "Responsable", "Estado / siguiente acción"],
    ["IMP-401", "Autenticación productiva no terminada", "No usar datos reales", "Joel", "Abierto · integrar sesión segura"],
    ["IMP-402", "Mutaciones aún en memoria", "No hay persistencia tras reinicio", "Matías", "Abierto · conectar repositorios PostgreSQL"],
    ["IMP-403", "Umbrales sin validación de establecimiento", "Reglas son hipótesis", "Agustín", "Abierto · validar con contraparte"],
    ["IMP-404", "Aceptación PO pendiente", "No se cierra PB-022", "Joel / PO", "Abierto · ejecutar Review"],
], [16*mm, 46*mm, 38*mm, 24*mm, 41*mm])]

release = section("Release candidata · v0.4.0-demo", "Incremento preparado para demostración local con Docker. No es una versión productiva ni debe tratar datos personales reales.")
release += section("Contenido") + bullets([
    "Registro de asistencia por clase para cursos asignados.",
    "Bandeja docente de justificaciones con aprobación o rechazo y observación.",
    "Tres reglas transparentes de riesgo y recálculo controlado.",
    "Bandeja de alertas con filtros, evidencia y acceso al contexto del estudiante.",
    "Migración PostgreSQL 006 con índices, vínculo a sesión y vista de bandeja.",
])
release += section("Cómo demostrar") + [table([
    ["Paso", "Acción", "Resultado esperado"],
    ["1", "docker compose up --build", "Web, API y PostgreSQL disponibles"],
    ["2", "Ingresar con docente@sigaa.demo", "Se abre el panel docente"],
    ["3", "Abrir Clases y asistencia", "Se puede completar una clase asignada"],
    ["4", "Abrir Justificaciones", "Se aprueba o rechaza con trazabilidad"],
    ["5", "Abrir Alertas y recalcular", "Se muestran tres reglas y evidencia"],
], [15*mm, 65*mm, 85*mm]), Spacer(1, 7*mm)]
release += section("Limitaciones conocidas") + bullets(["Inicio de sesión demostrativo; no hay tokens ni hash productivo.", "Las operaciones del prototipo usan memoria; PostgreSQL contiene el modelo pero falta integración completa.", "Los umbrales son configuraciones iniciales y deben validarse con un establecimiento."])

review = section("Sprint Review", "Guion y acta de revisión del incremento. Fecha propuesta: 16–17 de octubre de 2026.")
review += [p("Decisión solicitada al Product Owner: aceptar el incremento completo, aceptarlo con observaciones o devolver historias específicas a En curso.", "Callout")]
review += section("Demostración y criterios") + [table([
    ["Historia", "Evidencia", "Resultado técnico", "Decisión PO"],
    ["PB-019", "Clase, lista y estados de asistencia", "Cumple", "Pendiente"],
    ["PB-020", "Tres reglas, umbral y valor observado", "Cumple", "Pendiente"],
    ["PB-021", "Bandeja, filtros y recálculo", "Cumple", "Pendiente"],
    ["PB-037", "Solicitud, revisión, responsable y nota", "Cumple", "Pendiente"],
    ["PB-022", "Informe de avance Fase 2", "Preparado", "Pendiente"],
], [20*mm, 65*mm, 35*mm, 45*mm]), Spacer(1, 8*mm)]
review += section("Preguntas de aceptación") + bullets(["¿El flujo representa el trabajo real de un liceo o colegio?", "¿La evidencia explica por qué se genera cada alerta?", "¿La justificación protege el documento y conserva trazabilidad suficiente?", "¿Qué cambio es obligatorio antes del Sprint 5?"])
review += section("Acta para completar") + [table([["Resultado", "Marcar"], ["Aceptado sin observaciones", "□"], ["Aceptado con observaciones", "□"], ["Requiere ajustes", "□"]], [100*mm, 40*mm]), Spacer(1, 6*mm), p("Observaciones del Product Owner: ________________________________________________________________"), Spacer(1, 6*mm), p("Nombre y fecha: Joel López · ____________________")]

retro = section("Retrospectiva del Sprint 4", "La retrospectiva evalúa el proceso, no a las personas. Sus acciones se incorporan al Sprint 5.")
retro += section("Continuar") + bullets(["Criterios visibles antes de implementar.", "Pruebas de permisos junto con cada endpoint.", "Documentar las limitaciones del prototipo sin ocultarlas."])
retro += section("Empezar") + bullets(["Dividir historias de 8 puntos en tareas de uno o dos días.", "Actualizar Jira y el burndown el mismo día.", "Conectar una operación completa a PostgreSQL antes de ampliar el alcance."])
retro += section("Dejar de hacer") + bullets(["Concentrar pruebas y documentación al final.", "Usar términos técnicos sin explicar la acción concreta.", "Marcar una entrega académica como terminada sin aceptación del Product Owner."])
retro += section("Acciones medibles") + [table([
    ["Acción", "Responsable", "Fecha límite", "Cómo se verifica"],
    ["Persistir asistencia y justificaciones", "Matías + Joel", "23-10", "Datos sobreviven reinicio"],
    ["Validar umbrales con contraparte", "Agustín", "23-10", "Minuta o correo versionado"],
    ["Actualizar tablero a diario", "Equipo", "Cada día", "Historial Jira y burndown"],
    ["Cerrar Review con decisión PO", "Joel", "17-10", "Acta firmada o comentario explícito"],
], [63*mm, 30*mm, 25*mm, 47*mm])]

advance = section("Informe de avance · Fase 2, semana 10", "Corte al 15 de octubre de 2026, alineado al cronograma oficial del profesor.")
advance += [p("SIGAA es una aplicación web para liceos y colegios que centraliza información académica y genera alertas tempranas explicables. El desarrollo formal pertenece a Fase 2, iniciada el 31 de agosto.", "Callout")]
advance += section("Estado general") + [table([
    ["Área", "Avance comprobable", "Pendiente principal"],
    ["Interfaz", "Roles docente y estudiante; asistencia, notas, anotaciones, alertas y justificaciones", "Accesibilidad y validación con usuarios"],
    ["API", "Endpoints de demo con controles por rol y alcance", "Autenticación y persistencia productivas"],
    ["Base de datos", "Modelo escolar, profesor, estudiante, alertas y justificaciones", "Conectar casos de uso al repositorio PostgreSQL"],
    ["DevOps", "Docker Compose para web, API y PostgreSQL", "Despliegue estable y respaldo"],
    ["Gestión", "Backlog, sprints, criterios, pruebas y expediente PDF", "Aprobación PO y disciplina diaria en Jira"],
], [32*mm, 78*mm, 55*mm]), Spacer(1, 8*mm)]
advance += section("Resultados Sprint 4") + [table(scope_rows, [17*mm, 55*mm, 14*mm, 22*mm, 25*mm, 30*mm])]
advance += section("Pruebas y calidad") + bullets(["Pruebas API para recálculo de reglas y evidencia.", "Prueba de creación y resolución de justificación.", "Pruebas negativas de acceso sin rol docente.", "Compilación de la aplicación web y ejecución reproducible con Docker."])
advance += section("Próximo incremento · Sprint 5") + bullets(["PB-023 Crear casos de seguimiento.", "PB-024 Ficha integral del estudiante.", "PB-025 Notificaciones relevantes.", "Prioridad técnica transversal: persistencia real de la vertical de asistencia y alertas."])
advance += section("Conclusión") + [p("El proyecto cuenta con un incremento funcional demostrable y un modelo de datos coherente. No está listo para producción: usa credenciales y datos sintéticos, y varias operaciones aún viven en memoria. La decisión recomendada es aprobar el Sprint 4 como incremento de prototipo, con la condición de priorizar persistencia, autenticación y validación escolar en los siguientes sprints.")]

outputs = [
    build("01 Planificación Sprint 4.pdf", "Planificación del Sprint 4", "Objetivo, capacidad, alcance, responsabilidades, riesgos y reglas de trabajo.", "Documento 01", planning),
    build("02 Sprint Backlog 4.pdf", "Sprint Backlog 4", "Historias comprometidas, criterios de aceptación y estimación.", "Documento 02", backlog),
    build("03 Scrumboard Sprint 4.pdf", "Scrumboard del Sprint 4", "Estado verificable de cada historia al 15 de octubre de 2026.", "Documento 03", board),
    build("04 Burndown Sprint 4.pdf", "Burndown Chart del Sprint 4", "Evolución de puntos restantes y proyección de cierre.", "Documento 04", burndown),
    build("05 Daily e Impedimentos Sprint 4.pdf", "Daily Meeting e Impedimentos", "Seguimiento consolidado, riesgos activos y siguiente acción.", "Documento 05", dailies),
    build("06 Release Sprint 4.pdf", "Release del Sprint 4", "Contenido demostrable, pasos de ejecución y limitaciones conocidas.", "Documento 06", release),
    build("07 Review Sprint 4.pdf", "Sprint Review 4", "Guion, evidencia técnica y acta de aceptación del Product Owner.", "Documento 07", review),
    build("08 Retrospectiva Sprint 4.pdf", "Retrospectiva del Sprint 4", "Aprendizajes y acciones medibles para el Sprint 5.", "Documento 08", retro),
    build("09 Informe de Avance Fase 2.pdf", "Informe de Avance de Fase 2", "Estado del producto, calidad, riesgos y próximo incremento.", "Documento 09", advance),
]

for output in outputs:
    print(output)
