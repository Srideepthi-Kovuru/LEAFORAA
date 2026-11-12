/**
 * LEAFORA Botanical Catalog
 * Realistic plant inventory with botanical details, care requirements, and high-res photography.
 */

export const INITIAL_PLANTS = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa',
    category: 'Indoor',
    price: 48,
    originalPrice: 58,
    rating: 4.9,
    reviewsCount: 142,
    stock: 24,
    difficulty: 'Easy',
    light: 'Bright indirect',
    water: 'Every 7-10 days',
    waterDays: 7,
    petFriendly: false,
    airPurifying: true,
    height: '60 - 80 cm',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Bestseller',
    shortDescription: 'The iconic Swiss Cheese Plant featuring dramatic, natural leaf fenestrations that bring tropical elegance into any space.',
    description: 'Monstera Deliciosa is beloved worldwide for its unique split leaves and effortless adaptability. Native to the rainforests of Central America, it thrives in warm indoor spaces with moderate to bright indirect sunlight. As it matures, dramatic slits form along the broad foliage, creating an unforgettable architectural centerpiece for living rooms and offices.',
    careGuide: {
      light: 'Thrives in medium to bright indirect light. Avoid direct, harsh afternoon sun which can scorch the leaves.',
      water: 'Water once the top 2-3 inches of soil feel dry. Typically every 7 to 10 days. Reduce watering frequency during autumn and winter.',
      humidity: 'Prefers 50-70% humidity. Mist leaves weekly or wipe with a damp cloth to remove nursery dust.',
      soil: 'Rich, well-draining peat and perlite potting mix with pine bark chunks.',
      temperature: '18°C - 29°C (65°F - 85°F). Keep away from drafty AC vents or heating radiators.',
      toxicity: 'Mildly toxic if ingested by cats or dogs due to calcium oxalate crystals.'
    },
    sizes: [
      { name: 'Small (4" pot)', priceMultiplier: 0.8 },
      { name: 'Medium (6" pot)', priceMultiplier: 1.0 },
      { name: 'Large (10" pot)', priceMultiplier: 1.45 }
    ]
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    category: 'Indoor',
    price: 65,
    originalPrice: 79,
    rating: 4.7,
    reviewsCount: 98,
    stock: 15,
    difficulty: 'Moderate',
    light: 'Bright indirect',
    water: 'Every 7-9 days',
    waterDays: 8,
    petFriendly: false,
    airPurifying: true,
    height: '90 - 120 cm',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Popular',
    shortDescription: 'Tall and dramatic indoor tree crowned with violin-shaped emerald leaves.',
    description: 'The Fiddle Leaf Fig is the premier design-favorite indoor tree. With sculptural lyre-shaped foliage and an upright trunk, it instantly elevates architectural spaces. Thrives when placed near an east- or south-facing window with ample filtered sunshine.',
    careGuide: {
      light: 'Needs abundant bright, indirect light. Rotate pot every few weeks for symmetrical growth.',
      water: 'Water deeply when top 50% of the soil is dry. Drain excess water completely from the saucer.',
      humidity: 'Average home humidity is fine; enjoys occasional leaf dusting with clean water.',
      soil: 'Aerated organic houseplant soil with perlite.',
      temperature: '18°C - 27°C. Sensitive to sudden temperature fluctuations and cold drafts.',
      toxicity: 'Toxic to pets if chewed or ingested.'
    },
    sizes: [
      { name: 'Medium (6" pot)', priceMultiplier: 1.0 },
      { name: 'Large (10" pot)', priceMultiplier: 1.5 }
    ]
  },
  {
    id: 'snake-plant-laurentii',
    name: 'Snake Plant Laurentii',
    botanicalName: 'Sansevieria trifasciata',
    category: 'Air Purifying',
    price: 32,
    originalPrice: 38,
    rating: 4.95,
    reviewsCount: 210,
    stock: 45,
    difficulty: 'Easy',
    light: 'Low light',
    water: 'Every 14-21 days',
    waterDays: 14,
    petFriendly: false,
    airPurifying: true,
    height: '45 - 65 cm',
    image: 'https://images.unsplash.com/photo-1593482874117-89e9f289c6ca?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593482874117-89e9f289c6ca?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Unkillable',
    shortDescription: 'Virtually indestructible air-purifying champion with striking gold-edged sword leaves.',
    description: 'Renowned for its near-indestructible nature, the Snake Plant Laurentii releases oxygen through the night and filters airborne toxins like formaldehyde and xylene. Perfect for bedrooms, low-light corners, and busy plant parents who travel often.',
    careGuide: {
      light: 'Adaptable to almost any light: from low dimly lit rooms to bright filtered light.',
      water: 'Extremely drought tolerant. Water only when soil is 100% bone dry, usually every 2-3 weeks.',
      humidity: 'Low to average household humidity. Does not need misting.',
      soil: 'Fast-draining cactus or succulent blend with pumice.',
      temperature: '15°C - 30°C. Protect from frost.',
      toxicity: 'Mild toxicity to cats and dogs.'
    },
    sizes: [
      { name: 'Small (4" pot)', priceMultiplier: 0.85 },
      { name: 'Medium (6" pot)', priceMultiplier: 1.0 },
      { name: 'Large (8" pot)', priceMultiplier: 1.35 }
    ]
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    botanicalName: 'Goeppertia orbifolia',
    category: 'Pet Friendly',
    price: 42,
    originalPrice: 49,
    rating: 4.8,
    reviewsCount: 76,
    stock: 18,
    difficulty: 'Moderate',
    light: 'Medium indirect',
    water: 'Every 5-7 days',
    waterDays: 6,
    petFriendly: true,
    airPurifying: true,
    height: '40 - 55 cm',
    image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: '100% Pet Safe',
    shortDescription: 'Lush silver-striped oversized leaves that move in prayer as evening falls.',
    description: 'The Calathea Orbifolia is a show-stopping Brazilian prayer plant featuring metallic silver-green brushstroke stripes across broad circular leaves. Fully pet-safe and non-toxic, it brings botanical luxury to homes with curious cats and dogs.',
    careGuide: {
      light: 'Prefers soft, diffused, medium indirect light. Direct sunlight will bleach its silver stripes.',
      water: 'Keep soil consistently damp, not soggy. Use filtered or rainwater to avoid mineral leaf tips.',
      humidity: 'Loves high humidity (60%+). Place near a humidifier or on a pebble tray.',
      soil: 'Moisture-retaining but porous blend of potting soil, peat moss, and vermiculite.',
      temperature: '18°C - 26°C. Keep away from cold drafts.',
      toxicity: '100% Non-toxic to cats, dogs, and humans.'
    },
    sizes: [
      { name: 'Medium (6" pot)', priceMultiplier: 1.0 },
      { name: 'Large (8" pot)', priceMultiplier: 1.4 }
    ]
  },
  {
    id: 'peace-lily-sensation',
    name: 'Peace Lily Sensation',
    botanicalName: 'Spathiphyllum wallisii',
    category: 'Flowering',
    price: 36,
    originalPrice: 44,
    rating: 4.85,
    reviewsCount: 164,
    stock: 28,
    difficulty: 'Easy',
    light: 'Low to medium',
    water: 'Every 5-7 days',
    waterDays: 6,
    petFriendly: false,
    airPurifying: true,
    height: '50 - 70 cm',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Blooms Indoors',
    shortDescription: 'Glossy deep green foliage punctuated with pure white spathe flowers that purify the air.',
    description: 'Peace Lily is one of the most reliable flowering indoor plants. It clearly signals when it needs water by gracefully drooping, and springs right back to life within an hour of hydration. Famous for top NASA clean air rankings.',
    careGuide: {
      light: 'Thrives in medium to low shade. Avoid direct scorching sun.',
      water: 'Water when top 1-2 inches are dry. If the plant droops, give a good soak.',
      humidity: 'Appreciates average to high moisture. Spritz leaves occasionally.',
      soil: 'Rich standard houseplant potting soil with good moisture retention.',
      temperature: '18°C - 27°C.',
      toxicity: 'Toxic to pets if chewed.'
    },
    sizes: [
      { name: 'Small (5" pot)', priceMultiplier: 0.8 },
      { name: 'Medium (7" pot)', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'string-of-pearls',
    name: 'String of Pearls',
    botanicalName: 'Senecio rowleyanus',
    category: 'Succulents & Cacti',
    price: 28,
    originalPrice: 34,
    rating: 4.65,
    reviewsCount: 62,
    stock: 20,
    difficulty: 'Moderate',
    light: 'Bright direct/indirect',
    water: 'Every 10-14 days',
    waterDays: 12,
    petFriendly: false,
    airPurifying: false,
    height: 'Cascading 30 - 50 cm',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Cascading',
    shortDescription: 'Delicate trailing succulent beads that cascade over hanging baskets like living green pearls.',
    description: 'A botanical curiosity native to southwest Africa, this trailing succulent forms long tendrils covered in pea-shaped spherical leaves. Ideal for sunny hanging planters, shelves, and macramé plant hangers.',
    careGuide: {
      light: 'Needs several hours of bright sunlight or filtered light on the top of the pot.',
      water: 'Bottom-water when pearls become slightly puckered or soft. Avoid overwatering.',
      humidity: 'Dry household air; keep away from steamy bathrooms.',
      soil: 'Extra gritty cactus & perlite mix with drainage holes.',
      temperature: '16°C - 28°C.',
      toxicity: 'Mildly toxic to pets.'
    },
    sizes: [
      { name: 'Small Hanging (4")', priceMultiplier: 0.9 },
      { name: 'Medium Hanging (6")', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'zz-plant-raven',
    name: 'ZZ Plant Raven',
    botanicalName: 'Zamioculcas zamiifolia',
    category: 'Rare & Exotic',
    price: 52,
    originalPrice: 65,
    rating: 4.9,
    reviewsCount: 88,
    stock: 12,
    difficulty: 'Easy',
    light: 'Low to bright',
    water: 'Every 14-21 days',
    waterDays: 16,
    petFriendly: false,
    airPurifying: true,
    height: '40 - 60 cm',
    image: 'https://images.unsplash.com/photo-1632490538947-66a1a79f4efb?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1632490538947-66a1a79f4efb?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Rare Gothic',
    shortDescription: 'Dramatic foliage that emerges bright lime green and matures into deep, lustrous midnight purple-black.',
    description: 'The Raven ZZ plant is an exotic patented variety boasting ultra-glossy, near-black foliage. Storing water in underground potato-like rhizomes, it is resilient to neglect, thrives in windowless offices, and provides striking high-contrast modern decor.',
    careGuide: {
      light: 'Tolerates low light exceptionally well, also thrives in bright indirect light.',
      water: 'Water once a month or every 2-3 weeks when soil is completely dry.',
      humidity: 'Thrives in regular room humidity.',
      soil: 'Porous, quick-draining cactus and houseplant potting mix.',
      temperature: '16°C - 30°C.',
      toxicity: 'Toxic to animals if ingested.'
    },
    sizes: [
      { name: 'Medium (6" pot)', priceMultiplier: 1.0 },
      { name: 'Large (8" pot)', priceMultiplier: 1.4 }
    ]
  },
  {
    id: 'birds-nest-fern',
    name: "Bird's Nest Fern",
    botanicalName: 'Asplenium nidus',
    category: 'Pet Friendly',
    price: 34,
    originalPrice: 40,
    rating: 4.75,
    reviewsCount: 54,
    stock: 22,
    difficulty: 'Easy',
    light: 'Medium indirect',
    water: 'Every 5-7 days',
    waterDays: 6,
    petFriendly: true,
    airPurifying: true,
    height: '35 - 50 cm',
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Pet Friendly',
    shortDescription: 'Wavy crinkled lime fronds radiating out from a central fuzzy rosette.',
    description: 'Unlike delicate lace ferns, the Bird\'s Nest Fern boasts thick, sculptural chartreuse fronds with undulating rippled edges. A completely non-toxic epiphyte that naturally perches on tropical tree branches, it is splendid for bathrooms and pet-friendly homes.',
    careGuide: {
      light: 'Medium to low indirect light. Never direct hot sun.',
      water: 'Water around the outer soil perimeter. Avoid pouring water directly into the central crown rosette.',
      humidity: 'Enjoys higher humidity (50%+). Excellent for bathrooms.',
      soil: 'Rich, moisture-retaining organic potting mix with peat and orchid bark.',
      temperature: '18°C - 26°C.',
      toxicity: 'Non-toxic, safe for cats and dogs.'
    },
    sizes: [
      { name: 'Small (4" pot)', priceMultiplier: 0.8 },
      { name: 'Medium (6" pot)', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'sweet-basil-rosemary-trio',
    name: 'Aromatic Herb Garden Trio',
    botanicalName: 'Ocimum basilicum & Rosmarinus officinalis',
    category: 'Herb & Kitchen',
    price: 30,
    originalPrice: 38,
    rating: 4.8,
    reviewsCount: 110,
    stock: 30,
    difficulty: 'Easy',
    light: 'Bright direct sun',
    water: 'Every 3-4 days',
    waterDays: 4,
    petFriendly: true,
    airPurifying: false,
    height: '25 - 35 cm',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Kitchen Fresh',
    shortDescription: 'Organic Italian Sweet Basil, Tuscan Rosemary, and English Thyme grown together for farm-to-table culinary cooking.',
    description: 'Fresh aromatic culinary trio ready for kitchen windowsills, balconies, and sunny countertops. Harvest fragrant organic sprigs for pestos, pastas, roasted dishes, and herbal tea infusions.',
    careGuide: {
      light: 'Needs 5+ hours of direct sunny windowsill light daily.',
      water: 'Water whenever top inch feels dry. Basil loves steady moisture; rosemary prefers drier roots.',
      humidity: 'Normal kitchen humidity is ideal.',
      soil: 'Organic herb and vegetable potting soil with good compost.',
      temperature: '18°C - 28°C.',
      toxicity: '100% edible and safe for pets.'
    },
    sizes: [
      { name: 'Kitchen Trio Planter', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'olive-tree-artisan',
    name: 'European Olive Tree',
    botanicalName: 'Olea europaea',
    category: 'Outdoor',
    price: 89,
    originalPrice: 110,
    rating: 4.88,
    reviewsCount: 47,
    stock: 9,
    difficulty: 'Moderate',
    light: 'Full direct sun',
    water: 'Every 7-10 days',
    waterDays: 8,
    petFriendly: true,
    airPurifying: true,
    height: '100 - 140 cm',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Mediterranean Luxury',
    shortDescription: 'Timeless Mediterranean standard tree with silvery-sage foliage and gnarled rustic bark.',
    description: 'Bring sun-drenched Tuscan charm to your patio, terrace, or sun-drenched sunroom. The European Olive Tree is celebrated for its graceful silvery leaves and historic resilience.',
    careGuide: {
      light: 'Requires 6+ hours of full direct sunlight each day.',
      water: 'Water deeply then let the top 2 inches dry out completely.',
      humidity: 'Prefers dry, well-ventilated air.',
      soil: 'Gritty, Mediterranean sandy loam with excellent drainage.',
      temperature: 'Hardy down to -5°C once established, loves 20°C - 32°C.',
      toxicity: 'Safe for pets.'
    },
    sizes: [
      { name: 'Patio Standard (8" pot)', priceMultiplier: 1.0 },
      { name: 'Mature Estate (12" pot)', priceMultiplier: 1.7 }
    ]
  },
  {
    id: 'anthurium-clarinervium',
    name: 'Anthurium Clarinervium',
    botanicalName: 'Anthurium clarinervium',
    category: 'Rare & Exotic',
    price: 58,
    originalPrice: 72,
    rating: 4.92,
    reviewsCount: 39,
    stock: 8,
    difficulty: 'Advanced',
    light: 'Bright indirect',
    water: 'Every 6-8 days',
    waterDays: 7,
    petFriendly: false,
    airPurifying: true,
    height: '35 - 50 cm',
    image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Collector Choice',
    shortDescription: 'Deep emerald velvet heart leaves etched with crystalline white veins.',
    description: 'Native to southern Mexico, Anthurium Clarinervium is one of the most coveted aroids in modern botany. The cardboard-thick leaves feel like royal suede to the touch, with gleaming white venation resembling lightning bolts.',
    careGuide: {
      light: 'Bright, dappled indirect light. Never direct sun.',
      water: 'Allow top half of soil to dry before watering thoroughly. Never let roots sit in standing water.',
      humidity: 'Thrives in 65%+ humidity.',
      soil: 'Chunky aroid mix: orchid bark, perlite, pumice, and charcoal.',
      temperature: '19°C - 27°C.',
      toxicity: 'Toxic to pets.'
    },
    sizes: [
      { name: 'Collector (6" pot)', priceMultiplier: 1.0 }
    ]
  },
  {
    id: 'golden-pothos-totem',
    name: 'Golden Pothos Totem',
    botanicalName: 'Epipremnum aureum',
    category: 'Air Purifying',
    price: 38,
    originalPrice: 46,
    rating: 4.94,
    reviewsCount: 185,
    stock: 35,
    difficulty: 'Easy',
    light: 'Low to bright',
    water: 'Every 7-10 days',
    waterDays: 8,
    petFriendly: false,
    airPurifying: true,
    height: '70 - 90 cm',
    image: 'https://images.unsplash.com/photo-1596724803525-4c6e94e50259?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596724803525-4c6e94e50259?auto=format&fit=crop&w=1000&q=80'
    ],
    tag: 'Air Champion',
    shortDescription: 'Fast-climbing lush vines with marble yellow-green variegation trained on an organic coco coir moss pole.',
    description: 'Golden Pothos is the quintessential forgiving houseplant. Grown vertically on an organic coir pole, its heart leaves expand in size as they ascend. Excellent for beginners, offices, and apartments with varying light conditions.',
    careGuide: {
      light: 'Adaptable to low light, thrives best in bright indirect light.',
      water: 'Water when top 2 inches dry out. Very forgiving if forgotten.',
      humidity: 'Tolerant of normal indoor dry air.',
      soil: 'Standard well-draining houseplant potting mix.',
      temperature: '17°C - 29°C.',
      toxicity: 'Mild toxicity to pets.'
    },
    sizes: [
      { name: 'Climbing Pole (6" pot)', priceMultiplier: 1.0 },
      { name: 'Floor Totem (8" pot)', priceMultiplier: 1.4 }
    ]
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Botanical Plants',
    count: 12,
    icon: 'Sparkles',
    description: 'Explore our complete greenhouse nursery collection'
  },
  {
    id: 'Indoor',
    name: 'Indoor Plants',
    count: 5,
    icon: 'Home',
    description: 'Sculptural greens to elevate living spaces and offices',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Air Purifying',
    name: 'Air Purifying',
    count: 4,
    icon: 'Wind',
    description: 'NASA-proven natural air filters that absorb toxins',
    image: 'https://images.unsplash.com/photo-1593482874117-89e9f289c6ca?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Pet Friendly',
    name: 'Pet Friendly',
    count: 3,
    icon: 'HeartHandshake',
    description: '100% non-toxic botanical treasures safe for dogs & cats',
    image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Succulents & Cacti',
    name: 'Succulents & Cacti',
    count: 2,
    icon: 'Sun',
    description: 'Drought-tolerant architectural beauties requiring minimal care',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Rare & Exotic',
    name: 'Rare & Exotic',
    count: 2,
    icon: 'Crown',
    description: 'Limited greenhouse collector specimens with unique foliage',
    image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Flowering',
    name: 'Flowering Beauties',
    count: 1,
    icon: 'Flower2',
    description: 'Seasonal blooming specimens delivering vibrant floral fragrances',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Outdoor',
    name: 'Outdoor & Patio',
    count: 1,
    icon: 'Trees',
    description: 'Hardy Mediterranean standards and terrace foliage',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'Herb & Kitchen',
    name: 'Herb & Kitchen Garden',
    count: 1,
    icon: 'Utensils',
    description: 'Farm-fresh organic culinary herbs for windowsills',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80'
  }
];

export const POT_OPTIONS = [
  { id: 'nursery', name: 'Standard Nursery Grower Pot', price: 0, color: '#3f3a34' },
  { id: 'terracotta', name: 'Handcrafted Italian Terracotta', price: 14, color: '#c46849' },
  { id: 'ceramic-cream', name: 'Artisan Glazed Cream Ceramic', price: 18, color: '#f3ede2' },
  { id: 'ceramic-sage', name: 'Forest Sage Matte Ceramic', price: 18, color: '#526955' },
  { id: 'slate-grey', name: 'Nordic Charcoal Slate Planter', price: 22, color: '#2b3034' }
];
