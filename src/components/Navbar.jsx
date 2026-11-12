import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import {
  Sprout,
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Compass,
  BookOpen,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Droplets
} from 'lucide-react';

export default function Navbar() {
  const {
    activePage,
    navigateTo,
    cart,
    setCartDrawerOpen,
    wishlist,
    wateringPlants,
    user,
    setAuthModalOpen,
    setAuthModalMode,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const nowTime = new Date().getTime();
  const plantsNeedingWater = wateringPlants.filter((p) => {
    const dueTime = new Date(p.nextWaterDue).getTime();
    return dueTime <= nowTime + 24 * 60 * 60 * 1000;
  }).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Plants' },
    { id: 'quiz', label: 'Plant Quiz', badge: 'Match' },
    ...(user ? [{ id: 'watering', label: 'Watering Reminders', count: plantsNeedingWater }] : []),
    { id: 'care-guide', label: 'Care Guides' },
    ...(user ? [{ id: 'orders', label: 'My Orders' }] : [])
  ];

  if (activePage === 'home') {
    return (
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/80 backdrop-blur-md">
        <div className="bg-[#1b3b22] px-4 py-2 text-center text-xs font-medium tracking-wide text-[#e8f2e9]">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-emerald-300" />
            <span>Free Climate-Insulated Nursery Shipping on Orders Over ₹75</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden rounded border border-emerald-600/40 bg-emerald-800/80 px-2 py-0.5 font-mono text-[11px] sm:inline">
              CODE: LEAFORA10
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b3b22] shadow-md shadow-emerald-900/10">
                <Sprout className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <div className="font-brand text-2xl font-bold tracking-[0.2em] text-[#1b3b22]">LEAFORA</div>
              </div>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('signup')}
                className="rounded-full border border-[#1b3b22] bg-white px-5 py-2 text-sm font-medium text-[#1b3b22] transition hover:bg-[#f2f7f3]"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="rounded-full bg-[#1b3b22] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#142d1b]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1b3b22] text-[#e8f2e9] text-xs px-4 py-2 text-center font-medium flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
        <span>Free Climate-Insulated Nursery Shipping on Orders Over ₹75</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-mono border border-emerald-600/40">
          CODE: LEAFORA10
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center cursor-pointer select-none" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-full bg-[#1b3b22] text-emerald-100 flex items-center justify-center shadow-md shadow-emerald-950/10 mr-3">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-brand text-2xl font-bold tracking-widest text-[#1b3b22]">
                LEAFORA
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-[#56755c] -mt-1 font-semibold">
                Online Botanical Nursery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#1b3b22] bg-[#eef5ee] font-semibold'
                      : 'text-stone-600 hover:text-[#1b3b22] hover:bg-stone-100/70'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="bg-emerald-700 text-white text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full">
                        {link.badge}
                      </span>
                    )}
                    {link.count > 0 && (
                      <span className="bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-bounce">
                        {link.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search */}
            <button
              onClick={() => navigateTo('shop')}
              className="p-2 text-stone-600 hover:text-[#1b3b22] rounded-full hover:bg-stone-100 transition-colors"
              title="Search Plants"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            {user && (
              <button
                onClick={() => navigateTo('user-dashboard')}
                className="p-2 text-stone-600 hover:text-rose-700 rounded-full hover:bg-rose-50 transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#1b3b22] hover:bg-[#152e1a] text-white px-3.5 py-2 rounded-full text-sm font-medium shadow-sm transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCartCount}
              </span>
            </button>

            {/* User Account / Profile dropdown */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-stone-100 border border-stone-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-100 flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:block mr-1" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-stone-700 hover:text-emerald-900 border border-stone-300 hover:border-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Dropdown Menu */}
              {userDropdownOpen && user && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs text-stone-500">Signed in as</p>
                    <p className="text-sm font-semibold text-stone-900 truncate">{user.name}</p>
                    <span className="inline-block mt-1 text-[10px] font-medium uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {user.role === 'admin' ? 'Nursery Admin' : 'Botanical Member'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo('user-dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-emerald-700" />
                    My Dashboard & Garden
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('orders');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    My Orders & Invoices
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('watering');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2"
                  >
                    <Droplets className="w-4 h-4 text-emerald-700" />
                    Watering Tracker
                  </button>

                  {/* Admin Dashboard Entry */}
                  <div className="my-1 border-t border-stone-100"></div>

                  <button
                    onClick={() => {
                      navigateTo('admin-dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-emerald-900 hover:bg-emerald-100/60 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-800" />
                    Admin Nursery Hub
                  </button>

                  <div className="my-1 border-t border-stone-100"></div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateTo(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium ${
                activePage === link.id
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>{link.label}</span>
              {link.count > 0 && (
                <span className="bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {link.count} due
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('admin-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-900 bg-emerald-100/50"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-800" />
              Nursery Admin Portal
            </button>

            {!user ? (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-medium bg-[#1b3b22] text-white rounded-xl"
              >
                Sign In / Create Account
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-medium text-rose-700 bg-rose-50 rounded-xl"
              >
                Sign Out ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
