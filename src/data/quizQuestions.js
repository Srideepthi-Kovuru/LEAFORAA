/**
 * Find Your Perfect Plant Quiz questions & matching logic
 */

export const QUIZ_QUESTIONS = [
  {
    id: 'location',
    question: 'Where will your new plant thrive in your space?',
    subtitle: 'Lighting is the #1 secret to long-term plant happiness.',
    options: [
      {
        id: 'bright-direct',
        title: 'Sun-Drenched Window or Patio',
        desc: 'Direct warm sunlight for 4+ hours daily',
        icon: 'Sun',
        lightPreference: ['Bright direct sun', 'Full direct sun', 'Bright direct/indirect']
      },
      {
        id: 'bright-indirect',
        title: 'Bright Living Space (Filtered Light)',
        desc: 'Lots of natural light, but no scorching rays',
        icon: 'CloudSun',
        lightPreference: ['Bright indirect', 'Medium indirect']
      },
      {
        id: 'low-light',
        title: 'Cozy Low-Light Corner or Office',
        desc: 'Soft ambient light, far from large windows',
        icon: 'Lamp',
        lightPreference: ['Low light', 'Low to medium', 'Low to bright']
      }
    ]
  },
  {
    id: 'experience',
    question: 'What is your plant parenting track record?',
    subtitle: 'Be honest - there are gorgeous plants for every lifestyle!',
    options: [
      {
        id: 'beginner',
        title: 'I am a Beginner (Forgetful Waterer)',
        desc: 'I want something practically unkillable and forgiving',
        icon: 'Sparkles',
        difficulties: ['Easy']
      },
      {
        id: 'intermediate',
        title: 'I Enjoy a Weekly Care Routine',
        desc: 'Happy to mist, check soil, and monitor moisture',
        icon: 'Heart',
        difficulties: ['Easy', 'Moderate']
      },
      {
        id: 'expert',
        title: 'Green Thumb Botanist',
        desc: 'Eager to nurture collector varieties & rare aroids',
        icon: 'Crown',
        difficulties: ['Moderate', 'Advanced']
      }
    ]
  },
  {
    id: 'pets',
    question: 'Do you share your home with cats or dogs?',
    subtitle: 'Safety first for our curious four-legged companions.',
    options: [
      {
        id: 'has-pets',
        title: 'Yes, Curious Pets at Home',
        desc: 'Show me strictly 100% non-toxic, pet-safe plants',
        icon: 'Shield',
        petOnly: true
      },
      {
        id: 'no-pets',
        title: 'No Pets (Or Placed Out of Reach)',
        desc: 'All botanical foliage options are welcome',
        icon: 'Smile',
        petOnly: false
      }
    ]
  },
  {
    id: 'vibe',
    question: 'What botanical vibe are you dreaming of?',
    subtitle: 'Choose the energy you want to bring into your home.',
    options: [
      {
        id: 'statement',
        title: 'Dramatic Floor Statement Piece',
        desc: 'Bold sculptural foliage that wows guests',
        icon: 'Maximize2',
        categories: ['Indoor', 'Outdoor']
      },
      {
        id: 'air-cleanse',
        title: 'Serene Air Purifying Sanctuary',
        desc: 'NASA-ranked plants for crisp bedroom oxygen',
        icon: 'Wind',
        categories: ['Air Purifying']
      },
      {
        id: 'cascading',
        title: 'Trailing & Hanging Textures',
        desc: 'Cascading beads and lush climbers for shelves',
        icon: 'Layers',
        categories: ['Succulents & Cacti', 'Air Purifying', 'Pet Friendly']
      },
      {
        id: 'culinary',
        title: 'Fresh Culinary Living Greens',
        desc: 'Fragrant farm-to-table herbs for home cooking',
        icon: 'Utensils',
        categories: ['Herb & Kitchen']
      }
    ]
  }
];
