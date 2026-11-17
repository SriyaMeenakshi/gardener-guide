import { useEffect, useState } from "react";
import { apiGet } from "../api/client";

// Fetches `path` whenever it changes. Returns { data, loading, error }.
// Pass path = null to skip. Stale responses are aborted so fast filter changes can't show old data.
export default function useApi(path) {
  const [state, setState] = useState({ data: null, loading: Boolean(path), error: null });

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    apiGet(path, { signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ data: null, loading: false, error });
      });
    return () => controller.abort();
  }, [path]);

  return state;
}
