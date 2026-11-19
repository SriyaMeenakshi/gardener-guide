import multer from "multer";

// Base64 inflates data by 4/3 and the vision API caps an image at 5 MB, so 3.5 MiB of raw bytes stays safely under it.
export const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024;

// Identify the real image type from its first bytes. A client-supplied Content-Type or filename proves nothing.
export function sniffImageType(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.length >= 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null; // GIF and everything else is not accepted
}

const parser = multer({
  storage: multer.memoryStorage(), // the photo is analysed and discarded; it is never written to disk
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1, fields: 0, parts: 2 },
}).single("image");

const badRequest = (message, status = 400) => Object.assign(new Error(message), { status });

// Express middleware: parses one image from the "image" form field, verifies it, and sets req.image = { buffer, mediaType }.
export function uploadImage(req, res, next) {
  parser(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") return next(badRequest(`That image is too large. The limit is ${(MAX_IMAGE_BYTES / 1024 / 1024).toFixed(1)} MB.`, 413));
      if (err.code === "LIMIT_UNEXPECTED_FILE") return next(badRequest('Upload one image in the "image" field.'));
      if (err instanceof multer.MulterError || /multipart|boundary|form/i.test(err.message)) return next(badRequest("Upload the photo as multipart form data."));
      return next(err);
    }
    if (!req.file) return next(badRequest("Please choose a photo to upload."));
    if (req.file.size === 0) return next(badRequest("That file is empty. Please choose a photo."));

    const mediaType = sniffImageType(req.file.buffer);
    if (!mediaType) return next(badRequest("Unsupported image. Please use a JPEG, PNG or WebP photo.", 415));

    req.image = { buffer: req.file.buffer, mediaType };
    next();
  });
}
