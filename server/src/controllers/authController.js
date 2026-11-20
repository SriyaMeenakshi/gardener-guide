import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";
import { jwtSecret, jwtExpiresIn } from "../config/env.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { googleClientId, verifyGoogleCredential } from "../services/googleAuth.js";

const BCRYPT_ROUNDS = 12;

const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(254);

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(60, "Name is too long"),
  email,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"), // bcrypt ignores everything past 72 bytes
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required").max(72),
});

const signToken = (user) => jwt.sign({ sub: user._id.toString(), role: user.role }, jwtSecret(), { algorithm: "HS256", expiresIn: jwtExpiresIn() });

// A real hash to compare against when the email isn't found, so "no such user" takes as long as
// "wrong password" and response timing doesn't reveal which emails are registered.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", BCRYPT_ROUNDS);

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.exists({ email })) return res.status(409).json({ message: "An account with that email already exists" });

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  let user;
  try {
    user = await User.create({ name, email, passwordHash }); // role is never taken from the request
  } catch (err) {
    // Two simultaneous sign-ups can both pass the check above; the unique index catches the loser.
    if (err.code === 11000) return res.status(409).json({ message: "An account with that email already exists" });
    throw err;
  }

  res.status(201).json({ token: signToken(user), user: user.toPublic() });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+passwordHash");

  // A Google-only account has no password hash; compare against the dummy so it behaves (and takes as long as) a wrong password.
  const hash = user?.passwordHash || DUMMY_HASH;
  const valid = await bcrypt.compare(password, hash);
  if (!user?.passwordHash || !valid) return res.status(401).json({ message: "Invalid email or password" });

  res.json({ token: signToken(user), user: user.toPublic() });
});

export const googleSchema = z.object({ credential: z.string().min(20, "Missing Google credential").max(4096, "Google credential is too long") });

// GET /api/auth/providers: which sign-in options this server offers (lets the website show the Google button only when it works)
export const providers = (req, res) => res.json({ google: googleClientId() ? { clientId: googleClientId() } : null });

// POST /api/auth/google  { credential }
export const googleLogin = asyncHandler(async (req, res) => {
  if (!googleClientId()) return res.status(503).json({ message: "Google sign-in isn't set up on this server" });

  let profile;
  try {
    profile = await verifyGoogleCredential(req.body.credential);
  } catch {
    return res.status(401).json({ message: "Google sign-in failed. Please try again." });
  }
  if (!profile?.sub || !profile.email) return res.status(401).json({ message: "Google sign-in failed. Please try again." });
  if (!profile.emailVerified) return res.status(401).json({ message: "Your Google email address isn't verified." });

  const email = profile.email.trim().toLowerCase();
  let user = await User.findOne({ googleId: profile.sub });
  if (!user) {
    // Never silently merge with an existing password account: we don't verify emails at sign-up, so someone could have
    // registered this address first and would then share the account.
    if (await User.exists({ email })) {
      return res.status(409).json({ message: "An account with this email already exists. Please log in with your email and password." });
    }
    try {
      user = await User.create({ name: (profile.name?.trim() || email.split("@")[0]).slice(0, 60), email, googleId: profile.sub });
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ message: "An account with this email already exists. Please log in with your email and password." });
      throw err;
    }
  }

  res.json({ token: signToken(user), user: user.toPublic() });
});

// GET /api/auth/me
export const me = (req, res) => res.json({ user: req.user.toPublic() });
