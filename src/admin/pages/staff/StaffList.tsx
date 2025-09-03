import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStaff, deleteStaff } from '../../api';

interface IStaff {
  id: number;
  name: string;   // từ username
  email: string;
  phone: string;
}

export default function StaffList() {
  const [staffs, setStaffs] = useState<IStaff[]>([]);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const load = async () => {
    try {
      const res = await fetchStaff();
      setStaffs(res.data);
      setErr('');
    } catch {
      setErr('❌ Không tải được danh sách nhân viên');
    }
  };
  useEffect(() => { load(); }, []);

  const onDelete = async (id: number) => {
    if (!confirm('Xác nhận xóa?')) return;
    try {
      await deleteStaff(id.toString());
      load();
    } catch {
      alert('Xóa thất bại');
    }
  };

  return (
    <div>
      <h3>👥 Quản lý Nhân viên</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <button className="btn btn-primary mb-3" onClick={() => nav('new')}>
        ➕ Thêm mới
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {staffs.length === 0 ? (
            <tr><td colSpan={4} className="text-center">Chưa có nhân viên nào</td></tr>
          ) : staffs.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => nav(`${s.id}/edit`)}>✏️ Sửa</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(s.id)}>🗑️ Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
