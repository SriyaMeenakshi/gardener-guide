import { Router } from "express";
import rateLimit from "express-rate-limit";
import { register, login, me, registerSchema, loginSchema, googleLogin, googleSchema, providers } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

// Slow down password guessing and account spam. Only failed/any attempts on these two routes count.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.AUTH_RATE_LIMIT) || 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again in a few minutes." },
});

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/google", authLimiter, validate(googleSchema), googleLogin);
router.get("/providers", providers);
router.get("/me", requireAuth, me);

export default router;
