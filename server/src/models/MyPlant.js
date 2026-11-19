import mongoose from "mongoose";

const myPlantSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
    nickname: { type: String, trim: true, maxlength: 60, default: "" },
    plantedOn: { type: Date, default: Date.now },
    wateringEveryDays: { type: Number, required: true, min: 1, max: 60, validate: Number.isInteger },
    // null until the first time the user marks it watered; the schedule then counts from plantedOn.
    lastWateredAt: { type: Date, default: null },
    notes: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true }
);

const DAY_MS = 24 * 60 * 60 * 1000;

myPlantSchema.virtual("nextWateringAt").get(function () {
  const base = this.lastWateredAt || this.plantedOn;
  return new Date(base.getTime() + this.wateringEveryDays * DAY_MS);
});

myPlantSchema.set("toJSON", { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret.id; return ret; } });

export default mongoose.model("MyPlant", myPlantSchema);
