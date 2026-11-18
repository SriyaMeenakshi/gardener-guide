// Gardening methods migrated from v1 (data/methods.ts + app/methods/<slug>/page.tsx).

const watch = (url) => ({ heading: "Related Video", label: "Watch Tutorial", url });

export const methods = [
  {
    name: "Horticulture",
    slug: "horticulture",
    image: "/methods/horticulture.jpg",
    headline: "🌱 Horticulture",
    description:
      "Horticulture is the science and art of growing fruits, vegetables, flowers, and ornamental plants. It focuses on sustainable plant cultivation, advanced crop management, and landscape design to improve both commercial agricultural yields and home garden aesthetics.",
    sections: [
      {
        heading: "Benefits",
        bullets: [
          "Improves plant quality and crop yield through advanced cultivation techniques",
          "Enhances food security and productivity for local and global markets",
          "Promotes sustainable agriculture and eco-friendly land management",
        ],
      },
    ],
    video: watch("https://youtu.be/gajUCaN9MQI?si=g1jDN6b81-oyKrR7"),
  },
  {
    name: "Terrace Gardening",
    slug: "terrace-gardening",
    image: "/methods/terracegardening.jpg",
    headline: "🏙️ Terrace Gardening",
    description:
      "Transform your urban space into a lush oasis. Terrace gardening, also known as rooftop gardening, is the perfect solution for urban dwellers looking to maximize limited space, cultivate balcony plants, and enjoy fresh, home-grown produce.",
    sections: [
      {
        heading: "Benefits",
        bullets: [
          "Optimizes small urban spaces for food production",
          "Reduces indoor temperature through natural rooftop insulation",
          "Improves local air quality and urban biodiversity",
        ],
      },
    ],
    video: watch("https://youtu.be/X0QqhFn8HC8?si=FWtidredgw87uLwn"),
  },
  {
    name: "Drip Irrigation",
    slug: "drip-irrigation",
    image: "/methods/dripirrigation.jpg",
    headline: "💧 Drip Irrigation",
    description:
      "Optimize your garden's water usage with a micro-irrigation system. Drip irrigation delivers water and nutrients directly to the plant's root zone, ensuring efficient watering, massive water conservation, and significantly reduced weed growth.",
    sections: [
      {
        heading: "Benefits",
        bullets: [
          "Minimizes water waste through targeted soil delivery",
          "Prevents soil erosion and nutrient runoff",
          "Reduces fungal diseases by keeping plant foliage dry",
        ],
      },
    ],
    video: watch("https://youtu.be/RfFPo0jilro?si=vYc7qgqE3xhKszf0"),
  },
  {
    name: "Vertical Gardening",
    slug: "vertical-gardening",
    image: "/methods/vertical.jpg",
    headline: "🪴 Vertical Gardening",
    description:
      "Maximize your limited garden space with stunning living walls and vertical planters. Vertical gardening is a smart space-saving gardening technique that trains plants to grow upwards, turning bare fences and walls into vibrant, productive greenery.",
    sections: [
      {
        heading: "Benefits",
        bullets: [
          "Drastically increases harvest yields per square foot",
          "Improves air circulation around plants, preventing disease",
          "Creates beautiful privacy screens and visual focal points",
        ],
      },
    ],
    video: watch("https://youtu.be/gMW99neaPpc?si=zNDgH9arDvChSmzC"),
  },
  {
    name: "Organic Gardening",
    slug: "organic-gardening",
    image: "/methods/organic.jpg",
    headline: "🌿 Organic Gardening",
    description:
      "Embrace chemical-free farming and eco-friendly gardening practices. Organic gardening relies on natural compost, crop rotation, and organic pest control to grow healthy, nutrient-dense fruits and vegetables while protecting the natural ecosystem.",
    sections: [
      {
        heading: "Benefits",
        bullets: [
          "Produces safe, toxic-free food for your family",
          "Builds healthy, living soil rich in beneficial microbes",
          "Protects local wildlife, bees, and vital pollinators",
        ],
      },
    ],
    video: watch("https://youtu.be/GwCojS5gv70?si=13rwEKvlIVnEWVYo"),
  },
  {
    name: "Hydroponics",
    slug: "hydroponics",
    image: "/methods/hydroponics.jpg",
    headline: "🧪 Hydroponics",
    description:
      "Discover the future of soil-less farming. Hydroponics is an innovative, water-based growing method ideal for indoor gardening and controlled environments, utilizing precise hydroponic nutrient solutions for accelerated plant growth and maximum yield.",
    sections: [
      {
        heading: "Benefits",
        bullets: [
          "Yields up to 30% more produce than traditional soil farming",
          "Uses 90% less water through closed-loop recycling systems",
          "Eliminates soil-borne diseases and weeds entirely",
        ],
      },
    ],
    video: watch("https://youtu.be/0EklopLQqyk?si=HqPPI8OikFWTRgYO"),
  },
];
