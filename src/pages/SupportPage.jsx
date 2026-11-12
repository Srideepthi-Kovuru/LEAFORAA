import React from 'react';
import {
  Leaf,
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from 'lucide-react';

export default function SupportPage() {
  const infoCards = [
    {
      title: 'About Leafora',
      icon: Leaf,
      text: 'Leafora is an online nursery and plant shop designed to make plant shopping easier, greener, and more personal for every home.',
      accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Help Center',
      icon: LifeBuoy,
      text: 'Need support with plant selection, order status, delivery, or watering guidance? Our care team is here to help you at every step.',
      accent: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Contact Us',
      icon: Mail,
      text: 'Reach out for any product, order, or plant-care questions. We usually respond within a few working hours.',
      accent: 'bg-sky-50 text-sky-700 border-sky-200',
    },
  ];

  const supportDetails = [
    { label: 'Phone', value: '+91 98765 43210', icon: Phone },
    { label: 'Email', value: 'hello@leafora.in', icon: Mail },
    { label: 'Address', value: '12 Green Courtyard, Bengaluru, India', icon: MapPin },
    { label: 'Hours', value: 'Mon - Sat • 9:00 AM to 7:00 PM', icon: Clock3 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#183d26] via-[#214f31] to-[#112b1c] p-8 text-white shadow-xl sm:p-12">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            plant support
          </span>
          <h1 className="font-serif text-3xl font-bold sm:text-5xl">Leafora Support</h1>
          <p className="max-w-xl text-sm leading-relaxed text-stone-200 sm:text-base">
            We’re here to help with plant care, order tracking, delivery questions, and anything you need to enjoy a healthy green home.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {infoCards.map(({ title, icon: Icon, text, accent }) => (
          <div key={title} className={`rounded-3xl border p-6 shadow-sm ${accent}`}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mb-3 font-serif text-2xl font-bold text-stone-900">{title}</h2>
            <p className="text-sm leading-relaxed text-stone-700">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Support promise</p>
              <h2 className="font-serif text-2xl font-bold text-stone-900">We support you before and after purchase</h2>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-stone-700">
            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <span>Plant recommendations based on light, room size, and lifestyle.</span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <span>Shipping, delivery, and tracking guidance for all order updates.</span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <span>Care instructions and plant health suggestions whenever your greenery needs attention.</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#f5faf5] p-5 border border-emerald-100">
          <h3 className="mb-5 font-serif text-2xl font-bold text-stone-900">Contact details</h3>
          <div className="space-y-4">
            {supportDetails.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm border border-stone-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{label}</p>
                  <p className="mt-1 text-sm font-medium text-stone-800">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173d26] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#102d1d]"
          >
            Email support
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
