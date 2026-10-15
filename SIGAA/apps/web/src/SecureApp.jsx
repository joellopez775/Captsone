import { useEffect, useState } from "react";
import logo from "./assets/sigaa-logo.png";
import "./secure.css";

let csrfToken = "";
const messages = {
  invalid_credentials: "Correo o contraseña incorrectos.",
  authentication_required: "Inicia sesión para continuar.",
  session_expired: "Tu sesión terminó. Vuelve a ingresar.",
  access_denied: "No tienes permiso para esta acción.",
  duplicate_record: "Ya existe un registro con ese identificador o correo.",
  active_enrollment_exists:
    "El estudiante ya tiene una matrícula activa en este periodo.",
  course_full: "El curso no tiene cupos disponibles.",
  invalid_course_period: "Selecciona un curso y periodo activos.",
  student_not_regular:
    "Solo se pueden matricular estudiantes en estado regular.",
  stale_record: "El registro cambió. Actualiza la lista antes de editar.",
  invalid_identifier:
    "Usa un identificador de 3 a 40 letras, números, puntos o guiones.",
  invalid_email: "Revisa el correo institucional.",
  invalid_student_data: "Completa nombres, apellidos e identificador.",
  try_again_later:
    "Demasiados intentos. Espera 15 minutos y vuelve a intentar.",
  invalid_password_length:
    "La contraseña debe tener al menos 12 caracteres y como máximo 256 bytes.",
  enrollment_already_closed: "Esta matrícula ya está cerrada.",
  csrf_rejected: "Actualiza la página antes de volver a intentar.",
};
async function api(path, { method = "GET", body } = {}) {
  const response = await fetch("/api" + path, {
    method,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = response.status === 204 ? {} : await response.json();
  if (!response.ok) {
    if (
      response.status === 401 &&
      (data.error === "session_expired" ||
        (data.error === "authentication_required" && path !== "/auth/me"))
    )
      window.dispatchEvent(new Event("sigaa-session-ended"));
    throw new Error(
      messages[data.error] ??
        "No se pudo completar la operación. Revisa los datos e inténtalo nuevamente.",
    );
  }
  return data;
}
const blank = {
  identifier: "",
  firstName: "",
  lastName: "",
  email: "",
  status: "regular",
};
const roleNames = {
  admin: "Administración",
  teacher: "Docente",
  student: "Estudiante",
};
function Notice({ text, error = false }) {
  return text ? (
    <div
      className={error ? "login-error" : "secure-notice"}
      role={error ? "alert" : "status"}
    >
      {text}
    </div>
  ) : null;
}
function Login({ onLogin, notice }) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await onLogin(form.get("email"), form.get("password"));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="login-logo">
          <img src={logo} alt="SIGAA" />
        </div>
        <p className="eyebrow">Gestión escolar · Comunidad educativa</p>
        <h1>Cada estudiante merece llegar más lejos.</h1>
        <p>Un espacio privado para acompañar a nuestra comunidad.</p>
        <div className="prototype-note">
          <span className="prototype-note__dot" />
          <strong>Portal con acceso personal</strong>
          <span>Tu cuenta define tus permisos.</span>
        </div>
      </section>
      <form className="login-card" onSubmit={submit}>
        <div className="login-card__header">
          <span>Portal del establecimiento</span>
        </div>
        <h2>Bienvenido de vuelta</h2>
        <p>Ingresa con la cuenta entregada por la administración.</p>
        <label>
          Correo institucional
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Contraseña
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={256}
          />
        </label>
        <Notice text={error} error />
        <Notice text={notice} />
        <button className="primary-button" disabled={busy}>
          {busy ? "Validando…" : "Ingresar al portal"}
        </button>
        <small>No compartas tu contraseña. Cierra sesión al terminar.</small>
      </form>
    </main>
  );
}
function Students({ rows, admin, onRefresh, onError }) {
  const [edit, setEdit] = useState(null),
    [form, setForm] = useState(blank),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState("");
  async function save(event) {
    event.preventDefault();
    setBusy(true);
    onError("");
    setNotice("");
    try {
      await api(edit ? "/students/" + edit.id : "/students", {
        method: edit ? "PUT" : "POST",
        body: {
          ...form,
          ...(edit ? { expectedUpdatedAt: edit.updatedAt } : {}),
        },
      });
      setEdit(null);
      setForm(blank);
      setNotice("Estudiante guardado en la base de datos.");
      await onRefresh();
    } catch (e) {
      onError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="secure-grid">
      <section className="panel">
        <h2>{admin ? "Estudiantes" : "Estudiantes autorizados"}</h2>
        {!rows.length ? (
          <p className="empty-state">
            No hay estudiantes disponibles para tu cuenta.
          </p>
        ) : (
          <div className="secure-list">
            {rows.map((s) => (
              <article key={s.id}>
                <div>
                  <strong>
                    {s.firstName} {s.lastName}
                  </strong>
                  <small>
                    {s.identifier} · {s.status}
                  </small>
                  <small>{s.email ?? "Sin correo institucional"}</small>
                </div>
                {admin && (
                  <button
                    type="button"
                    onClick={() => {
                      setEdit(s);
                      setForm({ ...s, email: s.email ?? "" });
                      setNotice("");
                    }}
                  >
                    Editar {s.identifier}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
        <small>
          Se muestran hasta 500 registros. No se incluyen estudiantes fuera de
          tus permisos.
        </small>
      </section>
      {admin && (
        <form className="panel secure-form" onSubmit={save}>
          <h2>{edit ? "Editar estudiante" : "Nuevo estudiante"}</h2>
          {Object.entries({
            identifier: "Identificador",
            firstName: "Nombres",
            lastName: "Apellidos",
            email: "Correo del estudiante",
          }).map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                name={key}
                required={key !== "email"}
                type={key === "email" ? "email" : "text"}
                maxLength={
                  { identifier: 40, firstName: 100, lastName: 120, email: 254 }[
                    key
                  ]
                }
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}
          <label>
            Estado del estudiante
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {["regular", "suspendido", "retirado", "egresado"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button className="primary-button" disabled={busy}>
            {busy ? "Guardando…" : "Guardar estudiante"}
          </button>
          {edit && (
            <button
              type="button"
              onClick={() => {
                setEdit(null);
                setForm(blank);
              }}
            >
              Cancelar edición
            </button>
          )}
          <Notice text={notice} />
          <small>
            Retirar un estudiante no borra sus matrículas ni su historial.
          </small>
        </form>
      )}
    </div>
  );
}
function Enrollments({ rows, students, courses, admin, onRefresh, onError }) {
  const [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(""),
    [closing, setClosing] = useState(null);
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget,
      values = Object.fromEntries(new FormData(form));
    setBusy(true);
    onError("");
    setNotice("");
    try {
      if (closing)
        await api("/enrollments/" + closing, { method: "PATCH", body: values });
      else {
        const course = courses.find((c) => c.id === values.courseId);
        await api("/enrollments", {
          method: "POST",
          body: { ...values, periodId: course?.periodId },
        });
      }
      setClosing(null);
      form.reset();
      setNotice("Matrícula guardada. El historial se conserva.");
      await onRefresh();
    } catch (e) {
      onError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="secure-grid">
      <section className="panel">
        <h2>Historial de matrículas</h2>
        {!rows.length ? (
          <p className="empty-state">No hay matrículas registradas.</p>
        ) : (
          <div className="secure-list">
            {rows.map((m) => (
              <article key={m.id}>
                <div>
                  <strong>{m.student}</strong>
                  <small>
                    {m.course} · {m.period}
                  </small>
                  <span className="secure-pill">{m.status}</span>
                </div>
                {admin && m.status === "activa" && (
                  <button type="button" onClick={() => setClosing(m.id)}>
                    Cambiar estado de {m.student}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
      {admin && (
        <form
          className="panel secure-form"
          onSubmit={submit}
          key={closing ?? "new"}
        >
          <h2>{closing ? "Cerrar matrícula" : "Nueva matrícula"}</h2>
          {closing ? (
            <>
              <p>{rows.find((m) => m.id === closing)?.student}</p>
              <label>
                Nuevo estado
                <select name="status">
                  <option value="retirada">Retirada</option>
                  <option value="finalizada">Finalizada</option>
                  <option value="anulada">Anulada</option>
                </select>
              </label>
              <label>
                Motivo del cambio
                <textarea
                  name="reason"
                  minLength={8}
                  maxLength={500}
                  required
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Estudiante a matricular
                <select name="studentId" required defaultValue="">
                  <option value="" disabled>
                    Selecciona un estudiante
                  </option>
                  {students
                    .filter((s) => s.status === "regular")
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName} · {s.identifier}
                      </option>
                    ))}
                </select>
              </label>
              <label>
                Curso y periodo
                <select name="courseId" required defaultValue="">
                  <option value="" disabled>
                    Selecciona un curso
                  </option>
                  {courses
                    .filter(
                      (c) =>
                        c.status === "activo" && c.periodStatus === "activo",
                    )
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} · {c.period}
                      </option>
                    ))}
                </select>
              </label>
              <p>
                Solo se permite una matrícula activa por estudiante y periodo.
                El cupo se valida al guardar.
              </p>
            </>
          )}
          <button className="primary-button" disabled={busy}>
            {busy
              ? "Guardando…"
              : closing
                ? "Confirmar cambio"
                : "Guardar matrícula"}
          </button>
          {closing && (
            <button type="button" onClick={() => setClosing(null)}>
              Cancelar cambio
            </button>
          )}
          <Notice text={notice} />
        </form>
      )}
    </div>
  );
}
function Security({ onLogout, onError }) {
  const [busy, setBusy] = useState(false);
  async function change(e) {
    e.preventDefault();
    setBusy(true);
    onError("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("/auth/password", { method: "POST", body });
      onLogout("Contraseña actualizada. Ingresa nuevamente.");
    } catch (error) {
      onError(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="panel secure-form" onSubmit={change}>
      <h2>Seguridad de tu cuenta</h2>
      <p>Al cambiar tu contraseña se cerrarán todas tus sesiones.</p>
      <label>
        Contraseña actual
        <input
          type="password"
          name="currentPassword"
          autoComplete="current-password"
          required
        />
      </label>
      <label>
        Nueva contraseña
        <input
          type="password"
          name="newPassword"
          autoComplete="new-password"
          minLength={12}
          maxLength={256}
          required
        />
      </label>
      <button className="primary-button" disabled={busy}>
        {busy ? "Actualizando…" : "Cambiar contraseña"}
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          try {
            await api("/auth/logout-all", { method: "POST", body: {} });
            onLogout("Todas tus sesiones se han cerrado.");
          } catch (e) {
            onError(e.message);
          }
        }}
      >
        Cerrar todas mis sesiones
      </button>
    </form>
  );
}
export default function SecureApp() {
  const [session, setSession] = useState(null),
    [ready, setReady] = useState(false),
    [view, setView] = useState("summary"),
    [menu, setMenu] = useState(false);
  const [data, setData] = useState({
      students: [],
      courses: [],
      enrollments: [],
      grades: [],
    }),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [loading, setLoading] = useState(false);
  function clearSession(message = "Tu sesión terminó. Vuelve a ingresar.") {
    csrfToken = "";
    setSession(null);
    setData({ students: [], courses: [], enrollments: [], grades: [] });
    setNotice(message);
    setError("");
    setMenu(false);
  }
  async function refresh(user = session?.user) {
    if (!user) return;
    setLoading(true);
    try {
      const [s, c, e, g] = await Promise.all([
        api("/students"),
        api("/courses"),
        api("/enrollments"),
        user.role === "student" && user.studentId
          ? api("/student/workspace/" + user.studentId)
          : Promise.resolve({ grades: [] }),
      ]);
      setData({ ...s, ...c, ...e, ...g });
    } finally {
      setLoading(false);
    }
  }
  async function accept(result) {
    csrfToken = result.csrfToken;
    setSession(result);
    setView("summary");
    setNotice("");
    setError("");
    try {
      await refresh(result.user);
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    let active = true;
    const ended = () => clearSession();
    window.addEventListener("sigaa-session-ended", ended);
    api("/auth/me")
      .then((result) => {
        if (active) accept(result);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
      window.removeEventListener("sigaa-session-ended", ended);
    };
  }, []);
  async function login(email, password) {
    await accept(
      await api("/auth/login", { method: "POST", body: { email, password } }),
    );
  }
  async function logout() {
    try {
      await api("/auth/logout", { method: "POST", body: {} });
      clearSession("Sesión cerrada.");
    } catch (e) {
      setError(e.message);
    }
  }
  if (!ready)
    return (
      <main className="loading-state" role="status">
        Comprobando sesión…
      </main>
    );
  if (!session) return <Login onLogin={login} notice={notice} />;
  const user = session.user,
    admin = user.role === "admin",
    student = user.role === "student";
  const navigation = [
    ["summary", "Mi inicio"],
    ["students", student ? "Mis datos" : "Estudiantes"],
    ["courses", student ? "Mis cursos" : "Cursos"],
    ["enrollments", "Matrículas"],
    ...(student ? [["grades", "Mis notas"]] : []),
    ["security", "Seguridad"],
  ];
  return (
    <div className="secure-shell">
      <aside className={"secure-sidebar" + (menu ? " is-open" : "")}>
        <div className="secure-brand">
          <img src={logo} alt="SIGAA" />
          <span>Gestión escolar</span>
        </div>
        <button
          className="secure-menu"
          type="button"
          aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? "×" : "☰"}
        </button>
        <nav aria-label="Navegación principal">
          {navigation.map(([id, label]) => (
            <button
              key={id}
              aria-current={view === id ? "page" : undefined}
              onClick={() => {
                setView(id);
                setMenu(false);
                setError("");
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="secure-account">
          <strong>{user.name}</strong>
          <small>{roleNames[user.role]}</small>
          <button type="button" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="secure-main">
        <header className="secure-header">
          <div>
            <p className="eyebrow">{roleNames[user.role]} · SIGAA</p>
            <h1>{navigation.find((n) => n[0] === view)?.[1]}</h1>
          </div>
          <button
            disabled={loading}
            onClick={() => refresh().catch((e) => setError(e.message))}
          >
            {loading ? "Actualizando…" : "Actualizar datos"}
          </button>
        </header>
        <Notice text={error} error />
        {view === "summary" && (
          <>
            <section className="secure-welcome">
              <span>Tu comunidad, conectada.</span>
              <h2>Hola, {user.name.split(" ")[0]}.</h2>
              <p>
                Los registros de este espacio provienen de PostgreSQL y se
                limitan a los permisos de tu cuenta.
              </p>
            </section>
            <div className="secure-metrics">
              {[
                ["Cursos", data.courses.length],
                ["Estudiantes", data.students.length],
                [
                  "Matrículas activas",
                  data.enrollments.filter((m) => m.status === "activa").length,
                ],
              ].map(([label, value]) => (
                <article className="panel" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
            <section className="panel">
              <h2>Base del sistema · Sprint 3</h2>
              <p>
                Acceso personal, permisos, estudiantes y matrículas
                persistentes.
              </p>
              <p>
                Los módulos de asistencia, alertas y edición de notas del
                prototipo siguen en desarrollo. No se mezclan sus datos de
                demostración con estos registros.
              </p>
            </section>
          </>
        )}
        {view === "students" && (
          <Students
            rows={data.students}
            admin={admin}
            onRefresh={refresh}
            onError={setError}
          />
        )}
        {view === "courses" && (
          <section className="panel">
            <h2>{student ? "Mis cursos" : "Cursos autorizados"}</h2>
            {data.courses.length ? (
              <div className="secure-list">
                {data.courses.map((c) => (
                  <article key={c.id}>
                    <div>
                      <strong>{c.name}</strong>
                      <small>
                        {c.period} · {c.status}
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-state">No tienes cursos asignados.</p>
            )}
          </section>
        )}
        {view === "enrollments" && (
          <Enrollments
            rows={data.enrollments}
            students={data.students}
            courses={data.courses}
            admin={admin}
            onRefresh={refresh}
            onError={setError}
          />
        )}
        {view === "grades" && (
          <section className="panel">
            <h2>Notas publicadas</h2>
            {data.grades.length ? (
              <div className="secure-list">
                {data.grades.map((g, i) => (
                  <article key={i}>
                    <div>
                      <strong>{g.subject}</strong>
                      <small>{g.evaluation}</small>
                    </div>
                    <strong>{Number(g.value).toFixed(1)}</strong>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                Aún no tienes notas publicadas. No se muestran calificaciones de
                ejemplo.
              </p>
            )}
          </section>
        )}
        {view === "security" && (
          <Security onLogout={clearSession} onError={setError} />
        )}
        <footer className="secure-footer">
          SIGAA · Acceso personal · Datos persistentes
        </footer>
      </main>
    </div>
  );
}
