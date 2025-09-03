// src/pages/CartPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../admin/api';
import { toast } from 'react-toastify';  // nếu bạn xài toast
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartPage: React.FC = () => {
  const {
    cart, removeFromCart, updateQuantity,
    clearCart, getTotalItems, getTotalPrice
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', note: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({
        ...formData,
        items: cart.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        }))
      });
      toast.success('Đặt hàng thành công!');
      clearCart();
      setIsCheckingOut(false);
    } catch (err) {
      console.error(err);
      toast.error('Không thể đặt hàng. Vui lòng thử lại.');
    }
  };
  function formatPrice(amount: number): React.ReactNode {
    return amount.toLocaleString('vi-VN');
  }
  return (
    <div className="relative font-segoe">
      <Header isScrolled={true} />

      <main className="pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

          {cart.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
              <Link to="/shop" className="bg-[#223962] text-white px-6 py-2 rounded hover:bg-[#1a2d4d] transition duration-300 inline-block">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg">Sản phẩm</h2>
                  </div>
                  <div className="divide-y">
                    {cart.map(item => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row">
                        <div className="sm:w-24 w-full h-24 flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow sm:ml-4">
                          <h3 className="font-medium text-[#223962] mb-1">{item.name}</h3>
                          <div className="flex flex-wrap justify-between items-center mt-2">
                            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                              <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-[#223962]">
                                {formatPrice(item.price * item.quantity)} ₫
                              </span>
                              <button
                                className="text-red-500 text-sm mt-1 hover:underline"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t flex justify-between">
                    <button
                      className="text-gray-600 hover:underline flex items-center"
                      onClick={() => clearCart()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Xóa tất cả
                    </button>
                    <Link to="/shop" className="text-[#223962] hover:underline flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số lượng:</span>
                      <span>{getTotalItems()} sản phẩm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span>{formatPrice(getTotalPrice())} ₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span>Miễn phí</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-[#223962]">{formatPrice(getTotalPrice())} ₫</span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-[#223962] text-white py-3 rounded-md font-medium hover:bg-[#1a2d4d] transition duration-300"
                    onClick={() => setIsCheckingOut(true)}
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form Modal */}
        {isCheckingOut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Thông tin thanh toán</h2>
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCheckout}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-1">Họ và tên</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223962]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223962]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Số điện thoại</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223962]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Thành phố</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223962]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-1">Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223962]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-1">Ghi chú</label>
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#223962]"
                      ></textarea>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-[#223962]">{formatPrice(getTotalPrice())} ₫</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#223962] text-white rounded-md hover:bg-[#1a2d4d]"
                    >
                      Đặt hàng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer onOpenRegister={() => {
        const event = new CustomEvent('openRegisterModal');
        window.dispatchEvent(event);
      }} />
    </div>
  );
};

export default CartPage;
