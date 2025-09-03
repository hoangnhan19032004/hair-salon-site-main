import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingContextType {
  focusBookingForm: () => void;
  checkLoginAndBooking: () => boolean;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener('loginStatusChange', checkLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChange', checkLoginStatus);
    };
  }, []);

  const focusBookingForm = () => {
    // Navigate to home page if not there
    navigate('/');

    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const bookingInput = document.getElementById('booking-phone-input');
      if (bookingInput) {
        // Scroll to the element
        bookingInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus on the input field
        (bookingInput as HTMLInputElement).focus();
      }
    }, 100);
  };

  const checkLoginAndBooking = () => {
    if (!isLoggedIn) {
      alert('Bạn cần đăng nhập hoặc đăng ký trước khi đặt lịch');
      return false;
    }
    return true;
  };

  const openLoginModal = () => {
    // Dispatch event to open login modal
    const event = new CustomEvent('openLoginModal');
    window.dispatchEvent(event);
  };

  const openRegisterModal = () => {
    // Dispatch event to open register modal
    const event = new CustomEvent('openRegisterModal');
    window.dispatchEvent(event);
  };

  const value = {
    focusBookingForm,
    checkLoginAndBooking,
    openLoginModal,
    openRegisterModal
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
