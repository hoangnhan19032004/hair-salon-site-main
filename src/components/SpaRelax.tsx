import React from 'react';

const SpaRelax: React.FC = () => {
  const spaServices = [
    {
      id: 1,
      title: 'Gội Massage Relax',
      description: 'Trải nghiệm thư giãn tuyệt vời với kỹ thuật massage đầu chuyên nghiệp',
      imgUrl: 'https://ext.same-assets.com/1620589840/1566277660.png',
      price: '150.000đ',
      link: '/dich-vu-goi-massage-relax-detail', // Updated link
    },
    {
      id: 2,
      title: 'Lấy ráy tai mũi',
      description: 'Vệ sinh tai mũi với dụng cụ y tế chuyên dụng, đảm bảo an toàn',
      imgUrl: 'https://ext.same-assets.com/1060850637/3897096727.png',
      price: '80.000đ',
      link: '/dich-vu-lay-ray-tai-mui-detail', // Updated link
    },
  ];

  return (
    <section className="py-10 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-[#2c3856] mb-2">Spa & Relax</h2>
          <p className="text-[#2c3856] text-sm mb-6">
            Thư giãn và làm mới bản thân với các dịch vụ spa cao cấp của chúng tôi.
            Mang đến trải nghiệm thư giãn tuyệt vời sau một ngày dài mệt mỏi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaServices.map((service) => (
            <div key={service.id} className="bg-white rounded-md overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-48 md:h-auto">
                  <img
                    src={service.imgUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-[#2c3856]">{service.title}</h3>
                      <span className="text-[#2c3856] font-medium">{service.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  </div>
                  <div>
                    <a
                      href={service.link}
                      className="inline-flex items-center text-sm text-[#2c3856] font-medium"
                    >
                      Tìm hiểu thêm <span className="ml-1">+</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaRelax;
