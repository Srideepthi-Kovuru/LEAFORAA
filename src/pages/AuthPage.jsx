import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
  Sprout,
  User
} from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage({ initialMode = 'login' }) {
  const { login, signup } = useApp();
  const [mode, setMode] = useState(initialMode);
  const loginEmailRef = useRef(null);
  const signupFullNameRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const signupPasswordRef = useRef(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (mode === 'login') {
      loginEmailRef.current?.focus();
    } else {
      signupFullNameRef.current?.focus();
    }
  }, [mode]);

  const [rememberMe, setRememberMe] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const nextErrors = {};
    if (!loginForm.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailRegex.test(loginForm.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!loginForm.password) {
      nextErrors.password = 'Password is required.';
    } else if (loginForm.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    return nextErrors;
  };

  const validateSignup = () => {
    const nextErrors = {};
    if (!signupForm.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    } else if (signupForm.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!signupForm.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailRegex.test(signupForm.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!signupForm.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (signupForm.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Enter a valid phone number.';
    }
    if (!signupForm.password) {
      nextErrors.password = 'Password is required.';
    } else if (signupForm.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    if (!signupForm.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (signupForm.confirmPassword !== signupForm.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    return nextErrors;
  };

  const updateLoginForm = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const updateSignupForm = (field, value) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLogin();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await login(loginForm.email.trim(), loginForm.password, 'user');
      if (rememberMe) {
        localStorage.setItem('leafora_remember_me', 'true');
      } else {
        localStorage.removeItem('leafora_remember_me');
      }
    } catch (error) {
      // Error is already surfaced through the global toast in AppContext.
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateSignup();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await signup(
        signupForm.fullName.trim(),
        signupForm.email.trim(),
        signupForm.password,
        signupForm.phone.trim()
      );
    } catch (error) {
      // Error is already surfaced through the global toast in AppContext.
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_18px_55px_rgba(27,59,34,0.08)] sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-[#1b3b22]">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <div className="font-brand text-lg tracking-[0.24em] text-[#1b3b22]">LEAFORA</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="mb-3 inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-600">
              Welcome
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#1b3b22]">
              {mode === 'login' ? 'Sign in to continue' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              {mode === 'login'
                ? 'Access your plant care dashboard and orders.'
                : 'Join LEAFORA and start your green routine.'}
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                mode === 'login' ? 'bg-[#1b3b22] text-white shadow-sm' : 'text-stone-600'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                mode === 'signup' ? 'bg-[#1b3b22] text-white shadow-sm' : 'text-stone-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Email
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.email ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <Mail className="ml-3 h-4 w-4 text-stone-400" />
                  <input
                    ref={loginEmailRef}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={loginForm.email}
                    onChange={(event) => updateLoginForm('email', event.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Password
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.password ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ml-3 h-4 w-4 text-stone-400" aria-hidden="true">
                    <path d="M7 10V7.5A5 5 0 0 1 12 2.5a5 5 0 0 1 5 5V10" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="4" y="10" width="16" height="12" rx="2.5"/>
                  </svg>
                  <input
                    ref={loginPasswordRef}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={(event) => updateLoginForm('password', event.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1b3b22] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#142d1b]"
              >
                Login to My Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Full Name
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.fullName ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <User className="ml-3 h-4 w-4 text-stone-400" />
                  <input
                    ref={signupFullNameRef}
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    value={signupForm.fullName}
                    onChange={(event) => updateSignupForm('fullName', event.target.value)}
                    placeholder="Sophia Green"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Email
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.email ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <Mail className="ml-3 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={signupForm.email}
                    onChange={(event) => updateSignupForm('email', event.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Phone Number
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.phone ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <Phone className="ml-3 h-4 w-4 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={signupForm.phone}
                    onChange={(event) => updateSignupForm('phone', event.target.value)}
                    placeholder="(555) 234-5678"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Password
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.password ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ml-3 h-4 w-4 text-stone-400" aria-hidden="true">
                    <path d="M7 10V7.5A5 5 0 0 1 12 2.5a5 5 0 0 1 5 5V10" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="4" y="10" width="16" height="12" rx="2.5"/>
                  </svg>
                  <input
                    ref={signupPasswordRef}
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={signupForm.password}
                    onChange={(event) => updateSignupForm('password', event.target.value)}
                    placeholder="Create a secure password"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                  Re-enter Password
                </label>
                <div className={`flex items-center rounded-2xl border bg-white transition-all ${errors.confirmPassword ? 'border-red-300' : 'border-stone-200 focus-within:border-emerald-500'}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ml-3 h-4 w-4 text-stone-400" aria-hidden="true">
                    <path d="M7 10V7.5A5 5 0 0 1 12 2.5a5 5 0 0 1 5 5V10" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="4" y="10" width="16" height="12" rx="2.5"/>
                  </svg>
                  <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={signupForm.confirmPassword}
                    onChange={(event) => updateSignupForm('confirmPassword', event.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1b3b22] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#142d1b]"
              >
                Create My Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-stone-600">
            {mode === 'login' ? (
              <p>
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-[#1b3b22] underline-offset-4 hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-[#1b3b22] underline-offset-4 hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-center text-xs font-medium text-emerald-900">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Secure shopping • Trusted checkout • Easy care tracking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
