# Gestor de tareas

Aplicación web para gestionar tareas: crear, marcar como completadas y borrar.
Proyecto personal full stack con API REST, base de datos en contenedor y frontend en React.

## Tecnologías

- **Backend:** Java 21, Spring Boot, Spring Data JPA, Bean Validation
- **Base de datos:** PostgreSQL 17 (Docker Compose)
- **Frontend:** React con Vite
- **Herramientas:** Maven, Git, Docker

## Requisitos

- Java 21
- Node.js (LTS)
- Docker Desktop

## Cómo arrancarlo

1. Levanta la base de datos:

   ```bash
   docker compose up -d
   ```

2. Arranca el backend (http://localhost:8080):

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

   En Windows PowerShell: `.\mvnw.cmd spring-boot:run`

3. Arranca el frontend (http://localhost:5173):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tareas` | Lista todas las tareas |
| POST | `/api/tareas` | Crea una tarea |
| PUT | `/api/tareas/{id}` | Actualiza una tarea |
| DELETE | `/api/tareas/{id}` | Borra una tarea |

Ejemplo de cuerpo para crear o actualizar:

```json
{ "titulo": "Mi tarea", "completada": false }
```

## Estructura

```
gestor-tareas/
├── backend/             API REST con Spring Boot
├── frontend/            Interfaz en React
└── docker-compose.yml   Base de datos PostgreSQL
```

## Próximos pasos

- Tests con JUnit
- Dockerfile para backend y frontend
- Integración continua con GitHub Actions
- Despliegue online