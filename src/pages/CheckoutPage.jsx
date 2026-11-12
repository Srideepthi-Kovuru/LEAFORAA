import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { formatCurrency } from '../utils/currency.js';
import { handleImageError } from '../utils/imageFallback.js';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Lock,
  ArrowLeft,
  QrCode,
  DollarSign
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    shippingCost,
    estimatedTax,
    cartGrandTotal,
    isFreeShipping,
    promoCode,
    user,
    placeOrder,
    navigateTo
  } = useApp();

  // Form State
  const defaultAddr = user?.addresses?.[0] || {};
  const [fullName, setFullName] = useState(defaultAddr.fullName || user?.name || 'Sophia Green');
  const [email, setEmail] = useState(user?.email || 'sophia.green@botanical.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [street, setStreet] = useState(defaultAddr.street || '742 Evergreen Terrace');
  const [apt, setApt] = useState(defaultAddr.apt || 'Apt 4B');
  const [city, setCity] = useState(defaultAddr.city || 'Portland');
  const [state, setState] = useState(defaultAddr.state || 'OR');
  const [zip, setZip] = useState(defaultAddr.zip || '97201');

  // Delivery Speed
  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard', 'express'
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('882');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-900">Your basket is empty</h2>
        <p className="text-xs text-stone-500">
          Add some lush foliage before checking out.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#1b3b22] text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#142e1a]"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const shippingAddress = {
        fullName,
        email,
        phone,
        street: apt ? `${street}, ${apt}` : street,
        city,
        state,
        zip
      };

      const paymentLabel =
        paymentMethod === 'card'
          ? 'Credit Card (ending in 4242)'
          : paymentMethod === 'upi'
          ? 'PhonePe / UPI'
          : 'Cash on Delivery';

      await placeOrder({
        shippingAddress,
        paymentMethod: paymentLabel,
        email,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-900 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to shopping
        </button>
        <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
          <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Botanical Checkout
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-[#1b3b22] text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Delivery Address & Contact
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-700 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email for Tracking Updates
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-700 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone (for Delivery Courier)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-700 focus:bg-white"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace"
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-700 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  value={apt}
                  onChange={(e) => setApt(e.target.value)}
                  placeholder="Apt 4B"
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-700 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Speed & Eco Packaging */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-[#1b3b22] text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Delivery Courier & Packaging
              </h3>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliveryMethod === 'standard'
                    ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      Climate-Insulated Green Logistics (2-4 Days)
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Shipped in temperature-controlled biodegradable boxes with root protection netting.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-900">
                  {isFreeShipping ? 'FREE' : formatCurrency(shippingCost)}
                </span>
              </label>

              <label
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliveryMethod === 'express'
                    ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      Express Greenhouse Direct (1-2 Days Guaranteed)
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Direct courier vehicle priority from nursery to porch.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-800">+{formatCurrency(12)}</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-[#1b3b22] text-white flex items-center justify-center text-xs font-bold">
                3
              </span>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Payment Method
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-800" />
                <span className="text-xs block">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-800" />
                <span className="text-xs block">PhonePe / UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <DollarSign className="w-5 h-5 mx-auto mb-1 text-emerald-800" />
                <span className="text-xs block">Cash on Delivery</span>
              </button>
            </div>

            {/* Payment Fields */}
            {paymentMethod === 'card' && (
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl font-mono"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-center space-y-2">
                <p className="text-xs font-semibold text-emerald-950">
                  Scan QR with PhonePe, GPay, Paytm, or any UPI app
                </p>
                <div className="w-32 h-32 bg-white p-2 mx-auto rounded-xl border border-stone-200 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-stone-800" />
                </div>
                <p className="text-[10px] text-stone-500 font-mono">UPI ID: leafora@botanical</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-900">Cash on Delivery</p>
                <p className="text-[11px]">
                  Pay the delivery executive directly once your plant arrives safely at your doorstep.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1b3b22] hover:bg-[#142e1a] text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-emerald-950/15 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
          >
            <span>{isSubmitting ? 'Securing Order...' : `Place Botanical Order — ${formatCurrency(cartGrandTotal + (deliveryMethod === 'express' ? 12 : 0))}`}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Right Order Items Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-5 sticky top-28">
            <h3 className="font-serif font-bold text-lg text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)} Items
              </span>
            </h3>

            {/* Items scroll */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={handleImageError}
                    className="w-14 h-16 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-stone-500">{item.sizeName}</p>
                    <p className="text-[10px] text-emerald-700 truncate">{item.potOption?.name}</p>
                    <p className="text-[11px] text-stone-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-stone-900">
                    {formatCurrency(item.totalUnitCost * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatCurrency(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Promo Discount ({promoCode})</span>
                  <span>-{formatCurrency(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-emerald-800 font-bold">FREE</span>
                  ) : (
                    formatCurrency(shippingCost)
                  )}
                </span>
              </div>
              {deliveryMethod === 'express' && (
                <div className="flex justify-between text-stone-700">
                  <span>Express Priority Direct</span>
                  <span>+{formatCurrency(12)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span>{formatCurrency(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                <span>Total Due</span>
                <span className="text-[#1b3b22]">
                  {formatCurrency(cartGrandTotal + (deliveryMethod === 'express' ? 12 : 0))}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#f2f7f3] rounded-2xl border border-emerald-200/80 flex items-center gap-2 text-[11px] text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
              <span>30-Day Leafora Green Plant Freshness Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
