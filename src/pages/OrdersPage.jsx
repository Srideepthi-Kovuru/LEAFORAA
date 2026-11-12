import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { formatCurrency } from '../utils/currency.js';
import { handleImageError } from '../utils/imageFallback.js';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Receipt,
  FileText,
  Sprout,
  X
} from 'lucide-react';

export default function OrdersPage() {
  const { orders, ordersLoading, ordersError, navigateTo } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Transit':
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse';
      case 'Picked & Packed':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Account Purchases
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            My Botanical Orders
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track climate transit, inspect nursery certificates, and download invoices.
          </p>
        </div>

        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#1b3b22] hover:bg-[#142e1a] text-white px-5 py-2.5 rounded-xl text-xs font-semibold self-start sm:self-auto transition-colors shadow-xs"
        >
          Order More Plants
        </button>
      </div>

      {/* Orders List */}
      {ordersLoading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400 animate-pulse">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800">Loading your orders...</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">Fetching the latest plant deliveries for your account.</p>
        </div>
      ) : ordersError ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800">Unable to load orders</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">{ordersError}</p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#1b3b22] text-white px-6 py-2.5 rounded-xl text-xs font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800">
            No orders placed yet
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Bring life and clean air to your sanctuary. Explore our greenhouse catalog today.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#1b3b22] text-white px-6 py-2.5 rounded-xl text-xs font-semibold"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-stone-900">
                        {order.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      Placed on {formattedDate} • Carrier: {order.carrier}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Receipt className="w-3.5 h-3.5 text-stone-500" />
                      <span>Receipt</span>
                    </button>

                    <button
                      onClick={() => navigateTo('order-tracking', order.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#1b3b22] hover:bg-[#142e1a] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Live Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items List in Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-stone-50/80 rounded-2xl border border-stone-200/60"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={handleImageError}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate">{item.sizeName}</p>
                        <p className="text-[10px] text-emerald-800 truncate">{item.potName}</p>
                        <p className="text-[11px] font-bold text-stone-800 mt-0.5">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer with summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-100 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">Ship to:</span>
                    <span>
                      {order.shippingAddress.fullName}, {order.shippingAddress.city}, {order.shippingAddress.state}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 mr-2">Total Amount:</span>
                    <span className="text-base font-bold text-[#1b3b22]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setSelectedInvoiceOrder(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 space-y-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1b3b22] text-white flex items-center justify-center font-bold">
                  <Sprout className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-brand font-bold text-lg text-[#1b3b22]">LEAFORA</h3>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                    Official Botanical Receipt
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 text-xs gap-3">
              <div>
                <p className="text-stone-400">Order Number</p>
                <p className="font-mono font-bold text-stone-900">{selectedInvoiceOrder.id}</p>
              </div>
              <div>
                <p className="text-stone-400">Payment Method</p>
                <p className="font-bold text-stone-900">{selectedInvoiceOrder.paymentMethod}</p>
              </div>
              <div>
                <p className="text-stone-400">Billed To</p>
                <p className="font-semibold text-stone-900">{selectedInvoiceOrder.shippingAddress.fullName}</p>
                <p className="text-stone-500 text-[11px]">{selectedInvoiceOrder.shippingAddress.street}</p>
              </div>
              <div>
                <p className="text-stone-400">Estimated Delivery</p>
                <p className="font-semibold text-emerald-800">{selectedInvoiceOrder.estimatedDelivery}</p>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-2">
              <p className="text-xs font-bold text-stone-800 uppercase">Items Purchased</p>
              {selectedInvoiceOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1">
                  <span>
                    {it.name} ({it.sizeName}) × {it.quantity}
                  </span>
                  <span className="font-mono font-bold text-stone-900">
                    {formatCurrency(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedInvoiceOrder.subtotal)}</span>
              </div>
              {selectedInvoiceOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Botanical Discount</span>
                  <span>-{formatCurrency(selectedInvoiceOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Climate Courier Shipping</span>
                <span>
                  {selectedInvoiceOrder.shipping === 0
                    ? 'FREE'
                    : formatCurrency(selectedInvoiceOrder.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>{formatCurrency(selectedInvoiceOrder.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Grand Total Paid</span>
                <span className="text-[#1b3b22]">{formatCurrency(selectedInvoiceOrder.total)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="w-full py-2.5 bg-[#1b3b22] text-white text-xs font-bold rounded-xl"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
