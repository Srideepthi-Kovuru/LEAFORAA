import express from 'express';
import Plant from '../models/Plant.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const payload = {
      ...req.body,
      slug: req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      externalId: req.body.externalId || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    const plant = new Plant(payload);
    const savedPlant = await plant.save();

    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
