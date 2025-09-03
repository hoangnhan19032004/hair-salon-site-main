import { NavLink } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaUserTie, FaUsers } from 'react-icons/fa';

// Cập nhật đường dẫn đầy đủ cho menu
const menu = [
  { to: '/admin/orders',   icon: <FaClipboardList />, label: 'Quản lý Đơn hàng' },
  { to: '/admin/staff',    icon: <FaUserTie />,       label: 'Quản lý Nhân viên' },
  { to: '/admin/users',    icon: <FaUsers />,         label: 'Quản lý User' },
  { to: '/admin/products', icon: <FaBoxOpen />,       label: 'Quản lý Sản phẩm' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0">
      <h2 className="text-center py-4 text-xl font-bold border-b border-gray-700">
        ADMIN MENU
      </h2>
      <nav className="p-4 space-y-2">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            {m.icon} <span>{m.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
