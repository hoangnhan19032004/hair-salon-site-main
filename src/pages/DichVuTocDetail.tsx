import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingButton from '../components/BookingButton';

const DichVuTocDetail: React.FC = () => {
  const navigate = useNavigate();

  const hairServices = [
    {
      id: 1,
      title: 'Cắt gội khoang thượng gia',
      description: 'Combo cắt kỹ, Combo gội massage',
      duration: '50 Phút',
      images: [
        'https://ext.same-assets.com/35138232/1834772615.jpeg',
        'https://ext.same-assets.com/35138232/2531947004.jpeg',
        'https://ext.same-assets.com/35138232/4040337596.jpeg'
      ],
      link: '/dich-vu/cat-goi-thuong-gia'
    },
    {
      id: 2,
      title: 'Cắt gội Combo 1',
      description: 'Combo cắt kỹ, Combo gội massage',
      duration: '45 Phút',
      images: [
        'https://ext.same-assets.com/35138232/217626493.jpeg',
        'https://ext.same-assets.com/35138232/352468829.jpeg',
        'https://ext.same-assets.com/35138232/438740872.jpeg'
      ],
      link: '/dich-vu/cat-goi-combo-1'
    },
    {
      id: 3,
      title: 'Cắt gội Combo 2',
      description: 'Combo cắt kỹ, Combo gội massage cổ vai gáy',
      duration: '55 Phút',
      images: [
        'https://ext.same-assets.com/35138232/223841380.jpeg',
        'https://ext.same-assets.com/35138232/217626493.jpeg',
        'https://ext.same-assets.com/35138232/1218130358.jpeg'
      ],
      link: '/dich-vu/cat-goi-combo-2'
    },
    {
      id: 4,
      title: 'Cắt gội Combo 3',
      description: 'Combo cắt kỹ, Combo gội massage chăm sóc da',
      duration: '65 Phút',
      images: [
        'https://ext.same-assets.com/35138232/2072878800.jpeg',
        'https://ext.same-assets.com/35138232/3635889614.jpeg',
        'https://ext.same-assets.com/35138232/2711906866.jpeg'
      ],
      link: '/dich-vu/cat-goi-combo-3'
    },
    {
      id: 5,
      title: 'Cắt gội Combo 4',
      description: 'Combo cắt kỹ, Combo gội massage bằng đá nóng',
      duration: '75 Phút',
      images: [
        'https://ext.same-assets.com/35138232/1102534591.jpeg',
        'https://ext.same-assets.com/35138232/2094023292.jpeg',
        'https://ext.same-assets.com/35138232/3183740832.jpeg'
      ],
      link: '/dich-vu/cat-goi-combo-4'
    },
    {
      id: 6,
      title: 'Cắt gội Combo 5',
      description: 'Combo cắt kỹ, Combo gội massage lấy nhân mụn chuyên sâu',
      duration: '75 Phút',
      images: [
        'https://ext.same-assets.com/35138232/782937618.jpeg',
        'https://ext.same-assets.com/35138232/2495785593.jpeg',
        'https://ext.same-assets.com/35138232/3635889614.jpeg'
      ],
      link: '/dich-vu/cat-goi-combo-5'
    }
  ];

  const handleOpenRegister = () => {
    const event = new CustomEvent('openRegisterModal');
    window.dispatchEvent(event);
  };

  const handleBookingClick = () => {
    // Navigate to homepage
    navigate('/');

    // After navigation, scroll to booking form
    setTimeout(() => {
      const bookingInput = document.getElementById('booking-phone-input');
      if (bookingInput) {
        bookingInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (bookingInput as HTMLInputElement).focus();
      }
    }, 100);
  };

  return (
    <div className="relative font-segoe">
      <Header isScrolled={false} />
      <main className="pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="border-l-4 border-[#a0c9eb] pl-3 mb-6">
            <h1 className="uppercase text-2xl md:text-3xl font-bold text-[#15397f]">
              CẮT TÓC
            </h1>
            <p className="text-sm md:text-base text-[#15397f] mt-2">
              Trải nghiệm cắt tóc phong cách dành riêng cho phái mạnh, vừa tiện lợi vừa thư giãn tại đây
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hairServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-[#262626] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#262626] mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="bg-[#ffb800]/40 rounded-xl p-2 md:p-2.5">
                    <div className="flex h-[100px] md:h-[175px] gap-2">
                      <div className="w-2/3 h-full rounded-lg overflow-hidden">
                        <img
                          src={service.images[0]}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-1/3 flex flex-col gap-2">
                        {service.images.slice(1, 3).map((img, idx) => (
                          <div key={idx} className="h-1/2 rounded-lg overflow-hidden">
                            <img
                              src={img}
                              alt={`${service.title} ${idx + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="border-2 border-[#ffb800] rounded-full px-2 py-0.5">
                      <span className="text-sm text-[#262626]">{service.duration}</span>
                    </div>
                    <div className="text-[#15397f] flex items-center text-sm font-medium">
                      <span>Tìm hiểu thêm</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={handleBookingClick}
              className="bg-[#15397f] text-white text-lg font-bold py-3 px-12 rounded-lg hover:bg-[#0e2d68] transition-colors"
            >
              ĐẶT LỊCH NGAY
            </button>
          </div>
        </div>
      </main>
      <BookingButton />
      <Footer onOpenRegister={handleOpenRegister} />
    </div>
  );
};

export default DichVuTocDetail;
