import mongoose from 'mongoose';

const careGuideSchema = new mongoose.Schema(
  {
    light: { type: String, default: '' },
    water: { type: String, default: '' },
    humidity: { type: String, default: '' },
    soil: { type: String, default: '' },
    temperature: { type: String, default: '' },
    toxicity: { type: String, default: '' },
  },
  { _id: false }
);

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    priceMultiplier: { type: Number, default: 1 },
  },
  { _id: false }
);

const plantSchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true, sparse: true },
    slug: { type: String, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    botanicalName: { type: String, default: '' },
    category: { type: String, default: 'Indoor' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0, default: 0 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    difficulty: { type: String, default: 'Easy' },
    light: { type: String, default: '' },
    water: { type: String, default: '' },
    waterDays: { type: Number, default: 0 },
    petFriendly: { type: Boolean, default: false },
    airPurifying: { type: Boolean, default: false },
    height: { type: String, default: '' },
    image: { type: String, default: '' },
    gallery: [{ type: String }],
    tag: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    careGuide: { type: careGuideSchema, default: () => ({}) },
    sizes: [sizeSchema],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;
