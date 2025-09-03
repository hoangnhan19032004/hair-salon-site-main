// src/pages/MyDoneHistory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

interface Booking {
  id:         number;
  dateTime:   string;
  service:    string;
  staffName:  string;
  doneImage?: string; // e.g. "/uploads/bookings/booking_1_12345.png"
  status:     string; // Added to match usage in filter
}

const MyDoneHistory: React.FC = () => {
  const [list, setList]       = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect cho Header
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fetchDone = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token') || '';
        const res = await axios.get<Booking[]>('/api/bookings/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Lọc chỉ status Done và có ảnh
        setList(res.data.filter(b => b.status === 'Done' && b.doneImage));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDone();
  }, []);

  // prefix host nếu cần, ví dụ chạy local: http://localhost:3000
  const apiBase = import.meta.env.VITE_API_URL || '';

  return (
    <>
      {/* Header cố định phía trên */}
      <Header isScrolled={isScrolled} />

      {/* chính content: thêm padding-top tương ứng độ cao của header (~64px) */}
      <main className="pt-20 container mx-auto px-4 lg:px-6">
        <h2 className="text-2xl font-semibold mb-6">Lịch sử cắt của bạn</h2>

        {loading ? (
          <div className="text-center py-6">⏳ Đang tải...</div>
        ) : list.length === 0 ? (
          <div className="text-center py-6 text-gray-500">Chưa có lịch cắt nào.</div>
        ) : (
          <div className="space-y-6">
            {list.map(b => {
              const dt = new Date(b.dateTime);
              // đảm bảo URL ảnh đầy đủ
              const imgSrc = b.doneImage!.startsWith('http')
                ? b.doneImage!
                : apiBase + b.doneImage!;
              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center"
                >
                  <div className="flex-1 p-6">
                    <p><strong>Ngày:</strong> {dt.toLocaleDateString('vi-VN')}</p>
                    <p><strong>Giờ:</strong>  {dt.toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit' })}</p>
                    <p><strong>Dịch vụ:</strong> {b.service}</p>
                    <p><strong>Nhân viên:</strong> {b.staffName}</p>
                  </div>
                  <div className="p-6">
                    <img
                      src={imgSrc}
                      alt="After cut"
                      className="max-w-xs rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default MyDoneHistory;
