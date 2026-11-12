import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { formatCurrency } from '../utils/currency.js';
import { handleImageError } from '../utils/imageFallback.js';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Truck,
  Sprout,
  Search,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    plants,
    orders,
    adminAddPlant,
    adminUpdatePlant,
    adminDeletePlant,
    adminUpdateOrderStatus,
    navigateTo,
    addToast
  } = useApp();

  const [adminTab, setAdminTab] = useState('inventory'); // 'inventory', 'orders', 'analytics'
  const [plantModalOpen, setPlantModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);

  // Form state for add/edit plant
  const [name, setName] = useState('');
  const [botanicalName, setBotanicalName] = useState('');
  const [category, setCategory] = useState('Indoor');
  const [price, setPrice] = useState(45);
  const [stock, setStock] = useState(20);
  const [difficulty, setDifficulty] = useState('Easy');
  const [light, setLight] = useState('Bright indirect');
  const [water, setWater] = useState('Every 7-10 days');
  const [petFriendly, setPetFriendly] = useState(true);
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('New Harvest');

  const openAddPlantModal = () => {
    setEditingPlant(null);
    setName('');
    setBotanicalName('');
    setCategory('Indoor');
    setPrice(45);
    setStock(20);
    setDifficulty('Easy');
    setLight('Bright indirect');
    setWater('Every 7-10 days');
    setPetFriendly(true);
    setImage('https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80');
    setTag('Greenhouse Pick');
    setPlantModalOpen(true);
  };

  const openEditPlantModal = (plant) => {
    setEditingPlant(plant);
    setName(plant.name);
    setBotanicalName(plant.botanicalName);
    setCategory(plant.category);
    setPrice(plant.price);
    setStock(plant.stock);
    setDifficulty(plant.difficulty);
    setLight(plant.light);
    setWater(plant.water);
    setPetFriendly(plant.petFriendly);
    setImage(plant.image);
    setTag(plant.tag || '');
    setPlantModalOpen(true);
  };

  const handlePlantFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const payload = {
      name,
      botanicalName: botanicalName || name,
      category,
      price: Number(price),
      stock: Number(stock),
      difficulty,
      light,
      water,
      waterDays: difficulty === 'Easy' ? 10 : 7,
      petFriendly,
      airPurifying: true,
      image: image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
      tag
    };

    if (editingPlant) {
      adminUpdatePlant(editingPlant.id, payload);
    } else {
      adminAddPlant(payload);
    }

    setPlantModalOpen(false);
  };

  // Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const lowStockPlants = plants.filter((p) => p.stock <= 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Nursery Management Console
            </span>
            <span className="bg-emerald-800 text-white text-[10px] font-mono px-2 py-0.5 rounded">
              ADMIN LIVE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Greenhouse Operations Hub
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage living inventory, track orders, adjust dispatched parcels, and review sales.
          </p>
        </div>

        <button
          onClick={openAddPlantModal}
          className="bg-[#1b3b22] hover:bg-[#142e1a] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-md transition-colors"
        >
          <Plus className="w-4 h-4 text-emerald-300" />
          <span>Add New Plant to Catalog</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Total Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-stone-900">
            {formatCurrency(totalRevenue)}
          </p>
          <p className="text-[11px] text-emerald-800 font-medium">From {orders.length} orders placed</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Active Botanical SKUs</span>
            <Sprout className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-stone-900">
            {plants.length}
          </p>
          <p className="text-[11px] text-stone-500 font-medium">Acclimated greenhouse varieties</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Customer Orders</span>
            <Package className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-stone-900">
            {orders.length}
          </p>
          <p className="text-[11px] text-blue-700 font-medium">
            {orders.filter((o) => o.status === 'In Transit').length} currently in transit
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Low Inventory Notice</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-serif text-3xl font-extrabold text-amber-700">
            {lowStockPlants.length}
          </p>
          <p className="text-[11px] text-stone-500 font-medium">Below 15 units in greenhouse</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setAdminTab('inventory')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            adminTab === 'inventory'
              ? 'border-[#1b3b22] text-[#1b3b22]'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Inventory & Plants ({plants.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            adminTab === 'orders'
              ? 'border-[#1b3b22] text-[#1b3b22]'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Fulfillment & Orders ({orders.length})</span>
        </button>
      </div>

      {/* Inventory Tab */}
      {adminTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Greenhouse Plant Stock
            </h3>
            <span className="text-xs text-stone-500">
              Live database synced with shop front
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">Plant & Variety</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Retail Price</th>
                  <th className="py-3.5 px-4">Greenhouse Stock</th>
                  <th className="py-3.5 px-4">Care Level</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {plants.map((plant) => (
                  <tr key={plant.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          onError={handleImageError}
                          className="w-10 h-10 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-serif font-bold text-stone-900 text-xs">
                            {plant.name}
                          </p>
                          <p className="text-[10px] text-stone-400 italic">
                            {plant.botanicalName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-emerald-800">
                      {plant.category}
                    </td>

                    <td className="py-3 px-4 font-bold text-stone-900">
                      {formatCurrency(plant.price)}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          plant.stock <= 10
                            ? 'bg-rose-100 text-rose-800'
                            : plant.stock <= 20
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {plant.stock} in stock
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[11px] text-stone-600 font-medium">
                        {plant.difficulty}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            adminUpdatePlant(plant.id, { stock: plant.stock + 10 });
                            addToast(`Restocked +10 units of ${plant.name}`, 'success');
                          }}
                          className="p-1.5 text-emerald-800 hover:bg-emerald-50 rounded-lg"
                          title="Restock +10 units"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openEditPlantModal(plant)}
                          className="p-1.5 text-stone-600 hover:bg-stone-100 rounded-lg"
                          title="Edit plant"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => adminDeletePlant(plant.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete plant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {adminTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden space-y-4">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Live Customer Orders & Status Dispatch
            </h3>
            <span className="text-xs text-stone-500">
              Change status in real time to update the user's tracking page!
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">Order ID & Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Fulfillment Status</th>
                  <th className="py-3.5 px-4 text-right">View Tracking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-mono font-bold text-stone-900">{ord.id}</p>
                      <p className="text-[10px] text-stone-400">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-stone-900">{ord.shippingAddress.fullName}</p>
                      <p className="text-[10px] text-stone-400">{ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-stone-800">
                        {ord.items.length} plants
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-[#1b3b22]">
                      {formatCurrency(ord.total)}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => adminUpdateOrderStatus(ord.id, e.target.value)}
                        className="bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-700"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Picked & Packed">Picked & Packed</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => navigateTo('order-tracking', ord.id)}
                        className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
                      >
                        Track <Truck className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Plant Modal */}
      {plantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setPlantModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingPlant ? `Edit ${editingPlant.name}` : 'Add New Plant to Nursery Catalog'}
              </h3>
              <button
                onClick={() => setPlantModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePlantFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Common Plant Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alocasia Polly"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Botanical Latin Name</label>
                <input
                  type="text"
                  value={botanicalName}
                  onChange={(e) => setBotanicalName(e.target.value)}
                  placeholder="e.g. Alocasia x amazonica"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="Indoor">Indoor</option>
                    <option value="Air Purifying">Air Purifying</option>
                    <option value="Pet Friendly">Pet Friendly</option>
                    <option value="Succulents & Cacti">Succulents & Cacti</option>
                    <option value="Rare & Exotic">Rare & Exotic</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Herb & Kitchen">Herb & Kitchen</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    min="5"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Greenhouse Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Bestseller, Rare Gothic"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={petFriendly}
                      onChange={(e) => setPetFriendly(e.target.checked)}
                      className="accent-emerald-800 w-4 h-4"
                    />
                    <span className="font-semibold text-stone-800">Pet Safe (Non-Toxic)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1b3b22] text-white font-bold rounded-xl hover:bg-[#142e1a] transition-colors mt-2"
              >
                {editingPlant ? 'Save Updates' : 'Publish to Catalog'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
