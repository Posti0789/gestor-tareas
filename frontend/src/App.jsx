import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api/tareas";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  async function cargar() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error();
      setTareas(await res.json());
      setError("");
    } catch {
      setError("No se pudo conectar con la API");
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function añadir(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    setTitulo("");
    cargar();
  }

  async function alternar(t) {
    await fetch(`${API}/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: t.titulo, completada: !t.completada }),
    });
    cargar();
  }

  async function borrar(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargar();
  }

  return (
    <main className="app">
      <h1>Gestor de tareas</h1>

      <form onSubmit={añadir} className="nueva">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t.id} className={t.completada ? "hecha" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.completada}
                onChange={() => alternar(t)}
              />
              <span>{t.titulo}</span>
            </label>
            <button onClick={() => borrar(t.id)} aria-label="Borrar">✕</button>
          </li>
        ))}
      </ul>

      {!error && tareas.length === 0 && <p className="vacio">No hay tareas todavía.</p>}
    </main>
  );
}