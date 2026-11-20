import { OAuth2Client } from "google-auth-library";

// "Sign in with Google" sends the browser a signed ID token. We never trust what the browser says it contains:
// the library checks the token's signature against Google's public keys, that it was issued for OUR app (audience),
// that it is not expired, and that it really came from Google.

export const googleClientId = () => process.env.GOOGLE_CLIENT_ID?.trim() || null;

let client = null;

async function defaultVerifier(credential) {
  const clientId = googleClientId();
  client ??= new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
  const p = ticket.getPayload();
  return { sub: p.sub, email: p.email, emailVerified: p.email_verified === true, name: p.name };
}

let verifier = defaultVerifier;

/** Returns { sub, email, emailVerified, name } or throws if the credential is invalid. */
export const verifyGoogleCredential = (credential) => verifier(credential);

// Tests inject a fake here so they never need a real Google token.
export const setGoogleVerifier = (fn) => {
  verifier = fn ?? defaultVerifier;
};
