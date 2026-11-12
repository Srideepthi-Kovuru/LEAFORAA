import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import {
  User,
  Heart,
  ShoppingBag,
  Droplets,
  MapPin,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Edit2
} from 'lucide-react';

export default function UserDashboardPage() {
  const {
    user,
    setUser,
    wishlist,
    plants,
    orders,
    wateringPlants,
    navigateTo,
    addToCart,
    toggleWishlist,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('wishlist'); // 'wishlist', 'addresses', 'profile'
  const [editingAddress, setEditingAddress] = useState(false);
  const [addrStreet, setAddrStreet] = useState(user?.addresses?.[0]?.street || '742 Evergreen Terrace');
  const [addrCity, setAddrCity] = useState(user?.addresses?.[0]?.city || 'Portland');
  const [addrState, setAddrState] = useState(user?.addresses?.[0]?.state || 'OR');
  const [addrZip, setAddrZip] = useState(user?.addresses?.[0]?.zip || '97201');

  const wishlistPlants = plants.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!user) return;
    const updated = {
      ...user,
      addresses: [
        {
          id: 'addr-1',
          label: 'Primary Delivery Sanctuary',
          fullName: user.name,
          street: addrStreet,
          city: addrCity,
          state: addrState,
          zip: addrZip,
          isDefault: true
        }
      ]
    };
    setUser(updated);
    setEditingAddress(false);
    addToast('Shipping address updated successfully', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* User Header Profile */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1b3b22] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {user ? user.name.charAt(0) : 'G'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-stone-900">
                {user ? user.name : 'Botanical Guest'}
              </h1>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {user?.role === 'admin' ? 'Nursery Admin' : 'Botanical Member'}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {user ? user.email : 'Sign in to sync your living sanctuary across devices'}
            </p>
          </div>
        </div>

        {/* Quick stat chips */}
        <div className="flex items-center gap-4 sm:gap-6 border-t md:border-0 pt-4 md:pt-0 border-stone-100 text-xs text-stone-600">
          <div className="text-center cursor-pointer" onClick={() => navigateTo('orders')}>
            <span className="text-lg font-bold text-[#1b3b22] block">{orders.length}</span>
            <span className="text-stone-400">Orders</span>
          </div>
          <div className="text-center cursor-pointer" onClick={() => setActiveTab('wishlist')}>
            <span className="text-lg font-bold text-[#1b3b22] block">{wishlist.length}</span>
            <span className="text-stone-400">Wishlist</span>
          </div>
          <div className="text-center cursor-pointer" onClick={() => navigateTo('watering')}>
            <span className="text-lg font-bold text-[#1b3b22] block">{wateringPlants.length}</span>
            <span className="text-stone-400">In Garden</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'wishlist'
              ? 'border-[#1b3b22] text-[#1b3b22]'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>My Saved Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'addresses'
              ? 'border-[#1b3b22] text-[#1b3b22]'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Delivery Addresses</span>
        </button>
      </div>

      {/* Wishlist Tab Content */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistPlants.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">
                Your wishlist is waiting for green love
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Click the heart icon on any plant card while exploring to save your favorite botanical specimens.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="bg-[#1b3b22] text-white px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Explore Plant Shop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistPlants.map((plant) => (
                <div key={plant.id} className="relative">
                  <ProductCard plant={plant} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delivery Addresses Tab Content */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs max-w-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Saved Delivery Sanctuary
            </h3>
            {!editingAddress && (
              <button
                onClick={() => setEditingAddress(true)}
                className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Address
              </button>
            )}
          </div>

          {!editingAddress ? (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <span className="font-bold text-stone-900 text-sm block">
                {user?.name || 'Sophia Green'}
              </span>
              <p>{addrStreet}</p>
              <p>
                {addrCity}, {addrState} {addrZip}
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Default Delivery Address
              </span>
            </div>
          ) : (
            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={addrZip}
                    onChange={(e) => setAddrZip(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAddress(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1b3b22] text-white rounded-xl font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
