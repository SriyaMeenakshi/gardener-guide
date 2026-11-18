// Care guides migrated from v1 (data/care.ts + app/plantcare/<slug>/page.tsx). Inline tags dropped (plain text).
// "Related" labels are normalised to one style; v1 used two slightly different ones.

const rel = {
  watering: { slug: "watering", label: "💧 Watering Guide" },
  sunlight: { slug: "sunlight", label: "☀️ Sunlight Guide" },
  soil: { slug: "soil", label: "🌱 Soil Guide" },
  fertilizer: { slug: "fertilizer", label: "🌿 Fertilizer Guide" },
};

export const careGuides = [
  {
    title: "Watering Guide",
    slug: "watering",
    icon: "/icons/watering.svg",
    description: "Learn how to water your plants properly to prevent root rot and wilting.",
    headline: "💧 The Ultimate Watering Guide",
    heroImage: "/guides/watering.jpg",
    intro:
      "Watering is the most common reason indoor and outdoor plants die. Whether you are drowning your roots or leaving them parched, getting the balance right is the secret to a thriving garden. This guide breaks down exactly when, how, and how much you should water your plants.",
    sections: [
      {
        heading: "🌱 Why Proper Watering is Essential",
        body: "Plants use water not just to stay upright, but to transport vital nutrients from the soil up into their leaves. Without proper watering, photosynthesis slows down, growth stops, and the plant becomes highly vulnerable to pests and diseases.",
      },
      {
        heading: "🕒 When Should You Water?",
        items: [
          { title: "🌅 Morning (Best)", body: "Watering between 6 AM and 10 AM is the golden rule. It equips the plant with hydration before the midday heat hits, and gives any splashed leaves plenty of time to dry in the sun, preventing fungal diseases." },
          { title: "🌆 Evening (Okay)", body: "If you miss the morning, late afternoon or early evening is second best. However, be very careful not to wet the leaves. Leaves that stay wet overnight are a breeding ground for mildew and fungus." },
          { title: "🍂 Seasonal Shifts", body: "Plants drink less when they aren't actively growing. You will need to water frequently during the hot summer and significantly reduce your watering schedule during the cooler winter months." },
        ],
      },
      {
        heading: "💦 How Much Water Do Plants Need?",
        items: [
          { title: "🏠 Indoor Plants", body: "Check weekly. Only water when the top 2 inches of soil are dry. Less light means less water needed." },
          { title: "🌳 Outdoor Plants", body: "Water deeply 1-2 times a week to encourage deep root growth, rather than shallow daily watering." },
          { title: "🍅 Vegetables", body: "Require consistent moisture. Check daily during peak summer. Drought causes split fruits and bitter greens." },
          { title: "🌸 Flowering Plants", body: "Keep moist but not soggy. Severe dryness will cause them to drop their buds before they even open." },
        ],
      },
      {
        heading: "❌ Common Watering Mistakes",
        items: [
          { title: "Overwatering", image: "/guides/overwatering.jpg", body: "This is the #1 plant killer. Roots need oxygen to breathe; when sitting in water, they drown and rot.", bullets: ["Leaves turn pale yellow and feel soft or mushy.", "The plant droops despite the soil being wet.", "Soil smells swampy or has mold on the surface."] },
          { title: "Underwatering", image: "/guides/underwatering.jpg", body: "The plant is dehydrated and unable to sustain its foliage.", bullets: ["Leaves turn brown, crispy, and dry at the edges.", "The entire plant wilts and looks lifeless.", "Soil pulls away from the edges of the pot."] },
          { title: "💦 Stop Watering the Leaves!", body: "Always aim the water directly at the base of the plant (the soil). Wet leaves invite powdery mildew, black spots, and bacterial blight. In the hot sun, water droplets can even act as magnifying glasses and scorch the foliage." },
        ],
      },
      {
        heading: "💡 Pro Watering Tips",
        items: [
          { title: "1. Always Check the Soil", body: "Do not stick strictly to a calendar. Stick your finger 2 inches into the soil. If it's dry, water. If it's moist, wait a few days." },
          { title: "2. Water Deeply", body: "A quick splash on the surface does nothing. Water until it drains out the bottom of the pot to ensure the entire root ball is hydrated." },
          { title: "3. Avoid Midday Watering", body: "Watering at noon when the sun is hottest means most of the water evaporates before the roots can absorb it." },
          { title: "4. Ensure Drainage", body: "Never leave a plant sitting in a saucer full of water for more than 30 minutes. Empty the excess!" },
        ],
      },
    ],
    video: {
      heading: "See It In Action",
      text: "Still unsure if you are watering correctly? Watch this visual tutorial to see exactly how to check soil moisture and master the bottom-watering technique for indoor plants.",
      label: "Watch Watering Tutorial",
      url: "https://youtu.be/R8n4hG7NXbY?si=5R6J_LOZf1q0vVrn",
    },
    related: [rel.sunlight, rel.soil, rel.fertilizer],
  },

  {
    title: "Sunlight",
    slug: "sunlight",
    icon: "/icons/sunshine.svg",
    description: "Understand sunlight requirements.",
    headline: "☀️ The Ultimate Sunlight Guide",
    heroImage: "/guides/sunlight-hero.jpg",
    intro:
      "Sunlight is the literal fuel that powers your garden. While watering keeps plants hydrated, light provides the energy they need to grow, produce leaves, and bloom. Understanding the difference between direct, indirect, and low light is the key to a thriving indoor or outdoor garden.",
    sections: [
      {
        heading: "🌱 Why Proper Light is Crucial",
        body: "Through a process called photosynthesis, plants use sunlight to convert water and carbon dioxide into sugars (their food). Without adequate light, this process halts. A plant in the wrong light will either starve slowly or suffer from severe cellular damage from overexposure.",
      },
      {
        heading: "💡 Understanding Light Levels",
        items: [
          { title: "Direct Sunlight", body: "Unobstructed rays of the sun hitting the plant directly for 6+ hours a day.", bullets: ["Best for: Tomatoes, Chillies, Marigolds, Cacti, and Succulents."] },
          { title: "Bright Indirect Light", body: "Bright light that is filtered (like through a sheer curtain) or right next to a sunny window without the sun's rays directly touching the leaves.", bullets: ["Best for: Monstera, Pothos, Calatheas, and most tropical houseplants."] },
          { title: "Low Light", body: "Rooms with north-facing windows or spaces far away from a light source. No plant thrives in the dark, but some tolerate heavy shade.", bullets: ["Best for: Snake Plants, ZZ Plants, and Cast Iron Plants."] },
        ],
      },
      {
        heading: "❌ Common Lighting Mistakes",
        items: [
          { title: "Sunburn (Too Much Light)", image: "/guides/sunburn-plant.jpg", body: "Just like human skin, plant leaves can burn if moved abruptly into direct sun or left baking behind hot glass.", bullets: ["Signs: Bleached white, yellow, or crispy brown patches strictly on the top leaves facing the light.", "Fix: Prune the dead leaves, move the plant back a few feet, or add a sheer curtain to diffuse the light."] },
          { title: "Etiolation (Not Enough Light)", image: "/guides/leggy-plant.jpg", body: "When a plant starves for light, it will desperately stretch itself out trying to find the sun.", bullets: ['Signs: "Leggy" growth (long stems with huge gaps between leaves), pale color, leaning heavily to one side.', "Fix: Gradually move the plant closer to a window or supplement with an LED grow light."] },
        ],
      },
      {
        heading: "💡 Pro Sunlight Tips",
        items: [
          { title: "Rotate Your Pots", body: "Plants grow towards the light. Give your indoor pots a quarter-turn every time you water them so they grow straight and bushy instead of leaning." },
          { title: "Dust the Leaves", body: "A layer of dust acts like sunscreen, blocking light from entering the leaf. Wipe indoor plant leaves with a damp cloth monthly to maximize photosynthesis." },
          { title: "Beware the Winter Shift", body: "The sun's angle changes in winter, and the light is much weaker. You may need to move your plants directly to the windowsill during the colder months." },
        ],
      },
    ],
    video: {
      heading: "Watch the Light Tutorial",
      label: "Play Video",
      url: "https://youtu.be/Plketh1TS6M?si=nTE7ECVSUf9Z6UHz",
      thumbnail: "/guides/sunlight.jpg",
    },
    related: [rel.watering, rel.soil, rel.fertilizer],
  },

  {
    title: "Soil",
    slug: "soil",
    icon: "/icons/soil.svg",
    description: "Choose the right soil for healthy plants.",
    headline: "🌱 The Ultimate Soil & Potting Guide",
    heroImage: "/guides/soil-hero.jpg",
    intro:
      'Soil is the foundation of your garden. It is not just "dirt"—it is a living, breathing ecosystem that holds water, oxygen, and the nutrients your plants need to survive. Using the right soil mix can mean the difference between a thriving plant and a struggling one.',
    sections: [
      {
        heading: "🪴 Why Soil Quality Matters",
        body: "Roots need to breathe just as much as they need to drink. Good soil provides a delicate balance of retention (holding onto moisture and nutrients) and drainage (allowing excess water to escape so roots do not suffocate).",
      },
      {
        heading: "🪨 Understanding Soil Types",
        items: [
          { title: "Standard Potting Mix", body: "Lightweight, fluffy, and sterile. Usually made of peat moss or coco coir, perlite, and vermiculite.", bullets: ["Best for: Almost all indoor houseplants and container gardens."] },
          { title: "Cactus & Succulent Mix", body: "Highly gritty and sandy. Designed to drain water instantly to mimic arid desert environments.", bullets: ["Best for: Aloe Vera, Snake Plants, Cacti, and Citrus trees."] },
          { title: "Garden Soil / Topsoil", body: "Heavy, dense, and rich in natural organic matter and minerals. Retains a lot of moisture.", bullets: ["Best for: Raised beds, outdoor vegetable gardens, and landscaping."] },
        ],
      },
      {
        heading: "❌ Common Soil Mistakes",
        items: [
          { title: "Compacted Soil", image: "/guides/compacted-soil.jpg", body: "Over time, watering pushes the air out of the soil, turning it into a hard brick that chokes roots.", bullets: ["Signs: Water pools on top and takes a long time to drain; soil pulls away from the edges of the pot.", "Fix: Gently poke holes in the soil with a chopstick to aerate it, or repot with fresh soil containing more perlite."] },
          { title: "Using Garden Dirt Indoors", image: "/guides/outdoor-soil-indoor.jpg", body: "Garden soil is much too heavy for pots. It will turn to mud, cause root rot, and bring outdoor pests inside.", bullets: ["Signs: Plant yellowing, heavy pots, immediate pest infestations (like fungus gnats).", 'Fix: Never use dirt from the yard in containers. Always buy or mix a dedicated "Potting Mix".'] },
        ],
      },
      {
        heading: "💡 Pro Potting Tips",
        items: [
          { title: "Drainage is Non-Negotiable", body: "Never plant in a pot without a drainage hole. If you love a decorative pot without a hole, keep the plant in a plastic nursery pot and place it inside the decorative one (cachepot method)." },
          { title: "Don't Pot Up Too Big", body: "When repotting, only move up to a pot 1-2 inches wider. A massive pot holds too much wet soil, leading to rot." },
        ],
      },
    ],
    video: {
      heading: "Mix the Perfect Soil",
      label: "Play Video",
      url: "https://youtu.be/0I_IIbVqeME?si=fgMed1GBXMXqE6dF",
      thumbnail: "/guides/soil-video-thumbnail.jpg",
    },
    related: [rel.sunlight, rel.watering, rel.fertilizer],
  },

  {
    title: "Fertilizer",
    slug: "fertilizer",
    icon: "/icons/fertilizer.svg",
    description: "Discover the best fertilizers for your plants.",
    headline: "🌿 The Ultimate Fertilizer Guide",
    heroImage: "/guides/fertilizer-hero.jpg",
    intro:
      'In nature, decaying leaves and organic matter constantly replenish the soil. In pots and home gardens, those nutrients run out quickly! Fertilizer is the "food" your plants need to grow massive leaves, resist disease, and produce brilliant flowers and fruits.',
    sections: [
      {
        heading: "🧪 Understanding N-P-K",
        body: "Every fertilizer label has three numbers (like 10-10-10 or 3-1-2). These represent the macronutrients plants need most:",
        bullets: [
          "(N) Nitrogen: For Shoots. Promotes lush, green, leafy growth. (Crucial for foliage plants).",
          "(P) Phosphorus: For Roots & Fruits. Encourages strong root systems and massive blooms/vegetables.",
          "(K) Potassium: For Overall Health. Helps the plant fight off disease and tolerate stress.",
        ],
      },
      {
        heading: "🧴 Types of Fertilizer",
        items: [
          { title: "Liquid Fertilizer", body: "Mixed with water and applied during regular watering. Gives the plant an instant, fast-acting boost of nutrients. Best for indoor plants and heavy-feeding vegetables." },
          { title: "Slow-Release Granules", body: "Little beads mixed into the topsoil. They slowly release a tiny amount of fertilizer every time you water. Low maintenance and great for outdoor pots and shrubs." },
          { title: "Organic Compost", body: "Natural matter (like worm castings or aged manure). It gently feeds the plant over time and actually improves the structure and health of the soil itself." },
        ],
      },
      {
        heading: "❌ Common Fertilizer Mistakes",
        items: [
          { title: "Fertilizer Burn", image: "/guides/fertilizer-burn.jpg", body: "More is not better! Too much fertilizer creates toxic salt buildups in the soil that literally burn the plant's roots and leaves.", bullets: ["Signs: Brown, crispy edges on the leaves; a white, crusty salt layer on the surface of the soil.", 'Fix: "Flush" the soil by running pure water through the pot for several minutes to wash out excess salts.'] },
          { title: "Feeding Dormant Plants", image: "/guides/dormant.jpg", body: "Plants stop growing during the short, cold days of winter. If you feed them when they aren't actively growing, the fertilizer just sits in the soil and burns the roots.", bullets: ["Rule of Thumb: Only fertilize during the active growing season (Spring and Summer). Stop entirely in Late Fall and Winter."] },
        ],
      },
      {
        heading: "💡 Pro Fertilizing Tips",
        items: [
          { title: "Dilute, Dilute, Dilute", body: 'For indoor plants, it is always safer to dilute liquid fertilizer to half or even a quarter of the strength recommended on the bottle. Feed them "weakly, weekly."' },
          { title: "Never Fertilize a Thirsty Plant", body: "Always water your plant with plain water first, then apply fertilizer. Applying fertilizer to bone-dry roots will cause immediate fertilizer burn." },
        ],
      },
    ],
    video: {
      heading: "Watch the Fertilizer Tutorial",
      label: "Play Video",
      url: "https://youtu.be/lj21NAUh74E?si=qMoEg6g4Py4oDacC",
      thumbnail: "/guides/fertilizer-video-thumbnail.jpg",
    },
    related: [rel.watering, rel.soil, rel.sunlight],
  },

  {
    title: "Pruning",
    slug: "pruning",
    icon: "/icons/pruning.svg",
    description: "Learn how to prune your plants effectively.",
    headline: "✂️ The Ultimate Pruning Guide",
    heroImage: "/guides/pruning-hero.jpg",
    intro:
      "Pruning can feel terrifying—cutting pieces off your beloved plants feels counterintuitive! But pruning is actually one of the most beneficial things you can do. It removes dead weight, prevents disease, and forces the plant to grow bushier and produce more flowers.",
    sections: [
      {
        heading: "🪴 Why Do We Prune?",
        body: "Plants direct their energy to the highest tips of their branches (apical dominance). When you cut that tip off, the plant redistributes its energy to the lower dormant buds, causing it to sprout multiple new branches, resulting in a fuller, bushier plant instead of a tall, spindly one.",
      },
      {
        heading: "✂️ Types of Pruning",
        items: [
          { title: "Deadheading", body: "Snapping or cutting off old, dying flowers. This prevents the plant from wasting energy making seeds and forces it to produce a new flush of fresh flowers instead." },
          { title: "Pinching", body: "Using your thumb and forefinger to literally pinch off the tiny, soft new growth at the very top of a stem. This is great for herbs (like basil and mint) to make them branch out." },
          { title: "Hard Pruning", body: "Cutting a plant back drastically (often by half or more) during its dormant winter season. This rejuvenates overgrown shrubs and trees for explosive spring growth." },
        ],
      },
      {
        heading: "❌ Common Pruning Mistakes",
        items: [
          { title: "Using Dirty Shears", image: "/guides/dirty-shears.jpg", body: "Pruning creates an open wound on the plant. Using dirty, rusty, or dull shears will transfer fungal spores and bacteria directly into the plant's vascular system.", bullets: ["Fix: Always wipe your shear blades with rubbing alcohol before you begin, and again when moving between different plants."] },
          { title: 'Leaving a "Stub"', image: "/guides/improper-cut.jpg", body: 'If you cut a branch too far away from the main stem or node, the leftover "stub" will just die, rot, and invite disease into the main plant.', bullets: ["Fix: Always make your cut just 1/4 inch above a leaf node (the little bump where leaves grow) at a slight 45-degree angle."] },
        ],
      },
      {
        heading: "💡 Pro Pruning Tips",
        items: [
          { title: "The 1/3 Rule", body: "A golden rule of gardening: Never remove more than one-third (1/3) of a plant's total foliage at one time, or you risk sending the plant into fatal shock." },
          { title: "Remove the 3 D's First", body: "Before styling a plant, always cut away anything that is Dead, Damaged, or Diseased." },
        ],
      },
    ],
    video: {
      heading: "Watch the Pruning Tutorial",
      label: "Play Video",
      url: "https://youtu.be/YLYolsTjmKs?si=tX78FOmz1JciqDOI",
      thumbnail: "/guides/video-thumbnail.jpg",
    },
    related: [rel.watering, rel.soil, rel.sunlight],
  },

  {
    title: "Pest Control",
    slug: "pestcontrol",
    icon: "/icons/pest.svg",
    description: "Discover effective methods for controlling pests in your garden.",
    headline: "🐞 The Ultimate Pest Control Guide",
    heroImage: "/guides/pest-hero.jpg",
    intro:
      "If you grow plants, you will eventually deal with bugs. It is a natural part of gardening! The key is not to panic, but to catch infestations early and treat them using Integrated Pest Management (IPM)—starting with the gentlest solutions before reaching for harsh chemicals.",
    sections: [
      {
        heading: "🔍 Early Detection is Everything",
        body: "Pests multiply exponentially. A few aphids on Monday can turn into hundreds by Friday. Make it a habit to visually inspect your plants (especially the undersides of the leaves and the new, soft growth) every time you water them.",
      },
      {
        heading: "🐛 Know Your Enemy: Common Pests",
        items: [
          { title: "Aphids", body: "Tiny, pear-shaped bugs (usually green, black, or yellow) that cluster on new growth and suck the sap out of the plant.", bullets: ["Treatment: Blast them off with a strong jet of water, then spray with Insecticidal Soap."] },
          { title: "Spider Mites", body: "Microscopic arachnids that thrive in hot, dry conditions. They cause leaves to look dusty, stippled, and create fine webbing.", bullets: ["Treatment: Increase humidity. Spray thoroughly with Neem oil, coating all leaf surfaces."] },
          { title: "Fungus Gnats", body: "Annoying little black flies buzzing around the soil. Their larvae live in wet soil and eat your plant's roots.", bullets: ["Treatment: Let the top 2 inches of soil dry out completely. Use yellow sticky traps for adults."] },
        ],
      },
      {
        heading: "❌ Common Pest Control Mistakes",
        items: [
          { title: "Reaching for Harsh Chemicals First", image: "/guides/chemical-spray.jpg", body: "Strong synthetic pesticides kill pests, but they also kill beneficial insects (like bees and ladybugs) and can chemically burn delicate plant leaves.", bullets: ["Fix: Always start with organic methods (water blasts, Neem oil, rubbing alcohol swabs) before resorting to synthetics."] },
          { title: "Ignoring the Undersides of Leaves", image: "/guides/underside.jpg", body: "When applying treatments, many beginners only spray the top of the leaves. 90% of pests live and lay eggs on the hidden undersides!", bullets: ["Fix: You must completely drench the plant when treating. Spray under the leaves and down the stems until the liquid drips off."] },
        ],
      },
      {
        heading: "💡 Pro Pest Control Tips",
        items: [
          { title: "Quarantine New Plants", body: "Never bring a new plant home and immediately place it next to your others. Keep it in a separate room for 2 weeks to ensure no hidden pests spread to your collection." },
          { title: "Apply Neem Oil at Night", body: "Never apply oils or soapy sprays during the day. The liquid magnifies sunlight and will severely burn the leaves. Spray in the evening so it can dry overnight." },
        ],
      },
    ],
    video: {
      heading: "Watch the Pest Control Tutorial",
      label: "Play Video",
      url: "https://youtu.be/qTkp-9o9hH0?si=9rUtUzbf3f7zmL_8",
      thumbnail: "/guides/thumbnail-pests.jpg",
    },
    related: [rel.watering, rel.soil, rel.sunlight],
  },
];
