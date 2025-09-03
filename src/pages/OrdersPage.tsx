// src/pages/OrdersPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchOrders, cancelOrder, OrderItem } from '../admin/api';

interface GroupedOrder {
  orderId: number;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  status: OrderItem['status'];
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    fetchOrders()
      .then(res => setOrders(res.data))
      .catch(() => setError('Không tải được đơn hàng của bạn.'));
  };

  const handleCancel = (orderId: number) => {
    cancelOrder(orderId)
      .then(() => {
        setOrders(prev =>
          prev.map(item =>
            item.orderId === orderId
              ? { ...item, status: 'Cancelled' }
              : item
          )
        );
      })
      .catch(() => alert('Hủy đơn thất bại'));
  };

  const groupedOrders: GroupedOrder[] = useMemo(() => {
    const map: Record<number, GroupedOrder> = {};
    orders.forEach(item => {
      if (!map[item.orderId]) {
        map[item.orderId] = {
          orderId: item.orderId,
          items: [],
          totalAmount: item.totalAmount,
          createdAt: item.createdAt,
          status: item.status,
        };
      }
      map[item.orderId].items.push(item);
    });
    return Object.values(map).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  return (
    <div className="flex flex-col min-h-screen">
  <Header isScrolled={false} />
  <main className="flex-grow bg-gray-100 pt-16">
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {groupedOrders.length ? (
        groupedOrders.map(order => (
          <div
            key={order.orderId}
            className="mb-6 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {/* Header đơn hàng */}
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold">
                Đơn #{order.orderId} –{" "}
                {new Date(order.createdAt).toLocaleString("vi-VN")}
              </div>
              <div
                className={`text-sm px-2 py-1 rounded-lg ${
                  order.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Rejected" || order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="mb-3 border-t border-b py-2">
              {order.items.map(item => (
                <div
                  key={item.itemId}
                  className="flex justify-between items-center mb-1 text-sm"
                >
                  <span>
                    {item.productName}{" "}
                    {/* Size property removed because it does not exist on OrderItem */}
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="font-semibold mb-3">
              Tổng cộng:{" "}
              <span className="text-red-600">
                {order.totalAmount.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            {/* Nút hủy đơn */}
            {order.status === "Pending" && (
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => handleCancel(order.orderId)}
              >
                Hủy đơn
              </button>
            )}
          </div>
        ))
      ) : (
        !error && <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
      )}
    </div>
  </main>
  <Footer />
</div>

  );
};

export default OrdersPage;
