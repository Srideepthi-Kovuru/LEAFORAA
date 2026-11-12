import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { CATEGORIES } from '../data/plantsData.js';
import { handleImageError } from '../utils/imageFallback.js';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Sun,
  Droplets,
  Star
} from 'lucide-react';

export default function ShopPage() {
  const { plants, navigateTo, addToCart } = useApp();

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLight, setSelectedLight] = useState('all');
  const [onlyPetFriendly, setOnlyPetFriendly] = useState(false);
  const [onlyAirPurifying, setOnlyAirPurifying] = useState(false);
  const [priceBracket, setPriceBracket] = useState('all'); // 'all', 'under35', '35to55', 'above55'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating', 'name'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredPlants = useMemo(() => {
    return plants
      .filter((plant) => {
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = plant.name.toLowerCase().includes(q);
          const matchBotanical = plant.botanicalName.toLowerCase().includes(q);
          const matchCategory = plant.category.toLowerCase().includes(q);
          const matchDesc = plant.description.toLowerCase().includes(q);
          if (!matchName && !matchBotanical && !matchCategory && !matchDesc) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all') {
          if (plant.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Difficulty
        if (selectedDifficulty !== 'all') {
          if (plant.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
            return false;
          }
        }

        // Light
        if (selectedLight !== 'all') {
          if (!plant.light.toLowerCase().includes(selectedLight.toLowerCase())) {
            return false;
          }
        }

        // Pet Friendly
        if (onlyPetFriendly && !plant.petFriendly) {
          return false;
        }

        // Air Purifying
        if (onlyAirPurifying && !plant.airPurifying) {
          return false;
        }

        // Price bracket
        if (priceBracket === 'under35' && plant.price >= 35) return false;
        if (priceBracket === '35to55' && (plant.price < 35 || plant.price > 55)) return false;
        if (priceBracket === 'above55' && plant.price <= 55) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured / default
      });
  }, [
    plants,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    selectedLight,
    onlyPetFriendly,
    onlyAirPurifying,
    priceBracket,
    sortBy
  ]);

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedLight('all');
    setOnlyPetFriendly(false);
    setOnlyAirPurifying(false);
    setPriceBracket('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedLight !== 'all' ||
    onlyPetFriendly ||
    onlyAirPurifying ||
    priceBracket !== 'all';

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8 space-y-5">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#173822] via-[#1f492f] to-[#122b1b] p-6 text-white shadow-[0_18px_35px_rgba(17,39,29,0.12)] sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%)]" />
        <div className="relative z-10 max-w-2xl space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-emerald-200/90">
            Greenhouse Botanical Catalog
          </span>
          <h1 className="font-serif text-3xl font-bold leading-none sm:text-4xl lg:text-[3.15rem]">
            Shop Living Plants
          </h1>
          <p className="max-w-xl text-sm text-stone-200 sm:text-base">
            Every specimen is nursery nurtured, acclimated for home lighting, and shipped with root hydration protection.
          </p>
        </div>
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="space-y-3 rounded-[22px] border border-stone-200 bg-white p-3 shadow-[0_8px_22px_rgba(24,39,32,0.04)] sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by plant name, botanical name (e.g. Ficus, Monstera)..."
              className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-9 text-sm text-stone-900 transition focus:border-emerald-700 focus:bg-white focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort By & View Toggles */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700"
            >
              <Filter className="w-4 h-4 text-emerald-800" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-emerald-700"
              >
                <option value="featured">Featured Nursery Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Grid vs List toggle */}
            <div className="hidden items-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50 p-0.5 sm:flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-1.5 ${
                  viewMode === 'grid' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-400'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-1.5 ${
                  viewMode === 'list' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-400'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Quick Pills */}
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1b3b22] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden md:block md:col-span-3 space-y-6">
          <div className="sticky top-20 space-y-5 rounded-[22px] border border-stone-200 bg-white p-4 shadow-[0_10px_22px_rgba(24,39,32,0.03)]">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="flex items-center gap-2 font-serif text-base font-bold text-stone-900">
                <SlidersHorizontal className="h-4 w-4 text-emerald-800" />
                Refine Foliage
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Care Difficulty */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Care Difficulty
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Levels' },
                  { id: 'Easy', label: 'Easy (Forgiving)' },
                  { id: 'Moderate', label: 'Moderate' },
                  { id: 'Advanced', label: 'Advanced (Enthusiast)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDifficulty(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedDifficulty === item.id
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedDifficulty === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Light Requirement */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Light Exposure
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'Any Light Zone' },
                  { id: 'low', label: 'Low / Dim Light' },
                  { id: 'medium', label: 'Medium Indirect' },
                  { id: 'bright', label: 'Bright Indirect' },
                  { id: 'direct', label: 'Direct Sun' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLight(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedLight === item.id
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {selectedLight === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Price Range
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under35', label: 'Under ₹35' },
                  { id: '35to55', label: '₹35 to ₹55' },
                  { id: 'above55', label: '₹55 & Above' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPriceBracket(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      priceBracket === item.id
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {priceBracket === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Botanical Filters */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyPetFriendly}
                  onChange={(e) => setOnlyPetFriendly(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 accent-emerald-800"
                />
                <span className="font-medium">100% Pet-Safe Plants</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyAirPurifying}
                  onChange={(e) => setOnlyAirPurifying(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 accent-emerald-800"
                />
                <span className="font-medium">Air-Purifying (NASA Ranked)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:hidden">
            <div
              className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative bg-white w-full max-h-[85vh] rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto space-y-5 z-10 animate-in slide-in-from-bottom">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-serif font-bold text-lg text-stone-900">Filter Plants</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Difficulty */}
              <div>
                <p className="text-xs font-bold text-stone-700 uppercase mb-2">Difficulty</p>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'Easy', 'Moderate', 'Advanced'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border ${
                        selectedDifficulty === diff
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      {diff === 'all' ? 'All' : diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Toggles */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={onlyPetFriendly}
                    onChange={(e) => setOnlyPetFriendly(e.target.checked)}
                    className="accent-emerald-800 w-4 h-4"
                  />
                  <span>100% Pet Friendly (Non-toxic)</span>
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={onlyAirPurifying}
                    onChange={(e) => setOnlyAirPurifying(e.target.checked)}
                    className="accent-emerald-800 w-4 h-4"
                  />
                  <span>Air Purifying Champions</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-3 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#1b3b22] text-white rounded-xl text-xs font-semibold"
                >
                  Show Results ({filteredPlants.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Product Grid */}
        <div className="md:col-span-9 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>
              Showing <b className="text-stone-900">{filteredPlants.length}</b> botanical specimens
            </span>
            {hasActiveFilters && (
              <span className="font-medium text-emerald-800">Filtered Results</span>
            )}
          </div>

          {/* Empty State */}
          {filteredPlants.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">
                No matching plants found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your search terms or resetting light and difficulty filters to explore our complete nursery greenhouse.
              </p>
              <button
                onClick={resetAllFilters}
                className="bg-[#1b3b22] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#152e1a] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                <ProductCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => navigateTo('plant-details', plant.id)}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      onError={handleImageError}
                      className="w-24 h-24 rounded-xl object-cover bg-stone-100"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {plant.category}
                        </span>
                        {plant.petFriendly && (
                          <span className="text-[10px] text-emerald-700 flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Pet Safe
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-900 hover:text-emerald-800">
                        {plant.name}
                      </h4>
                      <p className="text-xs text-stone-500 italic mb-1.5">{plant.botanicalName}</p>
                      <div className="flex items-center gap-3 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Sun className="w-3 h-3 text-amber-500" /> {plant.light}
                        </span>
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-cyan-500" /> {plant.water}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-stone-100">
                    <div className="text-left sm:text-right">
                      <span className="text-xl font-bold text-[#1b3b22]">{formatCurrency(plant.price)}</span>
                      <span className="block text-[10px] text-stone-400">Stock: {plant.stock} units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('plant-details', plant.id)}
                        className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(plant)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#1b3b22] hover:bg-[#142e1a] rounded-xl shadow-xs"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
