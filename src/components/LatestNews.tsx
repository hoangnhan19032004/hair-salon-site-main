import React from 'react';

const LatestNews: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Hair Salon ra mắt cắt tóc thượng gia dịch vụ 5 sao, mang đến một trải nghiệm đỉnh cao lần đầu xuất hiện tại Việt Nam',
      imgUrl: 'https://ext.same-assets.com/1446692159/556524128.png',
      link: '/news/1',
    },
    {
      id: 2,
      title: 'Hair Salon đưa thợ tóc làm việc tại top 3 thị trường khó tính nhất thế giới',
      imgUrl: 'https://ext.same-assets.com/1615477033/3489291920.png',
      link: '/news/2',
    },
    {
      id: 3,
      title: 'Hair Stylist tham gia khóa đào tạo kỹ thuật salon chuyên nghiệp cấp cao toàn Châu Á',
      imgUrl: 'https://ext.same-assets.com/1982050457/2047089662.jpeg',
      link: '/news/3',
    },
    {
      id: 4,
      title: 'Nước cờ mạo hiểm của Hair Salon?',
      imgUrl: 'https://ext.same-assets.com/3101681535/2753348348.png',
      link: '/news/4',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#2c3856] mb-6">Tin tức mới nhất</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <a href={item.link} className="block group">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#2c3856] font-semibold line-clamp-2 group-hover:text-[#4a5b89] transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center text-[#2c3856]">
                    <span className="text-sm font-medium">Xem chi tiết</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-4 py-2 border border-[#2c3856] text-[#2c3856] rounded-md hover:bg-[#2c3856] hover:text-white transition-colors">
            Xem thêm tin tức
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
