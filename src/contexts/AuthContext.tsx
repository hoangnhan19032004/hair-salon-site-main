/* eslint-disable react-refresh/only-export-components */
// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import axios, { AxiosError } from 'axios';

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  dob?: string;
  avatar?: string;
  // nếu còn field nào khác từ API thì thêm vào đây
}

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

// Default no-op implementations with console.warn to avoid empty-function lint errors
const defaultSetUser: Dispatch<SetStateAction<User | null>> = (value) => {
  console.warn('AuthContext: setUser called before initialization', value);
};
const defaultLogin = async (token: string) => {
  console.warn('AuthContext: login called before initialization', token);
};
const defaultLogout = () => {
  console.warn('AuthContext: logout called before initialization');
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: defaultSetUser,
  loading: true,
  login: defaultLogin,
  logout: defaultLogout,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_URL = import.meta.env.VITE_API_URL;

  /**
   * Fetch hồ sơ người dùng từ API
   */
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get<User>(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error('Lỗi khi fetch profile:', error);
      if (error.response?.status === 401) {
        logout();
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  /**
   * Đăng nhập: lưu token và fetch lại profile
   */
  const login = useCallback(async (token: string) => {
    localStorage.setItem('token', token);
    setLoading(true);
    await fetchProfile();
    setLoading(false);
  }, [fetchProfile]);

  /**
   * Đăng xuất: xóa token và reset user
   */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  // Khi component mount, fetch profile
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
