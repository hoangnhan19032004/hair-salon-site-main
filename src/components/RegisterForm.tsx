// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const API = import.meta.env.VITE_API_URL; // ex: http://localhost:3000

const RegisterForm: React.FC<RegisterFormProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1) Client‐side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (!formData.termsAccepted) {
      setError('Vui lòng đồng ý với điều khoản & điều kiện');
      return;
    }

    // 2) Gọi API Register
    try {
      await axios.post(`${API}/api/auth/register`, {
        fullName: formData.fullName,
        email:    formData.email,
        phone:    formData.phone,
        password: formData.password,
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại';
      setError(msg);
      return; // QUIT nếu register lỗi
    }

    // 3) Đăng nhập tự động
    let token: string;
    let usernameToStore: string = formData.fullName; // fallback
    try {
      const loginRes = await axios.post(`${API}/api/auth/login`, {
        usernameOrEmail: formData.email,
        password:        formData.password,
      });

      // Đọc token
      token = loginRes.data.token;

      // Lấy username: ưu tiên loginRes.data.user.username, sau đó loginRes.data.username
      const userObj = loginRes.data.user;
      usernameToStore = 
        userObj?.username 
        || loginRes.data.username 
        || formData.fullName;

    } catch (err: any) {
      const msg =
        err.response?.data?.message
        || 'Đăng ký thành công nhưng đăng nhập tự động thất bại. Vui lòng đăng nhập lại.';
      setError(msg);
      return; // QUIT nếu login lỗi
    }

    // 4) Thành công cả hai: lưu token + username, dispatch & đóng modal
    localStorage.setItem('token', token);
    localStorage.setItem('userName', usernameToStore);
    localStorage.setItem('isLoggedIn', 'true');

    window.dispatchEvent(new CustomEvent('loginStatusChange'));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2c3856] py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Đăng ký tài khoản</h2>
          <button onClick={onClose} className="text-white text-2xl leading-none">
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Họ & tên"
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="SĐT"
            className="mb-3 w-full px-3 py-2 border rounded"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Xác nhận mật khẩu"
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />

          <div className="flex items-center mb-4">
            <input
              name="termsAccepted"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Tôi đồng ý với{' '}
              <a href="/terms" className="text-[#2c3856] underline">Điều khoản</a> &{' '}
              <a href="/privacy" className="text-[#2c3856] underline">Chính sách</a>
            </label>
          </div>

          <div className="flex space-x-3 mb-4">
            <button
              type="submit"
              className="flex-1 bg-[#2c3856] text-white py-2 rounded"
            >
              Đăng ký
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#2c3856] text-[#2c3856] py-2 rounded"
            >
              Hủy
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#2c3856] underline"
            >
              Đăng nhập
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
