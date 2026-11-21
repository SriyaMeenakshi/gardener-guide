// Additional plant guides (indoor plants plus more flowering, kitchen, fruit and medicinal plants).
// Written as general, practical growing advice in the same structure as plants.js. Please review before relying on them.
//
// PHOTOS: these plants start without photos. Each one expects its card photo at client/public/plants/<slug>.jpg
// (also used for the banner on its page). Until the file exists the site shows a leaf placeholder; once you add
// the file it appears automatically. Run `npm run photos:check` in /server to see which are still missing.
// sunlight / water / difficulty are filter values chosen for each plant.

export const morePlants = [
  // ───────────────────────────── Indoor ─────────────────────────────
  {
    name: "Money Plant",
    slug: "moneyplant",
    category: "indoor",
    image: "/plants/moneyplant.jpg",
    headline: "🌿 The Ultimate Guide to Growing Money Plant",
    sunlight: "partial",
    water: "moderate",
    difficulty: "easy",
    description:
      "Money plant (pothos) is one of the easiest houseplants you can grow. Its glossy, heart-shaped leaves trail from shelves and hanging pots, and it grows happily in soil or even in a jar of water. It forgives missed waterings and tolerates less light than most plants, which is why it fills so many Indian homes and offices.",
    extraSections: [
      { heading: "⚠️ Keep it away from pets and children", body: "Money plant leaves and sap irritate the mouth and stomach if chewed or eaten. Keep it out of reach of pets and small children, and wash your hands after pruning." },
    ],
    varieties: [
      { name: "Golden Pothos", description: "The classic money plant, with green leaves splashed in gold. Very tough, and happy in medium light." },
      { name: "Marble Queen", description: "Creamy-white and green marbled leaves. It looks striking but needs brighter, indirect light to keep its pattern." },
      { name: "Neon Pothos", description: "Bright lime-green leaves that light up a corner. Grows fast and keeps a solid colour." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Bright, indirect light is best. Money plant tolerates low light, but the leaves become smaller and variegated types lose their pattern. Avoid harsh direct sun, which scorches the leaves." },
      { title: "💧 Watering", body: "Water when the top 2-3 cm of soil feels dry, then let the extra drain away. If you grow it in water, change the water every one to two weeks so it stays fresh. Too much water is a bigger risk than too little." },
      { title: "🌱 Soil & Feeding", body: "Use a light, well-draining potting mix. Feed once a month in the growing season with a diluted liquid fertilizer, and pinch the vine tips now and then to keep the plant bushy." },
    ],
    commonProblems: [
      { title: "Yellow leaves", cause: "Usually overwatering, or soil that stays soggy.", fix: "Let the soil dry out before watering again, make sure the pot has drainage holes, and remove the yellow leaves." },
      { title: "Brown, crispy leaf tips", cause: "Dry air, irregular watering, or a build-up of fertilizer salts.", fix: "Water more evenly, flush the soil with plain water now and then, and feed less often." },
      { title: "Long bare vines with small leaves", cause: "Not enough light.", fix: "Move it somewhere brighter and trim the long vines. The cuttings root easily in water." },
    ],
  },
  {
    name: "Snake Plant",
    slug: "snakeplant",
    category: "indoor",
    image: "/plants/snakeplant.jpg",
    headline: "🐍 The Ultimate Guide to Growing Snake Plant",
    sunlight: "partial",
    water: "low",
    difficulty: "easy",
    description:
      "Snake plant is nearly indestructible, which makes it perfect for beginners and busy people. Its upright, sword-shaped leaves look good in any corner, and it keeps growing with little light and very little water. It is also one of the best plants to leave behind while you travel.",
    extraSections: [{ heading: "⚠️ Mildly toxic to pets", body: "Snake plant is mildly toxic if chewed by pets or children. Place it where they cannot nibble the leaves." }],
    varieties: [
      { name: "Laurentii", description: "The most common type, with dark green leaves edged in yellow. Tall and dramatic." },
      { name: "Moonshine", description: "Silvery pale-green leaves with a soft glow. It prefers a little more light to keep its colour." },
      { name: "Cylindrica", description: "Round, spear-like leaves that grow in a fan shape. Looks sculptural and is easy to care for." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Very adaptable. It survives in low light but grows best in bright, indirect light. A few hours of gentle morning sun is fine; avoid strong afternoon sun through glass." },
      { title: "💧 Watering", body: "Water sparingly. Let the soil dry out completely, which usually means every two to three weeks, and even less in winter. Never let water sit in the pot's saucer." },
      { title: "🌱 Soil & Pots", body: "Use a gritty, fast-draining mix such as cactus or succulent soil, in a pot with drainage holes. Feed lightly two or three times a year; it does not need much." },
    ],
    commonProblems: [
      { title: "Soft, yellow leaves or a mushy base (root rot)", cause: "Overwatering is the number one cause of snake plant problems.", fix: "Stop watering. If the base is mushy, take the plant out, cut away rotten roots, and repot in dry, well-draining soil." },
      { title: "Wrinkled, curling leaves", cause: "The plant is very dry, or the roots have filled the pot.", fix: "Give it a deep watering, and repot into a slightly larger pot if the roots are crowded." },
      { title: "Leaves flop over", cause: "Too little light, or too much water.", fix: "Move it to a brighter spot and water less often." },
    ],
  },
  {
    name: "Peace Lily",
    slug: "peacelily",
    category: "indoor",
    image: "/plants/peacelily.jpg",
    headline: "🤍 The Ultimate Guide to Growing Peace Lily",
    sunlight: "low",
    water: "moderate",
    difficulty: "easy",
    description:
      "Peace lily has glossy dark leaves and elegant white flowers, and it thrives in shaded spots where other plants struggle. It is also helpfully honest: when it is thirsty its leaves droop dramatically, then perk up within hours of a good drink.",
    extraSections: [{ heading: "⚠️ Not for nibbling", body: "Peace lily is toxic if eaten. Keep it away from pets and small children." }],
    varieties: [
      { name: "Mauna Loa", description: "The most common type, with large, glossy leaves and plenty of white blooms." },
      { name: "Sensation", description: "A very large, impressive variety that can grow over a metre tall with huge leaves." },
      { name: "Domino", description: "Leaves splashed with creamy-white variegation, for a lighter, brighter look." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Low to medium indirect light is ideal. It tolerates shade, but flowers best in brighter indirect light. Direct sun burns the leaves." },
      { title: "💧 Watering", body: "Keep the soil evenly moist but not soggy. When the leaves droop, water thoroughly and they will recover. If your tap water leaves brown tips, let it stand overnight first." },
      { title: "🌱 Soil & Feeding", body: "A rich, well-draining potting mix works best. Feed every six to eight weeks with a mild liquid fertilizer, and wipe the leaves with a damp cloth so they can breathe." },
    ],
    commonProblems: [
      { title: "Brown leaf tips", cause: "Dry air, minerals in tap water, or too much fertilizer.", fix: "Use water that has stood overnight, group plants together for humidity, and feed less." },
      { title: "No flowers", cause: "Too little light.", fix: "Move it to a brighter spot with indirect light, and feed lightly during the growing season." },
      { title: "Yellow leaves", cause: "Overwatering or poor drainage.", fix: "Water only when the top of the soil feels slightly dry, and make sure the pot drains." },
    ],
  },

  // ───────────────────────────── Flowering ─────────────────────────────
  {
    name: "Jasmine",
    slug: "jasmine",
    category: "flowering",
    image: "/plants/jasmine.jpg",
    headline: "🌼 The Ultimate Guide to Growing Jasmine",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "Few plants smell as wonderful as jasmine. Mogra and chameli are loved across India for garlands, hair and pooja, and a single pot on a sunny balcony can perfume the whole evening. With enough sun and a good prune, jasmine rewards you with flowers for months.",
    varieties: [
      { name: "Mogra (Arabian jasmine)", description: "A compact, evergreen shrub with round, creamy-white, intensely fragrant flowers. The favourite for garlands and perfume." },
      { name: "Chameli (Spanish jasmine)", description: "A scrambling climber with star-shaped white flowers, often pink on the outside. Needs a trellis or support." },
      { name: "Common jasmine", description: "A hardy climber with clusters of small, sweet-scented white flowers, popular on arches and fences." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Jasmine needs at least five to six hours of direct sun to flower well. In deep shade it grows leaves but few blooms." },
      { title: "💧 Watering", body: "Water regularly so the soil stays slightly moist, and more often in summer. Do not let the pot stand in water: soggy roots cause yellowing and bud drop." },
      { title: "🌱 Soil & Pruning", body: "Use rich, well-draining soil with plenty of compost. Feed with a potash-rich fertilizer while it is flowering. Prune after a flush of flowers, and cut back harder in late winter to keep it bushy." },
    ],
    commonProblems: [
      { title: "Few flowers", cause: "Not enough sun, or too much nitrogen fertilizer, which favours leaves over flowers.", fix: "Move it into full sun, switch to a flowering (potash-rich) fertilizer, and prune to encourage new shoots." },
      { title: "Aphids and mealybugs", cause: "Sap-sucking insects gather on soft new growth and buds.", fix: "Wash them off with a jet of water, then spray Neem oil or insecticidal soap in the evening." },
      { title: "Buds dropping", cause: "Water stress, sudden temperature changes, or a pot that is too small.", fix: "Water evenly, avoid moving the plant while it is in bud, and repot if the roots are crowded." },
    ],
  },
  {
    name: "Sunflower",
    slug: "sunflower",
    category: "flowering",
    image: "/plants/sunflower.jpg",
    headline: "🌻 The Ultimate Guide to Growing Sunflowers",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "Sunflowers are cheerful, fast and perfect for beginners. Plant a seed and within a couple of months you can have a flower as big as a plate. Kids love watching them grow, bees love visiting them, and the seeds are a bonus snack.",
    varieties: [
      { name: "Giant types (e.g. Mammoth)", description: "Grow two to three metres tall with huge flower heads. Best in garden beds, with a stake for support." },
      { name: "Dwarf types (e.g. Sunspot)", description: "Stay under a metre, so they are ideal for pots and balconies." },
      { name: "Branching types", description: "Produce many smaller flowers over a longer period, great for cutting." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Sunflowers need full sun, at least six to eight hours a day. They are named for a reason: young flower buds even turn to follow the sun." },
      { title: "💧 Watering", body: "Water deeply once or twice a week so the roots reach down, rather than a little every day. Water the soil, not the leaves, and give more as the flower head forms." },
      { title: "🌱 Soil & Support", body: "Sow seeds about 2 cm deep directly where they will grow, because sunflowers dislike being moved. Loosen the soil well, and stake tall varieties. Go easy on fertilizer: too much nitrogen gives leaves instead of flowers." },
    ],
    commonProblems: [
      { title: "Birds and squirrels eating the seeds", cause: "Ripening seed heads are a favourite snack.", fix: "Cover the heads with a mesh or cloth bag as the seeds ripen." },
      { title: "Powdery mildew", cause: "A white, powdery fungus that appears in humid weather and crowded plantings.", fix: "Give plants space for airflow, water at the base, and remove badly affected leaves." },
      { title: "Plants falling over", cause: "Tall plants with shallow roots in wind or soft soil.", fix: "Stake early, plant in a sheltered spot, and keep the soil firm around the base." },
    ],
  },

  // ───────────────────────────── Kitchen garden ─────────────────────────────
  {
    name: "Curry Leaf",
    slug: "curryleaf",
    category: "kitchen",
    image: "/plants/curryleaf.jpg",
    headline: "🍃 The Ultimate Guide to Growing Curry Leaf",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "A curry leaf plant in the garden means fresh, fragrant tadka leaves at your fingertips. It is slow in its first year, then grows into a lush evergreen shrub that gives you leaves all year round. Fresh leaves from your own plant taste far stronger than any you can buy.",
    varieties: [
      { name: "Regular (desi) curry leaf", description: "The common, fast-growing type with a rich aroma. It grows into a tall shrub if you let it." },
      { name: "Gamthi (dwarf) type", description: "A compact, bushy type with thicker leaves and a strong aroma, popular for pots." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Give it at least five to six hours of sun a day. In low light it grows slowly and the leaves lose their aroma." },
      { title: "💧 Watering", body: "Keep the soil slightly moist but never soggy, letting the top layer dry between waterings. Water less in winter, and make sure the pot drains well." },
      { title: "🌱 Soil & Harvest", body: "A loamy, well-draining soil enriched with compost suits it. Feed monthly with compost or vermicompost. In the first year, pick only a few leaves so the plant can establish, then harvest regularly from the tips to keep it bushy." },
    ],
    commonProblems: [
      { title: "Yellowing leaves", cause: "Overwatering, poor drainage, or a lack of nutrients such as nitrogen.", fix: "Improve drainage, water less, and feed with compost or a balanced organic fertilizer." },
      { title: "Sticky, curling new leaves", cause: "Aphids or psyllids feeding on new growth.", fix: "Wash them off with water and spray Neem oil or soapy water, especially under the leaves." },
      { title: "Very slow growth", cause: "Young plants grow slowly, and heavy harvesting or too little sun slows them more.", fix: "Be patient, harvest lightly in the first year, and keep the plant in the sunniest spot you have." },
    ],
  },
  {
    name: "Brinjal (Eggplant)",
    slug: "brinjal",
    category: "kitchen",
    image: "/plants/brinjal.jpg",
    headline: "🍆 The Ultimate Guide to Growing Brinjal",
    sunlight: "full",
    water: "moderate",
    difficulty: "medium",
    description:
      "Brinjal, also called eggplant or baingan, is a rewarding vegetable for warm gardens. A single plant in a large pot can give you fruit for months, and it suits everything from bharta to sambar. It loves heat and sunshine and hates being thirsty.",
    varieties: [
      { name: "Long purple", description: "Slim, glossy purple fruits that cook quickly. A good all-rounder." },
      { name: "Big round (bharta type)", description: "Large, round fruits with a smoky flavour when roasted, ideal for bharta." },
      { name: "Small round or green", description: "Small, tender fruits perfect for stuffed curries and sambar." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Brinjal needs full sun, six to eight hours a day, and warm weather. Cool nights slow it down." },
      { title: "💧 Watering", body: "Water regularly and deeply, and never let the soil dry out completely while it is flowering and fruiting. Mulch around the base to keep moisture steady." },
      { title: "🌱 Soil & Feeding", body: "Plant in rich, well-draining soil mixed with compost, in a pot at least 30 cm deep. Stake the plant as it gets heavy, and feed every two to three weeks once flowers appear." },
    ],
    commonProblems: [
      { title: "Fruit and shoot borer", cause: "A caterpillar that tunnels into shoots and fruit.", fix: "Pinch off and destroy wilted shoots and damaged fruit, use sticky or pheromone traps, and spray Neem oil or Bt." },
      { title: "Flea beetles", cause: "Tiny beetles that chew many small holes in young leaves.", fix: "Cover seedlings with a light net, keep plants well watered, and spray Neem oil." },
      { title: "Flowers dropping without fruit", cause: "Heat or cold stress, poor pollination, or irregular watering.", fix: "Water evenly, give the plant a gentle shake while flowering, and avoid over-feeding with nitrogen." },
    ],
  },
  {
    name: "Spinach (Palak)",
    slug: "spinach",
    category: "kitchen",
    image: "/plants/spinach.jpg",
    headline: "🥬 The Ultimate Guide to Growing Spinach",
    sunlight: "partial",
    water: "moderate",
    difficulty: "easy",
    description:
      "Fresh palak from your own pot is quick, tasty and packed with goodness. Spinach is a cool-season leaf crop: sow it in the cooler months and you can start picking leaves in about a month. It is one of the fastest vegetables a beginner can grow.",
    varieties: [
      { name: "Palak (Indian spinach)", description: "The familiar bunch spinach grown across India. Fast, tender and great for dal, paratha and sabzi." },
      { name: "Smooth-leaf (baby) spinach", description: "Flat, tender leaves that are easy to wash and good raw in salads." },
      { name: "Malabar spinach", description: "A different plant: a heat-loving vine with thick leaves. It grows well in the hot, humid weather when ordinary spinach struggles." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Four to six hours of sun is enough, and light shade in hot weather helps. Spinach grows best in the cooler months and bolts (runs to seed) in heat." },
      { title: "💧 Watering", body: "Keep the soil evenly moist, because the roots are shallow. Water gently and often rather than heavily, and do not let it dry out." },
      { title: "🌱 Soil & Harvest", body: "Sow seeds about 1 cm deep in rich, well-composted soil, and thin the seedlings so they have space. Feed every two weeks with a nitrogen-rich organic fertilizer. Harvest the outer leaves first so the plant keeps producing." },
    ],
    commonProblems: [
      { title: "Plants running to seed (bolting)", cause: "Hot weather or long days make spinach flower early, and the leaves turn bitter.", fix: "Grow it in the cool season, give afternoon shade, and harvest often. Try Malabar spinach in the heat." },
      { title: "Winding tunnels in leaves", cause: "Leaf miner larvae feed inside the leaf.", fix: "Remove and bin affected leaves, and cover plants with a fine net to stop the flies laying eggs." },
      { title: "Yellow leaves", cause: "Too little nitrogen, or waterlogged soil.", fix: "Feed with compost or a liquid organic fertilizer, and make sure the pot drains well." },
    ],
  },
  {
    name: "Okra (Bhindi)",
    slug: "okra",
    category: "kitchen",
    image: "/plants/okra.jpg",
    headline: "🌿 The Ultimate Guide to Growing Okra",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "Okra, or bhindi, is a sun-loving vegetable that thrives in India's warm weather. It grows quickly, and once it starts flowering you can pick tender pods every day or two. It is a great choice for your first summer vegetable garden.",
    varieties: [
      { name: "Green okra (e.g. Arka Anamika, Pusa Sawani)", description: "The classic long green pods. Arka Anamika is a popular variety that tolerates yellow vein mosaic better than most." },
      { name: "Red okra", description: "Burgundy-red pods and stems that look beautiful and turn green when cooked." },
      { name: "Dwarf okra", description: "Compact plants suited to pots and balconies." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Okra loves full sun and warmth, with six to eight hours a day. It grows best when temperatures stay above about 25°C." },
      { title: "💧 Watering", body: "Water regularly and deeply, especially while flowers and pods are forming. Soak the seeds overnight before sowing for faster sprouting." },
      { title: "🌱 Soil & Harvest", body: "Plant in well-draining, compost-rich soil. Pick pods when they are about 8-10 cm long and still tender, and harvest every day or two: pods left on the plant turn hard and stop it producing. Wear gloves, because the leaves and pods can be itchy." },
    ],
    commonProblems: [
      { title: "Yellow vein mosaic virus", cause: "A virus spread by whiteflies that makes the leaf veins turn yellow.", fix: "There is no cure. Remove infected plants, control whiteflies with Neem oil or sticky traps, and choose tolerant varieties." },
      { title: "Fruit and shoot borer", cause: "Caterpillars that bore into shoots and pods.", fix: "Remove damaged shoots and pods, and spray Neem oil or Bt." },
      { title: "Tough, stringy pods", cause: "The pods were picked too late.", fix: "Harvest while pods are small and snap easily, and pick every day or two during the peak." },
    ],
  },

  // ───────────────────────────── Fruit ─────────────────────────────
  {
    name: "Pomegranate",
    slug: "pomegranate",
    category: "fruit",
    image: "/plants/pomegranate.jpg",
    headline: "🌳 The Ultimate Guide to Growing Pomegranate",
    sunlight: "full",
    water: "low",
    difficulty: "medium",
    description:
      "Pomegranate is a beautiful, hardy tree with bright orange-red flowers and jewel-like fruit. It loves hot, dry summers and is surprisingly happy in a big pot. Be patient: a young tree takes two to three years to fruit, but it keeps producing for many years.",
    varieties: [
      { name: "Bhagwa", description: "A popular variety with deep red skin and arils and a sweet taste. Widely grown in India." },
      { name: "Ganesh", description: "Pinkish arils with soft, edible seeds and a mild, sweet flavour." },
      { name: "Arakta", description: "Dark red, juicy arils with soft seeds and a rich taste." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Pomegranate wants full sun, six to eight hours a day, and plenty of heat. More sun means sweeter fruit." },
      { title: "💧 Watering", body: "Water deeply but not often, and let the soil dry between waterings. Keep watering steady while fruit is forming, because swings between dry and wet make the fruit crack." },
      { title: "🌱 Soil & Pruning", body: "A well-draining loamy soil is best, and it copes with poor soil. Grow it in a large pot or in the ground, and feed with compost at the start of the season. Remove suckers from the base and keep three to five main stems." },
    ],
    commonProblems: [
      { title: "Fruit cracking", cause: "Irregular watering, especially heavy watering after a dry spell.", fix: "Water on a steady schedule and mulch around the base to hold moisture evenly." },
      { title: "Fruit borer", cause: "Caterpillars that lay eggs on flowers and young fruit and tunnel inside.", fix: "Cover young fruit with paper or cloth bags, and remove and destroy damaged fruit." },
      { title: "Dark spots on leaves and fruit", cause: "A bacterial or fungal leaf and fruit spot, worse in humid, wet weather.", fix: "Remove affected leaves and fruit, avoid wetting the foliage, and spray a copper-based fungicide if it spreads." },
    ],
  },
  {
    name: "Banana",
    slug: "banana",
    category: "fruit",
    image: "/plants/banana.jpg",
    headline: "🍌 The Ultimate Guide to Growing Banana",
    sunlight: "full",
    water: "high",
    difficulty: "medium",
    description:
      "A banana plant brings a tropical look to any garden and rewards you with a whole bunch of fruit in about a year. It grows fast, drinks plenty of water and loves rich soil. Dwarf varieties can even grow in large pots on a sunny terrace.",
    varieties: [
      { name: "Robusta / Grand Naine", description: "Tall, vigorous plants with big bunches of sweet fruit. Widely grown for eating." },
      { name: "Nendran", description: "A large Kerala banana, often used for chips and cooking, and delicious when ripe." },
      { name: "Elakki (Yelakki)", description: "Small, sweet, fragrant bananas on a medium-sized plant." },
      { name: "Dwarf Cavendish", description: "A compact plant that is easier to manage in a small garden or a large pot." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Bananas need full sun, at least six hours a day, and shelter from strong wind that tears the leaves." },
      { title: "💧 Watering", body: "Banana is a thirsty plant. Keep the soil moist all the time but well drained, and mulch around the base. Never let it stand in water." },
      { title: "🌱 Soil & Feeding", body: "Plant in deep, rich soil mixed with plenty of compost or well-rotted manure. It is a heavy feeder: give it compost regularly and extra potassium (such as banana-peel compost or potash) when the flower appears. Keep one healthy sucker as the next plant and remove the rest." },
    ],
    commonProblems: [
      { title: "Yellow or brown streaks on leaves (leaf spot)", cause: "A fungal disease that is worse in humid, crowded conditions.", fix: "Cut off badly affected leaves, space plants out, and keep the area free of old plant debris." },
      { title: "Yellowing of older leaves and wilting (Panama wilt)", cause: "A soil fungus that blocks the plant's water-carrying tubes.", fix: "There is no cure. Remove and destroy infected plants, avoid replanting in the same spot, and start with healthy, disease-free suckers." },
      { title: "Plants toppling over", cause: "A heavy bunch on a shallow-rooted plant, in wind.", fix: "Support the plant with a bamboo prop, and plant in a spot sheltered from strong wind." },
    ],
  },

  // ───────────────────────────── Medicinal ─────────────────────────────
  {
    name: "Lemongrass",
    slug: "lemongrass",
    category: "medicinal",
    image: "/plants/lemongrass.jpg",
    headline: "🌾 The Ultimate Guide to Growing Lemongrass",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "Lemongrass is a tall, fragrant grass with a fresh lemon scent. A single clump gives you stalks for tea and curries and leaves for infusions, and it grows with very little fuss. It is a good plant for sunny pots and garden corners.",
    varieties: [
      { name: "West Indian lemongrass", description: "The culinary type, with thick stalks and a strong lemon flavour. Best for tea and cooking." },
      { name: "East Indian lemongrass", description: "A taller type with a slightly different scent, mainly grown for its oil." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Lemongrass loves full sun and warmth. It will grow in partial shade but is lusher and more fragrant in bright light." },
      { title: "💧 Watering", body: "Water regularly, especially in summer, and keep the soil lightly moist. It tolerates short dry spells but grows best with steady moisture." },
      { title: "🌱 Soil & Harvest", body: "Plant in well-draining, compost-rich soil in a big pot, because the clump spreads. Harvest stalks when they are about as thick as a finger, cutting at the base. Divide the clump every year or two to keep it healthy." },
    ],
    commonProblems: [
      { title: "Orange-brown spots on leaves (rust)", cause: "A fungal disease that spreads when leaves stay wet.", fix: "Remove affected leaves, give the clump space for air to move, and water at the base." },
      { title: "Yellowing leaves", cause: "Waterlogged soil, or too little food.", fix: "Improve drainage, cut back on water, and feed with compost." },
      { title: "Dry, thin clump", cause: "An overcrowded clump that needs dividing, or too little water.", fix: "Divide the clump, replant the healthy sections in fresh soil, and water regularly." },
    ],
  },
];
