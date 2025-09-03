import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingButton from '../components/BookingButton';

const ThayDoiMauTocDetail: React.FC = () => {
  const navigate = useNavigate();

  const nhuomTocServices = [
    {
      id: 1,
      title: 'Nhuộm Tiêu Chuẩn',
      description: 'Dịch vụ thay đổi màu tóc giúp anh tự tin, trẻ trung và phong cách',
      duration: '30 Phút',
      price: 'Chỉ từ 199K',
      images: [
        'https://ext.same-assets.com/35138232/1049222832.jpeg',
        'https://ext.same-assets.com/35138232/845530591.jpeg',
        'https://ext.same-assets.com/35138232/716512969.jpeg'
      ],
      link: '/dich-vu-nhuom-mau-tieu-chuan'
    },
    {
      id: 2,
      title: 'Nhuộm Cao Cấp',
      description: 'Dịch vụ thay đổi màu tóc được tin dùng với thuốc nhuộm Davines cao cấp',
      duration: '45 Phút',
      price: 'Chỉ từ 289K',
      images: [
        'https://ext.same-assets.com/35138232/1432530905.jpeg',
        'https://ext.same-assets.com/35138232/669689015.jpeg',
        'https://ext.same-assets.com/35138232/2677784165.jpeg'
      ],
      link: '/dich-vu-nhuom-mau-cao-cap'
    }
  ];

  const colorOptions = [
    {
      id: 1,
      name: 'Màu Đen Tự Nhiên',
      code: '#1C1C1C',
      description: 'Màu đen truyền thống, phù hợp với mọi đối tượng',
    },
    {
      id: 2,
      name: 'Nâu Hạt Dẻ',
      code: '#5A3825',
      description: 'Màu nâu trầm ấm, tôn da cho người châu Á',
    },
    {
      id: 3,
      name: 'Nâu Chocolate',
      code: '#7B3F00',
      description: 'Màu nâu socola, hiện đại và nam tính',
    },
    {
      id: 4,
      name: 'Xám Khói',
      code: '#71797E',
      description: 'Màu xám khói thời thượng, phong cách Hàn Quốc',
    },
    {
      id: 5,
      name: 'Bạch Kim',
      code: '#E5E4E2',
      description: 'Màu bạch kim nổi bật, dành cho người thích sự khác biệt',
    },
    {
      id: 6,
      name: 'Xanh Than',
      code: '#000080',
      description: 'Màu xanh than hiện đại, tạo điểm nhấn độc đáo',
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
        {/* Thay đổi màu tóc section */}
        <section>
          <div className="container mx-auto px-4 py-8">
            <div className="border-l-4 border-[#a0c9eb] pl-3 mb-6">
              <h1 className="uppercase text-2xl md:text-3xl font-bold text-[#15397f]">
                THAY ĐỔI MÀU TÓC
              </h1>
              <p className="text-sm md:text-base text-[#15397f] mt-2">
                Màu tóc giúp định hình phong cách và thay đổi diện mạo một cách đột phá mà bất cứ ai cũng nên thử.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {nhuomTocServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold text-[#262626] mb-2">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#262626] mb-4">
                      {service.description}
                    </p>

                    <div className="bg-[#ffb800]/40 rounded-xl p-3 mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                          <img
                            src={service.images[0]}
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-2">
                          {service.images.slice(1, 3).map((img, idx) => (
                            <div key={idx} className="h-[72px]">
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

                    <div className="flex items-center justify-between">
                      <div className="border-2 border-[#ffb800] rounded-full px-3 py-1">
                        <span className="text-sm text-[#262626]">{service.duration}</span>
                      </div>
                      <div className="bg-[#15397f] text-white text-center py-2 px-4 rounded-full font-semibold">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Color options section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-10">
              <h2 className="text-xl font-semibold text-[#262626] mb-4">Bảng màu tóc được ưa chuộng</h2>
              <p className="text-sm text-gray-600 mb-6">
                Lựa chọn màu tóc phù hợp sẽ giúp tôn lên vẻ đẹp tự nhiên và phong cách cá nhân của bạn.
                Dưới đây là các màu tóc được khách hàng ưa chuộng tại Hair Salon.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {colorOptions.map((color) => (
                  <div key={color.id} className="flex gap-3 items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div
                      className="w-12 h-12 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color.code }}
                    ></div>
                    <div>
                      <h3 className="font-medium text-[#262626]">{color.name}</h3>
                      <p className="text-xs text-gray-500">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-10">
              <h2 className="text-xl font-semibold text-[#262626] mb-4">Lời khuyên khi thay đổi màu tóc</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#15397f] mb-2">1. Chọn màu phù hợp với tông da</h3>
                  <p className="text-sm text-gray-600">
                    Người có làn da sáng nên chọn màu tóc sáng, người có làn da ngăm nên chọn màu tóc trầm để tạo sự hài hòa.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#15397f] mb-2">2. Quan tâm đến công việc</h3>
                  <p className="text-sm text-gray-600">
                    Nếu môi trường làm việc yêu cầu sự chuyên nghiệp, bạn nên chọn màu tóc trung tính như đen, nâu.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#15397f] mb-2">3. Chăm sóc tóc sau khi nhuộm</h3>
                  <p className="text-sm text-gray-600">
                    Sử dụng dầu gội dành riêng cho tóc nhuộm, hạn chế gội đầu quá nhiều, và bổ sung dưỡng chất cho tóc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleBookingClick}
            className="bg-[#15397f] text-white text-lg font-bold py-3 px-12 rounded-lg hover:bg-[#0e2d68] transition-colors"
          >
            ĐẶT LỊCH NGAY
          </button>
        </div>
      </main>
      <BookingButton />
      <Footer onOpenRegister={handleOpenRegister} />
    </div>
  );
};

export default ThayDoiMauTocDetail;
