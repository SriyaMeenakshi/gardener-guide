import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { apiGet, apiPost } from "../api/client";
import { getToken, setToken, clearToken } from "../api/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // True until we know whether a stored token is still valid, so pages don't flash "logged out".
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) return;
    const controller = new AbortController();
    apiGet("/auth/me", { signal: controller.signal })
      .then((data) => setUser(data.user))
      .catch((err) => {
        if (err.name === "AbortError") return;
        // Only a 401 means the token is bad. A network blip shouldn't sign you out.
        if (err.status === 401) clearToken();
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const finishAuth = useCallback((data) => {
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(async (email, password) => finishAuth(await apiPost("/auth/login", { email, password })), [finishAuth]);
  const register = useCallback(
    async (name, email, password) => finishAuth(await apiPost("/auth/register", { name, email, password })),
    [finishAuth]
  );
  const loginWithGoogle = useCallback(async (credential) => finishAuth(await apiPost("/auth/google", { credential })), [finishAuth]);
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, loginWithGoogle, logout }), [user, loading, login, register, loginWithGoogle, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
