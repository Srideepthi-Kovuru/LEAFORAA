
import express from 'express';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

// Authentication middleware
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'leafora-secret-key'
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};

// GET logged-in user's orders
router.get('/me', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all orders (Admin only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single order
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = String(order.userId) === String(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE order
router.post('/', requireAuth, async (req, res) => {
  try {
    const {
      customerName,
      email,
      items,
      totalAmount,
      total,
      subtotal,
      discount,
      shipping,
      tax,
      paymentMethod,
      shippingAddress,
      address,
      status,
      notes,
      carrier,
      estimatedDelivery
    } = req.body || {};

    const normalizedCustomerName = String(
      customerName ||
      shippingAddress?.fullName ||
      req.user.name ||
      req.user.fullName ||
      ''
    ).trim();

    const normalizedEmail = String(
      email ||
      shippingAddress?.email ||
      req.user.email ||
      ''
    ).trim();

    const normalizedPhone = String(
      req.body?.phone ||
      shippingAddress?.phone ||
      req.user.phone ||
      ''
    ).trim();

    const normalizedAddress = String(
      address || shippingAddress?.street || ''
    ).trim();

    const normalizedItems = Array.isArray(items) ? items : [];

    console.log('ORDER REQUEST DEBUG:', {
      bodyKeys: Object.keys(req.body || {}),
      customerNamePresent: !!customerName,
      emailPresent: !!email,
      shippingNamePresent: !!shippingAddress?.fullName,
      shippingEmailPresent: !!shippingAddress?.email,
      userNamePresent: !!req.user?.name,
      userEmailPresent: !!req.user?.email,
      itemsIsArray: Array.isArray(items),
      itemsCount: normalizedItems.length
    });

    if (
      !normalizedCustomerName ||
      !normalizedEmail ||
      normalizedItems.length === 0
    ) {
      return res.status(400).json({
        message: 'Customer name, email, and order items are required'
      });
    }

    const normalizedTotal = Number(total ?? totalAmount ?? 0);

    const order = new Order({
      userId: req.user._id,
      customerName: normalizedCustomerName,
      email: normalizedEmail,
      phone: normalizedPhone,
      address: normalizedAddress,

      shippingAddress: shippingAddress || {
        fullName: normalizedCustomerName,
        email: normalizedEmail,
        phone: normalizedPhone,
        street: normalizedAddress,
        city: '',
        state: '',
        zip: ''
      },

      status: status || 'Pending',

      items: normalizedItems.map((item) => ({
        plantId: String(item.plantId || item.id || ''),
        name: item.name || 'Plant',
        quantity: Number(item.quantity || 1),
        price: Number(
          item.price ?? item.totalUnitCost ?? item.basePrice ?? 0
        ),
        sizeName: item.sizeName || '',
        potName: item.potName || item.potOption?.name || '',
        image: item.image || ''
      })),

      subtotal: Number(subtotal || 0),
      discount: Number(discount || 0),
      shipping: Number(shipping || 0),
      tax: Number(tax || 0),
      total: normalizedTotal,
      totalAmount: normalizedTotal,

      paymentMethod: paymentMethod || '',
      carrier: carrier || 'Botanical Express Eco Dispatch',
      estimatedDelivery: estimatedDelivery || '',
      notes: notes || ''
    });

    const savedOrder = await order.save();

    return res.status(201).json(savedOrder);

  } catch (error) {
    console.error('Order creation failed:', error);
    return res.status(400).json({ message: error.message });
  }
});

// UPDATE order (Admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE order (Admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
