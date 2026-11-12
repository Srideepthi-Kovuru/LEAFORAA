import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PLANTS, POT_OPTIONS } from '../data/plantsData.js';
import { buildOrderPayload } from '../utils/orderPayload.js';

const AppContext = createContext();

const normalizePlant = (plant = {}) => {
  const normalized = { ...plant };
  normalized.id = normalized.externalId || normalized.slug || normalized.id || normalized._id;
  normalized.gallery = Array.isArray(normalized.gallery) && normalized.gallery.length > 0
    ? normalized.gallery
    : normalized.image
      ? [normalized.image]
      : [];
  normalized.sizes = Array.isArray(normalized.sizes) && normalized.sizes.length > 0
    ? normalized.sizes
    : [{ name: 'Standard (6" pot)', priceMultiplier: 1 }];
  normalized.careGuide = normalized.careGuide || {};
  return normalized;
};

const normalizeOrder = (order = {}) => ({
  ...order,
  id: order.id || order._id,
  total: order.total ?? order.totalAmount ?? 0,
  items: Array.isArray(order.items) ? order.items : [],
  shippingAddress: order.shippingAddress || {
    fullName: order.customerName || '',
    email: order.email || '',
    phone: order.phone || '',
    street: order.address || '',
    city: '',
    state: '',
    zip: '',
  },
  status: order.status || 'Pending'
});


const fetchJson = async (endpoint, options = {}) => {
  const token = localStorage.getItem('leafora_token');

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });


  if (!response.ok) {
    let message = 'Request failed';

    try {
      const errorPayload = await response.json();
      message = errorPayload?.message || errorPayload?.error || JSON.stringify(errorPayload);
    } catch {
      const errorText = await response.text();
      message = errorText || 'Request failed';
    }

    throw new Error(message);
  }

  return response.json();
};

export function AppProvider({ children }) {
  // 1. Plants Catalog (persisted in localStorage, synced with backend when available)
  const [plants, setPlants] = useState(() => {
    try {
      const saved = localStorage.getItem('leafora_plants');
      return saved ? JSON.parse(saved) : INITIAL_PLANTS;
    } catch {
      return INITIAL_PLANTS;
    }
  });

  useEffect(() => {
    const syncPlants = async () => {
      try {
        const response = await fetch('/api/plants');
        if (!response.ok) throw new Error('API unavailable');

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizePlant);
          setPlants(normalized);
          localStorage.setItem('leafora_plants', JSON.stringify(normalized));
        }
      } catch (error) {
        console.warn('MongoDB backend unavailable; using local plant catalog.', error.message);
      }
    };

    syncPlants();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('leafora_plants', JSON.stringify(plants));
    } catch (e) {
      console.error(e);
    }
  }, [plants]);

  // 2. Navigation State
  const [activePage, setActivePage] = useState('home');
  const [selectedPlantId, setSelectedPlantId] = useState('monstera-deliciosa');
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState('ORD-84920');

  // 3. User Authentication
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('leafora_token');
      if (!token) {
        return null;
      }

      const saved = localStorage.getItem('leafora_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const getUserKey = (suffix) => {
    const userId = user?._id || user?.id || 'guest';
    return `${suffix}_${userId}`;
  };

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('leafora_token');
      if (!token) return;

      try {
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Session invalid');
        }

        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('leafora_user', JSON.stringify(data.user));
      } catch (error) {
        console.warn('Session restore failed:', error.message);
        localStorage.removeItem('leafora_token');
        setUser(null);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('leafora_user', JSON.stringify(user));
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // 4. Cart State
  
  // 4. Cart State - Separate cart for each user
  const cartStorageKey = getUserKey('leafora_cart');

  const [cart, setCart] = useState([]);
  const [cartLoadedFor, setCartLoadedFor] = useState(null);

  // Load cart whenever the logged-in user changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(cartStorageKey);
      const userCart = saved ? JSON.parse(saved) : [];

      setCart(Array.isArray(userCart) ? userCart : []);
      setCartLoadedFor(cartStorageKey);

      // Remove old shared cart
      localStorage.removeItem('leafora_cart');
    } catch (error) {
      console.error('Cart loading failed:', error);
      setCart([]);
      setCartLoadedFor(cartStorageKey);
    }
  }, [cartStorageKey]);

  // Save cart only for the currently logged-in user
  useEffect(() => {
    if (cartLoadedFor !== cartStorageKey) return;

    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    } catch (error) {
      console.error('Cart saving failed:', error);
    }
  }, [cart, cartStorageKey, cartLoadedFor]);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('LEAFORA10');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0.1);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('10% Welcome Discount applied!');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      localStorage.removeItem('leafora_wishlist');
      return;
    }

    try {
      const savedUserId = user._id || user.id;
      const saved = localStorage.getItem(`leafora_wishlist_${savedUserId}`);
      setWishlist(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('leafora_wishlist');
      return;
    }

    try {
      const savedUserId = user._id || user.id;
      localStorage.setItem(`leafora_wishlist_${savedUserId}`, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, user]);

  // 6. Orders History (fetched from backend for the authenticated account only)
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setOrders([]);
        setOrdersError('');
        return;
      }

      const token = localStorage.getItem('leafora_token');
      if (!token) {
        setOrders([]);
        setOrdersError('');
        return;
      }

      setOrdersLoading(true);
      setOrdersError('');

      try {
        const data = await fetchJson('/api/orders/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(Array.isArray(data) ? data.map(normalizeOrder) : []);
      } catch (error) {
        console.warn('Failed to load user orders:', error.message);
        setOrders([]);
        setOrdersError('Unable to load your orders right now. Please try again.');
      } finally {
        setOrdersLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // 7. Smart Watering Reminders & Plant Tracker
  const [wateringPlants, setWateringPlants] = useState([]);

  useEffect(() => {
    if (!user) {
      setWateringPlants([]);
      localStorage.removeItem('leafora_watering_plants');
      return;
    }

    try {
      const savedUserId = user._id || user.id;
      const saved = localStorage.getItem(`leafora_watering_plants_${savedUserId}`);
      setWateringPlants(saved ? JSON.parse(saved) : []);
    } catch {
      setWateringPlants([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('leafora_watering_plants');
      return;
    }

    try {
      const savedUserId = user._id || user.id;
      localStorage.setItem(`leafora_watering_plants_${savedUserId}`, JSON.stringify(wateringPlants));
    } catch (e) {
      console.error(e);
    }
  }, [wateringPlants, user]);

  // 8. Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', options = {}) => {
    const force = typeof options === 'boolean' ? options : !!options.force;
    if (!force && !user) return;

    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Actions
  const addToCart = (plant, sizeObj = null, potObj = null, qty = 1) => {
    const size = sizeObj || (plant.sizes && plant.sizes[0]) || { name: 'Standard (6" pot)', priceMultiplier: 1.0 };
    const pot = potObj || POT_OPTIONS[0];
    const baseCalculated = Math.round(plant.price * (size.priceMultiplier || 1.0));
    const totalUnitCost = baseCalculated + (pot.price || 0);

    const existingIndex = cart.findIndex(
      (item) => item.plantId === plant.id && item.sizeName === size.name && item.potOption.id === pot.id
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      });
    } else {
      const newItem = {
        id: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        plantId: plant.id,
        name: plant.name,
        botanicalName: plant.botanicalName,
        basePrice: plant.price,
        sizeName: size.name,
        potOption: pot,
        potPrice: pot.price || 0,
        totalUnitCost: totalUnitCost,
        quantity: qty,
        image: plant.image
      };
      setCart((prev) => [newItem, ...prev]);
    }

    addToast(`Added ${qty}x ${plant.name} to your botanical basket!`, 'success');
  };

  const updateCartQty = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (trimmed === 'LEAFORA10') {
      setPromoCode('LEAFORA10');
      setPromoDiscountRate(0.1);
      setPromoError('');
      setPromoSuccess('10% Welcome Discount applied!');
      addToast('Promo code LEAFORA10 applied: 10% OFF!', 'success');
    } else if (trimmed === 'GREEN20') {
      setPromoCode('GREEN20');
      setPromoDiscountRate(0.2);
      setPromoError('');
      setPromoSuccess('20% Spring Botanical Discount applied!');
      addToast('Promo code GREEN20 applied: 20% OFF!', 'success');
    } else if (trimmed === 'FREESHIP') {
      setPromoCode('FREESHIP');
      setPromoDiscountRate(0);
      setPromoError('');
      setPromoSuccess('Free express botanical shipping unlocked!');
      addToast('Free Shipping code applied!', 'success');
    } else {
      setPromoError('Invalid promo code. Try LEAFORA10 or GREEN20');
      setPromoSuccess('');
      addToast('Invalid promo code', 'error');
    }
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalUnitCost * item.quantity, 0);
  const cartDiscount = promoCode === 'LEAFORA10' ? cartSubtotal * 0.1 : promoCode === 'GREEN20' ? cartSubtotal * 0.2 : 0;
  const freeShippingThreshold = 75;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || promoCode === 'FREESHIP';
  const shippingCost = cart.length === 0 ? 0 : isFreeShipping ? 0 : 8.50;
  const estimatedTax = (cartSubtotal - cartDiscount) > 0 ? (cartSubtotal - cartDiscount) * 0.08 : 0;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost + estimatedTax);

  // Wishlist Actions
  const toggleWishlist = (plantId) => {
    if (!user) {
      addToast('Please login or sign up to access your wishlist.', 'info', { force: true });
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (wishlist.includes(plantId)) {
      setWishlist((prev) => prev.filter((id) => id !== plantId));
      addToast('Removed from your wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, plantId]);
      addToast('Saved to your botanical wishlist!', 'success');
    }
  };

  // Watering Actions
  const waterPlantNow = (gardenId) => {
    const now = new Date();
    setWateringPlants((prev) =>
      prev.map((item) => {
        if (item.id === gardenId) {
          const nextDue = new Date(now.getTime() + item.waterDays * 24 * 60 * 60 * 1000);
          return {
            ...item,
            lastWatered: now.toISOString(),
            nextWaterDue: nextDue.toISOString(),
            streak: (item.streak || 0) + 1
          };
        }
        return item;
      })
    );
    addToast('Plant watered! Hydration logged successfully 🌱💧', 'success');
  };

  const addPlantToGarden = (plant, customName, waterDays = null, location = 'Living Room') => {
    if (!user) {
      addToast('Please login or sign up to access your watering reminders.', 'info', { force: true });
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return null;
    }

    const now = new Date();
    const days = waterDays || plant.waterDays || 7;
    const nextDue = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const newGardenPlant = {
      id: 'garden-' + Date.now(),
      plantId: plant.id,
      customName: customName || plant.name,
      botanicalName: plant.botanicalName,
      location: location,
      waterDays: days,
      lastWatered: now.toISOString(),
      nextWaterDue: nextDue.toISOString(),
      streak: 1,
      notes: 'Added from Leafora Botanical Nursery. Keep healthy!',
      image: plant.image
    };

    setWateringPlants((prev) => [newGardenPlant, ...prev]);
    addToast(`Added "${newGardenPlant.customName}" to your Smart Garden!`, 'success');
  };

  const removePlantFromGarden = (gardenId) => {
    setWateringPlants((prev) => prev.filter((p) => p.id !== gardenId));
    addToast('Plant removed from watering schedule', 'info');
  };

  // Orders Actions
  const placeOrder = async (orderData) => {
    if (!user) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      addToast('Please login or sign up before placing an order.', 'info', { force: true });
      return null;
    }

    const token = localStorage.getItem('leafora_token');
    if (!token) {
      addToast('Your session expired. Please sign in again.', 'error', { force: true });
      setUser(null);
      return null;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      addToast('Your cart is empty. Add a plant before checking out.', 'info', { force: true });
      return null;
    }

    const orderPayload = buildOrderPayload({
      user,
      cart,
      orderData,
      cartSubtotal,
      cartDiscount,
      shippingCost,
      estimatedTax,
      cartGrandTotal,
    });

    const { customerName, email: customerEmail, items: orderItems } = orderPayload;

    if (!customerName || !customerEmail) {
      addToast('Please complete your name and email before placing the order.', 'error', { force: true });
      return null;
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      addToast('Your cart is empty. Add a plant before checking out.', 'info', { force: true });
      return null;
    }

    try {
      const savedOrder = await fetchJson('/api/orders', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderPayload),
      });

      const normalizedOrder = normalizeOrder(savedOrder);
      setOrders((prev) => [normalizedOrder, ...prev]);
      clearCart();
      setSelectedTrackingOrderId(normalizedOrder.id);
      setActivePage('order-tracking');
      addToast(`Order ${normalizedOrder.id} placed successfully! 🎉`, 'success');
      return normalizedOrder;
    } catch (error) {
      console.error('Order creation failed:', error);
      addToast(error.message || 'Failed to save your order. Please try again.', 'error');
      throw error;
    }
  };

  // Admin Actions (Catalog & Order updates)
  const adminAddPlant = async (plantData) => {
    const newPlant = {
      ...plantData,
      id: plantData.id || plantData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      gallery: plantData.gallery || [plantData.image],
      careGuide: plantData.careGuide || {
        light: plantData.light || 'Bright indirect light',
        water: plantData.water || 'Every 7 days',
        humidity: 'Average household humidity (40-60%)',
        soil: 'Organic well-draining houseplant mix',
        temperature: '18°C - 26°C',
        toxicity: plantData.petFriendly ? '100% Non-toxic' : 'Mildly toxic if ingested'
      },
      sizes: plantData.sizes || [
        { name: 'Standard (6" pot)', priceMultiplier: 1.0 }
      ]
    };

    try {
      const savedPlant = await fetchJson('/api/plants', {
        method: 'POST',
        body: JSON.stringify({
          ...newPlant,
          externalId: newPlant.id,
          slug: newPlant.id,
        }),
      });
      const normalizedSaved = normalizePlant(savedPlant);
      setPlants((prev) => [normalizedSaved, ...prev]);
      addToast(`New plant "${normalizedSaved.name}" added to catalog!`, 'success');
      return normalizedSaved;
    } catch (error) {
      console.warn('Plant create API unavailable; keeping local catalog change only.', error.message);
      setPlants((prev) => [newPlant, ...prev]);
      addToast(`New plant "${newPlant.name}" added to catalog!`, 'success');
      return newPlant;
    }
  };

  const adminUpdatePlant = async (id, updatedData) => {
    const currentPlant = plants.find((p) => p.id === id) || {};

    try {
      const targetId = currentPlant._id || id;
      const savedPlant = await fetchJson(`/api/plants/${targetId}`, {
        method: 'PUT',
        body: JSON.stringify({ ...currentPlant, ...updatedData, id: id }),
      });
      const normalizedSaved = normalizePlant(savedPlant);
      setPlants((prev) => prev.map((p) => (p.id === id ? normalizedSaved : p)));
      addToast('Plant catalog updated successfully', 'success');
      return normalizedSaved;
    } catch (error) {
      console.warn('Plant update API unavailable; updating local catalog only.', error.message);
      setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
      addToast('Plant catalog updated successfully', 'success');
      return { ...currentPlant, ...updatedData };
    }
  };

  const adminDeletePlant = async (id) => {
    try {
      const plant = plants.find((p) => p.id === id);
      const targetId = plant?._id || id;
      await fetchJson(`/api/plants/${targetId}`, { method: 'DELETE' });
    } catch (error) {
      console.warn('Plant delete API unavailable; removing locally only.', error.message);
    }

    setPlants((prev) => prev.filter((p) => p.id !== id));
    addToast('Plant removed from catalog', 'info');
  };

  const adminUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedEvents = order.events.map((ev) => {
            if (ev.status.toLowerCase().includes(newStatus.toLowerCase())) {
              return { ...ev, done: true, time: 'Just now by Admin' };
            }
            return ev;
          });
          return {
            ...order,
            status: newStatus,
            events: updatedEvents
          };
        }
        return order;
      })
    );
    addToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  };

  // Auth Helpers
  const login = async (email, password, role = 'user') => {
    try {
      const response = await fetchJson('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });

      localStorage.setItem('leafora_token', response.token);
      setUser(response.user);
      setAuthModalOpen(false);
      setActivePage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return response.user;
    } catch (error) {
      addToast(error.message || 'Login failed', 'error');
      throw error;
    }
  };

  const signup = async (name, email, password, phone = '+1 (555) 000-0000') => {
    try {
      const response = await fetchJson('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone, role: 'user' }),
      });

      localStorage.setItem('leafora_token', response.token);
      setUser(response.user);
      setAuthModalOpen(false);
      setActivePage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return response.user;
    } catch (error) {
      addToast(error.message || 'Signup failed', 'error');
      throw error;
    }
  };

  const logout = () => {
    const previousUserId = user?._id || user?.id;

    if (previousUserId) {
      localStorage.setItem('leafora_last_user_id', previousUserId);
    }

    localStorage.removeItem('leafora_token');

    setWishlist([]);
    setWateringPlants([]);
    setOrders([]);
    setOrdersError('');
    setUser(null);
    setActivePage('home');
    setAuthModalOpen(false);
    setToasts([]);
    addToast('Logged out of Leafora', 'info', { force: true });
  };

  // Helper to navigate with scroll to top
  const navigateTo = (page, paramId = null) => {
    const protectedPages = ['shop', 'plant-details', 'checkout', 'orders', 'order-tracking', 'user-dashboard', 'watering'];
    if (!user && protectedPages.includes(page)) {
      addToast('Please login or sign up to access your wishlist.', 'info', { force: true });
      setAuthModalMode('login');
      setAuthModalOpen(true);
      setActivePage('home');
      return;
    }
    if (page === 'plant-details' && paramId) {
      setSelectedPlantId(paramId);
    }
    if (page === 'order-tracking' && paramId) {
      setSelectedTrackingOrderId(paramId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = {
    // Catalog
    plants,
    // Navigation
    activePage,
    setActivePage,
    navigateTo,
    selectedPlantId,
    setSelectedPlantId,
    selectedTrackingOrderId,
    setSelectedTrackingOrderId,
    // Auth
    user,
    setUser,
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
    logout,
    // Cart
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    shippingCost,
    estimatedTax,
    cartGrandTotal,
    freeShippingThreshold,
    isFreeShipping,
    promoCode,
    promoDiscountRate,
    promoError,
    promoSuccess,
    applyPromo,
    // Wishlist
    wishlist,
    toggleWishlist,
    // Watering & Garden
    wateringPlants,
    waterPlantNow,
    addPlantToGarden,
    removePlantFromGarden,
    // Orders
    orders,
    ordersLoading,
    ordersError,
    placeOrder,
    // Admin
    adminAddPlant,
    adminUpdatePlant,
    adminDeletePlant,
    adminUpdateOrderStatus,
    // Toasts
    toasts,
    addToast,
    removeToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
