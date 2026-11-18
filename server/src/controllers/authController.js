import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";
import { jwtSecret, jwtExpiresIn } from "../config/env.js";
import { asyncHandler } from "../middleware/errorHandler.js";

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

  const valid = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !valid) return res.status(401).json({ message: "Invalid email or password" });

  res.json({ token: signToken(user), user: user.toPublic() });
});

// GET /api/auth/me
export const me = (req, res) => res.json({ user: req.user.toPublic() });
