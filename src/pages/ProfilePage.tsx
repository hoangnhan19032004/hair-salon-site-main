// src/pages/ProfilePage.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL;

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

const ProfilePage: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // ─── 1. useEffect để fetch dữ liệu user ngay khi component mount ───
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Giả sử API trả về { username, email, phone }
        const { username, email, phone } = res.data;
        setForm({
          username: username || '',
          email: email || '',
          phone: phone || '',
          password: ''   // password khởi tạo rỗng (người dùng nhập nếu muốn đổi)
        });
      } catch (err) {
        console.error('Lỗi khi fetch user:', err);
        // Có thể show alert hoặc để form trống
      }
    };

    fetchUser();
  }, []); // chỉ chạy 1 lần khi mount

  // ─── 2. handleChange cho các input ───
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ─── 3. handleSubmit để lưu lại thông tin user sửa đổi ───
  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      // Gửi form gồm username, email, phone và password (nếu user có nhập)
      await axios.put(
        `${API_URL}/api/users/me`,
        {
          username: form.username,
          email: form.email,
          phone: form.phone,
          ...(form.password ? { password: form.password } : {})
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Cập nhật thành công');
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lưu thay đổi');
    }
    setLoading(false);
  };

  return (
    <>
      <Header isScrolled={false} />
      <div className="max-w-3xl mx-auto mt-20 mb-8 p-6 bg-white border-2 border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Thông tin tài khoản</h2>

        {/* ─── 4. Form điền sẵn dữ liệu vào các ô ─── */}
        <div className="space-y-4">
          {/* Tên */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới nếu muốn đổi"
              className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Nút lưu thay đổi */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
