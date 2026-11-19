// Writes web-sized copies of the site's images from <src> to <dest>, keeping every file name and folder
// (so image paths stored in the database stay valid). Phone-camera originals are several MB each; for a website
// 1400 px on the long edge is plenty. EXIF metadata (including GPS location) is dropped.
//
// Usage (from /server):  node scripts/optimize-images.mjs ../public ../client/public
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [src, dest] = process.argv.slice(2).map((p) => path.resolve(p));
if (!src || !dest) {
  console.error("Usage: node scripts/optimize-images.mjs <srcDir> <destDir>");
  process.exit(1);
}

const MAX_EDGE = 1400;
const files = [];
(async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else files.push(p);
  }
})(src).then(run);

async function optimise(file) {
  const rel = path.relative(src, file);
  const out = path.join(dest, rel);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const ext = path.extname(file).toLowerCase();
  const resize = { width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true };

  if (ext === ".jpg" || ext === ".jpeg") {
    await sharp(file).rotate().resize(resize).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  } else if (ext === ".png") {
    await sharp(file).rotate().resize(resize).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(out);
  } else {
    await fs.copyFile(file, out); // svg and anything else is copied untouched
  }
  const [before, after] = (await Promise.all([fs.stat(file), fs.stat(out)])).map((s) => s.size);
  return { rel, before, after };
}

async function run() {
  const results = [];
  for (let i = 0; i < files.length; i += 2) {
    results.push(...(await Promise.all(files.slice(i, i + 2).map(optimise)))); // 2 at a time keeps memory low
  }
  const mb = (n) => (n / 1048576).toFixed(1);
  const before = results.reduce((a, r) => a + r.before, 0);
  const after = results.reduce((a, r) => a + r.after, 0);
  console.log(`${results.length} files: ${mb(before)} MB -> ${mb(after)} MB (${Math.round((1 - after / before) * 100)}% smaller)`);
  console.log("largest results:", results.sort((a, b) => b.after - a.after).slice(0, 4).map((r) => `${r.rel} ${mb(r.after)} MB`).join(" | "));
}
