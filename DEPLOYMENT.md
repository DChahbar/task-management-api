# Deployment Guide

This project can run locally with Docker Compose or be deployed as separate API and static frontend services.

## Architecture

| Service | Role | Default port |
|---------|------|----------------|
| `api` | FastAPI + SQLite | 8000 |
| `web` | Nginx serving the React build | 8080 |

The frontend is built with `VITE_API_URL` pointing at your API. CORS on the API must allow your frontend origin.

---

## Docker Compose (recommended for demos)

### Prerequisites

- Docker Desktop (or Docker Engine + Compose)

### Steps

1. Copy environment file:

   ```bash
   cp .env.docker.example .env
   ```

2. Edit `.env` — set a strong `SECRET_KEY` (32+ random characters).

3. Build and start:

   ```bash
   docker compose up --build
   ```

4. Open the app:

   - Frontend: http://localhost:8080
   - API docs: http://localhost:8000/docs
   - Health: http://localhost:8000/health

5. Stop:

   ```bash
   docker compose down
   ```

Database files persist in the `api_data` Docker volume.

---

## Manual production build

### Backend

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements-prod.txt
cp .env.example .env        # configure SECRET_KEY and CORS_ORIGINS
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
cp .env.example .env        # set VITE_API_URL to your public API URL
npm ci
npm run build
```

Serve `frontend/dist` with any static host (Nginx, Vercel, Netlify, S3 + CloudFront, etc.).

Example Nginx config is in `frontend/nginx.conf`.

---

## Environment variables

### API (`.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLAlchemy URL (`sqlite:///./data/task_management.db` in Docker) |
| `SECRET_KEY` | JWT signing secret — **must be strong in production** |
| `ALGORITHM` | JWT algorithm (default `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token lifetime |
| `CORS_ORIGINS` | Comma-separated frontend URLs |

### Frontend (build-time)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Public base URL of the API (e.g. `https://api.example.com`) |

Rebuild the frontend image or run `npm run build` after changing `VITE_API_URL`.

---

## Hosting suggestions

| Component | Options |
|-----------|---------|
| API | Railway, Render, Fly.io, AWS ECS, any VPS + Docker |
| Frontend | Vercel, Netlify, Cloudflare Pages, Nginx on VPS |
| Database | SQLite is fine for demos; use PostgreSQL for production scale |

For PostgreSQL, change `DATABASE_URL` and install a driver (e.g. `psycopg2-binary`) — schema is managed by Alembic.

---

## Health checks

- API: `GET /health` → `{"status":"ok"}`
- Web container: `GET /health` on port 80 (nginx)

Use these for load balancers and orchestrators.
