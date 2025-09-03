// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPasswordPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', phone: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email: form.email,
        phone: form.phone
      });

      if (res.data.success) {
        setMessage(res.data.message || 'Email đã được gửi. Vui lòng kiểm tra hộp thư.');
      } else {
        // Trường hợp server trả { success: false, message: '...' }
        setError(res.data.message || 'Có lỗi xảy ra.');
      }
    } catch (err: any) {
      console.error(err);
      const msgErr = err.response?.data?.message || 'Lỗi server, vui lòng thử lại sau.';
      setError(msgErr);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Quên mật khẩu</h2>

      {message && (
        <div className="mb-4 text-green-600">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-600">
          {error}
        </div>
      )}

      {/* Nếu đã gửi thành công (message !== null), ẩn form luôn */}
      {!message && (
        <form onSubmit={handleForgot} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            {loading ? 'Đang gửi...' : 'Gửi mật khẩu tạm thời'}
          </button>
        </form>
      )}

      {/* Nút quay lại Đăng nhập */}
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-gray-600 hover:underline text-sm"
          onClick={() => navigate('/login')}
        >
          Quay lại Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
