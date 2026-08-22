export const prototypeData = {
  meta: { synthetic: true, period: "2026 · Segundo semestre", school: "Liceo Bicentenario Los Arrayanes", updatedAt: "2026-08-28T12:00:00.000Z" },
  metrics: { activeStudents: 128, averageAttendance: 87, openAlerts: 12, activeFollowUps: 7 },
  students: [
    { id: "est-001", name: "Camila Soto", identifier: "EST-2026-001", course: "2° Medio A", level: "Enseñanza Media", attendance: 68, average: 4.1, risk: "high", alertIds: ["alt-001", "alt-002"] },
    { id: "est-002", name: "Diego Morales", identifier: "EST-2026-002", course: "2° Medio A", level: "Enseñanza Media", attendance: 74, average: 5.2, risk: "medium", alertIds: ["alt-003"] },
    { id: "est-003", name: "Valentina Rojas", identifier: "EST-2026-003", course: "2° Medio A", level: "Enseñanza Media", attendance: 93, average: 6.1, risk: "low", alertIds: [] },
    { id: "est-004", name: "Tomás Herrera", identifier: "EST-2026-004", course: "2° Medio B", level: "Enseñanza Media", attendance: 81, average: 3.8, risk: "high", alertIds: ["alt-004"] },
    { id: "est-005", name: "Fernanda Silva", identifier: "EST-2026-005", course: "2° Medio B", level: "Enseñanza Media", attendance: 89, average: 5.7, risk: "low", alertIds: [] },
  ],
  teacherWorkspace: {
    teacher: { id: "teacher-001", name: "Daniela Rojas", title: "Profesora de Matemática · Profesora jefe", headCourseId: "course-2a" },
    assignments: [
      { id: "ca-mat-2a", courseId: "course-2a", courseName: "2° Medio A", subjectCode: "MAT-2M", subjectName: "Matemática", room: "Sala 12", schedule: "Lun y mié · 08:00", studentIds: ["est-001", "est-002", "est-003"], isHeadTeacher: true },
      { id: "ca-mat-2b", courseId: "course-2b", courseName: "2° Medio B", subjectCode: "MAT-2M", subjectName: "Matemática", room: "Sala 14", schedule: "Mar y jue · 10:15", studentIds: ["est-004", "est-005"], isHeadTeacher: false },
      { id: "ca-tut-2a", courseId: "course-2a", courseName: "2° Medio A", subjectCode: "ORI-2M", subjectName: "Orientación", room: "Sala 12", schedule: "Vie · 09:30", studentIds: ["est-001", "est-002", "est-003"], isHeadTeacher: true },
    ],
    classSessions: [
      { id: "class-001", courseSubjectId: "ca-mat-2a", date: "2026-08-28", startTime: "08:00", block: "Bloque 1", title: "Funciones lineales", objective: "Representar y analizar funciones lineales en contextos cotidianos.", status: "completed", attendance: { "est-001": "present", "est-002": "late", "est-003": "present" } },
      { id: "class-002", courseSubjectId: "ca-mat-2b", date: "2026-08-28", startTime: "10:15", block: "Bloque 3", title: "Pendiente de una recta", objective: "Calcular e interpretar la pendiente usando tablas y gráficos.", status: "completed", attendance: { "est-004": "absent", "est-005": "present" } },
      { id: "class-003", courseSubjectId: "ca-mat-2a", date: "2026-09-02", startTime: "08:00", block: "Bloque 1", title: "Sistemas de ecuaciones", objective: "Resolver sistemas de dos ecuaciones mediante representación gráfica.", status: "planned", attendance: {} },
    ],
    evaluations: [
      { id: "eval-001", courseSubjectId: "ca-mat-2a", name: "Control de álgebra", date: "2026-08-20", weight: 20, grades: { "est-001": 5.6, "est-002": 4.9, "est-003": 6.4 } },
      { id: "eval-002", courseSubjectId: "ca-mat-2a", name: "Guía de funciones", date: "2026-08-27", weight: 30, grades: { "est-001": 5.1, "est-002": 5.5, "est-003": 6.0 } },
      { id: "eval-003", courseSubjectId: "ca-mat-2b", name: "Control de álgebra", date: "2026-08-22", weight: 25, grades: { "est-004": 3.8, "est-005": 5.9 } },
    ],
    annotations: [
      { id: "note-001", courseId: "course-2a", studentId: "est-003", courseSubjectId: "ca-mat-2a", type: "positive", category: "Participación", text: "Explicó su estrategia de resolución y apoyó respetuosamente al grupo.", author: "Daniela Rojas", createdAt: "2026-08-28T12:10:00.000Z" },
      { id: "note-002", courseId: "course-2b", studentId: "est-004", courseSubjectId: "ca-mat-2b", type: "negative", category: "Responsabilidad", text: "No presentó la guía de trabajo después de dos recordatorios.", author: "Daniela Rojas", createdAt: "2026-08-27T15:30:00.000Z" },
    ],
  },
  studentPortal: {
    studentId: "est-001",
    course: "2° Medio A",
    schoolYearProgress: 68,
    completedAssessments: 18,
    totalAssessments: 26,
    courses: [
      { code: "MAT-2M", name: "Matemática", professor: "Paula Contreras", attendance: 82, average: 5.2, color: "sage", grades: [{ label: "Control de álgebra", weight: 20, value: 5.6 }, { label: "Guía de funciones", weight: 30, value: 5.1 }, { label: "Prueba de unidad", weight: 50, value: 5.1 }] },
      { code: "LEN-2M", name: "Lengua y Literatura", professor: "Cristóbal Reyes", attendance: 76, average: 4.5, color: "blue", grades: [{ label: "Ensayo argumentativo", weight: 25, value: 5.0 }, { label: "Control de lectura", weight: 25, value: 4.7 }, { label: "Prueba de unidad", weight: 50, value: 4.1 }] },
      { code: "HIS-2M", name: "Historia, Geografía y Cs. Sociales", professor: "Francisca Mella", attendance: 68, average: 3.8, color: "gold", grades: [{ label: "Línea de tiempo", weight: 30, value: 4.8 }, { label: "Control de fuentes", weight: 20, value: 3.2 }, { label: "Prueba de unidad", weight: 50, value: 3.4 }] },
      { code: "CIE-2M", name: "Ciencias Naturales", professor: "Andrés Navarro", attendance: 61, average: 3.1, color: "clay", grades: [{ label: "Informe de laboratorio", weight: 25, value: 4.0 }, { label: "Actividad experimental", weight: 25, value: 3.4 }, { label: "Prueba de unidad", weight: 50, value: 2.5 }] },
    ],
    upcoming: [
      { day: "02", month: "SEP", title: "Guía de funciones", course: "Matemática", type: "Entrega" },
      { day: "05", month: "SEP", title: "Prueba de unidad", course: "Ciencias Naturales", type: "Evaluación" },
      { day: "08", month: "SEP", title: "Exposición grupal", course: "Historia", type: "Presentación" },
    ],
    messages: [
      { title: "Plan de acompañamiento disponible", detail: "Tu profesor jefe dejó recomendaciones para organizar tus próximas evaluaciones." },
    ],
  },
  alerts: [
    { id: "alt-001", studentId: "est-001", severity: "high", status: "open", title: "Asistencia bajo umbral", rule: "ASISTENCIA_MENOR_75_V1", evidence: "68% observado / 75% mínimo", createdAt: "2026-08-27T14:30:00.000Z" },
    { id: "alt-002", studentId: "est-001", severity: "medium", status: "assigned", title: "Promedio en zona preventiva", rule: "PROMEDIO_MENOR_45_V1", evidence: "4,1 observado / 4,5 preventivo", createdAt: "2026-08-26T10:00:00.000Z" },
    { id: "alt-003", studentId: "est-002", severity: "medium", status: "following", title: "Asistencia en descenso", rule: "TENDENCIA_ASISTENCIA_V1", evidence: "-11 puntos porcentuales en 3 semanas", createdAt: "2026-08-25T09:15:00.000Z" },
    { id: "alt-004", studentId: "est-004", severity: "high", status: "open", title: "Promedio bajo aprobación", rule: "PROMEDIO_MENOR_40_V1", evidence: "3,8 observado / 4,0 mínimo", createdAt: "2026-08-28T08:45:00.000Z" },
  ],
  interventions: [
    { id: "int-001", studentId: "est-001", alertId: "alt-002", type: "Contacto apoderado", note: "Se acordó revisar la planificación de evaluaciones.", author: "Profesor jefe demo", createdAt: "2026-08-27T16:00:00.000Z" },
    { id: "int-002", studentId: "est-002", alertId: "alt-003", type: "Seguimiento", note: "Caso derivado a UTP para revisión preventiva.", author: "UTP demo", createdAt: "2026-08-26T13:20:00.000Z" },
  ],
};
