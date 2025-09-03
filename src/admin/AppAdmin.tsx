// src/admin/AppAdmin.tsx
import { Routes, Route, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// pages
import OrdersPage            from './pages/orders';
import StaffRoutes           from './pages/staff';
import UsersList             from './pages/users/UsersList';
import ProductsPage          from './pages/products';
import BookingManagement     from './pages/bookings/BookingManagement';
import BookingDetail         from './pages/bookings/BookingDetail';

const useRole = () => localStorage.getItem('role');

function Protect({ roles, children }: { roles: string[]; children: JSX.Element }) {
  const role = useRole();
  if (!role) return <Navigate to="/login" replace />;
  if (!roles.includes(role)) return <p className="text-danger p-3">Không có quyền truy cập</p>;
  return children;
}

const Sidebar = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.clear();
    nav('/login', { replace: true });
  };
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    'nav-link d-flex align-items-center gap-1 ' +
    (isActive ? 'active bg-primary' : 'text-white');

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white min-vh-100" style={{ width: 240 }}>
      {/* Logo click về client */}
      <Link to="/" className="d-flex align-items-center mb-3 text-white text-decoration-none fs-5">
        💈 Hair Salon Admin
      </Link>
      <hr />

      <ul className="nav nav-pills flex-column gap-1">
        <li>
          <NavLink to="/admin" className={linkCls} end>
            🏠 Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={linkCls}>
            🧾 Quản lý Đơn hàng
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/bookings" className={linkCls}>
            ✂️ Quản lý Lịch hẹn
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/staff" className={linkCls}>
            👥 Quản lý Nhân viên
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={linkCls}>
            🙍 Quản lý User
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={linkCls}>
            💇‍♂️ Quản lý Sản phẩm
          </NavLink>
        </li>
      </ul>

      <hr />
      <button className="btn btn-outline-light btn-sm mt-auto" onClick={logout}>
        🚪 Đăng xuất
      </button>
    </div>
  );
};

export default function AppAdmin() {
  useEffect(() => { document.title = 'Hair Salon Admin'; }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
        <Routes>
          {/* Dashboard home */}
          <Route
            index
            element={
              <h3>Chào mừng <b>{useRole()?.toUpperCase()}</b> tới trang quản trị!</h3>
            }
          />

          {/* Orders */}
          <Route
            path="orders/*"
            element={
              <Protect roles={['admin','staff']}>
                <OrdersPage />
              </Protect>
            }
          />

          {/* Booking management list */}
          <Route
            path="bookings"
            element={
              <Protect roles={['admin','staff']}>
                <BookingManagement />
              </Protect>
            }
          />

          {/* Booking detail */}
          <Route
            path="bookings/:id"
            element={
              <Protect roles={['admin','staff']}>
                <BookingDetail />
              </Protect>
            }
          />

          {/* Staff */}
          <Route
            path="staff/*"
            element={
              <Protect roles={['admin']}>
                <StaffRoutes />
              </Protect>
            }
          />

          {/* Users */}
          <Route
            path="users"
            element={
              <Protect roles={['admin']}>
                <UsersList />
              </Protect>
            }
          />

          {/* Products */}
          <Route
            path="products/*"
            element={
              <Protect roles={['admin','staff']}>
                <ProductsPage />
              </Protect>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </main>
    </div>
  );
}
