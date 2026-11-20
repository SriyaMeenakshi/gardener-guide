import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Never returned by default; queries must opt in with .select("+passwordHash").
    // Accounts created through "Sign in with Google" have no password, only a googleId.
    passwordHash: { type: String, select: false, required: function () { return !this.googleId; } },
    // Google's permanent, unique id for the person (the "sub" claim). Unique where present; the email can change, this can't.
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Public shape of a user: never includes the password hash.
userSchema.methods.toPublic = function () {
  return { id: this._id.toString(), name: this.name, email: this.email, role: this.role };
};

export default mongoose.model("User", userSchema);
