import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import { diagnose, history, removeDiagnosis } from "../controllers/diagnoseController.js";

const router = Router();
router.use(requireAuth);

// Each analysis costs real money, so cap it per signed-in user (not per IP, which many users can share).
const diagnoseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.DIAGNOSE_RATE_LIMIT) || 10,
  keyGenerator: (req) => req.user.id,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "You've reached the hourly limit for photo checks. Please try again later." },
});

router.post("/", diagnoseLimiter, uploadImage, diagnose);
router.get("/history", history);
router.delete("/:id", removeDiagnosis);

export default router;
