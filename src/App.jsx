import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import AuthModal from './components/AuthModal.jsx';
import ToastContainer from './components/ToastContainer.jsx';

// Pages
import AuthPage from './pages/AuthPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import PlantDetailsPage from './pages/PlantDetailsPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import OrderTrackingPage from './pages/OrderTrackingPage.jsx';
import CareGuidePage from './pages/CareGuidePage.jsx';
import PlantQuizPage from './pages/PlantQuizPage.jsx';
import WateringReminderPage from './pages/WateringReminderPage.jsx';
import UserDashboardPage from './pages/UserDashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SupportPage from './pages/SupportPage.jsx';

function MainRouter() {
  const { activePage } = useApp();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'login':
        return <AuthPage initialMode="login" />;
      case 'signup':
        return <AuthPage initialMode="signup" />;
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'support':
        return <SupportPage />;
      case 'shop':
        return <ShopPage />;
      case 'plant-details':
        return <PlantDetailsPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'orders':
        return <OrdersPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'care-guide':
        return <CareGuidePage />;
      case 'quiz':
        return <PlantQuizPage />;
      case 'watering':
        return <WateringReminderPage />;
      case 'user-dashboard':
        return <UserDashboardPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  const isAuthRoute = activePage === 'login' || activePage === 'signup';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-800">
      {!isAuthRoute && <Navbar />}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      {!isAuthRoute && <Footer />}

      {/* Global Overlays */}
      {!isAuthRoute && <CartDrawer />}
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
