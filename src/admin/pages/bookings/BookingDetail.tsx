// src/admin/pages/bookings/BookingDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Booking {
  id:           number;
  customerName: string;
  phoneNumber:  string;
  service:      string;
  dateTime:     string;
  staffName:    string;
  status:       string;
  doneImage?:   string; // e.g. "/uploads/bookings/booking_1_12345.png"
}

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  // Đọc URL backend từ env
  const apiBase = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token') || '';
        const res = await axios.get<Booking>(
          `/api/bookings/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBooking(res.data);
      } catch (err) {
        console.error('❌ Lỗi khi tải chi tiết booking:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-6">⏳ Đang tải...</p>;
  if (!booking) return <p className="p-6 text-red-500">Không tìm thấy booking này.</p>;

  const dt = new Date(booking.dateTime);
  // Nối base nếu là đường dẫn tương đối
  const imgSrc = booking.doneImage
    ? booking.doneImage.startsWith('http')
      ? booking.doneImage
      : apiBase + booking.doneImage
    : '';

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Link
        to="/admin/bookings"
        className="inline-block text-blue-600 hover:underline mb-4"
      >
        ← Quay lại
      </Link>

      <h1 className="text-3xl font-semibold mb-6">Chi tiết lịch hẹn #{booking.id}</h1>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="mb-2"><strong>Khách hàng:</strong> {booking.customerName}</p>
        <p className="mb-2"><strong>Điện thoại:</strong> {booking.phoneNumber}</p>
        <p className="mb-2"><strong>Dịch vụ:</strong> {booking.service}</p>
        <p className="mb-2">
          <strong>Ngày giờ:</strong> {dt.toLocaleDateString('vi-VN')} – {dt.toLocaleTimeString('vi-VN')}
        </p>
        <p className="mb-2"><strong>Nhân viên:</strong> {booking.staffName}</p>
        <p className="mb-4"><strong>Trạng thái:</strong> {booking.status}</p>

        {imgSrc && (
          <div className="mt-4">
            <strong>Ảnh sau cắt:</strong>
            <div className="mt-2">
              <img
                src={imgSrc}
                alt="After cut"
                className="w-full max-w-md rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
