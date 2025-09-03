import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingButton from '../components/BookingButton';

const GoiMassageDetail: React.FC = () => {
  const navigate = useNavigate();

  const massageServices = [
    {
      id: 1,
      title: 'Gội Combo 2',
      description: 'Combo gội massage cổ vai gáy thư giãn giảm căng thẳng',
      duration: '25 Phút',
      images: [
        'https://ext.same-assets.com/35138232/3970429446.jpeg',
        'https://ext.same-assets.com/35138232/1218130358.jpeg',
        'https://ext.same-assets.com/35138232/4040337596.jpeg'
      ]
    },
    {
      id: 2,
      title: 'Gội Combo 3',
      description: 'Combo gội massage và chăm sóc da chuyên sâu sáng đều mau da bằng thiết bị công nghệ cao',
      duration: '35 Phút',
      images: [
        'https://ext.same-assets.com/35138232/1838730189.jpeg',
        'https://ext.same-assets.com/35138232/2711906866.jpeg',
        'https://ext.same-assets.com/35138232/438740872.jpeg'
      ]
    },
    {
      id: 3,
      title: 'Gội Combo 4',
      description: 'Combo gội massage bấm huyệt đầu và giãn cơ lưng giảm đau bằng đá nóng Himalaya',
      duration: '45 Phút',
      images: [
        'https://ext.same-assets.com/35138232/3183740832.jpeg',
        'https://ext.same-assets.com/35138232/1930871913.jpeg',
        'https://ext.same-assets.com/35138232/716512969.jpeg'
      ]
    },
    {
      id: 4,
      title: 'Gội Combo 5',
      description: 'Combo gội massage và lấy nhân mụn chuẩn y khoa giúp trẻ hóa làn da bằng thiết bị công nghệ hiện đại',
      duration: '45 Phút',
      images: [
        'https://ext.same-assets.com/35138232/1930871913.jpeg',
        'https://ext.same-assets.com/35138232/438740872.jpeg',
        'https://ext.same-assets.com/35138232/3183740832.jpeg'
      ]
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
              GỘI MASSAGE RELAX
            </h1>
            <p className="text-sm md:text-base text-[#15397f] mt-2">
              Nơi đàn ông không chỉ cắt tóc mà còn tận hưởng gội đầu & massage đầy sảng khoái
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {massageServices.map((service) => (
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
                    <div className="border-2 border-[#ffb800] rounded-full px-3 py-1">
                      <span className="text-sm text-[#262626]">{service.duration}</span>
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

        <section className="py-10 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="border-l-4 border-[#a0c9eb] pl-3 mb-6">
              <h2 className="uppercase text-2xl font-bold text-[#15397f]">
                LẤY RÁY TAI
              </h2>
              <p className="text-sm md:text-base text-[#15397f] mt-2">
                Kỹ thuật lấy ráy tai nhẹ nhàng & thư thái trong không gian yên tĩnh, sạch sẽ.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-md">
              <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-[#262626] mb-2">
                  Lấy ráy tai êm
                </h2>
                <p className="text-sm text-[#262626] mb-4">
                  Kỹ thuật lấy ráy tai nhẹ nhàng & thư thái trong không gian yên tĩnh, sạch sẽ.
                </p>

                <div className="bg-[#ffb800]/40 rounded-xl p-2 md:p-2.5">
                  <div className="flex h-[100px] md:h-[175px] gap-2">
                    <div className="w-2/3 h-full rounded-lg overflow-hidden">
                      <img
                        src="https://ext.same-assets.com/35138232/3217181903.jpeg"
                        alt="Lấy ráy tai êm"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-1/3 flex flex-col gap-2">
                      <div className="h-1/2 rounded-lg overflow-hidden">
                        <img
                          src="https://ext.same-assets.com/35138232/716512969.jpeg"
                          alt="Lấy ráy tai êm 1"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="h-1/2 rounded-lg overflow-hidden">
                        <img
                          src="https://ext.same-assets.com/3217181903/716512969.jpeg"
                          alt="Lấy ráy tai êm 2"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="border-2 border-[#ffb800] rounded-full px-2 py-0.5">
                    <span className="text-sm text-[#262626]">30 Phút</span>
                  </div>
                  <div className="bg-[#ffb800] text-white font-bold px-4 py-1 rounded-full">
                    70K
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BookingButton />
      <Footer onOpenRegister={handleOpenRegister} />
    </div>
  );
};

export default GoiMassageDetail;
