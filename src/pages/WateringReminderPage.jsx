import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { handleImageError } from '../utils/imageFallback.js';
import confetti from 'canvas-confetti';
import {
  Droplets,
  Plus,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Trash2,
  Sprout,
  X,
  Flame,
  ArrowRight,
  Sun
} from 'lucide-react';

export default function WateringReminderPage() {
  const {
    wateringPlants,
    waterPlantNow,
    addPlantToGarden,
    removePlantFromGarden,
    plants,
    navigateTo,
    addToast
  } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCatalogPlantId, setSelectedCatalogPlantId] = useState(plants[0]?.id || '');
  const [customName, setCustomName] = useState('');
  const [location, setLocation] = useState('Living Room East Window');
  const [waterIntervalDays, setWaterIntervalDays] = useState(7);

  const nowTime = new Date().getTime();

  // Categorize plants by urgency
  const duePlants = wateringPlants.filter((p) => {
    const due = new Date(p.nextWaterDue).getTime();
    return due <= nowTime + 24 * 60 * 60 * 1000;
  });

  const upcomingPlants = wateringPlants.filter((p) => {
    const due = new Date(p.nextWaterDue).getTime();
    return due > nowTime + 24 * 60 * 60 * 1000;
  });

  const handleWaterClick = (gardenId, plantName) => {
    waterPlantNow(gardenId);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const catalogItem = plants.find((p) => p.id === selectedCatalogPlantId) || plants[0];
    addPlantToGarden(catalogItem, customName || catalogItem.name, Number(waterIntervalDays), location);
    setAddModalOpen(false);
    setCustomName('');
  };

  const getDueStatus = (nextWaterDue) => {
    const dueDate = new Date(nextWaterDue);
    const diffMs = dueDate.getTime() - nowTime;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: `Overdue by ${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? 'day' : 'days'}`,
        color: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
        urgent: true
      };
    } else if (diffDays === 0 || diffMs <= 12 * 60 * 60 * 1000) {
      return {
        label: 'Water Due Today!',
        color: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
        urgent: true
      };
    } else {
      return {
        label: `Due in ${diffDays} days`,
        color: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
        urgent: false
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#173a21] via-[#214d2e] to-[#122e1b] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider">
              <Droplets className="w-4 h-4" /> Personal Smart Botanical Scheduler
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Smart Watering Reminders
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Maintain optimal root hydration without guesswork. Track your personal living foliage, log waterings with one tap, and build green parenting streaks.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Plant to Garden</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-stone-900 block">
              {wateringPlants.length}
            </span>
            <span className="text-xs text-stone-500 font-medium">Plants in Your Living Sanctuary</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-stone-900 block">
              {duePlants.length}
            </span>
            <span className="text-xs text-stone-500 font-medium">Needs Hydration Today</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-100 text-rose-800 rounded-2xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-stone-900 block">
              {wateringPlants.reduce((acc, p) => acc + (p.streak || 0), 0)} Logged
            </span>
            <span className="text-xs text-stone-500 font-medium">Total On-Time Waterings</span>
          </div>
        </div>
      </div>

      {/* Main Garden Schedule List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              My Plant Watering Schedule
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Click "Water Now" when you hydrate your plant to record the event and advance the schedule.
            </p>
          </div>
        </div>

        {wateringPlants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              No plants in your garden schedule yet
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Add your existing home foliage or adopt new plants from our greenhouse shop to start tracking waterings!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-[#1b3b22] text-white px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Add My Plant
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="bg-stone-100 text-stone-700 px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Browse Shop
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wateringPlants.map((plant) => {
              const dueInfo = getDueStatus(plant.nextWaterDue);
              const lastDate = new Date(plant.lastWatered).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              });

              return (
                <div
                  key={plant.id}
                  className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top image & status badge */}
                    <div className="flex gap-4 items-start">
                      <img
                        src={plant.image}
                        alt={plant.customName}
                        onError={handleImageError}
                        className="w-20 h-24 rounded-2xl object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] border ${dueInfo.color}`}>
                            {dueInfo.label}
                          </span>
                          <button
                            onClick={() => removePlantFromGarden(plant.id)}
                            className="text-stone-300 hover:text-rose-600 p-1"
                            title="Remove plant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h3 className="font-serif font-bold text-base text-stone-900 leading-snug truncate">
                          {plant.customName}
                        </h3>
                        <p className="text-[11px] text-stone-500 italic truncate mb-1">
                          {plant.botanicalName}
                        </p>
                        <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block truncate max-w-full">
                          📍 {plant.location}
                        </span>
                      </div>
                    </div>

                    {/* Schedule stats */}
                    <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 text-xs text-stone-600 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-stone-400 block">Frequency</span>
                        <span className="font-bold text-stone-800">Every {plant.waterDays} days</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">Last Watered</span>
                        <span className="font-bold text-stone-800">{lastDate}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-stone-500">Care Streak:</span>
                        <span className="font-bold text-emerald-800 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          {plant.streak || 1} on-time waterings
                        </span>
                      </div>
                    </div>

                    {plant.notes && (
                      <p className="text-[11px] text-stone-500 italic line-clamp-1">
                        "{plant.notes}"
                      </p>
                    )}
                  </div>

                  {/* Water Now Button */}
                  <button
                    onClick={() => handleWaterClick(plant.id, plant.customName)}
                    className="w-full bg-[#1b3b22] hover:bg-[#142e1a] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <Droplets className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Water Now & Log Streak</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Plant Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setAddModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Add Plant to Tracker</h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Plant Variety
                </label>
                <select
                  value={selectedCatalogPlantId}
                  onChange={(e) => {
                    setSelectedCatalogPlantId(e.target.value);
                    const chosen = plants.find((p) => p.id === e.target.value);
                    if (chosen) {
                      setWaterIntervalDays(chosen.waterDays || 7);
                      if (!customName) setCustomName(chosen.name);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                >
                  {plants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.botanicalName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Custom Pet Name / Nickname (Optional)
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Monty, Greenie, Desk Fern"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Location in Home
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Living Room Window, Kitchen Shelf"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Watering Interval (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={waterIntervalDays}
                  onChange={(e) => setWaterIntervalDays(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                  required
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Recommended: 7 days for Monsteras, 14 days for Snake Plants.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1b3b22] text-white text-xs font-bold rounded-xl hover:bg-[#142e1a] transition-colors"
              >
                Save to My Garden
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
