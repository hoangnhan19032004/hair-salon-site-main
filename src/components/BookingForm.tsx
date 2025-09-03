// src/pages/BookingForm.tsx
import React, { useState, useEffect, useContext, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { AuthContext } from '../contexts/AuthContext';

interface Staff {
  id: number;
  name: string;
}

const BookingForm: React.FC = () => {
  // --- Khởi tạo date + time mặc định ---
  const today = new Date();
  const year  = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day   = String(today.getDate()).padStart(2, '0');
  const initialDate = `${year}-${month}-${day}`;    // YYYY-MM-DD
  const hours = String(today.getHours()).padStart(2, '0');
  const mins  = String(today.getMinutes()).padStart(2, '0');
  const initialTime = `${hours}:${mins}`;           // HH:mm

  // --- Context & State ---
  const { user } = useContext(AuthContext);
  const [date, setDate]       = useState<string>(initialDate);
  const [time, setTime]       = useState<string>(initialTime);
  const [service, setService] = useState<string>('');
  const [staffId, setStaffId] = useState<string>('');
  const [phone, setPhone]     = useState<string>(user?.phone || '');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]     = useState<string>('');
  const { checkLoginAndBooking } = useBooking();
  const navigate = useNavigate();

  // Lấy token mỗi lần render
  const token = localStorage.getItem('token') || '';

  // Prefill số điện thoại khi user thay đổi
  useEffect(() => {
    if (user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  // Fetch staff **một lần** khi có token
  useEffect(() => {
  if (!token) return;
  axios.get('/api/staff', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    console.log('Raw staff data from API:', res.data);  // DEBUG
    const list: Staff[] = res.data.map((u: any) => ({
      id: u.id,
      // sửa lại trường 'name' cho khớp với API
      name: u.name     // hoặc u.fullName, u.username tuỳ API của bạn
    }));
    setStaffList(list);
  })
  .catch(err => {
    console.error('Error fetching staff:', err);
    setStaffList([]);
  });
  }, [token]);

  // Xử lý submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!(await checkLoginAndBooking())) return;

    if (!service || !date || !time) {
      setError('Vui lòng chọn dịch vụ, ngày và giờ.');
      return;
    }
    const dt = new Date(`${date}T${time}:00`);
    if (dt < new Date()) {
      setError('Không thể chọn ngày giờ trong quá khứ.');
      return;
    }

    const chosenStaff = staffId
      || (staffList.length
          ? String(staffList[Math.floor(Math.random() * staffList.length)].id)
          : '');
    if (!chosenStaff) {
      setError('Hiện chưa có nhân viên.');
      return;
    }

    const payload = {
      phoneNumber: phone,
      staffId:     Number(chosenStaff),
      dateTime:    `${date}T${time}:00`,
      service
    };

    try {
      setLoading(true);
      const res = await axios.post(
        '/api/bookings',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('🎉 Đặt lịch thành công! Mã: ' + res.data.bookingId);
      navigate('/booking-history');
    } catch (err: any) {
      console.error('POST /api/bookings error:', err.response || err);
      setError(err.response?.data?.message || 'Lỗi khi tạo booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Ngày */}
      <div>
        <label className="block mb-1">Chọn ngày</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={initialDate}
          required
        />
      </div>

      {/* Giờ */}
      <div>
        <label className="block mb-1">Chọn giờ</label>
        <input
          type="time"
          className="w-full p-2 border rounded"
          value={time}
          onChange={e => setTime(e.target.value)}
          required
        />
      </div>

      {/* Dịch vụ */}
      <div>
        <label className="block mb-1">Dịch vụ</label>
        <select
          className="w-full p-2 border rounded"
          value={service}
          onChange={e => setService(e.target.value)}
          required
        >
          <option value="" disabled hidden>Chọn dịch vụ</option>
          <option value="Cắt tóc">Cắt tóc</option>
          <option value="Uốn tóc">Uốn tóc</option>
          <option value="Nhuộm tóc">Nhuộm tóc</option>
          <option value="Gội đầu + massage">Gội đầu + massage</option>
        </select>
      </div>

      {/* Nhân viên */}
      <div>
        <label className="block mb-1">Nhân viên (tùy chọn)</label>
        <select
          className="w-full p-2 border rounded"
          value={staffId}
          onChange={e => setStaffId(e.target.value)}
        >
          <option value="" disabled hidden>Ngẫu nhiên nếu bỏ trống</option>
          {staffList.map(s => (
            <option key={s.id} value={String(s.id)}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Số điện thoại */}
      <div>
        <label className="block mb-1">Số điện thoại</label>
        <input
          type="tel"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      {/* Lỗi */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Nút gửi */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-[#2c3856]'}`}
      >
        {loading ? 'Đang gửi...' : 'Đặt lịch'}
      </button>
    </form>
  );
};

export default BookingForm;
