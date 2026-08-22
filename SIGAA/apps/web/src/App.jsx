import { useEffect, useMemo, useState } from "react";

const labels = {
  high: "Alto",
  medium: "Medio",
  low: "Bajo",
  open: "Abierta",
  assigned: "Asignada",
  following: "En seguimiento",
};

function Icon({ name }) {
  const paths = {
    dashboard: <><path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-16v4h6V4h-6Z" /></>,
    students: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    alerts: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  };
  return <svg aria-hidden="true" className="icon" fill={name === "dashboard" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Metric({ label, value, detail, accent = "sage", trend = [3, 5, 4, 7, 6] }) {
  return (
    <article className={`metric metric--${accent}`}>
      <div className="metric__top"><span>{label}</span><span className="metric__signal">En vivo</span></div>
      <div className="metric__body"><strong>{value}</strong><div className="micro-chart" aria-hidden="true">{trend.map((height, index) => <i key={index} style={{ height: `${height * 5}px` }} />)}</div></div>
      <small>{detail}</small>
    </article>
  );
}

function RiskBadge({ value }) {
  return <span className={`badge badge--${value}`}>{labels[value] ?? value}</span>;
}

function AppShell({ activeView, onNavigate, onLogout, onSwitchPersona, children, system }) {
  const navigation = [["dashboard", "Resumen", "dashboard"], ["students", "Estudiantes", "students"], ["alerts", "Alertas", "alerts"]];
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand__mark"><span>S</span></span>
          <div><strong>SIGAA</strong><small>Academic Intelligence</small></div>
        </div>
        <nav aria-label="Navegación principal">
          <span className="nav-caption">Espacio de trabajo</span>
          {navigation.map(([view, label, icon]) => (
            <button className={activeView === view ? "nav-button nav-button--active" : "nav-button"} key={view} onClick={() => onNavigate(view)} type="button"><Icon name={icon} /><span>{label}</span>{view === "alerts" && <em>12</em>}</button>
          ))}
        </nav>
        <div className="sidebar__footer">
          <div className="profile-card"><span className="profile-card__avatar">JL</span><div><strong>Joel López</strong><small>Product Owner</small></div><button aria-label="Salir de demo" onClick={onLogout} type="button">•••</button></div>
          <div className="system-status"><div className={`system-dot system-dot--${system.status}`} /><span>{system.message}</span></div>
        </div>
      </aside>
      <div className="app-stage">
        <header className="topbar">
          <div className="topbar__context"><span>Campus digital</span><i>/</i><strong>{navigation.find(([view]) => view === activeView)?.[1]}</strong></div>
          <div className="topbar__actions"><button className="persona-switch" onClick={onSwitchPersona} type="button">Vista estudiante</button><button className="command-button" type="button"><Icon name="search" /><span>Buscar en SIGAA</span><kbd>⌘ K</kbd></button><button className="notification-button" aria-label="Notificaciones" type="button"><Icon name="alerts" /><i /></button><span className="topbar__avatar">JL</span></div>
        </header>
        <main className="workspace">{children}</main>
      </div>
    </div>
  );
}

function Login({ onEnter, onPersonaChange, persona, system }) {
  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="login-seal"><span>S</span><small>2026</small></div>
        <p className="eyebrow">Inteligencia académica · Comunidad universitaria</p>
        <h1>Excelencia que se puede acompañar.</h1>
        <p>Una experiencia académica diseñada para convertir señales tempranas en decisiones humanas, oportunas y trazables.</p>
        <div className="prototype-note"><span className="prototype-note__dot" /><strong>Entorno de demostración</strong><span>Información completamente sintética.</span></div>
      </section>
      <section className="login-card" aria-labelledby="demo-title">
        <div className="login-card__header"><span className="login-card__tag">SIGAA</span><span>Portal institucional</span></div>
        <h2 id="demo-title">Bienvenido de vuelta</h2>
        <p>Ingresa al entorno académico de demostración.</p>
        <span className="role-label">Selecciona una experiencia</span>
        <div className="role-selector" aria-label="Seleccionar perfil">
          <button className={persona === "staff" ? "role-option role-option--active" : "role-option"} onClick={() => onPersonaChange("staff")} type="button"><span>Coordinación</span><small>Gestión y alertas</small></button>
          <button className={persona === "student" ? "role-option role-option--active" : "role-option"} onClick={() => onPersonaChange("student")} type="button"><span>Estudiante</span><small>Notas y agenda</small></button>
        </div>
        <label>Perfil simulado<input disabled value={persona === "student" ? "Camila Soto · Estudiante" : "Coordinación académica"} /></label>
        <label>Periodo<input disabled value="2026 - Segundo semestre" /></label>
        <button className="primary-button" onClick={onEnter} type="button"><span>Ingresar al portal</span><span>→</span></button>
        <small className={`connection connection--${system.status}`}>{system.message}</small>
      </section>
    </main>
  );
}

function CourseCard({ course }) {
  return (
    <article className={`course-card course-card--${course.color}`}>
      <div className="course-card__top"><span>{course.code}</span><span>{course.attendance}% asistencia</span></div>
      <h3>{course.name}</h3>
      <p>{course.professor}</p>
      <div className="course-card__footer"><div><small>Promedio actual</small><strong>{course.average.toFixed(1)}</strong></div><div className="course-grade-dots" aria-label={`${course.grades.length} evaluaciones registradas`}>{course.grades.map((grade) => <i className={grade.value < 4 ? "grade-dot grade-dot--low" : "grade-dot"} key={grade.label} title={`${grade.label}: ${grade.value.toFixed(1)}`} />)}</div></div>
    </article>
  );
}

function StudentPortal({ data, onLogout, onSwitchPersona, system }) {
  const portal = data.studentPortal;
  const student = data.students.find(({ id }) => id === portal.studentId);
  return (
    <div className="student-portal-shell">
      <aside className="student-sidebar">
        <div className="brand"><span className="brand__mark"><span>S</span></span><div><strong>SIGAA</strong><small>Portal del estudiante</small></div></div>
        <nav aria-label="Navegación del estudiante"><span className="nav-caption">Mi experiencia</span><button className="nav-button nav-button--active" type="button"><Icon name="dashboard" /><span>Mi inicio</span></button><button className="nav-button" type="button"><Icon name="book" /><span>Mis asignaturas</span></button><button className="nav-button" type="button"><Icon name="calendar" /><span>Calendario</span></button></nav>
        <div className="student-profile"><span className="student-profile__avatar">CS</span><div><strong>{student.name}</strong><small>{student.program}</small></div></div>
        <div className="system-status"><div className={`system-dot system-dot--${system.status}`} /><span>{system.message}</span></div>
      </aside>
      <div className="student-stage">
        <header className="student-topbar"><div><span>Portal académico</span><i>/</i><strong>Mi inicio</strong></div><div><button className="persona-switch" onClick={onSwitchPersona} type="button">Vista coordinación</button><button className="notification-button" aria-label="Notificaciones" type="button"><Icon name="alerts" /><i /></button><button className="student-logout" onClick={onLogout} type="button">Cerrar sesión</button></div></header>
        <main className="student-workspace">
          <header className="student-welcome"><div><p>SEMESTRE {portal.semester} · {data.meta.period}</p><h1>Hola, Camila.</h1><span>Este es tu pulso académico actualizado.</span></div><div className="student-id"><span>Estudiante regular</span><strong>{student.identifier}</strong></div></header>
          <section className="student-overview">
            <article className="academic-progress"><div><p>Avance curricular</p><strong>{portal.progress}%</strong><span>{portal.approvedCredits} créditos aprobados</span></div><div className="progress-ring" style={{ "--progress": `${portal.progress * 3.6}deg` }}><span>{portal.progress}%</span></div></article>
            <article className="student-stat"><span>Promedio general</span><strong>{student.average.toFixed(1)}</strong><small>Escala de 1,0 a 7,0</small></article>
            <article className="student-stat student-stat--warning"><span>Asistencia global</span><strong>{student.attendance}%</strong><small>Meta recomendada: 75%</small></article>
            <article className="student-stat"><span>Carga actual</span><strong>{portal.enrolledCredits}</strong><small>Créditos inscritos</small></article>
          </section>
          <section className="student-layout">
            <div>
              <div className="section-heading"><div><p>Mis asignaturas</p><h2>Notas del semestre</h2></div><span>{portal.courses.length} asignaturas inscritas</span></div>
              <div className="course-grid">{portal.courses.map((course) => <CourseCard course={course} key={course.code} />)}</div>
              <article className="gradebook panel"><div className="panel__header"><div><p>Detalle</p><h2>Últimas calificaciones</h2></div></div><div className="gradebook__head"><span>Evaluación</span><span>Asignatura</span><span>Ponderación</span><span>Nota</span></div>{portal.courses.flatMap((course) => course.grades.slice(-1).map((grade) => <div className="gradebook__row" key={`${course.code}-${grade.label}`}><span><strong>{grade.label}</strong><small>{course.code}</small></span><span>{course.name}</span><span>{grade.weight}%</span><strong className={grade.value < 4 ? "grade-value grade-value--low" : "grade-value"}>{grade.value.toFixed(1)}</strong></div>))}</article>
            </div>
            <aside className="student-rail">
              <article className="student-message"><span>ACOMPAÑAMIENTO</span><h3>{portal.messages[0].title}</h3><p>{portal.messages[0].detail}</p><button type="button">Ver recomendaciones</button></article>
              <article className="upcoming-panel"><div className="section-heading"><div><p>Agenda</p><h2>Próximamente</h2></div></div>{portal.upcoming.map((item) => <div className="upcoming-item" key={item.title}><time><strong>{item.day}</strong><span>{item.month}</span></time><div><span>{item.type}</span><strong>{item.title}</strong><small>{item.course}</small></div></div>)}</article>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

function Header({ kicker, title, subtitle }) {
  return (
    <header className="page-header">
      <div><p>{kicker}</p><h1>{title}</h1><span>{subtitle}</span></div>
      <div className="header-meta"><span className="demo-chip"><i /> Datos sintéticos</span><span className="academic-cycle">Ciclo académico · 2026</span></div>
    </header>
  );
}

function Dashboard({ data, onOpenStudent, onNavigate }) {
  const prioritized = data.students.filter(({ risk }) => risk !== "low");
  return (
    <>
      <Header kicker="Periodo 2026-2" title="Resumen académico" subtitle="Señales prioritarias para la coordinación" />
      <section className="metrics-grid" aria-label="Indicadores principales">
        <Metric label="Estudiantes activos" value={data.metrics.activeStudents} detail="2 secciones de demostración" trend={[3, 4, 5, 5, 7]} />
        <Metric label="Asistencia promedio" value={`${data.metrics.averageAttendance}%`} detail="Umbral preventivo: 75%" accent="gold" trend={[6, 5, 7, 6, 8]} />
        <Metric label="Alertas abiertas" value={data.metrics.openAlerts} detail="4 visibles en el prototipo" accent="clay" trend={[8, 7, 6, 5, 4]} />
        <Metric label="Seguimientos activos" value={data.metrics.activeFollowUps} detail="Responsable asignado" accent="blue" trend={[2, 3, 5, 4, 7]} />
      </section>
      <section className="content-grid">
        <article className="panel panel--wide">
          <div className="panel__header"><div><p>Prioridad</p><h2>Estudiantes que requieren revisión</h2></div><button onClick={() => onNavigate("students")} type="button">Ver todos</button></div>
          <div className="student-list">
            {prioritized.map((student) => (
              <button className="student-row" key={student.id} onClick={() => onOpenStudent(student.id)} type="button">
                <span className="avatar">{student.name.split(" ").map((part) => part[0]).join("")}</span>
                <span className="student-row__identity"><strong>{student.name}</strong><small>{student.section}</small></span>
                <span><small>Asistencia</small><strong>{student.attendance}%</strong></span>
                <span><small>Promedio</small><strong>{student.average.toFixed(1)}</strong></span>
                <RiskBadge value={student.risk} />
              </button>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="panel__header"><div><p>Alertas</p><h2>Actividad reciente</h2></div><button onClick={() => onNavigate("alerts")} type="button">Abrir bandeja</button></div>
          <div className="alert-stack">
            {data.alerts.slice(0, 3).map((alert) => {
              const student = data.students.find(({ id }) => id === alert.studentId);
              return <div className="alert-card" key={alert.id}><RiskBadge value={alert.severity} /><strong>{alert.title}</strong><span>{student?.name}</span><small>{alert.evidence}</small></div>;
            })}
          </div>
        </article>
      </section>
    </>
  );
}

function Students({ data, onOpenStudent }) {
  const [query, setQuery] = useState("");
  const filtered = data.students.filter((student) => `${student.name} ${student.identifier} ${student.section}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <Header kicker="Directorio" title="Estudiantes" subtitle="Búsqueda y contexto académico sintético" />
      <section className="toolbar"><label htmlFor="student-search">Buscar estudiante</label><input id="student-search" onChange={(event) => setQuery(event.target.value)} placeholder="Nombre, identificador o sección" value={query} /></section>
      <section className="panel table-panel">
        <div className="table-heading"><span>Estudiante</span><span>Sección</span><span>Asistencia</span><span>Promedio</span><span>Riesgo</span></div>
        {filtered.map((student) => (
          <button className="table-row" key={student.id} onClick={() => onOpenStudent(student.id)} type="button"><span><strong>{student.name}</strong><small>{student.identifier}</small></span><span>{student.section}</span><span>{student.attendance}%</span><span>{student.average.toFixed(1)}</span><RiskBadge value={student.risk} /></button>
        ))}
        {filtered.length === 0 && <div className="empty-state">No hay estudiantes que coincidan con la búsqueda.</div>}
      </section>
    </>
  );
}

function Alerts({ data, onOpenStudent }) {
  const [severity, setSeverity] = useState("all");
  const alerts = severity === "all" ? data.alerts : data.alerts.filter((alert) => alert.severity === severity);
  return (
    <>
      <Header kicker="Seguimiento" title="Bandeja de alertas" subtitle="Cada alerta muestra la regla y la evidencia que la originó" />
      <section className="filter-group" aria-label="Filtrar por severidad">
        {["all", "high", "medium"].map((value) => <button className={severity === value ? "filter filter--active" : "filter"} key={value} onClick={() => setSeverity(value)} type="button">{value === "all" ? "Todas" : labels[value]}</button>)}
      </section>
      <section className="alert-board">
        {alerts.map((alert) => {
          const student = data.students.find(({ id }) => id === alert.studentId);
          return <article className="alert-detail" key={alert.id}><div className="alert-detail__top"><RiskBadge value={alert.severity} /><span>{labels[alert.status]}</span></div><h2>{alert.title}</h2><button className="link-button" onClick={() => onOpenStudent(alert.studentId)} type="button">{student?.name} · {student?.section}</button><dl><div><dt>Regla aplicada</dt><dd>{alert.rule}</dd></div><div><dt>Evidencia</dt><dd>{alert.evidence}</dd></div></dl></article>;
        })}
      </section>
    </>
  );
}

function StudentDetail({ data, studentId, onBack }) {
  const student = data.students.find(({ id }) => id === studentId);
  const alerts = data.alerts.filter(({ studentId: id }) => id === studentId);
  const interventions = data.interventions.filter(({ studentId: id }) => id === studentId);
  if (!student) return <div className="empty-state">Estudiante no encontrado.</div>;
  return (
    <>
      <button className="back-button" onClick={onBack} type="button">← Volver a estudiantes</button>
      <Header kicker={student.identifier} title={student.name} subtitle={`${student.program} · ${student.section}`} />
      <section className="metrics-grid metrics-grid--three"><Metric label="Asistencia" value={`${student.attendance}%`} detail="Ejemplo del periodo" /><Metric label="Promedio" value={student.average.toFixed(1)} detail="Escala referencial 1,0 a 7,0" /><Metric label="Nivel de riesgo" value={labels[student.risk]} detail={`${alerts.length} alerta(s) relacionada(s)`} /></section>
      <section className="content-grid">
        <article className="panel panel--wide"><div className="panel__header"><div><p>Explicabilidad</p><h2>Alertas relacionadas</h2></div></div>{alerts.length ? alerts.map((alert) => <div className="timeline-item" key={alert.id}><RiskBadge value={alert.severity} /><div><strong>{alert.title}</strong><span>{alert.rule}</span><small>{alert.evidence}</small></div></div>) : <div className="empty-state">Sin alertas abiertas.</div>}</article>
        <article className="panel"><div className="panel__header"><div><p>Trazabilidad</p><h2>Intervenciones</h2></div></div>{interventions.length ? interventions.map((item) => <div className="intervention" key={item.id}><strong>{item.type}</strong><p>{item.note}</p><small>{item.author}</small></div>) : <div className="empty-state">Sin intervenciones registradas.</div>}</article>
      </section>
    </>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [persona, setPersona] = useState("staff");
  const [view, setView] = useState("dashboard");
  const [studentId, setStudentId] = useState(null);
  const [data, setData] = useState(null);
  const [system, setSystem] = useState({ status: "checking", message: "Verificando servicios…" });

  useEffect(() => {
    async function loadPrototype() {
      try {
        const [healthResponse, dbResponse, prototypeResponse] = await Promise.all([fetch("/api/health"), fetch("/api/db-health"), fetch("/api/prototype")]);
        if (!healthResponse.ok || !dbResponse.ok || !prototypeResponse.ok) throw new Error("Servicios no disponibles");
        setData(await prototypeResponse.json());
        setSystem({ status: "ready", message: "Web, API y base operativas" });
      } catch (error) {
        setSystem({ status: "error", message: error.message });
      }
    }
    loadPrototype();
  }, []);

  const content = useMemo(() => {
    if (!data) return <div className="loading-state"><span /><p>Cargando prototipo…</p></div>;
    if (studentId) return <StudentDetail data={data} studentId={studentId} onBack={() => { setStudentId(null); setView("students"); }} />;
    if (view === "students") return <Students data={data} onOpenStudent={setStudentId} />;
    if (view === "alerts") return <Alerts data={data} onOpenStudent={setStudentId} />;
    return <Dashboard data={data} onNavigate={setView} onOpenStudent={setStudentId} />;
  }, [data, studentId, view]);

  if (!entered) return <Login onEnter={() => setEntered(true)} onPersonaChange={setPersona} persona={persona} system={system} />;
  if (persona === "student" && data) return <StudentPortal data={data} onLogout={() => setEntered(false)} onSwitchPersona={() => setPersona("staff")} system={system} />;
  return <AppShell activeView={view} onLogout={() => setEntered(false)} onNavigate={(next) => { setStudentId(null); setView(next); }} onSwitchPersona={() => setPersona("student")} system={system}>{content}</AppShell>;
}
