from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Sprint 4" / "10 Registro Jira Sprint Backlog 4.pdf"

NAVY = colors.HexColor("#123B35")
GREEN = colors.HexColor("#0E6B5D")
MINT = colors.HexColor("#EAF5F1")
GOLD = colors.HexColor("#D6A536")
INK = colors.HexColor("#24312E")
MUTED = colors.HexColor("#60706B")
LINE = colors.HexColor("#D7E3DF")
PALE = colors.HexColor("#F6F9F8")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleSIGAA", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=NAVY, alignment=TA_LEFT, spaceAfter=8))
styles.add(ParagraphStyle(name="SubtitleSIGAA", parent=styles["Normal"], fontName="Helvetica", fontSize=10.5, leading=15, textColor=MUTED, spaceAfter=16))
styles.add(ParagraphStyle(name="HeadingSIGAA", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=GREEN, spaceBefore=9, spaceAfter=7))
styles.add(ParagraphStyle(name="BodySIGAA", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.4, leading=14, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="SmallSIGAA", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.8, leading=10, textColor=INK))
styles.add(ParagraphStyle(name="SmallBoldSIGAA", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=7.8, leading=10, textColor=colors.white, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="MetricSIGAA", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=20, leading=22, textColor=NAVY, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="MetricLabelSIGAA", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=10, textColor=MUTED, alignment=TA_CENTER))


def p(text, style="BodySIGAA"):
    return Paragraph(text, styles[style])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 15 * mm, 192 * mm, 15 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 10 * mm, "SIGAA - Registro de gestión ágil")
    canvas.drawRightString(192 * mm, 10 * mm, f"Página {doc.page}")
    canvas.restoreState()


def metric(value, label):
    box = Table([[p(str(value), "MetricSIGAA")], [p(label, "MetricLabelSIGAA")]], colWidths=[39 * mm])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("TOPPADDING", (0, 0), (-1, 0), 7),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 7),
    ]))
    return box


def backlog_table():
    rows = [
        ["Jira", "ID", "Historia", "Pts", "Estado Jira"],
        ["SCRUM-31", "PB-019", "Registro de asistencia", "8", "Terminada"],
        ["SCRUM-32", "PB-020", "Tres reglas explicables de alerta", "8", "Terminada"],
        ["SCRUM-33", "PB-021", "Bandeja y dashboard inicial de alertas", "8", "Terminada"],
        ["SCRUM-49", "PB-037", "Justificaciones por Inspectoría", "5", "Terminada"],
        ["SCRUM-34", "PB-022", "Entrega de avance Fase 2", "5", "En revisión"],
    ]
    data = [[p(cell, "SmallBoldSIGAA" if r == 0 else "SmallSIGAA") for cell in row] for r, row in enumerate(rows)]
    tbl = Table(data, colWidths=[22 * mm, 20 * mm, 78 * mm, 12 * mm, 30 * mm], repeatRows=1)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (3, 1), (3, -1), "CENTER"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PALE]),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ]))
    return tbl


def status_table():
    rows = [
        ["Comprobación", "Resultado"],
        ["Consulta de Jira", "sprint = 36"],
        ["Historias encontradas", "5 de 5"],
        ["Puntos comprometidos", "34"],
        ["Puntos terminados", "29"],
        ["Puntos en revisión", "5"],
        ["Fecha de verificación", "15 de octubre de 2026"],
    ]
    data = [[p(cell, "SmallBoldSIGAA" if r == 0 else "SmallSIGAA") for cell in row] for r, row in enumerate(rows)]
    tbl = Table(data, colWidths=[65 * mm, 85 * mm], repeatRows=1)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, MINT]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return tbl


story = [
    p("SIGAA", "TitleSIGAA"),
    p("Registro Jira del Sprint Backlog 4", "HeadingSIGAA"),
    p("Evidencia de configuración, trazabilidad y estado del trabajo en Jira al 15 de octubre de 2026.", "SubtitleSIGAA"),
    Table([[metric("5", "historias asignadas"), metric("34", "puntos comprometidos"), metric("29", "puntos terminados"), metric("5", "puntos en revisión")]], colWidths=[41 * mm] * 4, hAlign="LEFT"),
    Spacer(1, 10 * mm),
    p("Configuración del sprint", "HeadingSIGAA"),
    p("<b>Nombre:</b> Sprint 4 - Asistencia y alertas<br/><b>Periodo:</b> 5 al 17 de octubre de 2026<br/><b>Objetivo:</b> Registrar asistencia, gestionar justificaciones y generar alertas explicables, junto con el avance de Fase 2."),
    p("La consulta directa de Jira por el identificador interno del sprint (<b>sprint = 36</b>) devuelve las cinco historias comprometidas. Jira muestra en el backlog solamente la historia que continúa abierta; las cuatro historias terminadas permanecen asociadas al sprint y aparecen en la consulta completa."),
    Spacer(1, 4 * mm),
    p("Sprint Backlog registrado", "HeadingSIGAA"),
    backlog_table(),
    Spacer(1, 8 * mm),
    p("Criterio de estado", "HeadingSIGAA"),
    p("Las historias SCRUM-31, SCRUM-32, SCRUM-33 y SCRUM-49 están en estado <b>Terminada</b>. La entrega SCRUM-34 permanece <b>En revisión</b> porque requiere aceptación del Product Owner antes del cierre formal del sprint."),
    PageBreak(),
    p("Trazabilidad y control", "TitleSIGAA"),
    p("Cómo se dejó registrado el Sprint 4", "SubtitleSIGAA"),
    status_table(),
    Spacer(1, 9 * mm),
    p("Procedimiento aplicado", "HeadingSIGAA"),
    p("1. Se creó el sprint en el backlog de Jira y se corrigió su nombre a <b>Sprint 4 - Asistencia y alertas</b>."),
    p("2. Se configuró el periodo oficial del 5 al 17 de octubre de 2026 y se registró el objetivo del sprint."),
    p("3. Se asociaron individualmente las cinco historias al sprint, conservando sus estimaciones de 8, 8, 8, 5 y 5 puntos."),
    p("4. Se actualizaron los estados según la evidencia técnica: cuatro historias terminadas y la entrega de avance en revisión."),
    p("5. Se verificó el conjunto completo mediante la búsqueda JQL <b>sprint = 36</b>, que mostró cinco resultados."),
    Spacer(1, 5 * mm),
    p("Resultado de control", "HeadingSIGAA"),
    p("El Sprint Backlog 4 quedó separado de los otros sprints y contiene únicamente el trabajo comprometido para asistencia, justificaciones, alertas y entrega de avance. La trazabilidad entre los identificadores internos PB y las claves Jira SCRUM queda explícita en la tabla de la página anterior."),
    Spacer(1, 7 * mm),
    Table([[p("Estado de cierre", "SmallBoldSIGAA")], [p("Sprint en revisión. No debe cerrarse hasta recibir la aprobación del Product Owner sobre SCRUM-34 / PB-022.", "BodySIGAA")]], colWidths=[162 * mm], style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GOLD),
        ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#FFF8E8")),
        ("BOX", (0, 0), (-1, -1), 0.8, GOLD),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ])),
]

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=20 * mm,
    leftMargin=20 * mm,
    topMargin=20 * mm,
    bottomMargin=22 * mm,
    title="Registro Jira Sprint Backlog 4",
    author="Equipo SIGAA",
)
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
