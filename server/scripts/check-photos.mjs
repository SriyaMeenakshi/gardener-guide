// Lists which plants still need photos. A plant's card photo (and its page banner) is expected at
// client/public/<image path>, e.g. client/public/plants/snakeplant.jpg. The website shows a leaf placeholder until
// the file exists, then picks the photo up automatically.
//
// Usage (from /server):  npm run photos:check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { plants } from "../src/seed/data.js";

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/public");
const has = (rel) => fs.existsSync(path.join(publicDir, rel));

const missing = [];
const complete = [];
for (const p of plants) {
  const wanted = [p.image, p.heroImage, ...(p.varieties ?? []).map((v) => v.image)].filter(Boolean);
  const absent = wanted.filter((rel) => !has(rel));
  (absent.length ? missing : complete).push({ p, absent });
}

console.log(`${complete.length} of ${plants.length} plants have all their photos.`);
if (missing.length) {
  console.log("\nStill need a photo:");
  for (const { p, absent } of missing) console.log(`  ${p.name.padEnd(22)} -> client/public${absent[0]}${absent.length > 1 ? `  (+${absent.length - 1} more)` : ""}`);
  console.log("\nTips: use a landscape photo (about 4:3), JPEG, at least 1200 px wide. To shrink big camera photos first, run:");
  console.log("  node scripts/optimize-images.mjs <folder with your photos> ../client/public/plants");
}
