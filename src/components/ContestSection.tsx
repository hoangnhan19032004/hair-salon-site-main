import React from 'react';

const ContestSection: React.FC = () => {
  const contestImages = [
    {
      id: 1,
      title: 'Gần 1000 kiểu tóc đẹp xuất sắc được tuyển chọn gắt gao',
      imgUrl: 'https://ext.same-assets.com/2063315505/2314682085.jpeg',
      link: '/yours-the-best',
    },
    {
      id: 2,
      title: 'Các tác phẩm chính chân thể hiện sự tài hoa của bàn tay người Việt',
      imgUrl: 'https://ext.same-assets.com/1095699029/4193899428.jpeg',
      link: '/yours-the-best',
    },
    {
      id: 3,
      title: 'Rất nhiều kiểu tóc đang được khách hàng yêu thích và tin dùng',
      imgUrl: 'https://ext.same-assets.com/1328802256/4209390914.jpeg',
      link: '/yours-the-best',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#2c3856] mb-2">Cuộc thi "Hair Salon - You're The Best"</h2>
        <p className="text-gray-600 mb-8">Tỏa sáng tài năng - Nâng tầm thương hiệu</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contestImages.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <a href={item.link} className="block group">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestSection;
