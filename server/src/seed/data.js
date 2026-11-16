// Seed data migrated from v1 (data/*.ts and app/plants/tomato/page.tsx).
// sunlight / water / difficulty are reasonable defaults added for v2 filters; review them.
// Only Tomato has full article content so far; the other plants' articles are still in
// app/plants/<slug>/page.tsx and get migrated using Tomato as the template.

export const plants = [
  { name: "Rose", slug: "rose", category: "flowering", image: "/plants/rose.jpg", sunlight: "full", water: "moderate", difficulty: "medium" },
  { name: "Hibiscus", slug: "hibiscus", category: "flowering", image: "/plants/hibiscus.jpg", sunlight: "full", water: "moderate", difficulty: "easy" },
  { name: "Marigold", slug: "marigold", category: "flowering", image: "/plants/marigold.jpg", sunlight: "full", water: "low", difficulty: "easy" },
  { name: "Tulasi", slug: "tulasi", category: "medicinal", image: "/plants/tulasi.jpg", sunlight: "full", water: "moderate", difficulty: "easy" },
  { name: "Mint", slug: "mint", category: "medicinal", image: "/plants/mint.jpg", sunlight: "partial", water: "high", difficulty: "easy" },
  { name: "Aloe Vera", slug: "aloevera", category: "medicinal", image: "/plants/aloevera.jpg", sunlight: "partial", water: "low", difficulty: "easy" },
  {
    name: "Tomato",
    slug: "tomato",
    category: "kitchen",
    image: "/plants/tomato.jpg",
    sunlight: "full",
    water: "moderate",
    difficulty: "medium",
    description:
      "Tomatoes are the crown jewel of the home vegetable garden. Whether you plant in a backyard bed or in pots on a sunny balcony, nothing compares to a warm, sun-ripened, homegrown tomato.",
    soil: "Rich, well-draining soil loaded with compost. Tomatoes root along their buried stems; give support early with stakes, cages or trellises.",
    varieties: [
      { name: "Cherry Tomatoes", image: "/plants/tomato/cherrytomato.jpg", description: "Sweet, bite-sized and prolific. The easiest variety for containers or hanging baskets." },
      { name: "Roma (Plum) Tomatoes", image: "/plants/tomato/roma.jpg", description: "Dense, meaty and low in water content. Best for sauces, pastes and canning." },
      { name: "Beefsteak Tomatoes", image: "/plants/tomato/beefstack.jpg", description: "Large, juicy and ribbed. Great for slicing; needs sturdy staking and patience." },
    ],
    commonProblems: [
      { title: "Blossom End Rot", cause: "Calcium deficiency, usually triggered by inconsistent watering.", fix: "Water regularly and add crushed eggshells or a calcium supplement to the soil." },
      { title: "Early & Late Blight", cause: "Fungal disease; yellowing leaves with brown spots from the bottom of the plant.", fix: "Remove affected leaves, water only at the base, mulch to stop soil splash and keep air circulating." },
      { title: "Tomato Hornworms", cause: "Large green caterpillars that can defoliate a plant overnight.", fix: "Handpick them off, or use an organic Bt (Bacillus thuringiensis) spray." },
    ],
    videoUrl: "https://youtu.be/eySTo2GgvoY?si=d4VXjei9J2hBMIOa",
  },
  { name: "Chilli", slug: "chilli", category: "kitchen", image: "/plants/chilli.jpg", sunlight: "full", water: "moderate", difficulty: "easy" },
  { name: "Coriander", slug: "coriander", category: "kitchen", image: "/plants/coriander.jpg", sunlight: "partial", water: "moderate", difficulty: "easy" },
  { name: "Lemon", slug: "lemon", category: "fruit", image: "/plants/lemon.jpg", sunlight: "full", water: "moderate", difficulty: "medium" },
  { name: "Guava", slug: "guava", category: "fruit", image: "/plants/guava.jpg", sunlight: "full", water: "moderate", difficulty: "easy" },
  { name: "Papaya", slug: "papaya", category: "fruit", image: "/plants/papaya.jpg", sunlight: "full", water: "high", difficulty: "medium" },
];

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
