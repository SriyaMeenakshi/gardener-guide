// Shrinks a photo in the browser before upload. Why:
//  - phone photos are 3-10 MB; the server accepts at most 3.5 MB, and plant problems are visible at 1600px
//  - smaller uploads are faster and cheaper to analyse
//  - re-encoding through a canvas drops EXIF metadata, including GPS location
// Always returns a JPEG blob.
export async function prepareImage(file, { maxEdge = 1600, quality = 0.85 } = {}) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file); // also applies the photo's rotation
  } catch {
    throw new Error("Couldn't read that image. Please use a JPEG, PNG or WebP photo.");
  }

  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff"; // transparent PNGs would otherwise turn black in a JPEG
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (!blob) throw new Error("Couldn't prepare that image. Please try another photo.");
  return blob;
}
