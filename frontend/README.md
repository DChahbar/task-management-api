# Task Management Frontend

React + TypeScript + Vite + Tailwind CSS client for the Task Management API.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Start the API from the repo root (`uvicorn app.main:app --reload`) before signing in.

Dev server: http://localhost:5173

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/login` | Login |
| `/register` | Register |
| `/dashboard` | Dashboard |
| `/tasks/new` | Create task |
| `/tasks/:taskId/edit` | Edit task |

Task pages call `GET/POST/PATCH/DELETE /tasks` with the stored JWT.

## Production build

```bash
cp .env.production.example .env.production
# Edit VITE_API_URL, then:
npm run build
npm run preview   # http://localhost:4173
```

For Docker-based deployment, see [DEPLOYMENT.md](../DEPLOYMENT.md) in the repo root.

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build
