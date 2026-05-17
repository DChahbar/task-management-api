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

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build
