import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Copy,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  Sprout
} from 'lucide-react';

export default function OrderTrackingPage() {
  const {
    orders,
    selectedTrackingOrderId,
    setSelectedTrackingOrderId,
    navigateTo,
    adminUpdateOrderStatus,
    addToast
  } = useApp();

  const currentOrder =
    orders.find((o) => o.id === selectedTrackingOrderId) || orders[0] || null;

  const [copied, setCopied] = useState(false);

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">No active tracking found</h2>
        <p className="text-xs text-stone-500">Please choose an order from your order history.</p>
        <button
          onClick={() => navigateTo('orders')}
          className="bg-[#1b3b22] text-white px-5 py-2.5 rounded-xl text-xs font-semibold"
        >
          View All Orders
        </button>
      </div>
    );
  }

  const handleCopyTracking = () => {
    navigator.clipboard?.writeText(currentOrder.trackingNumber);
    setCopied(true);
    addToast('Tracking number copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { title: 'Order Placed', desc: 'Order confirmed and registered in nursery queue' },
    { title: 'Nursery Picked & Inspected', desc: 'Horticulturist inspected roots, foliage, and soil' },
    { title: 'Eco-Packaging Complete', desc: 'Secured inside breathable shock-resistant thermal pod' },
    { title: 'In Transit', desc: 'Dispatched via temperature-controlled transport' },
    { title: 'Out for Delivery', desc: 'Courier is in your local neighborhood' },
    { title: 'Delivered to Doorstep', desc: 'Handed over or safely sheltered at porch' }
  ];

  const getStepProgressIndex = (status) => {
    switch (status) {
      case 'Placed':
        return 0;
      case 'Picked & Packed':
        return 2;
      case 'In Transit':
        return 3;
      case 'Out for Delivery':
        return 4;
      case 'Delivered':
        return 5;
      default:
        return 1;
    }
  };

  const currentStepIndex = getStepProgressIndex(currentOrder.status);

  // Quick simulation trigger for testing
  const handleSimulateNextStep = () => {
    const sequence = ['Placed', 'Picked & Packed', 'In Transit', 'Out for Delivery', 'Delivered'];
    const idx = sequence.indexOf(currentOrder.status);
    if (idx < sequence.length - 1) {
      const nextStatus = sequence[idx + 1];
      adminUpdateOrderStatus(currentOrder.id, nextStatus);
    } else {
      adminUpdateOrderStatus(currentOrder.id, 'Placed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('orders')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Orders
        </button>

        {/* Order Selector (if user has multiple orders) */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500">Track other order:</span>
            <select
              value={currentOrder.id}
              onChange={(e) => setSelectedTrackingOrderId(e.target.value)}
              className="bg-white border border-stone-300 rounded-xl px-2.5 py-1 text-xs font-mono font-bold text-stone-800 focus:outline-none focus:border-emerald-700"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5" />
          Your order is confirmed.
        </div>
        <p className="mt-1 text-xs text-emerald-800">
          We have received your plant order and will share dispatch updates as soon as it leaves the nursery.
        </p>
      </div>

      {/* Main Status Hero Card */}
      <div className="bg-gradient-to-r from-[#173b22] via-[#214f2e] to-[#122e1b] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/80">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4" /> Live Nursery Dispatch Tracker
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold mt-1">
                Order Status: {currentOrder.status}
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Estimated Arrival: <b className="text-white">{currentOrder.estimatedDelivery}</b>
              </p>
            </div>

            <div className="bg-emerald-950/80 border border-emerald-700/60 p-3.5 rounded-2xl flex items-center justify-between sm:justify-start gap-3">
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                  Waybill / Tracking No.
                </p>
                <p className="font-mono text-xs sm:text-sm font-bold text-emerald-300">
                  {currentOrder.trackingNumber}
                </p>
              </div>
              <button
                onClick={handleCopyTracking}
                className="p-2 hover:bg-emerald-800/60 rounded-xl transition-colors text-stone-300 hover:text-white"
                title="Copy tracking number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Simulation Helper */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs text-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              Interactive Simulation: Test the delivery pipeline live
            </span>
            <button
              onClick={handleSimulateNextStep}
              className="py-1.5 px-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
            >
              Advance to Next Status →
            </button>
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Stepper */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-8">
        <h3 className="font-serif font-bold text-lg text-stone-900">
          Greenhouse-to-Door Journey
        </h3>

        <div className="relative">
          {/* Vertical Stepper List */}
          <div className="space-y-8 relative pl-6 sm:pl-8 border-l-2 border-stone-200 ml-4 sm:ml-6">
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isFuture = idx > currentStepIndex;

              return (
                <div key={idx} className="relative group">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPast
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-[#1b3b22] text-white ring-4 ring-emerald-200 animate-pulse'
                        : 'bg-stone-100 text-stone-400 border border-stone-300'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-serif font-bold text-sm sm:text-base ${
                          isCurrent
                            ? 'text-emerald-900 font-extrabold'
                            : isPast
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Active Stage
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        isFuture ? 'text-stone-400' : 'text-stone-600'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Courier & Nursery Quality Certification Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nursery Health Certification */}
        <div className="bg-[#f2f7f3] rounded-3xl p-6 border border-emerald-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-950 font-serif font-bold text-base">
            <Sprout className="w-5 h-5 text-emerald-800" />
            <span>Master Nursery Inspection Log</span>
          </div>
          <div className="space-y-2.5 text-xs text-stone-700">
            <div className="flex items-center justify-between py-1 border-b border-emerald-100">
              <span className="text-stone-500">Root Health:</span>
              <span className="font-bold text-emerald-900">100% Vigorous & Aerated</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-emerald-100">
              <span className="text-stone-500">Foliage Purity:</span>
              <span className="font-bold text-emerald-900">Zero Pests / Beneficial Bio Cleaned</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-emerald-100">
              <span className="text-stone-500">Transit Hydration:</span>
              <span className="font-bold text-emerald-900">Moisture-Lock Sealed for 7 Days</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-stone-500">Packaging Type:</span>
              <span className="font-bold text-emerald-900">100% Corrugated Recycled Pod</span>
            </div>
          </div>
        </div>

        {/* Destination & Contact info */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-stone-900 font-serif font-bold text-base">
            <MapPin className="w-5 h-5 text-emerald-800" />
            <span>Delivery Destination</span>
          </div>
          <div className="text-xs space-y-1 text-stone-600">
            <p className="font-bold text-stone-900 text-sm">
              {currentOrder.shippingAddress.fullName}
            </p>
            <p>{currentOrder.shippingAddress.street}</p>
            <p>
              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zip}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Courier Carrier:</span>
            <span className="font-semibold text-stone-800">{currentOrder.carrier}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
