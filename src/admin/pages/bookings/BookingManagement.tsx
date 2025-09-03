// src/admin/pages/bookings/BookingManagement.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Booking {
  id: number;
  dateTime: string;
  service: string;
  staffName: string;
  customerName: string;
  status: 'Pending' | 'Done' | 'Cancelled' | string;
  doneImage?: string;
}

export default function BookingManagement() {
  const [bookings, setBookings]   = useState<Booking[]>([]);
  const [filtered, setFiltered]   = useState<Booking[]>([]);
  const [loading, setLoading]     = useState(false);
  const [files, setFiles]         = useState<Record<number, File>>({});
  const [search, setSearch]       = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  // Lọc danh sách mỗi khi bookings hoặc search thay đổi
  useEffect(() => {
    setFiltered(
      bookings.filter(b =>
        b.customerName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [bookings, search]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.get<Booking[]>('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Chuyển trạng thái không kèm ảnh
  const changeStatus = async (id: number, newStatus: Booking['status']) => {
    try {
      const token = localStorage.getItem('token') || '';
      await axios.patch(
        `/api/bookings/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  // Chọn file ảnh cho từng booking
  const handleFileChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [id]: e.target.files![0] }));
    }
  };

  // Upload ảnh (nếu có) và đánh dấu Done
  const uploadAndDone = async (id: number) => {
    try {
      const token = localStorage.getItem('token') || '';
      let doneImageUrl: string | undefined;

      // Nếu staff đã chọn ảnh thì upload
      if (files[id]) {
        const fd = new FormData();
        fd.append('image', files[id]);
        const up = await axios.post(
          `/api/bookings/${id}/upload-image`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        doneImageUrl = up.data.imageUrl;
      }

      // Cập nhật trạng thái Done kèm URL ảnh (nếu có)
      await axios.patch(
        `/api/bookings/${id}/status`,
        { status: 'Done', doneImageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error('Error marking done:', err);
      alert('Cập nhật thất bại');
    }
  };

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-semibold">✂️ Quản lý Lịch hẹn</h3>

      {/* Ô tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên khách..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>⏳ Đang tải...</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Người đặt</th>
              <th className="px-4 py-2 border">Dịch vụ</th>
              <th className="px-4 py-2 border">Nhân viên</th>
              <th className="px-4 py-2 border">Ngày giờ</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Ảnh đã cắt</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td className="px-4 py-2 border">
                  <Link
                    to={`/admin/bookings/${b.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {b.customerName}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{b.service}</td>
                <td className="px-4 py-2 border">{b.staffName}</td>
                <td className="px-4 py-2 border">
                  {new Date(b.dateTime).toLocaleString('vi-VN')}
                </td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded text-white ${
                    b.status === 'Pending'   ? 'bg-gray-500' :
                    b.status === 'Done'      ? 'bg-green-600' :
                    b.status === 'Cancelled' ? 'bg-red-600' : 'bg-blue-400'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  {b.doneImage
                    ? <img src={b.doneImage} alt="done" className="h-16 mx-auto rounded"/>
                    : <span className="text-gray-400">—</span>
                  }
                </td>
                <td className="px-4 py-2 border space-x-2">
                  {b.status === 'Pending' ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileChange(b.id, e)}
                      />
                      <button
                        onClick={() => uploadAndDone(b.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        ✅ Done
                      </button>
                      <button
                        onClick={() => changeStatus(b.id, 'Cancelled')}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ❌ Hủy
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => changeStatus(b.id, 'Pending')}
                      className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      ↺ Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  Không tìm thấy bản ghi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
