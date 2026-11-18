import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Never returned by default; queries must opt in with .select("+passwordHash").
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Public shape of a user: never includes the password hash.
userSchema.methods.toPublic = function () {
  return { id: this._id.toString(), name: this.name, email: this.email, role: this.role };
};

export default mongoose.model("User", userSchema);
