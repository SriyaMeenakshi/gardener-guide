// Seed data migrated from v1. Long articles live in their own files; DIY projects are small enough to stay here.
export { plants } from "./plants.js";
export { careGuides } from "./care.js";
export { methods } from "./methods.js";
export { diseases } from "./diseases.js";

const yt = (id, qs) => ({ image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, link: `https://youtu.be/${id}?si=${qs}` });

export const diyProjects = [
  { title: "🐦 Bird House", description: "Build a cozy bird house for your garden.", ...yt("JaB36ePMnZs", "oj7ChV4npI85flZR") },
  { title: "💧 Bird Water Bowl", description: "Create a water station for birds.", ...yt("q6EitavSRNg", "DU0Uy3EDfHXb9QOq") },
  { title: "🌾 Bird Feeder", description: "DIY feeder using recycled materials.", ...yt("7yV6V6rtpyc", "HTGy7QIZK4J-KQZ0") },
  { title: "🪴 Drip Irrigation", description: "Simple bottle drip watering system.", ...yt("g3qxcStgvFY", "Zp6XJGnDa96tjWGI") },
  { title: "🏡 Balcony Decoration", description: "Beautify your balcony garden.", ...yt("LPDJR0gvxb8", "AdamZlyRfmWkt3Ub") },
  { title: "🎋 Garden Swing", description: "Build a relaxing garden swing.", ...yt("Mx3cIMsva4g", "xYZuRLxfU7ZaB_WJ") },
];
