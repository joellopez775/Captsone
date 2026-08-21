import { useEffect, useState } from "react";

const initialState = { status: "checking", database: null, message: "Verificando servicios…" };

export default function App() {
  const [system, setSystem] = useState(initialState);

  useEffect(() => {
    async function checkSystem() {
      try {
        const [apiResponse, dbResponse] = await Promise.all([
          fetch("/api/health"),
          fetch("/api/db-health"),
        ]);

        if (!apiResponse.ok || !dbResponse.ok) {
          throw new Error("Uno de los servicios no respondió correctamente");
        }

        const database = await dbResponse.json();
        setSystem({
          status: "ready",
          database: database.database,
          message: "Entorno SIGAA operativo",
        });
      } catch (error) {
        setSystem({
          status: "error",
          database: null,
          message: error.message,
        });
      }
    }

    checkSystem();
  }, []);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Sistema Integral de Gestión Académica</p>
          <h1>Información clara para actuar a tiempo.</h1>
          <p className="summary">
            Esta primera versión valida que la aplicación web, la API y PostgreSQL
            pueden ejecutarse juntos mediante Docker.
          </p>
        </div>
        <div className={`status status--${system.status}`} role="status">
          <span className="status__dot" aria-hidden="true" />
          <div>
            <strong>{system.message}</strong>
            <small>{system.database ? `Base de datos: ${system.database}` : "Esperando conexión"}</small>
          </div>
        </div>
      </section>

      <section className="grid" aria-label="Módulos planificados">
        <article><span>01</span><h2>Gestión académica</h2><p>Estudiantes, matrículas, notas y asistencia.</p></article>
        <article><span>02</span><h2>Alertas explicables</h2><p>Reglas visibles, severidad y evidencia.</p></article>
        <article><span>03</span><h2>Seguimiento</h2><p>Responsables, intervenciones e historial.</p></article>
        <article><span>04</span><h2>Indicadores</h2><p>Dashboard, reportes y auditoría.</p></article>
      </section>
    </main>
  );
}
