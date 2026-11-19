import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { jwtSecret } from "../config/env.js";
import { asyncHandler } from "./errorHandler.js";

const unauthorized = (message = "Authentication required") => Object.assign(new Error(message), { status: 401 });

// Verifies "Authorization: Bearer <token>" and attaches the user to req.user.
export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) throw unauthorized();

  let payload;
  try {
    // Pin the algorithm so a token can't pick its own (e.g. "none").
    payload = jwt.verify(token, jwtSecret(), { algorithms: ["HS256"] });
  } catch {
    throw unauthorized("Invalid or expired token");
  }

  // Re-load the user so deleted accounts and role changes take effect immediately.
  const user = await User.findById(payload.sub);
  if (!user) throw unauthorized("Account no longer exists");
  req.user = user;
  next();
});

export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(Object.assign(new Error("You don't have permission to do that"), { status: 403 }));
    }
    next();
  };
