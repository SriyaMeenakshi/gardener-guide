// Seed data migrated from v1 (data/*.ts). Plant articles live in plants.js.
export { plants } from "./plants.js";


export const careGuides = [
  { title: "Watering Guide", slug: "watering", icon: "/icons/watering.svg", description: "Learn how to water your plants properly to prevent root rot and wilting." },
  { title: "Sunlight", slug: "sunlight", icon: "/icons/sunshine.svg", description: "Understand sunlight requirements." },
  { title: "Soil", slug: "soil", icon: "/icons/soil.svg", description: "Choose the right soil for healthy plants." },
  { title: "Fertilizer", slug: "fertilizer", icon: "/icons/fertilizer.svg", description: "Discover the best fertilizers for your plants." },
  { title: "Pruning", slug: "pruning", icon: "/icons/pruning.svg", description: "Learn how to prune your plants effectively." },
  { title: "Pest Control", slug: "pestcontrol", icon: "/icons/pest.svg", description: "Discover effective methods for controlling pests in your garden." },
];

export const methods = [
  { name: "Horticulture", slug: "horticulture", image: "/methods/horticulture.jpg" },
  { name: "Terrace Gardening", slug: "terrace-gardening", image: "/methods/terracegardening.jpg" },
  { name: "Drip Irrigation", slug: "drip-irrigation", image: "/methods/dripirrigation.jpg" },
  { name: "Vertical Gardening", slug: "vertical-gardening", image: "/methods/vertical.jpg" },
  { name: "Organic Gardening", slug: "organic-gardening", image: "/methods/organic.jpg" },
  { name: "Hydroponics", slug: "hydroponics", image: "/methods/hydroponics.jpg" },
];

const yt = (id, qs) => ({ image: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, link: `https://youtu.be/${id}?si=${qs}` });

export const diyProjects = [
  { title: "🐦 Bird House", description: "Build a cozy bird house for your garden.", ...yt("JaB36ePMnZs", "oj7ChV4npI85flZR") },
  { title: "💧 Bird Water Bowl", description: "Create a water station for birds.", ...yt("q6EitavSRNg", "DU0Uy3EDfHXb9QOq") },
  { title: "🌾 Bird Feeder", description: "DIY feeder using recycled materials.", ...yt("7yV6V6rtpyc", "HTGy7QIZK4J-KQZ0") },
  { title: "🪴 Drip Irrigation", description: "Simple bottle drip watering system.", ...yt("g3qxcStgvFY", "Zp6XJGnDa96tjWGI") },
  { title: "🏡 Balcony Decoration", description: "Beautify your balcony garden.", ...yt("LPDJR0gvxb8", "AdamZlyRfmWkt3Ub") },
  { title: "🎋 Garden Swing", description: "Build a relaxing garden swing.", ...yt("Mx3cIMsva4g", "xYZuRLxfU7ZaB_WJ") },
];
