import React, { useState, useEffect } from 'react';

const BookingButton: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const handleBookingButtonClick = () => {
    if (isLoggedIn) {
      // If logged in, show the booking form
      setIsFormOpen(!isFormOpen);
    } else {
      // If not logged in, show the login modal
      setShowLoginModal(true);
      setIsFormOpen(false);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking to the server
    if (phoneNumber.trim().length >= 10) {
      alert(`Đặt lịch thành công với số điện thoại: ${phoneNumber}. Chúng tôi sẽ liên hệ lại với bạn sớm!`);
      setPhoneNumber('');
      setIsFormOpen(false);
    } else {
      alert('Vui lòng nhập số điện thoại hợp lệ (ít nhất 10 số)');
    }
  };

  const openLoginModal = () => {
    // Dispatch event to open login modal
    const event = new CustomEvent('openLoginModal');
    window.dispatchEvent(event);
    setShowLoginModal(false);
  };

  const openRegisterModal = () => {
    // Dispatch event to open register modal
    const event = new CustomEvent('openRegisterModal');
    window.dispatchEvent(event);
    setShowLoginModal(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Booking form overlay - only shown when logged in */}
      {isFormOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-lg p-4 mb-4 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#2c3856] font-semibold">Đặt lịch nhanh</h3>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleBookingSubmit}>
            <input
              id="booking-phone-input"
              type="tel"
              placeholder="Nhập số điện thoại của bạn"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3856]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="[0-9]{10,}"
              title="Vui lòng nhập số điện thoại hợp lệ (ít nhất 10 số)"
            />

            <button
              type="submit"
              className="w-full bg-[#2c3856] hover:bg-[#4a5b89] text-white py-2 rounded-md transition-colors"
            >
              Đặt lịch ngay
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-2">
            Cắt xong trả tiền, hủy lịch không sao
          </p>
        </div>
      )}

      {/* Login/Register modal - shown when trying to book while not logged in */}
      {showLoginModal && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-lg p-4 mb-4 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#2c3856] font-semibold">Yêu cầu đăng nhập</h3>
            <button
              onClick={() => setShowLoginModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Bạn cần đăng nhập hoặc đăng ký trước khi đặt lịch
          </p>

          <div className="flex space-x-2">
            <button
              onClick={openLoginModal}
              className="flex-1 bg-[#2c3856] hover:bg-[#4a5b89] text-white py-2 rounded-md transition-colors"
            >
              Đăng nhập
            </button>
            <button
              onClick={openRegisterModal}
              className="flex-1 border border-[#2c3856] text-[#2c3856] hover:bg-[#2c3856] hover:text-white py-2 rounded-md transition-colors"
            >
              Đăng ký
            </button>
          </div>
        </div>
      )}

      {/* Main booking button */}
      <button
        onClick={handleBookingButtonClick}
        className="bg-[#2c3856] hover:bg-[#4a5b89] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default BookingButton;
