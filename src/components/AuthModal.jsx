import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { X, Sprout, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authModalMode, setAuthModalMode, login, signup } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      if (!email) return;
      login(email, password, 'user');
    } else {
      if (!name || !email) return;
      signup(name, email, password);
    }
  };

  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      login('admin@leafora.com', 'admin123', 'admin');
    } else {
      login('sophia.green@botanical.com', 'user123', 'user');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setAuthModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-stone-200 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#1b3b22] text-emerald-300 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-950/20">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {authModalMode === 'login' ? 'Welcome Back to Leafora' : 'Create Your Plant Sanctuary'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            {authModalMode === 'login'
              ? 'Access your orders, saved wishlists, and smart watering tracker.'
              : 'Join the community and enjoy 10% off your first greenhouse order.'}
          </p>
        </div>

        {/* Quick Demo Account Shortcuts */}
        <div className="bg-[#f3f7f4] border border-emerald-200/80 rounded-2xl p-3 mb-5">
          <p className="text-[11px] font-semibold text-emerald-900 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Quick Demo One-Click Sign In:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('user')}
              className="py-1.5 px-2.5 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-xl border border-emerald-200 shadow-xs transition-all text-center"
            >
              Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-1.5 px-2.5 bg-[#1b3b22] hover:bg-[#142e1a] text-white text-xs font-semibold rounded-xl shadow-xs transition-all text-center"
            >
              Nursery Admin Demo
            </button>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-stone-200 mb-5 text-sm">
          <button
            onClick={() => setAuthModalMode('login')}
            className={`flex-1 py-2 font-semibold text-center transition-colors border-b-2 ${
              authModalMode === 'login'
                ? 'border-[#1b3b22] text-[#1b3b22]'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalMode('signup')}
            className={`flex-1 py-2 font-semibold text-center transition-colors border-b-2 ${
              authModalMode === 'signup'
                ? 'border-[#1b3b22] text-[#1b3b22]'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sophia Green"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1b3b22] hover:bg-[#142e1a] text-white py-3 rounded-xl font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>{authModalMode === 'login' ? 'Sign In to Account' : 'Create Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Your botanical profile is encrypted & protected
          </p>
        </div>
      </div>
    </div>
  );
}
