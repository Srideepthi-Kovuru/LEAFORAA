import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'leafora-secret-key';

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, role = 'user' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role,
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: user.toPublicJSON(),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (role === 'admin' && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    const token = signToken(user);
    return res.status(200).json({
      token,
      user: user.toPublicJSON(),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: user.toPublicJSON() });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;
