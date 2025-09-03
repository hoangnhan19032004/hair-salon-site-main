// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import HairLogo from '../assets/hairLogo';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, p) => sum + p.quantity, 0);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const updateLoginStatus = () => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsLoggedIn(logged);
    setUserEmail(email);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    updateLoginStatus();
    window.location.reload();
  };

  useEffect(() => {
    updateLoginStatus();
    window.addEventListener('loginStatusChange', updateLoginStatus);
    
    window.addEventListener('openRegisterModal', openRegisterModal);
    return () => {
      window.removeEventListener('loginStatusChange', updateLoginStatus);
      
      window.removeEventListener('openRegisterModal', openRegisterModal);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isDropdownOpen]);

  const navItems = [
    { text: 'Trang chủ', path: '/' },
    { text: 'Về chúng tôi', path: '/about' },
    { text: 'Cửa hàng', path: '/shop' },
    { text: 'Tìm salon gần nhất', path: '/locations' },
  ];
  const goBookingHistory = () => navigate('/booking-history');

  const role = localStorage.getItem('role'); // 'admin' | 'staff' | 'user'
  const handleToggleAdmin = () => {
    if (location.pathname.startsWith('/admin')) navigate('/');
    else navigate('/admin');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <HairLogo className="h-10" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((it, i) => (
                <li key={i} className="list-none">
                  <Link to={it.path} className="text-[#2c3856] hover:text-[#4a5b89] font-medium">
                    {it.text}
                  </Link>
                </li>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
                <CartIcon />
                {cartItemCount > 0 && <Badge count={cartItemCount} />}
              </Link>

              {/* Booking history */}
              <button
                onClick={goBookingHistory}
                className="bg-[#2c3856] hover:bg-[#4a5b89] text-white px-4 py-2 rounded-md transition-colors"
              >
                Xem lịch đã hẹn
              </button>

              {/* Admin toggle */}
              {(role === 'admin' || role === 'staff') && (
                <button
                  onClick={handleToggleAdmin}
                  className="bg-[#2c3856] hover:bg-[#4a5b89] text-white px-4 py-2 rounded-md transition-colors"
                >
                  {location.pathname.startsWith('/admin') ? 'Trang chủ' : 'Quản lý'}
                </button>
              )}

              {/* User dropdown */}
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(o => !o)}
                    className="flex items-center space-x-2 border border-[#2c3856] text-[#2c3856]
                               hover:bg-[#2c3856] hover:text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <span>Xin chào, {localStorage.getItem('userName') || userEmail}</span>
                    <ChevronDownIcon />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        👤 Thông tin cá nhân
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                        📦 Đơn hàng đã đặt
                      </Link>
                      {/* Đã xóa “Lịch hẹn của tôi” */}
                      <Link to="/my-cut-history" className="block px-4 py-2 hover:bg-gray-100">
                        ✂️ Lịch sử cắt
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        🚪 Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={openLoginModal}
                    className="bg-[#2c3856] hover:bg-[#4a5b89] text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={openRegisterModal}
                    className="border border-[#2c3856] text-[#2c3856]
                               hover:bg-[#2c3856] hover:text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center space-x-2">
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
                <CartIcon />
                {cartItemCount > 0 && <Badge count={cartItemCount} />}
              </Link>
              {(role === 'admin' || role === 'staff') && (
                <button onClick={handleToggleAdmin} className="p-2 text-[#2c3856] hover:bg-gray-100 rounded">
                  {location.pathname.startsWith('/admin') ? '🏠' : '🛠'}
                </button>
              )}
              <button className="text-[#2c3856]">
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginForm
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={openRegisterModal}
        onLoginSuccess={() => {
          updateLoginStatus();
          setIsLoginModalOpen(false);
        }}
      />
      <RegisterForm
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={openLoginModal}
      />
    </>
  );
};

// Badge component
const Badge: React.FC<{ count: number }> = ({ count }) => (
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
    {count}
  </span>
);

// SVG Icons
const CartIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
    <path d="M6 6h15l-1.5 9h-13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1" fill="currentColor"/>
    <circle cx="18" cy="20" r="1" fill="currentColor"/>
    <path d="M6 6L4 2H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...props}>
    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
    <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor"/>
  </svg>
);

export default Header;
