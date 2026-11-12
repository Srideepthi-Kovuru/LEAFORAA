import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { formatCurrency } from '../utils/currency.js';
import { handleImageError } from '../utils/imageFallback.js';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQty,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    shippingCost,
    estimatedTax,
    cartGrandTotal,
    freeShippingThreshold,
    isFreeShipping,
    promoCode,
    promoSuccess,
    promoError,
    applyPromo,
    navigateTo
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  if (!cartDrawerOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Your Botanical Basket</h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping banner */}
          <div className="bg-[#eef5ee] px-5 py-3 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-950 mb-1.5">
              <span>
                {isFreeShipping
                  ? '🎉 You unlocked Free Express Shipping!'
                  : `Add ${formatCurrency(amountNeededForFreeShipping)} more for Free Shipping`}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-700 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your basket is resting empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Bring living green sanctuary into your home. Explore our greenhouse catalog of hand-grown plants.
                </p>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="bg-[#1b3b22] hover:bg-[#142e1a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  Browse Plant Catalog <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-stone-50/70 border border-stone-200/70 rounded-2xl relative"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={handleImageError}
                    className="w-20 h-24 object-cover rounded-xl bg-stone-200 flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between pr-5">
                        <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-emerald-800 font-medium">
                        {item.sizeName}
                      </p>
                      {item.potOption && (
                        <p className="text-[10px] text-stone-500 truncate">
                          Planter: {item.potOption.name}
                        </p>
                      )}
                    </div>

                    {/* Qty & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1b3b22]">
                          {formatCurrency(item.totalUnitCost * item.quantity)}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          ({formatCurrency(item.totalUnitCost)} each)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-stone-400 hover:text-rose-600 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#faf8f5] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (e.g. LEAFORA10)"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl uppercase font-mono text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3.5 py-2 rounded-xl font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {promoSuccess}
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatCurrency(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatCurrency(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Climate-Safe Shipping</span>
                  <span>{isFreeShipping ? <span className="text-emerald-700 font-semibold">FREE</span> : formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span>{formatCurrency(estimatedTax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-300">
                  <span>Estimated Total</span>
                  <span className="text-[#1b3b22]">{formatCurrency(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full bg-[#1b3b22] hover:bg-[#142e1a] text-white py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>30-Day Plant Guarantee & Insulated Thermal Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
