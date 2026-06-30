import { useEffect, useState } from 'react';

// This is a React "island": an interactive component embedded in an
// otherwise static Astro page. It hydrates in the browser and calls
// the FastAPI backend. This is the JS <-> Python seam.

const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000';

type Status = {
  message: string;
  server_time: string;
  powered_by: string;
};

export default function LatestStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/status`)
      .then((res) => {
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        return res.json();
      })
      .then((data: Status) => setStatus(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <p style={{ color: '#b00' }}>
        Couldn't reach the Python API ({error}). Is the backend running on{' '}
        {API_URL}?
      </p>
    );
  }

  if (!status) return <p>Loading live data from Python…</p>;

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <p><strong>{status.message}</strong></p>
      <p>Server time: {status.server_time}</p>
      <p><small>{status.powered_by}</small></p>
    </div>
  );
}
