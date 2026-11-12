import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    plantId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    sizeName: { type: String, default: '' },
    potName: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { _id: true }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    shippingAddress: { type: shippingAddressSchema, default: {} },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'In Transit', 'Out for Delivery', 'Picked & Packed'],
      default: 'Pending',
    },
    items: [orderItemSchema],
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: '' },
    carrier: { type: String, default: 'Botanical Express Eco Dispatch' },
    estimatedDelivery: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
