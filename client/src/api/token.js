// The JWT lives in localStorage so a refresh keeps you signed in.
// Trade-off: any script running on the page can read it, so the app must never inject untrusted HTML (no dangerouslySetInnerHTML).
// Every access is wrapped because storage can be blocked (private mode, disabled cookies).
const KEY = "gg_token";

export const getToken = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(KEY, token);
  } catch {
    /* storage unavailable: the user stays signed in for this page view only */
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
};
