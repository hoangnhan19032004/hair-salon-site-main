// src/components/LoginForm.tsx  (hoặc nơi bạn lưu component này)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ← Import useNavigate từ React Router

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;  // Thêm prop này để reload khi đăng nhập thành công
}

declare global {
  interface Window {
    google: any;
    FB: any;
    fbAsyncInit: () => void;
  }
}

/*---------------------------------------------
   1. BASEURL đọc từ .env – rỗng thì dùng proxy
----------------------------------------------*/
const API = import.meta.env.VITE_API_URL || ''; // ''  ->  đi qua proxy của Vite

export default function LoginForm({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSuccess
}: Props) {
  const navigate = useNavigate(); // ← Khởi tạo useNavigate
  const [form, setForm] = useState({
    emailOrUsername: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  /*---------------------------------------------
     2. Handle INPUT
  ----------------------------------------------*/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  /*---------------------------------------------
     3. LOGIN (local)
  ----------------------------------------------*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.emailOrUsername || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const { data } = await axios.post(`${API}/api/auth/login`, {
        usernameOrEmail: form.emailOrUsername,
        password:        form.password
      });

      /* 👉 LƯU THÔNG TIN SESSION */
      localStorage.setItem('token',   data.token);
      localStorage.setItem('role',    data.role);
      localStorage.setItem('userName', data.username); // ✅ khớp với Header.tsx
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new CustomEvent('loginStatusChange'));

      /* 👉 CHUYỂN TRANG */
      if (data.role === 'admin' || data.role === 'staff') {
        window.location.href = '/admin';
      } else {
        onLoginSuccess();  // Gọi hàm onLoginSuccess khi đăng nhập thành công để reload trang
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    }
  };

  /*---------------------------------------------
     4. SOCIAL LOGIN (y như trước, chỉ gói vào useEffect)
  ----------------------------------------------*/
  useEffect(() => {
    if (!isOpen) return;

    // ========== FB ==========
    const fbDiv = document.getElementById('facebookLoginBtn');
    if (fbDiv && fbDiv.childNodes.length === 0) {
      const btn = document.createElement('button');
      btn.textContent = 'Đăng nhập bằng Facebook';
      btn.className   = 'w-full border rounded py-2 text-[#1877F2] hover:bg-gray-100';
      btn.onclick = () =>
        window.FB.login(
          (r: any) => {
            if (!r.authResponse) return;
            window.FB.api('/me', { fields: 'name,email' }, (u: any) => {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('role', 'user');
              localStorage.setItem('userFacebook', JSON.stringify(u));
              window.dispatchEvent(new CustomEvent('loginStatusChange'));
              onLoginSuccess();  // Gọi hàm onLoginSuccess khi đăng nhập thành công
              onClose();
            });
          },
          { scope: 'email' }
        );
      fbDiv.appendChild(btn);
    }

    // ========== GOOGLE ==========
    const gDiv = document.getElementById('googleLoginBtn');
    if (gDiv && gDiv.childNodes.length === 0) {
      window.google.accounts.id.initialize({
        client_id: '317909363067-ul2nn0cuorg8t18p2om4moeoi899f1pr.apps.googleusercontent.com',
        callback: (resp: any) => {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', 'user');
          localStorage.setItem('userGoogle', resp.credential);
          window.dispatchEvent(new CustomEvent('loginStatusChange'));
          onLoginSuccess();  // Gọi hàm onLoginSuccess khi đăng nhập thành công
          onClose();
        }
      });
      window.google.accounts.id.renderButton(gDiv, {
        theme: 'outline',
        size:  'large',
        text:  'signin_with',
        width: '100%'
      });
    }
  }, [isOpen, onClose, onLoginSuccess]);

  if (!isOpen) return null;

  /*---------------------------------------------
     5. JSX
  ----------------------------------------------*/
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2c3856] py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Đăng nhập</h2>
          <button onClick={onClose} className="text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <input
            name="emailOrUsername"
            value={form.emailOrUsername}
            onChange={handleChange}
            placeholder="Tên đăng nhập hoặc Email"
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />

          <div className="flex justify-between items-center mb-4">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
              />
              Ghi nhớ đăng nhập
            </label>

            {/* ← Thay span thành button/link và dùng navigate */}
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          <div className="flex space-x-3 mb-4">
            <button
              type="submit"
              className="flex-1 bg-[#2c3856] text-white py-2 rounded"
            >
              Đăng nhập
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
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#2c3856] underline"
            >
              Đăng ký ngay
            </button>
          </p>

          {/* Social */}
          <div className="mt-6">
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute w-full border-t border-gray-300" />
              <span className="bg-white px-2 text-sm text-gray-500 z-10">
                Hoặc đăng nhập với
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div id="facebookLoginBtn" className="w-full" />
              <div id="googleLoginBtn"   className="w-full" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
