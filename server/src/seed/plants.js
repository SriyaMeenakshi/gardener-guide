// Plant articles migrated from v1 (app/plants/<slug>/page.tsx). Inline <strong> tags were dropped (plain text).
// sunlight / water / difficulty are v2 filter values added during migration; please review them.

export const plants = [
  // ───────────────────────────── Flowering ─────────────────────────────
  {
    name: "Rose",
    slug: "rose",
    category: "flowering",
    image: "/plants/rose.jpg",
    heroImage: "/plants/rose/rose-hero.JPG",
    headline: "🌹 The Ultimate Guide to Growing Roses",
    sunlight: "full",
    water: "moderate",
    difficulty: "medium",
    description:
      "Whether you are setting up a balcony mini-garden or a lush backyard landscape, the rose is the undisputed queen of flowering plants. Roses are available in a stunning array of colors, from deep, passionate reds and pure, serene whites to vibrant yellows and unique blends, each with a captivating fragrance and unique character. This guide is your map to cultivating these magnificent flowers.",
    varieties: [
      { name: "Hybrid Tea Roses", image: "/plants/rose/hybridtea.jpg", description: "Famous for their large, high-centered buds and long, straight stems. These are perfect for cut-flower arrangements and bring an elegant, classic look to your home garden. They require dedicated pruning and excellent sunlight." },
      { name: "Indian 'Desi' Gulab", image: "/plants/rose/desirose.JPG", description: "Highly fragrant and remarkably heat-tolerant, the Desi Gulab is a staple in Indian gardens. These native varieties are hardier, bloom profusely, and are excellent for making homemade rose water or organic compost additions." },
      { name: "Yellow Roses", image: "/plants/rose/yellowrose.JPG", description: "Inject unparalleled brightness into your garden with cheerful yellow roses. Symbolizing friendship and joy, they can create a vibrant 'sunny' spot. Many modern yellow varieties are exceptionally robust and bloom throughout the season, but ensuring good air circulation is key." },
      { name: "White Roses", image: "/plants/rose/white-rose.JPG", description: "For a touch of pure elegance and tranquility, white roses are an exquisite choice. Their clean lines and serene beauty make them ideal for creating peaceful 'moon garden' effects or sophisticated floral designs. They require excellent sunlight and careful attention to keep their blooms spotless." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Roses are sun-loving plants. They require a minimum of 6–8 hours of direct sunlight daily to produce abundant blooms and resist diseases. Morning sunlight is especially crucial to dry the dew off their leaves." },
      { title: "💧 Watering", body: "Deep, consistent watering is key. Water at the base of the plant 2–3 times a week, avoiding the foliage to prevent fungal growth. The soil should be kept moist, but never waterlogged." },
      { title: "🌱 Soil & Fertilizer", body: "Plant in rich, well-draining loamy soil with a slightly acidic pH (6.0 to 6.5). Feed them every 4-6 weeks during the growing season with a balanced organic compost or a dedicated rose fertilizer." },
    ],
    commonProblems: [
      { title: "Aphids & Thrips", cause: "These tiny pests suck the sap from new growth.", fix: "Spray organic Neem oil diluted in water or use an insecticidal soap once a week." },
      { title: "Black Spot & Powdery Mildew", cause: "Fungal diseases caused by damp leaves and poor air circulation.", fix: "Always water at the base of the plant, prune the center of the bush to allow air flow, and apply a fungicide if spots appear." },
    ],
    video: {
      heading: "Learn by Watching",
      text: "Want a step-by-step visual guide? Watch this comprehensive tutorial on how to plant, prune, and maintain roses in your home garden for maximum blooms.",
      label: "Watch Gardening Tutorial",
      url: "https://youtu.be/84NkW-xp39E?si=VaeFSyjCbcuItrKq",
    },
  },
  {
    name: "Hibiscus",
    slug: "hibiscus",
    category: "flowering",
    image: "/plants/hibiscus.jpg",
    heroImage: "/plants/hibiscus/hero.JPG",
    headline: "🌺 The Ultimate Guide to Growing Hibiscus",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "With their massive, trumpet-shaped blooms and deep green foliage, Hibiscus plants instantly bring a touch of the tropics to any garden. While the flowers may only last for a single day, a healthy plant will reward you with continuous, breathtaking blooms all season long.",
    varieties: [
      { name: "Tropical Hibiscus", image: "/plants/hibiscus/tropical.JPG", description: "Famous for their glossy, dark green leaves and brilliant, warm-colored flowers. They are extremely frost-sensitive and are best grown in warm climates or as container plants that can be brought indoors during winter." },
      { name: "Hardy Hibiscus", image: "/plants/hibiscus/hardy.jpg", description: 'These perennials can survive freezing winters! They die back to the ground in late fall but emerge in spring to produce massive, "dinner-plate" sized flowers. Excellent for permanent garden beds.' },
      { name: "Rose of Sharon", image: "/plants/hibiscus/rose-of-sharon.jpg", description: "A large, woody shrub or small tree variety of hibiscus. It blooms profusely in late summer when many other plants have stopped blooming, offering gorgeous pastel flowers with contrasting dark centers." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Hibiscus requires full sun to bloom abundantly. Aim for at least 6 to 8 hours of direct sunlight. In extremely hot climates, some afternoon shade can prevent the plant from wilting." },
      { title: "💧 Watering", body: "Tropical hibiscus are thirsty plants. In the heat of summer, they may need daily watering. Keep the soil consistently moist but never soggy. If the plant drops its buds, it's often a watering issue." },
      { title: "🌱 Soil & Fertilizer", body: "Use a rich, well-draining soil. Hibiscus require a lot of Potassium for large blooms, but they can be sensitive to high Phosphorus. Use a fertilizer specifically formulated for hibiscus or a high-potassium mix." },
    ],
    commonProblems: [
      { title: "Bud Drop (Flowers falling off before opening)", fix: "This is usually caused by stress: extreme heat, sudden cold drafts, under-watering, or over-watering. Check the soil moisture first and ensure the plant is protected from harsh winds." },
      { title: "Aphids & Whiteflies", cause: "These pests love the soft, juicy new growth and buds of the hibiscus.", fix: "Blast them off with a strong jet of water from the hose, then follow up with an insecticidal soap or Neem oil spray in the early evening." },
    ],
    video: {
      heading: "Get More Hibiscus Blooms",
      text: "Learn the secrets to pruning, fertilizing, and overwintering your hibiscus plants so they produce dozens of flowers simultaneously.",
      label: "Watch Hibiscus Care Guide",
      url: "https://youtu.be/qNhzpWkPJb8?si=KxvB7THbCVgZ8psj",
    },
  },
  {
    name: "Marigold",
    slug: "marigold",
    category: "flowering",
    image: "/plants/marigold.jpg",
    heroImage: "/plants/marigold/hero.JPG",
    headline: "🌼 The Ultimate Guide to Growing Marigolds",
    sunlight: "full",
    water: "low",
    difficulty: "easy",
    description:
      "Bright, cheerful, and virtually indestructible, Marigolds are the workhorses of the summer garden. Known for their brilliant hues of gold, copper, and brass, they not only look spectacular but also act as powerful, natural pest repellents for your vegetable beds. They are the ultimate low-maintenance flower!",
    extraSections: [
      { heading: "🛡️ The Gardener's Best Friend (Companion Planting)", body: "Plant marigolds around your tomatoes, peppers, and eggplants! The strong scent of their foliage confuses flying pests, and their roots produce a chemical (alpha-terthienyl) that kills harmful root-knot nematodes in the soil." },
    ],
    varieties: [
      { name: "French Marigolds", image: "/plants/marigold/french.jpg", description: "Compact and bushy, rarely exceeding 12 inches in height. They feature smaller, intricate blooms often with mahogany-red highlights. They are perfect for edging garden beds, lining walkways, or planting in small containers." },
      { name: "African Marigolds", image: "/plants/marigold/african.jpg", description: "Despite the name, these are native to the Americas. They grow quite tall (up to 3 feet) and produce massive, pom-pom-like double flowers in solid yellow or orange. They are excellent for cutting and background borders." },
      { name: "Signet Marigolds", image: "/plants/marigold/signet.jpg", description: "Unlike the other varieties, Signet marigolds have lacy, citrus-scented foliage and hundreds of tiny, single-petaled flowers. They are completely edible and make beautiful, spicy garnishes for salads and desserts." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "They require full, blazing sun. Plant them where they will get at least 8 hours of direct sunlight. Too much shade causes them to become leggy and produce fewer blooms while inviting powdery mildew." },
      { title: "💧 Watering", body: "Allow the soil to dry out between waterings. Once established, marigolds are highly drought-tolerant. Water them at the base to keep the flowers dry and prevent rotting." },
      { title: "🌱 Soil & Fertilizer", body: "Do NOT over-fertilize! Marigolds actually bloom best in poorer quality soil. If you give them rich, heavily fertilized soil, they will grow massive, lush green leaves but produce very few flowers." },
    ],
    commonProblems: [
      { title: "Spider Mites", cause: "During very hot, dry spells, the leaves might lose their green color and look dusty or webbed.", fix: "Spray the foliage forcefully with a hose to knock the mites off, or use insecticidal soap. Keep the plants properly watered during heatwaves." },
      { title: "Slugs and Snails", cause: "These pests love to devour young marigold seedlings overnight.", fix: "Protect young plants with crushed eggshells around the base or use organic slug baits until the plants are large and tough enough to withstand them." },
    ],
    video: {
      heading: "Deadheading for Endless Blooms",
      text: 'The secret to keeping marigolds blooming until winter is a process called "deadheading." Watch this quick tutorial to learn how to properly snap off old flowers to encourage new growth.',
      label: "Watch Marigold Care Guide",
      url: "https://youtu.be/hLs-oFz910U?si=N-oILNODeNDDbPYu",
    },
  },

  // ───────────────────────────── Medicinal ─────────────────────────────
  {
    name: "Tulasi",
    slug: "tulasi",
    category: "medicinal",
    image: "/plants/tulasi.jpg",
    heroImage: "/plants/tulasi/tulasihero.png",
    headline: "🌿 The Sacred Guide to Growing Tulasi",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      'Revered as the "Queen of Herbs," Tulasi (Holy Basil) is much more than just a garden plant; it is a sacred presence in Indian households. Known for its profound spiritual significance and powerful Ayurvedic properties, growing a healthy Tulasi plant brings both peace to the mind and wellness to the body. This guide will help you nurture and care for this divine plant at home.',
    extraSections: [
      { heading: "🙏 Cultural Significance", body: "In Hindu tradition, Tulasi is considered the earthly manifestation of the Goddess Tulasi and is deeply associated with Lord Vishnu. Placed in the courtyard center (Tulasi Vrindavan), it is worshipped daily for prosperity, spiritual purity, and to ward off negative energy from the home." },
      { heading: "⚕️ Medicinal Miracles", body: "A cornerstone of Ayurveda, Tulasi is an adaptogen that helps the body counter stress. Chewing raw leaves or brewing them into herbal tea helps boost immunity, relieves respiratory illnesses like coughs and colds, and acts as a potent antioxidant and anti-inflammatory agent." },
    ],
    varieties: [
      { name: "Krishna Tulasi (Shyama Tulasi)", image: "/plants/tulasi/krishnatulasi.jpg", description: "Characterized by its dark purple or purplish-green leaves and stems. It has a sharp, peppery, and crisp flavor. Because of its high medicinal concentration, it is widely used in Ayurveda to treat throat infections, respiratory ailments, and skin issues." },
      { name: "Vishnu Tulasi (Rama Tulasi)", image: "/plants/tulasi/vishnutulasi.jpg", description: "This variety features bright, broad green leaves and a milder, sweeter fragrance compared to Krishna Tulasi. It is the most commonly found variety in Indian households and is highly favored for daily worship and creating soothing herbal teas." },
      { name: "Lakshmi Tulasi", image: "/plants/tulasi/lakshmitulasi.jpg", description: "Often considered a close sibling to Rama Tulasi, the Lakshmi Tulasi is specifically planted and worshipped to attract wealth, harmony, and prosperity to the household. It boasts lush green foliage and thrives beautifully in well-lit courtyards." },
      { name: "Vana Tulasi (Wild Tulasi)", image: "/plants/tulasi/wild.jpg", description: "Native to the Himalayas and Indian plains, this wild variety grows much taller and has lighter green leaves with a strong, lemony aroma. While less common for daily home worship, it is highly valued for enhancing immunity and creating essential oils." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Tulasi is a tropical plant that loves the sun. It requires at least 6–8 hours of bright, direct sunlight daily. Place it on an east-facing balcony or courtyard to catch the gentle, auspicious morning sun." },
      { title: "💧 Watering", body: "Keep the soil slightly moist but never soggy. Water it daily during Indian summers, but reduce watering significantly in winter. Overwatering is the #1 cause of Tulasi dying, so ensure the top inch of soil is dry before watering again." },
      { title: "🌱 Soil & Pruning", body: "Use a well-draining potting mix (mix garden soil, sand, and vermicompost). To keep the plant bushy and healthy, regularly pinch off the Manjari (flower spikes/seeds) as soon as they appear, so the plant focuses on growing leaves." },
    ],
    commonProblems: [
      { title: "Yellowing Leaves & Root Rot", cause: "Usually caused by overwatering and poor drainage, especially during monsoons or winters.", fix: "Ensure your pot has drainage holes. Stop watering until the soil completely dries out. Add a handful of sand to the soil to improve drainage." },
      { title: "Mealybugs & Spider Mites", cause: "Tiny white cotton-like pests or webs on the undersides of leaves.", fix: "Avoid chemical pesticides since you consume the leaves. Spray the plant with a mild solution of organic Neem oil mixed with a few drops of liquid dish soap and water." },
    ],
    video: {
      heading: "Learn by Watching",
      text: "Want to ensure your Holy Basil thrives year-round? Watch this traditional and practical guide on how to plant, prune the 'Manjari', and care for your Tulasi plant at home.",
      label: "Watch Tulasi Care Tutorial",
      url: "https://youtu.be/uhYnR1ciT7M?si=4xlAICe3I_00ECdU",
    },
  },
  {
    name: "Mint",
    slug: "mint",
    category: "medicinal",
    image: "/plants/mint.jpg",
    heroImage: "/plants/mint/hero.jpg",
    headline: "🌿 The Ultimate Guide to Growing Mint",
    sunlight: "partial",
    water: "high",
    difficulty: "easy",
    description:
      "Refreshing, aromatic, and incredibly fast-growing, mint is one of the easiest herbs you can grow. Whether you want to brew fresh herbal teas, garnish a dessert, or muddle a summer drink, having fresh mint on hand is a joy. However, its aggressive growth means it requires a specific planting strategy!",
    extraSections: [
      { heading: "⚠️ The Golden Rule of Mint", body: "Never plant mint directly in your garden beds! Mint spreads rapidly via underground runners and will quickly take over your entire garden, choking out other plants. Always grow mint in pots or containers." },
    ],
    varieties: [
      { name: "Peppermint", image: "/plants/mint/peppermint.jpg", description: "Containing high amounts of menthol, peppermint has a sharp, intense, and cooling flavor. It usually features darker stems and is the absolute best choice for making soothing hot teas and extracting essential oils." },
      { name: "Spearmint", image: "/plants/mint/spearmint.jpg", description: "The classic culinary mint. Spearmint has a lighter, sweeter, and more delicate flavor compared to peppermint. It is the go-to variety for cooking, chutneys, salads, and muddling into mojitos." },
      { name: "Chocolate Mint", image: "/plants/mint/chocolate.jpg", description: "A fascinating hybrid that actually smells and tastes reminiscent of a peppermint patty! It is fantastic for garnishing baked goods, making desserts, or brewing a unique and sweet iced tea." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Mint is highly adaptable. It grows well in full sun, but it also thrives in partial shade. If you live in a very hot climate, afternoon shade will keep the leaves tender and prevent wilting." },
      { title: "💧 Watering", body: "Unlike many Mediterranean herbs, mint loves water. Keep the soil consistently moist but not soggy. During hot summer months, container-grown mint may need watering every day." },
      { title: "✂️ Pruning & Harvesting", body: "Harvest frequently! Regularly pinching off the top leaves encourages the plant to grow bushier rather than tall and leggy. Remove any flowers that appear to keep the flavor of the leaves strong." },
    ],
    commonProblems: [
      { title: "Mint Rust (Orange/Brown spots)", cause: "A common fungal disease that causes powdery orange spots on the undersides of the leaves.", fix: "This often happens in crowded, poorly ventilated spaces. Cut the plant back completely (it will regrow!) and ensure the new growth has good air circulation. Do not compost infected leaves." },
      { title: "Woody and Leggy Stems", cause: "The plant is very tall with few leaves at the bottom and a bitter taste.", fix: "The mint has likely gone to seed. Cut the entire plant down to about 2 inches above the soil line. It will flush out with tender, fresh new growth in a few weeks." },
    ],
    video: {
      heading: "Never Buy Mint Again",
      text: "Mint is incredibly easy to propagate from store-bought cuttings. Watch this tutorial to learn how to root mint in water and plant it in pots for an endless supply!",
      label: "Watch Mint Propagation Guide",
      url: "https://youtu.be/ftls90A6f4Y?si=9-LGsgt-7L_b018H",
    },
  },
  {
    name: "Aloe Vera",
    slug: "aloevera",
    category: "medicinal",
    image: "/plants/aloevera.jpg",
    heroImage: "/plants/aloevera/hero.jpg",
    headline: "🌵 The Ultimate Guide to Growing Aloe Vera",
    sunlight: "partial",
    water: "low",
    difficulty: "easy",
    description:
      'Revered for its incredible healing properties, Aloe Vera is a must-have succulent for any home. Known as the "plant of immortality" in ancient Egypt, the clear gel inside its thick leaves is famous for soothing burns and hydrating skin. Best of all, it is incredibly low-maintenance and thrives on neglect!',
    varieties: [
      { name: "Aloe Barbadensis Miller", image: "/plants/aloevera/miller.jpg", description: 'This is the "True Aloe" and the most common variety grown for medicinal and cosmetic use. It features thick, fleshy, grey-green leaves that yield the highest quality soothing gel.' },
      { name: "Aloe Arborescens", image: "/plants/aloevera/torch.jpg", description: "Also known as the Torch Aloe, this variety grows in a large, branching shrub form. It is famous for producing striking, bright red, torch-like flowers during the winter months." },
      { name: "Aloe Aristata", image: "/plants/aloevera/aristita.jpg", description: "Commonly called Lace Aloe, this is a beautiful dwarf variety perfect for small desks and windowsills. It has dark green leaves covered in white speckles and soft, lacy white edges." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Aloe Vera loves bright, indirect sunlight. A south or west-facing window is ideal. While they enjoy light, too much intense, direct summer sun can cause the leaves to burn and turn brown or red." },
      { title: "💧 Watering", body: "Less is more! Aloe is a succulent that stores water in its leaves. Water deeply, but allow the top 2-3 inches of soil to dry out completely before watering again. In winter, water very sparingly." },
      { title: "🌱 Soil & Pots", body: "Excellent drainage is mandatory. Use a sandy cactus or succulent potting mix. Always plant Aloe in a pot with drainage holes (terracotta is best as it allows the soil to dry out faster)." },
    ],
    commonProblems: [
      { title: "Mushy, Yellowing Leaves (Root Rot)", cause: "The number one killer of Aloe plants is overwatering.", fix: "Stop watering immediately. If the rot is severe, remove the plant from its pot, trim away the black, mushy roots, let it dry for a few days, and repot in fresh, dry soil." },
      { title: "Thin, Curling Leaves", cause: "The leaves are losing their plumpness and curling inward.", fix: "The plant is using up its own water reserves. It needs a thorough, deep watering. Soak the soil until water runs out the bottom." },
    ],
    video: {
      heading: "Harvesting the Healing Gel",
      text: "Want to use your Aloe Vera for skincare or burns? Watch this guide on how to safely harvest the leaves and extract the pure gel without damaging the mother plant.",
      label: "Watch Harvesting Guide",
      url: "https://youtu.be/O4LQdTgUui8?si=FBGUk0YpBtrdNjq_",
    },
  },

  // ───────────────────────────── Kitchen garden ─────────────────────────────
  {
    name: "Tomato",
    slug: "tomato",
    category: "kitchen",
    image: "/plants/tomato.jpg",
    heroImage: "/plants/tomato/toma.jpg",
    headline: "🍅 The Ultimate Guide to Growing Tomatoes",
    sunlight: "full",
    water: "moderate",
    difficulty: "medium",
    description:
      "Tomatoes are the undisputed crown jewel of the home vegetable garden. Whether you are planting in a sprawling backyard bed or utilizing pots on a sunny balcony, nothing compares to the taste of a warm, sun-ripened, homegrown tomato. This guide will walk you through everything you need to know to grow a bountiful, delicious harvest.",
    varieties: [
      { name: "Cherry Tomatoes", image: "/plants/tomato/cherrytomato.jpg", description: "Sweet, bite-sized, and incredibly prolific. Cherry tomatoes are perfect for snacking, salads, and roasting. They are highly adaptable and are the easiest variety to grow in containers or hanging baskets." },
      { name: "Roma (Plum) Tomatoes", image: "/plants/tomato/roma.jpg", description: "Known for their dense, meaty texture and low water content, Roma tomatoes are the absolute best choice for making thick homemade sauces, pastes, and canning. They typically produce their harvest all at once." },
      { name: "Beefsteak Tomatoes", image: "/plants/tomato/beefstack.jpg", description: "The giants of the tomato world! These large, juicy, and heavily ribbed tomatoes are perfect for slicing thick to put on sandwiches and burgers. They require sturdy staking and patience as they take longer to ripen." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Tomatoes are sun-worshippers. They need a minimum of 6 to 8 hours of direct, unfiltered sunlight every day to produce flowers and ripen their fruit effectively." },
      { title: "💧 Watering", body: "Consistency is everything. Water deeply at the base of the plant to encourage deep root systems. Never water from above, as wet leaves easily lead to fungal diseases. Keep soil moist but not soggy." },
      { title: "🌱 Soil & Support", body: "Plant deep in rich, well-draining soil loaded with compost. Tomatoes root along their buried stems! Always provide support early using stakes, cages, or trellises before the plant gets too heavy." },
    ],
    commonProblems: [
      { title: "Blossom End Rot", cause: "Dark, sunken, leathery spots appear on the bottom of the tomatoes.", fix: "This is caused by a calcium deficiency, usually triggered by inconsistent watering. Water regularly and add crushed eggshells or a calcium supplement to the soil." },
      { title: "Early & Late Blight", cause: "Yellowing leaves with brown spots starting from the bottom of the plant.", fix: "Remove affected leaves immediately. Prevent it by watering only at the base, mulching around the plant to prevent soil splashing, and ensuring good air circulation." },
      { title: "Tomato Hornworms", cause: "Massive green caterpillars that can defoliate a plant overnight.", fix: "Handpick them off the plant (they glow under a blacklight at night!) or use organic Bt (Bacillus thuringiensis) spray." },
    ],
    video: {
      heading: "Master the Art of Tomato Growing",
      text: "From proper pruning techniques (suckers!) to staking and feeding, watch this comprehensive visual guide to guarantee a massive tomato harvest this season.",
      label: "Watch Tomato Growing Guide",
      url: "https://youtu.be/eySTo2GgvoY?si=d4VXjei9J2hBMIOa",
    },
  },
  {
    name: "Chilli",
    slug: "chilli",
    category: "kitchen",
    image: "/plants/chilli.jpg",
    heroImage: "/plants/chilli/hero.jpg",
    headline: "🌶️ The Ultimate Guide to Growing Chillies",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "Add some heat to your garden and your kitchen! Growing your own chillies is incredibly rewarding. From mild and sweet to fiery hot, chilli plants are highly productive, compact enough for balconies, and thrive in warm, sunny conditions.",
    varieties: [
      { name: "Jalapeño", image: "/plants/chilli/jalapeno.jpg", description: "A classic, versatile pepper with a mild to medium heat. The thick flesh is perfect for stuffing, pickling, or making homemade salsas." },
      { name: "Bird's Eye (Thai Chilli)", image: "/plants/chilli/birdseye.jpg", description: "Small but mighty! These tiny, upward-pointing chillies pack a serious punch and are a staple in Asian cuisine and spicy curries." },
      { name: "Cayenne", image: "/plants/chilli/cayenne.jpg", description: "Long, slender, and very hot. Cayenne peppers are incredibly prolific and dry beautifully, making them ideal for making your own chilli powder or flakes." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Chillies demand heat and sunshine. They need at least 6 to 8 hours of direct sunlight daily to produce maximum fruit." },
      { title: "💧 Watering", body: "Water thoroughly, then let the top layer of soil dry out. Slight water stress can actually make the chillies hotter, but never let the plant severely wilt." },
      { title: "🌱 Soil", body: "Use a rich, well-draining soil. Apply a tomato/vegetable fertilizer once flowers appear to encourage massive fruit production." },
    ],
    commonProblems: [
      { title: "Leaf Curl Virus", cause: "Leaves curl upwards, crinkle, and stunt plant growth (usually spread by pests).", fix: "Control whiteflies and aphids with Neem oil. Remove severely infected plants so it doesn't spread." },
      { title: "Flower Drop", cause: "Flowers fall off before forming peppers.", fix: "Usually caused by extreme heat, cold nights, or lack of pollination. Give the plant a gentle shake to help spread pollen." },
    ],
    video: {
      heading: "Grow a Massive Chilli Harvest",
      text: "Watch this expert guide on pruning, feeding, and maximizing your pepper yields this season.",
      label: "Watch Chilli Care Guide",
      url: "https://youtu.be/rPlEA5_JrBs?si=rDxgZI0-WZPCCoaj",
    },
  },
  {
    name: "Coriander",
    slug: "coriander",
    category: "kitchen",
    image: "/plants/coriander.jpg",
    heroImage: "/plants/coriander/hero.jpg",
    headline: "🌿 The Ultimate Guide to Growing Coriander (Cilantro)",
    sunlight: "partial",
    water: "moderate",
    difficulty: "easy",
    description:
      "Coriander is an essential culinary herb used worldwide. You get two harvests from one plant: the fresh, citrusy leaves (cilantro) and the warm, spicy seeds (coriander). While it grows fast, it has a reputation for being tricky in hot weather.",
    extraSections: [
      { heading: "💡 The Secret to Coriander: Depth!", body: "Coriander develops a deep taproot. Never transplant it, as disturbing the root causes it to bolt (go to seed prematurely). Always sow seeds directly into a deep pot (at least 10-12 inches) or straight into your garden bed." },
    ],
    careRequirements: [
      { title: "⛅ Sunlight", body: "Coriander loves cool weather. In spring/autumn, give it full sun. In summer heat, partial or afternoon shade is mandatory to stop it from going to seed too fast." },
      { title: "💧 Watering", body: "Keep the soil consistently moist but never waterlogged. Do not let the soil dry out completely, as drought stress immediately triggers bolting." },
      { title: "✂️ Harvesting", body: "Harvest outer leaves regularly once the plant is 6 inches tall. If white flowers appear, you can let them turn into seeds, dry them, and grind them into coriander powder!" },
    ],
    video: {
      heading: "Stop Your Coriander from Dying",
      text: "Learn the exact method to split coriander seeds, sow them properly, and grow a bushy, never-ending supply of cilantro.",
      label: "Watch Coriander Growing Guide",
      url: "https://youtu.be/A1tgo68-DH8?si=fFccU6BzjevMAU8m",
    },
  },

  // ───────────────────────────── Fruit ─────────────────────────────
  {
    name: "Lemon",
    slug: "lemon",
    category: "fruit",
    image: "/plants/lemon.jpg",
    heroImage: "/plants/lemon/lemon-hero.jpg",
    headline: "🍋 The Ultimate Guide to Growing Lemons",
    sunlight: "full",
    water: "moderate",
    difficulty: "medium",
    description:
      "Growing a lemon tree in your home garden or on a sunny balcony is an incredibly rewarding experience. Not only do they provide a year-round lush evergreen presence and intoxicatingly fragrant white blossoms, but there is nothing quite like harvesting your own fresh, zesty lemons for cooking and drinks.",
    varieties: [
      { name: "Meyer Lemon", image: "/plants/lemon/meyer-lemon.jpg", description: "A cross between a regular lemon and a mandarin orange. It has a sweeter, less acidic flavor and thin skin. It is naturally dwarf-sized, making it the absolute best choice for growing in pots and containers." },
      { name: "Eureka Lemon", image: "/plants/lemon/eureka-lemon.jpg", description: "The classic grocery store lemon. It produces highly acidic, tart, and juicy fruit. It thrives in warm climates and tends to bear fruit year-round, but requires a bit more space if planted in the ground." },
      { name: "Lisbon Lemon", image: "/plants/lemon/lisbon-lemon.jpg", description: "Very similar in taste and appearance to the Eureka, but the Lisbon tree is much hardier. It tolerates heat, cold, and wind better than other varieties, making it ideal for outdoor planting in challenging climates." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Citrus trees are sun lovers. They require 8 to 12 hours of direct sunlight daily. If growing indoors, place them by your brightest south-facing window or use a grow light." },
      { title: "💧 Watering", body: 'Water deeply, but infrequently. Allow the top 2-3 inches of soil to dry out completely before watering again. Lemon trees hate having "wet feet," which causes root rot.' },
      { title: "🌱 Soil & Fertilizer", body: "Use a well-draining, slightly acidic soil mix (pH 5.5-6.5). Lemons are heavy feeders—apply a specific citrus fertilizer rich in nitrogen, iron, and zinc during the active growing season." },
    ],
    commonProblems: [
      { title: "Yellowing Leaves with Green Veins", cause: "This is a sign of Iron Chlorosis (iron deficiency), very common in potted citrus.", fix: "Apply a liquid iron chelate foliar spray or add a citrus-specific micronutrient fertilizer to the soil." },
      { title: "Citrus Leaf Miner", cause: "Silvery, winding trails appear on the new, tender leaves, causing them to curl and distort.", fix: "Spray organic Neem oil on new growth every 10-14 days to deter the moth from laying eggs." },
    ],
    video: {
      heading: "Master Citrus Care",
      text: "Want a massive lemon harvest even in small pots? Watch this complete guide on fertilizing, pruning, and watering your lemon tree.",
      label: "Watch Lemon Care Guide",
      url: "https://youtu.be/XC67v3q-m28?si=33SkhOfq-FjEex3l",
    },
  },
  {
    name: "Guava",
    slug: "guava",
    category: "fruit",
    image: "/plants/guava.jpg",
    heroImage: "/plants/guava/hero.jpg",
    headline: "🍐 The Ultimate Guide to Growing Guavas",
    sunlight: "full",
    water: "moderate",
    difficulty: "easy",
    description:
      "Guavas are beautiful, fast-growing tropical trees that produce incredibly fragrant, vitamin C-rich fruit. They are remarkably resilient, drought-tolerant once established, and can even be grown successfully in large containers!",
    varieties: [
      { name: "Allahabad Safeda", image: "/plants/guava/safeda.jpg", description: "The most famous Indian commercial variety. It features smooth yellow-green skin and soft, sweet, white flesh with fewer seeds." },
      { name: "Pink/Red Guava", image: "/plants/guava/pink.jpg", description: "Known for its striking deep pink interior and highly aromatic, slightly musky flavor. It is fantastic for making jams and juices." },
    ],
    careRequirements: [
      { title: "☀️ Sunlight", body: "Plant your guava tree in the sunniest spot possible. They need full, direct sun (8+ hours) to produce sweet fruit." },
      { title: "💧 Watering", body: "Young trees need regular deep watering. Mature trees are drought-tolerant but need consistent water during flower and fruit development to prevent the fruit from dropping." },
      { title: "✂️ Pruning", body: "Guavas fruit on new growth. Prune the tips of the branches regularly to encourage the tree to bush out and produce more fruiting wood." },
    ],
    video: {
      heading: "Master Guava Tree Care",
      text: 'Watch this tutorial on the "pinching" method to force your guava tree to branch out and multiply its fruit yield in a pot.',
      label: "Watch Guava Care Guide",
      url: "https://youtu.be/pVNAgind6Pg?si=I9gMOUIvkT2hiHO2",
    },
  },
  {
    name: "Papaya",
    slug: "papaya",
    category: "fruit",
    image: "/plants/papaya.jpg",
    heroImage: "/plants/papaya/hero.jpg",
    headline: "🥭 The Ultimate Guide to Growing Papayas",
    sunlight: "full",
    water: "high",
    difficulty: "medium",
    description:
      "Papayas are magnificent, fast-growing tropical plants that can grow from seed to a fruit-bearing tree in less than a year! Their massive leaves add an instant jungle feel to your yard, and homegrown papayas are unimaginably sweet compared to store-bought ones.",
    extraSections: [
      { heading: "⚠️ Understanding Papaya Genders", body: 'Papaya plants can be male, female, or hermaphrodite. Male trees do not produce fruit. For a home garden, always try to buy "Hermaphrodite" seeds (like the Red Lady variety) because they self-pollinate and guarantee fruit on every single tree.' },
    ],
    careRequirements: [
      { title: "☀️ Sunlight & Warmth", body: "Papayas absolutely require full sun and plenty of heat. They are highly frost-sensitive and should be planted in the warmest, most protected spot in your garden." },
      { title: "💧 Watering (Crucial)", body: "Papayas are extremely susceptible to root rot. They need plenty of water to support massive leaves and fruit, but the water must drain away instantly. Never let water pool around the base." },
      { title: "🌱 Heavy Feeding", body: "Because they grow so rapidly, they are heavy feeders. Apply a thick layer of compost or aged manure around the base, and feed with a balanced fertilizer every two weeks." },
    ],
    commonProblems: [
      { title: "Papaya Ringspot Virus", cause: "Leaves become mottled/yellow, and the fruit develops distinct ring patterns.", fix: "This is incurable and spread by aphids. Remove and destroy the infected plant immediately. Always plant virus-resistant varieties if possible." },
    ],
    video: {
      heading: "Grow Papaya from Seed",
      text: "Want to grow a papaya tree from the seeds of a store-bought fruit? Watch this step-by-step guide on germinating and transplanting them safely.",
      label: "Watch Papaya Care Guide",
      url: "https://youtu.be/iUceYy_ZZJA?si=4CPAA3WWTu3V_wxM",
    },
  },
];
