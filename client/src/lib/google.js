// Loads Google's sign-in script once, only when it is needed. Rejects if it can't load (offline, blocked by an ad blocker).
const SRC = "https://accounts.google.com/gsi/client";
let loading = null;

export function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null; // allow a retry
      script.remove();
      reject(new Error("Google sign-in script failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}
