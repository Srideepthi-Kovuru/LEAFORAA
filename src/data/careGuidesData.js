/**
 * Botanical Care Encyclopedia & Diagnostic Doctor
 */

export const CARE_GUIDES = [
  {
    id: 'watering-mastery',
    title: 'The Art of Watering: Frequency vs. Volume',
    category: 'Watering',
    readTime: '4 min read',
    summary: 'Why the "once a week" rule fails, and how to read soil moisture with the finger test and weight method.',
    icon: 'Droplets',
    content: `
### 1. Drench, Don't Dribble
One of the most frequent misconceptions is giving a plant a small splash of water every day. In nature, tropical plants experience deep downpours followed by drying out periods. When you water, soak the root ball until water flows out through the drainage hole, then discard runoff from the saucer after 15 minutes.

### 2. The Golden Finger Test
Before grabbing the watering can, insert your index finger 2 inches into the potting medium:
- If soil clings to your skin and feels cool: Wait 2-3 more days.
- If soil feels dry and crumbly: It is time to hydrate.

### 3. Tap Water vs. Filtered
Plants like Calatheas and Ferns are sensitive to fluoride and chlorine. If your municipal water is hard, leave tap water in an open pitcher for 24 hours to let chlorine evaporate, or use filtered/rainwater.
    `
  },
  {
    id: 'light-deciphered',
    title: 'Deciphering Indoor Sunlight: Direct vs. Bright Indirect',
    category: 'Lighting',
    readTime: '5 min read',
    summary: 'Map your home windows (North, South, East, West) to match your plants to their natural light zones.',
    icon: 'SunMedium',
    content: `
### 1. South-Facing Windows (High Intensity)
Delivers bright, warm sun all day. Ideal for Ficus Lyrata, European Olive Trees, Cacti, and Mediterranean Herbs. If foliage shows scorched bleached patches, diffuse with a sheer linen curtain.

### 2. East-Facing Windows (Gentle Morning Sun)
Provides soft morning rays without scorching afternoon heat. Perfect for Monstera, Anthurium, and Pothos.

### 3. West-Facing Windows (Late Afternoon Warmth)
Warm light that peaks in the evening. Keep plants 2-4 feet back from the glass to prevent leaf sunburn.

### 4. North-Facing & Interior Rooms (Low Indirect Light)
Soft diffused ambient light. Ideal sanctuary for Snake Plants, ZZ Plants, and Cast Iron foliage.
    `
  },
  {
    id: 'soil-and-repotting',
    title: 'Soil Aeration & When to Repot Your Foliage',
    category: 'Soil & Roots',
    readTime: '6 min read',
    summary: 'Recognize root-bound signs and master the 3-part potting recipe for breathable root systems.',
    icon: 'Layers',
    content: `
### Signs It Is Time to Repot
- Roots circling outward from the bottom drainage holes
- Water runs straight through without absorbing, or takes weeks to dry
- Plant growth has stalled during peak spring/summer months

### The Signature Leafora Nursery Mix
Standard garden soil is too heavy for containers. Use this proportion:
- 40% High-grade Coco Coir or Peat Moss (water retention)
- 30% Horticultural Perlite or Pumice (oxygen channels)
- 20% Pine Bark Nuggets (chunky structure)
- 10% Worm Castings (gentle slow-release nutrients)
    `
  },
  {
    id: 'pest-prevention',
    title: 'Organic Pest Defense: Thrips, Mites & Gnats',
    category: 'Pest Control',
    readTime: '4 min read',
    summary: 'Botanical, non-toxic remedies using cold-pressed neem oil, castile soap, and yellow sticky sheets.',
    icon: 'ShieldCheck',
    content: `
### 1. The Weekly Leaf Inspection
Check the undersides of leaves and leaf nodes where insects hide. Catching an infestation early takes 30 seconds of attention each week.

### 2. Organic Castile & Neem Spray Recipe
- 1 Liter lukewarm water
- 1 tsp cold-pressed organic Neem Oil
- 1/2 tsp pure Castile soap (emulsifier)
Shake vigorously in a spray bottle. Spray leaves top and bottom every 7 days until pests disappear.

### 3. Fungus Gnats in Soil
Gnats breed only in constantly soggy topsoil. Allow the top 2 inches to dry thoroughly, sprinkle a thin top layer of coarse sand, or bottom-water your pots.
    `
  }
];

export const PLANT_DOCTOR_SYMPTOMS = [
  {
    id: 'yellow-leaves',
    title: 'Yellowing Leaves',
    subtitle: 'Lower foliage turning pale yellow and dropping',
    possibleCause: 'Overwatering or poor drainage (root suffocation)',
    solution: 'Check soil moisture immediately. If bottom is soggy, pause watering for 7-10 days. Ensure the decorative pot has drainage holes. Cut away mushy yellow leaves at the base with sanitized shears.'
  },
  {
    id: 'brown-crispy-edges',
    title: 'Crispy Brown Leaf Tips',
    subtitle: 'Edges feel paper-dry and brittle',
    possibleCause: 'Low household humidity or mineral buildup in tap water',
    solution: 'Group plants together to create a microclimate humidity dome. Switch to filtered water or let tap water rest overnight. Mist foliage or place on a pebble tray filled with water.'
  },
  {
    id: 'drooping-stems',
    title: 'Drooping & Limp Stems',
    subtitle: 'Leaves losing turgor and sagging downward',
    possibleCause: 'Underwatering or severe dry air',
    solution: 'Give the plant a deep bottom-watering bath: place the nursery pot in a sink or basin with 2 inches of tepid water for 30 minutes until the top feels moist, then let drain completely.'
  },
  {
    id: 'pale-leggy-growth',
    title: 'Leggy, Stretched Growth',
    subtitle: 'Long weak stems with wide spacing between leaves',
    possibleCause: 'Insufficient lighting (plant is stretching towards light)',
    solution: 'Move your plant 2 to 3 feet closer to an unobstructed window with bright indirect sunlight. Gently prune elongated stems to encourage lush, bushy side growth.'
  },
  {
    id: 'sticky-residue',
    title: 'Sticky Leaves or Fine Webbing',
    subtitle: 'Honeydew residue or tiny spider-like webbing under foliage',
    possibleCause: 'Spider mites, scale insects, or mealybugs',
    solution: 'Wipe all foliage thoroughly with a soft cloth dipped in warm soapy water (Castile soap). Spray with organic cold-pressed neem oil once a week for 3 consecutive weeks.'
  }
];
