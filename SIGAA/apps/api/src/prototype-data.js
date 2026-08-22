export const prototypeData = {
  meta: { synthetic: true, period: "2026-2", updatedAt: "2026-08-28T12:00:00.000Z" },
  metrics: { activeStudents: 128, averageAttendance: 87, openAlerts: 12, activeFollowUps: 7 },
  students: [
    { id: "est-001", name: "Camila Soto", identifier: "EST-2026-001", section: "PTY4614-001", program: "Ingeniería en Informática", attendance: 68, average: 4.1, risk: "high", alertIds: ["alt-001", "alt-002"] },
    { id: "est-002", name: "Diego Morales", identifier: "EST-2026-002", section: "PTY4614-001", program: "Ingeniería en Informática", attendance: 74, average: 5.2, risk: "medium", alertIds: ["alt-003"] },
    { id: "est-003", name: "Valentina Rojas", identifier: "EST-2026-003", section: "PTY4614-002", program: "Ingeniería en Informática", attendance: 93, average: 6.1, risk: "low", alertIds: [] },
    { id: "est-004", name: "Tomás Herrera", identifier: "EST-2026-004", section: "PTY4614-002", program: "Ingeniería en Informática", attendance: 81, average: 3.8, risk: "high", alertIds: ["alt-004"] },
    { id: "est-005", name: "Fernanda Silva", identifier: "EST-2026-005", section: "PTY4614-001", program: "Ingeniería en Informática", attendance: 89, average: 5.7, risk: "low", alertIds: [] },
  ],
  studentPortal: {
    studentId: "est-001",
    semester: 6,
    approvedCredits: 118,
    enrolledCredits: 24,
    progress: 68,
    courses: [
      { code: "ASI6421", name: "Arquitectura de Software", professor: "Paula Contreras", attendance: 82, average: 5.2, color: "sage", grades: [{ label: "Control 1", weight: 20, value: 5.6 }, { label: "Informe técnico", weight: 30, value: 5.1 }, { label: "Evaluación parcial", weight: 50, value: 5.1 }] },
      { code: "BDD6411", name: "Bases de Datos Aplicadas", professor: "Cristóbal Reyes", attendance: 76, average: 4.5, color: "blue", grades: [{ label: "Laboratorio", weight: 25, value: 5.0 }, { label: "Modelo lógico", weight: 25, value: 4.7 }, { label: "Prueba parcial", weight: 50, value: 4.1 }] },
      { code: "PGY6421", name: "Gestión de Proyectos TI", professor: "Francisca Mella", attendance: 68, average: 3.8, color: "gold", grades: [{ label: "Caso grupal", weight: 30, value: 4.8 }, { label: "Control de lectura", weight: 20, value: 3.2 }, { label: "Presentación", weight: 50, value: 3.4 }] },
      { code: "PMO6431", name: "Programación Móvil", professor: "Andrés Navarro", attendance: 61, average: 3.1, color: "clay", grades: [{ label: "Desafío 1", weight: 25, value: 4.0 }, { label: "Desafío 2", weight: 25, value: 3.4 }, { label: "Prueba práctica", weight: 50, value: 2.5 }] },
    ],
    upcoming: [
      { day: "02", month: "SEP", title: "Entrega API REST", course: "Arquitectura de Software", type: "Entrega" },
      { day: "05", month: "SEP", title: "Prueba práctica", course: "Programación Móvil", type: "Evaluación" },
      { day: "08", month: "SEP", title: "Presentación de avance", course: "Gestión de Proyectos TI", type: "Presentación" },
    ],
    messages: [
      { title: "Plan de acompañamiento disponible", detail: "Coordinación académica dejó recomendaciones para organizar tus próximas evaluaciones." },
    ],
  },
  alerts: [
    { id: "alt-001", studentId: "est-001", severity: "high", status: "open", title: "Asistencia bajo umbral", rule: "ASISTENCIA_MENOR_75_V1", evidence: "68% observado / 75% mínimo", createdAt: "2026-08-27T14:30:00.000Z" },
    { id: "alt-002", studentId: "est-001", severity: "medium", status: "assigned", title: "Promedio en zona preventiva", rule: "PROMEDIO_MENOR_45_V1", evidence: "4,1 observado / 4,5 preventivo", createdAt: "2026-08-26T10:00:00.000Z" },
    { id: "alt-003", studentId: "est-002", severity: "medium", status: "following", title: "Asistencia en descenso", rule: "TENDENCIA_ASISTENCIA_V1", evidence: "-11 puntos porcentuales en 3 semanas", createdAt: "2026-08-25T09:15:00.000Z" },
    { id: "alt-004", studentId: "est-004", severity: "high", status: "open", title: "Promedio bajo aprobación", rule: "PROMEDIO_MENOR_40_V1", evidence: "3,8 observado / 4,0 mínimo", createdAt: "2026-08-28T08:45:00.000Z" },
  ],
  interventions: [
    { id: "int-001", studentId: "est-001", alertId: "alt-002", type: "Contacto", note: "Se acordó revisar la planificación de evaluaciones.", author: "Docente demo", createdAt: "2026-08-27T16:00:00.000Z" },
    { id: "int-002", studentId: "est-002", alertId: "alt-003", type: "Seguimiento", note: "Caso asignado a coordinación para revisión preventiva.", author: "Coordinación demo", createdAt: "2026-08-26T13:20:00.000Z" },
  ],
};
