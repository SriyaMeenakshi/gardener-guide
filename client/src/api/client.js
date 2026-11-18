// Single place that knows where the API lives.
// In dev, Vite proxies /api to the Express server; in production set VITE_API_URL.
import { getToken } from "./token";

const BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, { method = "GET", body, signal, token = getToken() } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const apiGet = (path, opts) => request(path, opts);
export const apiPost = (path, body, opts) => request(path, { ...opts, method: "POST", body });
