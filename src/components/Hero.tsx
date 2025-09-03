import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';

const Hero: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra lần đầu
    setIsLoggedIn(!!localStorage.getItem('token'));

    // Lắng nghe sự thay đổi trạng thái đăng nhập (header, form sử dụng LoginForm.tsx)
    const onAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('loginStatusChange', onAuthChange);

    return () => {
      window.removeEventListener('loginStatusChange', onAuthChange);
    };
  }, []);

  const handleOpenLogin = () => {
    // Phát event để Header mở modal LoginForm
    window.dispatchEvent(new CustomEvent('openLoginModal'));
  };

  return (
    <section className="relative bg-[#e9eef6] overflow-hidden min-h-[500px] flex items-center">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-xl text-center">
            {/* Tiêu đề / mô tả */}
            <h1 className="text-4xl font-bold text-[#2c3856] mb-6">
              Welcome to Our Hair Salon
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Trải nghiệm dịch vụ chuyên nghiệp, đặt lịch chỉ trong 30 giây.
            </p>

            {/* Box đặt lịch */}
            <div className="bg-white p-6 rounded-md shadow-md mx-auto max-w-md">
              <h3 className="text-center text-[#2c3856] font-semibold mb-4">
                Đặt lịch gọi đầu chỉ 30 giây
              </h3>

              {isLoggedIn ? (
                // Hiển thị form khi đã login
                <BookingForm />
              ) : (
                // Hiển thị nút login khi chưa login
                <button
                  onClick={handleOpenLogin}
                  className="w-full bg-[#2c3856] text-white p-3 rounded-md"
                >
                  Đăng nhập để đặt lịch
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
