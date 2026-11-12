import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Sprout, ShieldCheck, Truck, HelpCircle, Heart, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { navigateTo, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = [
    { label: 'About', action: () => navigateTo('about') },
    { label: 'Help', action: () => navigateTo('support') },
    { label: 'Contact', action: () => navigateTo('support') }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      addToast('Welcome to the Leaf Club! Check your inbox for ₹15 off.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="mt-0 border-t border-emerald-900/50 bg-[#14261a] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-emerald-200">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="font-brand text-2xl font-bold tracking-widest text-white">LEAFORA</span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              LEAFORA is a modern online botanical nursery bringing curated plants and practical plant care to your everyday routine.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {footerLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.action}
                  className="rounded-full border border-emerald-700/70 bg-emerald-900/40 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:border-emerald-500 hover:bg-emerald-800/60"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Explore</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><button onClick={() => navigateTo('shop')} className="hover:text-emerald-300">All Plants</button></li>
              <li><button onClick={() => navigateTo('care-guide')} className="hover:text-emerald-300">Care Guides</button></li>
              <li><button onClick={() => navigateTo('quiz')} className="hover:text-emerald-300">Plant Quiz</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Support</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><button onClick={() => navigateTo('orders')} className="hover:text-emerald-300">Track Order</button></li>
              <li><button onClick={() => navigateTo('watering')} className="hover:text-emerald-300">Watering Tips</button></li>
              <li><button onClick={() => navigateTo('user-dashboard')} className="hover:text-emerald-300">My Account</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-xl border border-emerald-800/80 bg-emerald-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-stone-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Join <ArrowRight className="h-4 w-4" />
              </button>
              {subscribed && (
                <p className="flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Welcome gift code: <b>LEAFORA10</b>
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-emerald-900/60 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LEAFORA. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="cursor-pointer hover:text-stone-300">Privacy</span>
            <span className="cursor-pointer hover:text-stone-300">Terms</span>
            <span className="cursor-pointer hover:text-stone-300">Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
