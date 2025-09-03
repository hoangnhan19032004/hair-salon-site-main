// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// thêm import toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute    from './routes/PrivateRoute';
import AppAdmin        from './admin/AppAdmin';   // Dashboard
import Header          from './components/Header';
import Hero            from './components/Hero';
import Services        from './components/Services';
import SpaRelax        from './components/SpaRelax';
import ShineCollection from './components/ShineCollection';
import Footer          from './components/Footer';

import GoiMassageDetail    from './pages/GoiMassageDetail';
import LayRayTaiDetail     from './pages/LayRayTaiDetail';
import DichVuTocDetail     from './pages/DichVuTocDetail';
import UonDinhHinhDetail   from './pages/UonDinhHinhDetail';
import ThayDoiMauTocDetail from './pages/ThayDoiMauTocDetail';
import AboutUs             from './pages/AboutUs';
import ShopPage            from './pages/ShopPage';
import CartPage            from './pages/CartPage';
import BookingHistory      from './pages/BookingHistory';
import ProfilePage         from './pages/ProfilePage';
import OrdersPage          from './pages/OrdersPage';

import LoginForm           from './components/LoginForm';
import RegisterForm        from './components/RegisterForm';

import { BookingProvider } from './contexts/BookingContext';
import { CartProvider }    from './contexts/CartContext';

import FindNearestSalon    from './components/FindNearestSalon';
import PrivacyPolicy       from './components/PrivacyPolicy';
import TermsOfService      from './components/TermsOfService';

import MyCutHistory from './pages/MyDoneHistory';
import ForgotPasswordPage from './components/ForgotPasswordPage';
function App() {
  /* header scroll effect */
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Login/Register modal state */
  const [showLogin, setShowLogin]       = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Listen to custom events
  useEffect(() => {
    const handleOpenLogin    = () => setShowLogin(true);
    const handleOpenRegister = () => setShowRegister(true);
    window.addEventListener('openLoginModal', handleOpenLogin);
    window.addEventListener('openRegisterModal', handleOpenRegister);
    return () => {
      window.removeEventListener('openLoginModal', handleOpenLogin);
      window.removeEventListener('openRegisterModal', handleOpenRegister);
    };
  }, []);

  /* Home page */
  const HomePage = () => (
    <div className="relative font-segoe">
      <Header isScrolled={isScrolled} />
      <main className="pt-16">
        <Hero />
        <Services />
        <SpaRelax />
        <ShineCollection />
      </main>
      <Footer onOpenRegister={() => setShowRegister(true)} />
    </div>
  );

  return (
    <Router>
      {/* ToastContainer cho toàn app */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* Global modals for login/register */}
      <LoginForm
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLoginSuccess={() => window.location.reload()}
      />
      <RegisterForm
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <CartProvider>
        <BookingProvider>
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<HomePage />} />

            {/* Dashboard admin & staff */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute allowedRoles={[ 'admin', 'staff' ]}>
                  <AppAdmin />
                </PrivateRoute>
              }
            />

            {/* Các trang dịch vụ & tĩnh */}
            <Route path="/locations"                        element={<FindNearestSalon />} />
            <Route path="/privacy"                          element={<PrivacyPolicy />} />
            <Route path="/terms"                            element={<TermsOfService />} />
            <Route path="/dich-vu-goi-massage-relax-detail" element={<GoiMassageDetail />} />
            <Route path="/dich-vu-lay-ray-tai-mui-detail"   element={<LayRayTaiDetail />} />
            <Route path="/dich-vu-cat-toc"                  element={<DichVuTocDetail />} />
            <Route path="/dich-vu-uon-nhuom-duong-toc"      element={<UonDinhHinhDetail />} />
            <Route path="/dich-vu-thay-doi-mau-toc"         element={<ThayDoiMauTocDetail />} />
            <Route path="/about"                            element={<AboutUs />} />
            <Route path="/shop"                             element={<ShopPage />} />
            <Route path="/cart"                             element={<CartPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* Profile & Order pages (user) */}
            <Route
              path="/profile"
              element={
                <PrivateRoute allowedRoles={[ 'user','admin','staff' ]}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute allowedRoles={[ 'user','admin','staff' ]}>
                  <OrdersPage />
                </PrivateRoute>
              }
            />

            {/* Lịch sử hẹn */}
            <Route path="/booking-history" element={<BookingHistory />} />
            {/* Lịch sử cắt của chính user */}
            <Route
              path="/my-cut-history"
                element={
                  <PrivateRoute allowedRoles={['user', 'admin', 'staff']}>
                    <MyCutHistory />
                  </PrivateRoute>
              }
               />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BookingProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
