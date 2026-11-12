export const buildOrderPayload = ({
  user = null,
  cart = [],
  orderData = {},
  cartSubtotal = 0,
  cartDiscount = 0,
  shippingCost = 0,
  estimatedTax = 0,
  cartGrandTotal = 0,
}) => {
  const shippingInfo = orderData.shippingAddress || {};
  const customerName = (orderData.fullName || shippingInfo.fullName || user?.name || user?.fullName || '').trim();
  const customerEmail = (orderData.email || shippingInfo.email || user?.email || '').trim();
  const customerPhone = (shippingInfo.phone || user?.phone || orderData.phone || '').trim();
  const customerStreet = (shippingInfo.street || '').trim();
  const customerCity = (shippingInfo.city || '').trim();
  const customerState = (shippingInfo.state || '').trim();
  const customerZip = (shippingInfo.zip || '').trim();

  const items = Array.isArray(cart)
    ? cart.map((item) => ({
        plantId: item.plantId || item.id || '',
        name: item.name || 'Plant',
        quantity: Number(item.quantity || 1),
        price: Number(item.totalUnitCost || item.price || 0),
        sizeName: item.sizeName || '',
        potName: item.potOption ? item.potOption.name : 'Nursery Pot',
        image: item.image || '',
      }))
    : [];

  return {
    customerName,
    email: customerEmail,
    phone: customerPhone,
    address: [customerStreet, customerCity, customerState, customerZip].filter(Boolean).join(', '),
    status: 'Pending',
    shippingAddress: {
      fullName: customerName,
      email: customerEmail,
      phone: customerPhone,
      street: customerStreet,
      city: customerCity,
      state: customerState,
      zip: customerZip,
    },
    items,
    subtotal: Number(cartSubtotal || 0),
    discount: Number(cartDiscount || 0),
    shipping: Number(shippingCost || 0),
    tax: Number(estimatedTax || 0),
    total: Number(cartGrandTotal || 0),
    totalAmount: Number(cartGrandTotal || 0),
    paymentMethod: orderData.paymentMethod || 'Credit Card (ending in 4242)',
    carrier: 'Botanical Express Eco Dispatch',
    estimatedDelivery: '3-5 days',
    notes: 'Placed from Leafora storefront',
  };
};
