import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Leaf,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Sprout,
} from 'lucide-react';

export default function AboutPage() {
  const { navigateTo } = useApp();

  const projectHighlights = [
    {
      title: 'Online Nursery Store',
      text: 'Leafora is a full-stack online plant shop where customers can browse curated indoor plants, compare varieties, and buy with a smooth checkout flow.',
      icon: ShoppingBag,
    },
    {
      title: 'Smart Plant Care',
      text: 'The app includes care guides, watering reminders, and plant health advice so users can keep their greenery healthy after purchase.',
      icon: Sprout,
    },
    {
      title: 'User Experience',
      text: 'Customers can sign up, log in, save wishlist items, track orders, and manage profile information through a simple responsive interface.',
      icon: Users,
    },
    {
      title: 'Secure & Modern Stack',
      text: 'Built with React, Vite, Express, and MongoDB Atlas, this project demonstrates a real MERN-style e-commerce application with authentication and persistent data.',
      icon: ShieldCheck,
    },
  ];

  const techStack = ['React', 'Vite', 'JavaScript', 'Node.js', 'Express', 'MongoDB Atlas', 'JWT Auth'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[30px] bg-gradient-to-r from-[#173d26] via-[#214f31] to-[#112b1c] p-8 text-white shadow-xl sm:p-12">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-200">
            <Leaf className="h-3.5 w-3.5" />
            Project overview
          </span>
          <h1 className="font-serif text-3xl font-bold sm:text-5xl">About Leafora</h1>
          <p className="text-sm leading-relaxed text-stone-200 sm:text-base">
            Leafora is a modern botanical e-commerce and plant-care web app created to help people discover beautiful indoor plants, buy them easily online, and keep them thriving at home.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {projectHighlights.map(({ title, text, icon: Icon }) => (
          <div key={title} className="rounded-[26px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
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
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Why this project exists</p>
              <h2 className="font-serif text-2xl font-bold text-stone-900">A greener lifestyle, made easy</h2>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-stone-700">
            This project was designed to combine plant shopping and plant care into one experience. Instead of just selling products, Leafora helps users choose the right plant for their home, learn how to care for it, place orders confidently, and keep track of every delivery.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <span className="text-sm text-stone-700">Users can explore plant catalog pages and read care suggestions before buying.</span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <span className="text-sm text-stone-700">The checkout process includes real customer details and persistent cart/order data.</span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
              <span className="text-sm text-stone-700">This project represents a full e-commerce application with both frontend and backend integration.</span>
            </div>
          </div>
        </div>

        <div className="rounded-[26px] bg-[#f5faf5] p-5 border border-emerald-100">
          <h3 className="mb-5 font-serif text-2xl font-bold text-stone-900">Project stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-medium text-emerald-800"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700">
            This is a full-stack Leafora project built to simulate a real online nursery shop with product browsing, authentication, order management, and customer support workflows.
          </div>

          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173d26] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#102d1d]"
          >
            Explore plants
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
