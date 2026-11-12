import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { ArrowRight, Sprout } from 'lucide-react';

export default function HomePage() {
  const { navigateTo } = useApp();

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f6f2ea] text-stone-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17, 31, 22, 0.38), rgba(17, 31, 22, 0.62)), url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1800&q=80')"
        }}
      />

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center text-white">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/40 bg-emerald-900/40 backdrop-blur-sm">
              <Sprout className="h-7 w-7 text-emerald-300" />
            </div>
          </div>

          <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Bring Nature Into Your Home
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-emerald-50/90 sm:text-lg">
            Discover beautiful indoor plants and create a greener, healthier living space.
          </p>

          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1b3b22] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1b3b22]/20 transition hover:bg-[#142d1b]"
          >
            Explore Plants
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
