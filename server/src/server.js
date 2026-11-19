import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { jwtSecret } from "./config/env.js";

const port = process.env.PORT || 5000;

try {
  jwtSecret(); // fail fast on a missing or weak secret
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
} catch (err) {
  console.error("Failed to start server:", err.message);
  process.exit(1);
}
