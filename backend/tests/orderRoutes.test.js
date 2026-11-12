import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Order from '../models/Order.js';
import orderRoutes from '../routes/orderRoutes.js';

const JWT_SECRET = process.env.JWT_SECRET || 'leafora-secret-key';

let mongoServer;
let app;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  app = express();
  app.use(express.json());
  app.use('/api/orders', orderRoutes);

  await new Promise((resolve) => {
    const server = app.listen(5001, resolve);
    server.unref();
  });
});

test.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test.afterEach(async () => {
  await Order.deleteMany({});
  await User.deleteMany({});
});

test('GET /api/orders/me returns only the authenticated user orders', async () => {
  const user1 = await User.create({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'Password123',
  });

  const user2 = await User.create({
    name: 'Bob',
    email: 'bob@example.com',
    password: 'Password123',
  });

  await Order.create({
    userId: user1._id,
    customerName: 'Alice',
    email: 'alice@example.com',
    phone: '123',
    address: 'A',
    status: 'Pending',
    items: [{ plantId: 'plant-1', name: 'Monstera', quantity: 1, price: 20 }],
    total: 20,
    totalAmount: 20,
    notes: 'one',
  });

  await Order.create({
    userId: user2._id,
    customerName: 'Bob',
    email: 'bob@example.com',
    phone: '456',
    address: 'B',
    status: 'Pending',
    items: [{ plantId: 'plant-2', name: 'Fern', quantity: 1, price: 15 }],
    total: 15,
    totalAmount: 15,
    notes: 'two',
  });

  const token = jwt.sign({ id: user1._id, email: user1.email, role: user1.role }, JWT_SECRET, { expiresIn: '7d' });

  const response = await fetch('http://localhost:5001/api/orders/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.length, 1);
  assert.equal(String(data[0].userId), String(user1._id));
});

test('POST /api/orders associates every order with the authenticated user', async () => {
  const user = await User.create({
    name: 'Charlie',
    email: 'charlie@example.com',
    password: 'Password123',
  });

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  const response = await fetch('http://localhost:5001/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerName: 'Charlie',
      email: 'charlie@example.com',
      phone: '+1',
      address: 'North Road',
      status: 'Pending',
      items: [{ plantId: 'plant-3', name: 'Snake Plant', quantity: 2, price: 30 }],
      totalAmount: 60,
      notes: 'hello',
      userId: '507f1f77bcf86cd799439011',
    }),
  });

  assert.equal(response.status, 201);
  const savedOrder = await response.json();
  assert.equal(String(savedOrder.userId), String(user._id));
  assert.equal((await Order.countDocuments({ userId: user._id })), 1);
});

test('POST /api/orders accepts checkout payloads when name and email are nested in shippingAddress', async () => {
  const user = await User.create({
    name: 'Dana',
    email: 'dana@example.com',
    password: 'Password123',
  });

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  const response = await fetch('http://localhost:5001/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      phone: '+1 555 000 1111',
      address: '4 Garden Lane',
      shippingAddress: {
        fullName: 'Dana Green',
        email: 'dana@example.com',
        phone: '+1 555 000 1111',
        street: '4 Garden Lane',
        city: 'Bengaluru',
        state: 'KA',
        zip: '560001',
      },
      status: 'Pending',
      items: [{ plantId: 'plant-4', name: 'Monstera', quantity: 1, price: 25 }],
      totalAmount: 25,
      notes: 'nested checkout fields',
    }),
  });

  assert.equal(response.status, 201);
  const savedOrder = await response.json();
  assert.equal(savedOrder.customerName, 'Dana Green');
  assert.equal(savedOrder.email, 'dana@example.com');
  assert.equal(String(savedOrder.userId), String(user._id));
});

