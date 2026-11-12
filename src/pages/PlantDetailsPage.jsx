import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { POT_OPTIONS } from '../data/plantsData.js';
import ProductCard from '../components/ProductCard.jsx';
import { formatCurrency } from '../utils/currency.js';
import { handleImageError } from '../utils/imageFallback.js';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Droplets,
  Sun,
  Thermometer,
  Layers,
  Sparkles,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Sprout,
  HelpCircle,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function PlantDetailsPage() {
  const {
    plants,
    selectedPlantId,
    navigateTo,
    addToCart,
    wishlist,
    toggleWishlist,
    addPlantToGarden,
    addToast
  } = useApp();

  const plant = plants.find((p) => p.id === selectedPlantId) || plants[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedPot, setSelectedPot] = useState(POT_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care'); // 'care', 'details', 'reviews', 'shipping'

  // User review submission simulation
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      author: 'Evelyn Brooks',
      rating: 5,
      date: '1 week ago',
      verified: true,
      text: 'Absolutely stunning foliage! Shipped across three states in freezing weather and arrived warm, moist, and without a single leaf crease.'
    },
    {
      id: 'rev-2',
      author: 'Julian Thorne',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      text: 'The artisan ceramic pot has an actual drainage hole and tray! Most online plants come in cheap plastics, but Leafora provides true greenhouse quality.'
    }
  ]);

  const sizes = plant.sizes || [{ name: 'Standard (6" pot)', priceMultiplier: 1.0 }];
  const currentSize = sizes[selectedSizeIndex] || sizes[0];

  // Price calculations
  const baseSizePrice = Math.round(plant.price * (currentSize.priceMultiplier || 1.0));
  const potPrice = selectedPot ? selectedPot.price : 0;
  const singleUnitTotal = baseSizePrice + potPrice;
  const grandTotal = singleUnitTotal * quantity;

  const isSaved = wishlist.includes(plant.id);
  const gallery = plant.gallery && plant.gallery.length > 0 ? plant.gallery : [plant.image];

  const handleAddToCart = () => {
    addToCart(plant, currentSize, selectedPot, quantity);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewText) return;

    setReviewsList((prev) => [
      {
        id: 'rev-' + Date.now(),
        author: newReviewAuthor,
        rating: 5,
        date: 'Just now',
        verified: true,
        text: newReviewText
      },
      ...prev
    ]);
    setNewReviewAuthor('');
    setNewReviewText('');
    addToast('Thank you! Your botanical review has been published.', 'success');
  };

  // Related plants
  const relatedPlants = plants
    .filter((p) => p.id !== plant.id && (p.category === plant.category || p.difficulty === plant.difficulty))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-emerald-900 text-xs sm:text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="text-xs text-stone-400 hidden sm:flex items-center gap-1.5">
          <span>Home</span>
          <span>/</span>
          <span>{plant.category}</span>
          <span>/</span>
          <span className="text-stone-700 font-semibold">{plant.name}</span>
        </div>
      </div>

      {/* Main Details Grid: Gallery + Purchasing Spec */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <img
              src={gallery[activeImageIndex] || plant.image}
              alt={plant.name}
              onError={handleImageError}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {plant.tag && (
                <span className="bg-[#1b3b22]/90 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {plant.tag}
                </span>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(plant.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                isSaved ? 'bg-rose-50 text-rose-600' : 'bg-white/80 hover:bg-white text-stone-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-emerald-700 ring-2 ring-emerald-300'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Pill Bar */}
          <div className="bg-[#f2f7f3] rounded-2xl p-4 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-around gap-4 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>30-Day Fresh Delivery Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-800" />
              <span>Climate-Insulated Thermal Box</span>
            </div>
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-800" />
              <span>Pest-Inspected Greenhouse Stock</span>
            </div>
          </div>
        </div>

        {/* Right: Spec, Sizes, Planters & Add to Cart */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">
                {plant.category} Collection
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-stone-900">{plant.rating}</span>
                <span>({plant.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#152e1b] leading-tight">
              {plant.name}
            </h1>
            <p className="text-sm text-stone-500 italic font-serif mt-1">
              {plant.botanicalName}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-stone-200">
            <span className="text-3xl font-extrabold text-[#1b3b22]">
              {formatCurrency(singleUnitTotal)}
            </span>
            {plant.originalPrice && (
              <span className="text-stone-400 line-through text-base">
                {formatCurrency(plant.originalPrice)}
              </span>
            )}
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              In Stock & Acclimated
            </span>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {plant.shortDescription || plant.description}
          </p>

          {/* 1. Size Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              1. Select Plant Maturity & Pot Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {sizes.map((sz, idx) => {
                const isSelected = selectedSizeIndex === idx;
                const priceForSize = Math.round(plant.price * (sz.priceMultiplier || 1.0));
                return (
                  <button
                    key={sz.name}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-800 bg-emerald-50/80 ring-1 ring-emerald-700'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-stone-900 leading-snug">
                      {sz.name}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 mt-1 block">
                      {formatCurrency(priceForSize)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Decorative Planter Pot Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                2. Choose Planter Style
              </label>
              <span className="text-xs text-stone-500">
                {selectedPot ? selectedPot.name : 'Nursery Pot'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {POT_OPTIONS.map((pot) => {
                const isPotSelected = selectedPot.id === pot.id;
                return (
                  <button
                    key={pot.id}
                    onClick={() => setSelectedPot(pot)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isPotSelected
                        ? 'border-emerald-800 bg-emerald-50/70 font-semibold'
                        : 'border-stone-200 hover:bg-stone-50 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: pot.color }}
                      />
                      <span className="text-xs text-stone-800 truncate">{pot.name}</span>
                    </div>
                    <span className="text-xs text-emerald-800 font-bold ml-1">
                      {pot.price === 0 ? 'Included' : `+${formatCurrency(pot.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Quantity & Cart CTA */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Qty increment */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#1b3b22] hover:bg-[#142e1a] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-300" />
                <span>Add to Basket — {formatCurrency(grandTotal)}</span>
              </button>
            </div>

            {/* Quick Add to Smart Watering Garden button */}
            <button
              onClick={() => addPlantToGarden(plant, plant.name)}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/90 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Droplets className="w-4 h-4 text-emerald-700" />
              <span>Add to My Smart Watering Garden Tracker</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tabs: Care Guide, Botanical Story, Customer Reviews, Delivery */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-8">
        <div className="flex border-b border-stone-200 overflow-x-auto gap-6 sm:gap-8">
          {[
            { id: 'care', label: '🌿 Botanical Care Guide' },
            { id: 'details', label: '📖 Plant Profile & Biology' },
            { id: 'reviews', label: `⭐ Reviews (${reviewsList.length})` },
            { id: 'shipping', label: '📦 Insulated Shipping' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#1b3b22] text-[#1b3b22]'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Comprehensive Care Guide */}
        {activeTab === 'care' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <Sun className="w-5 h-5" />
                <span>Light Exposure</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plant.careGuide?.light || plant.light}
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-cyan-700 font-bold text-sm">
                <Droplets className="w-5 h-5" />
                <span>Hydration & Watering</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plant.careGuide?.water || plant.water}
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Thermometer className="w-5 h-5" />
                <span>Temperature & Humidity</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plant.careGuide?.temperature || '18°C - 27°C (65°F - 80°F)'}.{' '}
                {plant.careGuide?.humidity || 'Moderate 50% humidity.'}
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                <Layers className="w-5 h-5" />
                <span>Living Soil Recipe</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plant.careGuide?.soil || 'Well-aerated coco coir, perlite, and organic peat moss.'}
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-purple-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Toxicity & Pets</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plant.careGuide?.toxicity || (plant.petFriendly ? 'Safe for cats and dogs' : 'Keep out of reach of pets')}
              </p>
            </div>

            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Need a Botanist Opinion?</span>
                <p className="text-xs text-emerald-800 mt-1">
                  Read our full troubleshooting library for yellow leaves, brown tips, or repotting steps.
                </p>
              </div>
              <button
                onClick={() => navigateTo('care-guide')}
                className="text-xs font-bold text-emerald-900 underline text-left"
              >
                Open Care Encyclopedia →
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Plant Profile & Botanical Story */}
        {activeTab === 'details' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              The History & Architecture of {plant.name}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {plant.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 text-xs">
              <div>
                <span className="text-stone-400 block font-medium">Botanical Name</span>
                <span className="font-serif italic text-stone-800 font-bold">{plant.botanicalName}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Approx. Mature Height</span>
                <span className="text-stone-800 font-bold">{plant.height || '50 - 75 cm'}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Growth Rate</span>
                <span className="text-stone-800 font-bold">Moderate to Fast</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Reviews summary & write form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="font-serif font-bold text-stone-900 text-base">Write a Customer Review</h4>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Feedback</label>
                    <textarea
                      rows={3}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="How is your foliage thriving? Describe packaging, roots, and growth..."
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1b3b22] text-white text-xs font-bold rounded-xl hover:bg-[#142e1a] transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews list */}
              <div className="md:col-span-7 space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <span>{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-stone-400 text-[11px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Insulated Shipping */}
        {activeTab === 'shipping' && (
          <div className="max-w-2xl space-y-4 text-xs text-stone-600 leading-relaxed">
            <h4 className="font-serif font-bold text-stone-900 text-base">How LEAFORA Ships Plants Safely</h4>
            <p>
              Plants are living organisms that require specialized transit care. We do not use generic mail bags or loose packing peanuts. Every plant is secured inside our patented <b>Botanical Eco-Pod</b>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><b>Root Lock Netting:</b> Stabilizes soil so not a single gram spills in transit.</li>
              <li><b>Thermal Insulation:</b> Regulates internal temperatures against freezing winter frost or hot summer heat waves.</li>
              <li><b>Breathable Oxygen Vents:</b> Allows the foliage to breathe throughout the journey.</li>
              <li><b>30-Day Guarantee:</b> If courier delays cause damage, we ship an immediate replacement free of charge.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related Plants */}
      {relatedPlants.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              You May Also Love
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              Browse All Plants →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPlants.map((rel) => (
              <ProductCard key={rel.id} plant={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
