// Single place that knows where the API lives.
// In dev, Vite proxies /api to the Express server; in production set VITE_API_URL.
const BASE = import.meta.env.VITE_API_URL || "/api";

export async function apiGet(path, { signal } = {}) {
  const res = await fetch(`${BASE}${path}`, { signal });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}
