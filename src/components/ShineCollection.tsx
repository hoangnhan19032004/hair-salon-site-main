import React from 'react';

const ShineCollection: React.FC = () => {
  const collections = [
    {
      id: 1,
      imgUrl: 'https://ext.same-assets.com/3113942737/1826701153.jpeg'
    },
    {
      id: 2,
      imgUrl: 'https://ext.same-assets.com/349203236/1903695528.jpeg'
    },
    {
      id: 3,
      imgUrl: 'https://ext.same-assets.com/3089945441/1569347642.jpeg'
    },
  ];

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Bỏ tiêu đề và mô tả nếu chỉ dùng hình ảnh trang trí */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <div key={collection.id} className="rounded-md overflow-hidden shadow-sm">
              <img
                src={collection.imgUrl}
                alt={`Hình trang trí ${collection.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShineCollection;
