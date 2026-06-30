# Modern Stack Starter

A content-first site built with a modern Python + JavaScript stack:

- **Frontend:** Astro 5 + React islands (TypeScript). Content lives as
  typed Markdown; the site ships almost zero JS except where you add an
  interactive React component.
- **Backend:** FastAPI (Python 3.12). A small typed API the frontend
  calls for anything dynamic.

The two talk over HTTP. The home page has a React "island" that fetches
live data from the FastAPI `/api/status` endpoint — that's the seam
where your JavaScript meets your Python.

## Project layout

```
modern-stack-starter/
├── frontend/                  # Astro + React
│   └── src/
│       ├── content/blog/      # Markdown posts (your content)
│       ├── content.config.ts  # Typed schema for the content
│       ├── components/        # React islands (.tsx)
│       ├── layouts/           # Shared page shells (.astro)
│       └── pages/             # Routes (.astro)
└── backend/                   # FastAPI
    ├── main.py
    └── requirements.txt
```

## Running it locally

You need two terminals — one per service.

**Terminal 1 — backend (Python):**
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Terminal 2 — frontend (JS):**
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:4321. The home page should show a box with live
data fetched from the Python API. If it shows an error, the backend
isn't running.

## Where to go next (learning path)

1. **Add content:** drop more `.md` files in `frontend/src/content/blog/`.
   No code needed — the schema validates them automatically.
2. **Add an interactive feature:** build a new React component in
   `components/`, embed it in a page with `client:load`.
3. **Add a real API feature:** a contact form handler, a search
   endpoint, a database query — all new routes in `backend/main.py`.
4. **Add a database** when you actually need one (Postgres via SQLModel
   or SQLAlchemy on the Python side).

## Deploying (cheap)

- **Frontend** → Vercel or Netlify (free). It builds to static files.
- **Backend** → Railway or Render (free tier, then a few €/month).
- Set the frontend's `PUBLIC_API_URL` env var to your deployed backend
  URL so the React island calls the right place.

Don't deploy until the local version does what you want. And if you go
weeks without touching `backend/main.py`, that's a signal you may not
need the Python half yet — the static frontend can stand alone.
