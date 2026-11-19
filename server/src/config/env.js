// Auth settings, read lazily so tests can set env vars before first use.
export function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set to a random string of at least 32 characters (see .env.example).");
  }
  return secret;
}

export const jwtExpiresIn = () => process.env.JWT_EXPIRES_IN || "7d";
