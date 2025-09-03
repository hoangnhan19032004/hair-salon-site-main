import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingButton from '../components/BookingButton';

const UonDinhHinhDetail: React.FC = () => {
  const navigate = useNavigate();

  const uonDinhHinhServices = [
    {
      id: 1,
      title: 'Uốn Tiêu Chuẩn',
      description: 'Định hình tóc phồng đẹp tự nhiên, vào nếp bền đẹp mỗi ngày.',
      price: 'Chỉ từ 379K',
      images: [
        'https://ext.same-assets.com/35138232/1833812345.jpeg',
        'https://ext.same-assets.com/35138232/1392144847.jpeg',
        'https://ext.same-assets.com/35138232/716512969.jpeg'
      ],
      link: '/dich-vu-uon-tieu-chuan'
    },
    {
      id: 2,
      title: 'Uốn Cao Cấp',
      description: 'Công nghệ Uốn định hình chuyên nam sử dụng thuốc uốn cao cấp',
      price: 'Chỉ từ 448K',
      images: [
        'https://ext.same-assets.com/35138232/2808378867.jpeg',
        'https://ext.same-assets.com/35138232/487364397.jpeg',
        'https://ext.same-assets.com/35138232/1508359.jpeg'
      ],
      link: '/dich-vu-uon-cao-cap'
    }
  ];

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

  const duongTocServices = [
    {
      id: 1,
      title: 'Dưỡng Keratin',
      description: 'Dưỡng phục hồi tinh chất Oliu phục hồi tóc hư tổn, khô xơ',
      price: 'Chỉ từ 119K',
      images: [
        'https://ext.same-assets.com/35138232/1807692304.jpeg',
        'https://ext.same-assets.com/35138232/37671634.jpeg',
        'https://ext.same-assets.com/35138232/716512969.jpeg'
      ],
      link: '/dich-vu-hap-duong-toc-tinh-chat-oliu'
    },
    {
      id: 2,
      title: 'Dưỡng Phục Hồi Robo Nano',
      description: 'Dịch vụ bổ sung dưỡng chất nuôi dưỡng và bảo vệ tóc chắc khỏe, bền đẹp',
      price: 'Chỉ từ 199K',
      images: [
        'https://ext.same-assets.com/35138232/2959549171.jpeg',
        'https://ext.same-assets.com/35138232/3611750172.jpeg',
        'https://ext.same-assets.com/35138232/658111775.jpeg'
      ],
      link: '/dich-vu-duong-phuc-hoi-robot-nano'
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
        {/* Uốn định hình section */}
        <section>
          <div className="container mx-auto px-4 py-8">
            <div className="border-l-4 border-[#a0c9eb] pl-3 mb-6">
              <h1 className="uppercase text-2xl md:text-3xl font-bold text-[#15397f]">
                UỐN ĐỊNH HÌNH NÉP TÓC
              </h1>
              <p className="text-sm md:text-base text-[#15397f] mt-2">
                Dịch vụ uốn định hình nếp tóc độc quyền tại 30Shine thiết kế lên những mái tóc bồng bềnh, tự nhiên và không mất công tạo kiểu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uonDinhHinhServices.map((service) => (
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

                    <div className="bg-gray-100 rounded-xl p-3 mb-4">
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

                    <div className="bg-[#15397f] text-white text-center py-2 rounded-full font-semibold">
                      {service.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Thay đổi màu tóc section */}
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="border-l-4 border-[#a0c9eb] pl-3 mb-6">
              <h2 className="uppercase text-2xl font-bold text-[#15397f]">
                THAY ĐỔI MÀU TÓC
              </h2>
              <p className="text-sm md:text-base text-[#15397f] mt-2">
                Màu tóc giúp định hình phong cách và thay đổi diện mạo một cách đột phá mà bất cứ ai cũng nên thử.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nhuomTocServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold text-[#262626] mb-2">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#262626] mb-4">
                      {service.description}
                    </p>

                    <div className="bg-gray-100 rounded-xl p-3 mb-4">
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
          </div>
        </section>

        {/* Dưỡng tóc section */}
        <section className="py-8 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="border-l-4 border-[#a0c9eb] pl-3 mb-6">
              <h2 className="uppercase text-2xl font-bold text-[#15397f]">
                DƯỠNG TÓC
              </h2>
              <p className="text-sm md:text-base text-[#15397f] mt-2">
                Dưỡng phục hồi và bảo vệ tóc chắc khỏe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {duongTocServices.map((service) => (
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

                    <div className="bg-gray-100 rounded-xl p-3 mb-4">
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

                    <div className="bg-[#15397f] text-white text-center py-2 rounded-full font-semibold">
                      {service.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-center my-8">
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

export default UonDinhHinhDetail;
