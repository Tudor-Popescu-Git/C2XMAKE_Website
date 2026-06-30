from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Modern Stack API")

# CORS lets the Astro frontend (a different origin in dev) call this API.
# In production, replace "*" with your actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/status")
def status():
    return {
        "message": "Live data served from Python.",
        "server_time": datetime.now(timezone.utc).isoformat(),
        "powered_by": "FastAPI + Python 3.12",
    }
