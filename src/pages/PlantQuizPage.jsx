import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { QUIZ_QUESTIONS } from '../data/quizQuestions.js';
import ProductCard from '../components/ProductCard.jsx';
import confetti from 'canvas-confetti';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Sun,
  CloudSun,
  Lamp,
  Heart,
  Crown,
  Shield,
  Smile,
  Maximize2,
  Wind,
  Layers,
  Utensils
} from 'lucide-react';

export default function PlantQuizPage() {
  const { plants, navigateTo, addToCart } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const getOptionIcon = (iconName) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-amber-600" />;
      case 'Lamp':
        return <Lamp className="w-5 h-5 text-emerald-800" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-purple-600" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-emerald-700" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-cyan-600" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-stone-700" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-blue-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-700" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-emerald-800" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleSelectOption = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  // Compute recommendations
  const matchedPlants = React.useMemo(() => {
    if (!quizFinished) return [];

    const locAnswer = answers['location'];
    const expAnswer = answers['experience'];
    const petAnswer = answers['pets'];
    const vibeAnswer = answers['vibe'];

    return plants
      .map((p) => {
        let score = 70; // baseline

        // Light check
        if (locAnswer && locAnswer.lightPreference) {
          const matchesLight = locAnswer.lightPreference.some((lp) =>
            p.light.toLowerCase().includes(lp.toLowerCase())
          );
          if (matchesLight) score += 15;
        }

        // Difficulty check
        if (expAnswer && expAnswer.difficulties) {
          if (expAnswer.difficulties.includes(p.difficulty)) score += 10;
        }

        // Pet check
        if (petAnswer && petAnswer.petOnly) {
          if (p.petFriendly) score += 20;
          else score -= 30; // penalize toxic if user requested pet-safe
        }

        // Vibe/Category check
        if (vibeAnswer && vibeAnswer.categories) {
          if (vibeAnswer.categories.includes(p.category)) score += 15;
        }

        return { ...p, matchScore: Math.min(99, Math.max(65, score)) };
      })
      .filter((p) => (petAnswer?.petOnly ? p.petFriendly : true))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [plants, answers, quizFinished]);

  const activeQuestion = QUIZ_QUESTIONS[currentStep];
  const progressPercent = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Botanical Matchmaker</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Find Your Perfect Plant Companion
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Tell us about your home lighting, lifestyle, and furry friends to discover tailored foliage that will thrive under your care.
        </p>
      </div>

      {!quizFinished ? (
        /* Quiz Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-md space-y-8">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-800 font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1b3b22] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question title & subtitle */}
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {activeQuestion.question}
            </h2>
            <p className="text-xs text-stone-500">{activeQuestion.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeQuestion.options.map((opt) => {
              const isSelected = answers[activeQuestion.id]?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(activeQuestion.id, opt)}
                  className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 group ${
                    isSelected
                      ? 'border-emerald-800 bg-emerald-50/80 ring-2 ring-emerald-700 shadow-md'
                      : 'border-stone-200 hover:border-emerald-600/50 hover:bg-stone-50/80 bg-white'
                  }`}
                >
                  <div className="p-3 bg-stone-100 group-hover:bg-white rounded-xl flex-shrink-0 transition-colors shadow-xs">
                    {getOptionIcon(opt.icon)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-900">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Back Button */}
          {currentStep > 0 && (
            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="bg-[#f2f7f3] rounded-3xl p-6 sm:p-8 border border-emerald-200 text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> Tailored Results
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#142e1b]">
              Your Botanical Soulmates Have Been Found!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
              Based on your sunlight exposure, care preferences, and pet-safety needs, our greenhouse algorithms picked these top botanical matches:
            </p>
            <div className="pt-2">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Plant Quiz
              </button>
            </div>
          </div>

          {/* Recommended Plant Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedPlants.map((plant) => (
              <div key={plant.id} className="relative group">
                <div className="absolute -top-3 left-4 z-20 bg-emerald-800 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>{plant.matchScore}% Match</span>
                </div>
                <ProductCard plant={plant} />
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="text-center pt-6">
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#1b3b22] hover:bg-[#142e1a] text-white px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Explore All Nursery Plants</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
