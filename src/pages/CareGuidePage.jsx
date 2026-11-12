import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { CARE_GUIDES, PLANT_DOCTOR_SYMPTOMS } from '../data/careGuidesData.js';
import {
  BookOpen,
  Search,
  Droplets,
  SunMedium,
  Layers,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Sprout,
  CheckCircle2
} from 'lucide-react';

export default function CareGuidePage() {
  const { navigateTo } = useApp();
  const [careSearch, setCareSearch] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState(CARE_GUIDES[0].id);
  const [selectedSymptomId, setSelectedSymptomId] = useState(PLANT_DOCTOR_SYMPTOMS[0].id);

  const filteredGuides = CARE_GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(careSearch.toLowerCase()) ||
      g.summary.toLowerCase().includes(careSearch.toLowerCase()) ||
      g.category.toLowerCase().includes(careSearch.toLowerCase())
  );

  const activeGuide = CARE_GUIDES.find((g) => g.id === selectedGuideId) || CARE_GUIDES[0];
  const activeSymptom = PLANT_DOCTOR_SYMPTOMS.find((s) => s.id === selectedSymptomId) || PLANT_DOCTOR_SYMPTOMS[0];

  const getGuideIcon = (category) => {
    switch (category) {
      case 'Watering':
        return <Droplets className="w-5 h-5 text-cyan-700" />;
      case 'Lighting':
        return <SunMedium className="w-5 h-5 text-amber-600" />;
      case 'Soil & Roots':
        return <Layers className="w-5 h-5 text-stone-700" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#173a21] via-[#214c2c] to-[#122e1b] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Botanical Encyclopedia & Clinic
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            The Leafora Plant Care Guide
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Everything you need to help your indoor foliage flourish. Explore lighting dynamics, soil aeration recipes, and diagnostic remedies for any leaf symptom.
          </p>
        </div>
      </div>

      {/* Part 1: Interactive Plant Doctor Diagnostic Clinic */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-50 text-rose-700 rounded-2xl">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Visual Diagnostic Clinic
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                What is troubling your plant?
              </h2>
            </div>
          </div>
          <span className="text-xs text-stone-500">Select a symptom below to see the root cause & cure</span>
        </div>

        {/* Symptoms Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PLANT_DOCTOR_SYMPTOMS.map((symptom) => {
            const isSelected = selectedSymptomId === symptom.id;
            return (
              <button
                key={symptom.id}
                onClick={() => setSelectedSymptomId(symptom.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-800 bg-emerald-50/80 ring-2 ring-emerald-700 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <AlertCircle className={`w-4 h-4 ${isSelected ? 'text-emerald-800' : 'text-stone-400'}`} />
                  {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                </div>
                <h4 className="font-serif font-bold text-xs text-stone-900 leading-snug">
                  {symptom.title}
                </h4>
                <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                  {symptom.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Diagnosis Outcome Card */}
        <div className="bg-[#f6f9f6] rounded-2xl p-6 sm:p-8 border border-emerald-200/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Botanical Diagnosis & Prescription</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Root Cause Identified:
              </span>
              <p className="font-serif text-lg font-bold text-stone-900">
                {activeSymptom.possibleCause}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {activeSymptom.subtitle}
              </p>
            </div>

            <div className="space-y-1.5 bg-white p-5 rounded-2xl border border-emerald-100">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Nursery Action Plan:
              </span>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {activeSymptom.solution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Comprehensive Botanical Care Guides */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              In-Depth Knowledge
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Botanical Care Pillars
            </h2>
          </div>

          {/* Quick search input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={careSearch}
              onChange={(e) => setCareSearch(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Guide Titles List */}
          <div className="md:col-span-5 space-y-3">
            {filteredGuides.map((guide) => {
              const isSelected = selectedGuideId === guide.id;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1b3b22] text-white border-[#1b3b22] shadow-md'
                      : 'bg-white text-stone-800 border-stone-200/80 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-800'}`}>
                      {guide.category}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base leading-snug">
                    {guide.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {guide.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Guide Full Reader */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-800 pb-3 border-b border-stone-100">
              {getGuideIcon(activeGuide.category)}
              <span>{activeGuide.category} • {activeGuide.readTime}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              {activeGuide.title}
            </h2>

            <div className="prose prose-stone text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
              {activeGuide.content}
            </div>

            {/* Quick Action to Scheduler */}
            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">Put this into practice</span>
              <button
                onClick={() => navigateTo('watering')}
                className="bg-[#1b3b22] hover:bg-[#142e1a] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Droplets className="w-3.5 h-3.5 text-emerald-300" />
                <span>Open Smart Watering Reminders</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
