import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Behind a hosting proxy (Render, Vercel, ...) every request appears to come from the proxy's IP unless we trust
// its X-Forwarded-For header. Without this, the rate limits would be shared by ALL visitors.
if (process.env.NODE_ENV === "production") app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS) || 1);

app.use(helmet());
// CLIENT_ORIGIN may list several sites, comma-separated (e.g. the production site and a preview URL).
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map((s) => s.trim()).filter(Boolean) }));
app.use(express.json({ limit: "100kb" }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
