import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOrderPayload } from './orderPayload.js';

test('buildOrderPayload keeps customer name and email from the logged-in user when checkout info is partial', () => {
  const payload = buildOrderPayload({
    user: { name: 'User One', email: 'user1@example.com', phone: '9876543210' },
    cart: [
      { plantId: 'plant-1', name: 'Monstera', quantity: 2, totalUnitCost: 66, sizeName: 'Medium', potOption: { name: 'Ceramic Pot' }, image: 'x.png' },
    ],
    orderData: {
      shippingAddress: {
        fullName: '',
        email: '',
        phone: '',
        street: '1 Green Street',
        city: 'Bengaluru',
        state: 'KA',
        zip: '560001',
      },
      paymentMethod: 'Credit Card (ending in 4242)',
    },
    cartSubtotal: 132,
    cartDiscount: 13.2,
    shippingCost: 8.5,
    estimatedTax: 9.5,
    cartGrandTotal: 136.8,
  });

  assert.equal(payload.customerName, 'User One');
  assert.equal(payload.email, 'user1@example.com');
  assert.equal(payload.phone, '9876543210');
  assert.equal(payload.items.length, 1);
  assert.equal(payload.items[0].name, 'Monstera');
  assert.equal(payload.totalAmount, 136.8);
});
