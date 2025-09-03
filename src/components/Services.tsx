import React from 'react';

const Services: React.FC = () => {
  // Service data
  const services = [
    {
      id: 1,
      title: 'Cắt tóc',
      desc: '',
      imgUrl: 'https://ext.same-assets.com/2406252202/1174023361.jpeg',
      link: '/dich-vu-cat-toc',
    },
    {
      id: 2,
      title: 'Uốn định hình',
      desc: 'Giá từ 379.000',
      imgUrl: 'https://ext.same-assets.com/3335641599/405866895.jpeg',
      link: '/dich-vu-uon-nhuom-duong-toc',
    },
    {
      id: 3,
      title: 'Thay đổi màu tóc',
      desc: 'Giá từ 199.000',
      imgUrl: 'https://ext.same-assets.com/3043809132/2970332554.jpeg',
      link: '/dich-vu-thay-doi-mau-toc',
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-[#2c3856] mb-6">Dịch vụ Tóc</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-50 overflow-hidden rounded-md shadow-sm">
              <div className="block">
                <div className="aspect-w-4 aspect-h-3 relative">
                  <img
                    src={service.imgUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-medium text-[#2c3856]">{service.title}</h3>
                  {service.desc && (
                    <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                  )}
                  <div className="mt-2">
                    <a href={service.link} className="inline-flex items-center text-xs text-[#2c3856] font-medium">
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

export default Services;
