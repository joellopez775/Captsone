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
