import React from 'react';

const ServiceShowcase: React.FC = () => {
  const showcaseItems = [
    {
      id: 1,
      title: 'Bí Quyết Dịch Vụ Đỉnh Cao tại Hair Salon',
      imgUrl: 'https://ext.same-assets.com/1906194493/2366947374.png',
      link: '/discovers/88',
    },
    {
      id: 2,
      title: 'Nâng Cấp Dịch Vụ: Cam Kết Trên Cả Mong Đợi',
      imgUrl: 'https://ext.same-assets.com/3426357854/2879543236.png',
      link: '/discovers/86',
    },
    {
      id: 3,
      title: 'Từ Trái Tim đến Hành Động: Hài Lòng Trên Từng Điểm Chạm',
      imgUrl: 'https://ext.same-assets.com/3933934475/1536491065.png',
      link: '/discovers/87',
    },
    {
      id: 4,
      title: 'Hair Salon: Nỗ Lực Từng Ngày Để Làm Hài Lòng Khách Hàng',
      imgUrl: 'https://ext.same-assets.com/2334411466/2157176060.png',
      link: '/discovers/89',
    },
    {
      id: 5,
      title: 'Đội Ngũ Hair Salon - Lan Tỏa Giá Trị Hoàn Hảo',
      imgUrl: 'https://ext.same-assets.com/1881718393/1269330263.png',
      link: '/discovers/90',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#2c3856] mb-3">Nâng cấp dịch vụ</h2>
        <p className="text-gray-600 mb-8">
          Hair Salon - Không chỉ tóc đẹp, còn mang tới sự tận hưởng
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {showcaseItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <a href={item.link} className="block group">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm text-[#2c3856] font-semibold line-clamp-2 group-hover:text-[#4a5b89] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center space-x-3 mt-8">
          <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
