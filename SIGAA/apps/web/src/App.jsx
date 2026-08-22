import { useEffect, useMemo, useState } from "react";

const labels = {
  high: "Alto",
  medium: "Medio",
  low: "Bajo",
  open: "Abierta",
  assigned: "Asignada",
  following: "En seguimiento",
};

function Metric({ label, value, detail }) {
  return (
    <article className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function RiskBadge({ value }) {
  return <span className={`badge badge--${value}`}>{labels[value] ?? value}</span>;
}

function AppShell({ activeView, onNavigate, onLogout, children, system }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand__mark">S</span>
          <div><strong>SIGAA</strong><small>Prototipo Sprint 1</small></div>
        </div>
        <nav aria-label="Navegación principal">
          {[["dashboard", "Resumen"], ["students", "Estudiantes"], ["alerts", "Alertas"]].map(([view, label]) => (
            <button className={activeView === view ? "nav-button nav-button--active" : "nav-button"} key={view} onClick={() => onNavigate(view)} type="button">{label}</button>
          ))}
        </nav>
        <div className="sidebar__footer">
          <div className={`system-dot system-dot--${system.status}`} />
          <span>{system.message}</span>
          <button onClick={onLogout} type="button">Salir de demo</button>
        </div>
      </aside>
      <main className="workspace">{children}</main>
    </div>
  );
}

function Login({ onEnter, system }) {
  return (
    <main className="login-page">
      <section className="login-intro">
        <p className="eyebrow">Sistema Integral de Gestión y Acompañamiento Académico</p>
        <h1>Señales claras para acompañar a tiempo.</h1>
        <p>Prototipo navegable del Sprint 1. Explora el dashboard, las fichas y la bandeja de alertas usando datos completamente sintéticos.</p>
        <div className="prototype-note"><strong>Modo demostración</strong><span>No utiliza credenciales ni información personal real.</span></div>
      </section>
      <section className="login-card" aria-labelledby="demo-title">
        <span className="login-card__tag">Sprint 1</span>
        <h2 id="demo-title">Acceso de demostración</h2>
        <label>Perfil simulado<input disabled value="Coordinación académica" /></label>
        <label>Periodo<input disabled value="2026 - Segundo semestre" /></label>
        <button className="primary-button" onClick={onEnter} type="button">Ingresar al prototipo</button>
        <small className={`connection connection--${system.status}`}>{system.message}</small>
      </section>
    </main>
  );
}

function Header({ kicker, title, subtitle }) {
  return (
    <header className="page-header">
      <div><p>{kicker}</p><h1>{title}</h1><span>{subtitle}</span></div>
      <div className="demo-chip">Datos sintéticos</div>
    </header>
  );
}

function Dashboard({ data, onOpenStudent, onNavigate }) {
  const prioritized = data.students.filter(({ risk }) => risk !== "low");
  return (
    <>
      <Header kicker="Periodo 2026-2" title="Resumen académico" subtitle="Señales prioritarias para la coordinación" />
      <section className="metrics-grid" aria-label="Indicadores principales">
        <Metric label="Estudiantes activos" value={data.metrics.activeStudents} detail="2 secciones de demostración" />
        <Metric label="Asistencia promedio" value={`${data.metrics.averageAttendance}%`} detail="Umbral preventivo: 75%" />
        <Metric label="Alertas abiertas" value={data.metrics.openAlerts} detail="4 visibles en el prototipo" />
        <Metric label="Seguimientos activos" value={data.metrics.activeFollowUps} detail="Responsable asignado" />
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

  if (!entered) return <Login onEnter={() => setEntered(true)} system={system} />;
  return <AppShell activeView={view} onLogout={() => setEntered(false)} onNavigate={(next) => { setStudentId(null); setView(next); }} system={system}>{content}</AppShell>;
}
