// src/pages/BookingHistory.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HairLogo from '../assets/hairLogo';

interface Booking {
  id:           number;
  dateTime:     string;
  service:      string;
  staffName:    string;
  customerName: string;
  status:       'Pending' | 'Done' | 'Cancelled' | string;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // gọi công khai, không kèm token
      const res = await axios.get<Booking[]>('/api/bookings');
      // chỉ hiển thị các booking nằm ở trạng thái Pending
      setBookings(res.data.filter(b => b.status === 'Pending'));
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center py-4 px-6">
          <Link to="/" className="flex items-center">
            <HairLogo className="h-8 w-auto mr-3 cursor-pointer" />
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Lịch hẹn đang chờ xử lý
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4 lg:px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg md:text-xl font-medium text-gray-700">
              Các lịch hẹn đang chờ xử lý
            </h2>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">⏳ Đang tải...</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Giờ
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Người đặt
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Dịch vụ
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Nhân viên
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        Hiện không có lịch hẹn đang chờ.
                      </td>
                    </tr>
                  ) : (
                    bookings.map(b => {
                      const dt   = new Date(b.dateTime);
                      const date = dt.toLocaleDateString('vi-VN');
                      const time = dt.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      });
                      return (
                        <tr key={b.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{b.customerName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{b.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{b.staffName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{b.status}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingHistory;
