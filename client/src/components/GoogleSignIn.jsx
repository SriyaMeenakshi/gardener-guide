import { useEffect, useRef, useState } from "react";
import { apiGet } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { loadGoogleScript } from "../lib/google";

// "Continue with Google". Shown only when the server says Google sign-in is set up.
// Google renders its own button; when the person approves, it hands us a signed credential that the server verifies.
export default function GoogleSignIn() {
  const { loginWithGoogle } = useAuth();
  const [clientId, setClientId] = useState(null);
  const [error, setError] = useState("");
  const box = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    apiGet("/auth/providers", { signal: controller.signal })
      .then((p) => setClientId(p.google?.clientId ?? null))
      .catch(() => {}); // no Google button is fine; email + password still works
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!clientId || !box.current) return;
    let cancelled = false;
    loadGoogleScript()
      .then(() => {
        if (cancelled || !box.current) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            setError("");
            try {
              await loginWithGoogle(response.credential);
            } catch (err) {
              setError(err.message || "Google sign-in failed. Please try again.");
            }
          },
        });
        box.current.replaceChildren(); // never stack two buttons if this effect runs twice
        window.google.accounts.id.renderButton(box.current, { theme: "outline", size: "large", text: "continue_with", shape: "rectangular", width: 320 });
      })
      .catch(() => !cancelled && setError("Couldn't load Google sign-in. Check your connection or ad blocker."));
    return () => {
      cancelled = true;
    };
  }, [clientId, loginWithGoogle]);

  if (!clientId) return null;
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 text-sm text-stone-500" aria-hidden="true">
        <span className="h-px flex-1 bg-stone-300" />
        or
        <span className="h-px flex-1 bg-stone-300" />
      </div>
      <div ref={box} className="mt-4 flex justify-center min-h-[44px]" />
      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-clay-700">
          {error}
        </p>
      )}
    </div>
  );
}
