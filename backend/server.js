
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import Plant from './models/Plant.js';
import plantRoutes from './routes/plantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { INITIAL_PLANTS } from '../src/data/plantsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const app = express();
const PORT = process.env.PORT || 5000;

// Add only missing plants without deleting existing records
const seedPlants = async () => {
  try {
    const plants = INITIAL_PLANTS.map((plant) => ({
      externalId: plant.id,
      slug: plant.id,
      name: plant.name,
      botanicalName: plant.botanicalName,
      category: plant.category,
      price: plant.price,
      originalPrice: plant.originalPrice,
      rating: plant.rating,
      reviewsCount: plant.reviewsCount,
      stock: plant.stock,
      difficulty: plant.difficulty,
      light: plant.light,
      water: plant.water,
      waterDays: plant.waterDays,
      petFriendly: plant.petFriendly,
      airPurifying: plant.airPurifying,
      height: plant.height,
      image: plant.image,
      gallery: plant.gallery || [],
      tag: plant.tag,
      shortDescription: plant.shortDescription,
      description: plant.description,
      careGuide: plant.careGuide,
      sizes: plant.sizes || [],
      featured: plant.featured || false,
    }));

    const result = await Plant.bulkWrite(
      plants.map((plant) => {
        const { image, gallery, ...plantDetails } = plant;

        return {
          updateOne: {
            filter: { externalId: plant.externalId },
            update: {
              $setOnInsert: plantDetails,
              $set: { image, gallery },
            },
            upsert: true,
          },
        };
      }),
      { ordered: false }
    );

    console.log(
      `Plant catalog sync completed. New plants added: ${result.upsertedCount || 0}`
    );
  } catch (error) {
    console.error('Plant seeding failed:', error.message);
  }
};

const startServer = () => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL || true,
      credentials: true,
    })
  );

  app.use(express.json({ limit: '10mb' }));

  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'Leafora backend is running',
      timestamp: new Date().toISOString(),
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/plants', plantRoutes);
  app.use('/api/orders', orderRoutes);

  app.use((error, req, res, next) => {
    console.error('Unhandled app error:', error);
    res.status(500).json({
      message: error.message || 'Server error',
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);

    connectDB()
      .then(() => seedPlants())
      .catch(error => {
        console.error('Database startup failed:', error.message);
      });
  });
};

startServer();
