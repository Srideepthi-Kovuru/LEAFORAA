import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { formatCurrency } from '../utils/currency.js';
import { handleImageError } from '../utils/imageFallback.js';
import { Heart, Star, Droplets, Sun, ShoppingBag, Eye, ShieldCheck, Sprout } from 'lucide-react';

export default function ProductCard({ plant }) {
  const { navigateTo, addToCart, wishlist, toggleWishlist, addPlantToGarden, user } = useApp();

  const isSaved = wishlist.includes(plant.id);

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-emerald-700/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Image & Badges */}
      <div className="relative aspect-4/5 bg-stone-100 overflow-hidden cursor-pointer" onClick={() => navigateTo('plant-details', plant.id)}>
        <img
          src={plant.image}
          alt={plant.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {plant.tag && (
            <span className="bg-[#1b3b22]/90 backdrop-blur-sm text-emerald-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {plant.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {user && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(plant.id);
            }}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
              isSaved
                ? 'bg-rose-50 text-rose-600 shadow-md ring-1 ring-rose-200'
                : 'bg-white/80 hover:bg-white text-stone-700 shadow-sm'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
          </button>
        )}

        {/* Quick View overlay hint */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/95 text-stone-900 text-xs font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-emerald-700" /> View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5 text-stone-500">
            <span className="font-medium text-emerald-800 uppercase tracking-wider text-[11px]">
              {plant.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-800">{plant.rating}</span>
              <span className="text-stone-400">({plant.reviewsCount})</span>
            </div>
          </div>

          {/* Plant Name */}
          <h3
            onClick={() => navigateTo('plant-details', plant.id)}
            className="font-serif text-lg font-bold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {plant.name}
          </h3>

          {/* Botanical Name */}
          <p className="text-xs text-stone-500 italic font-serif line-clamp-1 mb-2.5">
            {plant.botanicalName}
          </p>

          {/* Care Quick Indicators */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-600 mb-3">
            <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md">
              <Sun className="w-3 h-3 text-amber-600" /> {plant.light}
            </span>
            <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md">
              <Droplets className="w-3 h-3 text-cyan-600" /> {plant.water}
            </span>
            <span className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold ${getDifficultyBadge(plant.difficulty)}`}>
              {plant.difficulty}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#1b3b22]">{formatCurrency(plant.price)}</span>
              {plant.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatCurrency(plant.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              {plant.stock > 0 ? `In Stock (${plant.stock})` : 'Low Stock'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Add to Garden Tracker */}
            {user && (
              <button
                onClick={() => addPlantToGarden(plant, plant.name)}
                className="p-2 text-stone-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors"
                title="Track watering in My Garden"
              >
                <Sprout className="w-4 h-4" />
              </button>
            )}

            {/* Quick Add to Cart */}
            <button
              onClick={() => addToCart(plant)}
              className="bg-[#1b3b22] hover:bg-[#142e1a] text-white p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
              title="Add to shopping basket"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
