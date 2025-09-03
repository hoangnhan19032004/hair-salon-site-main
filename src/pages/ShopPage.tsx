// src/pages/admin/ShopPage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { fetchProducts } from '../admin/api';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ShopPage: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string>('');

  useEffect(() => {
    fetchProducts()
      .then((r: { data: Product[] }) => { setProducts(r.data); setLoading(false); })
      .catch((err: unknown) => { console.error(err); setError('Không tải được sản phẩm'); setLoading(false); });
  }, []);

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const handleAddToCart = (product: Product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng.');
      window.dispatchEvent(new CustomEvent('openLoginModal'));
      return;
    }
    addToCart({
      ...product,
      image: product.imageUrl,
    });
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <div className="relative font-segoe">
      <Header isScrolled={true} />

      <main className="pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Sản phẩm của chúng tôi</h1>

          {loading && <p>Đang tải sản phẩm...</p>}
          {error   && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {!loading && products.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col"
              >
                {/* 1. Bỏ Link – chỉ hiển thị ảnh tĩnh */}
                <div className="p-2 bg-white flex items-center justify-center" style={{ height: '180px' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#223962] font-bold">
                        {formatPrice(product.price)} ₫
                      </span>
                    </div>
                    <button
                      className="w-full bg-[#223962] text-white rounded py-2 text-sm hover:bg-[#1a2d4d] transition duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer onOpenRegister={() => window.dispatchEvent(new CustomEvent('openRegisterModal'))}/>
    </div>
  );
};

export default ShopPage;
