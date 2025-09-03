// src/admin/pages/UsersList.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
}

const API = import.meta.env.VITE_API_URL || '';

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Form state tạm thời khi chỉnh thông tin user
  const [editForm, setEditForm] = useState<{
    username: string;
    email: string;
    phone: string;
    password: string;
  }>({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  // 1) Lấy danh sách user khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const res = await axios.get<User[]>(`${API}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  // 2) Xóa user
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
    try {
      const token = localStorage.getItem('token') || '';
      const res = await axios.delete<{ message?: string }>(
        `${API}/api/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || 'Xóa thành công');
      setUsers(prev => prev.filter(u => u.id !== id));
      if (editingUserId === id) {
        setEditingUserId(null);
        setEditForm({ username: '', email: '', phone: '', password: '' });
      }
    } catch (err: any) {
      console.error('Error deleting user:', err);
      alert(err.response?.data?.message || 'Xóa thất bại');
    }
  };

  // 3) Bắt sự kiện bắt đầu chỉnh (khởi tạo giá trị editForm từ user)
  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setEditForm({
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: '' // để trống, chỉ gán nếu admin muốn đổi mật khẩu
    });
  };

  // 4) Bắt onchange cho các input trong editForm
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 5) Lưu lại khi admin bấm "Lưu" (gọi API PUT)
  const handleSave = async (id: number) => {
    try {
      const token = localStorage.getItem('token') || '';
      const payload: Record<string, any> = {
        username: editForm.username,
        email: editForm.email,
        phone: editForm.phone
      };
      if (editForm.password.trim()) {
        payload.password = editForm.password;
      }

      await axios.put(
        `${API}/api/users/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(prev =>
        prev.map(u =>
          u.id === id
            ? {
                ...u,
                username: editForm.username,
                email: editForm.email,
                phone: editForm.phone
              }
            : u
        )
      );

      alert('Cập nhật thành công');
      setEditingUserId(null);
      setEditForm({ username: '', email: '', phone: '', password: '' });
    } catch (err: any) {
      console.error('Error updating user:', err.response?.data || err);
      alert('Lỗi khi lưu thay đổi: ' + (err.response?.data?.message || ''));
    }
  };

  // 6) Hủy chỉnh sửa
  const handleCancel = () => {
    setEditingUserId(null);
    setEditForm({ username: '', email: '', phone: '', password: '' });
  };

  return (
    <Container>
      <h2>Quản Lý User</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Mật khẩu mới</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <React.Fragment key={u.id}>
              {editingUserId === u.id ? (
                // ========== DÒNG ĐANG CHẾ ĐỘ "SỬA" ========== 
                <tr>
                  <td>{u.id}</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleEditChange}
                      className="inline-input"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="inline-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      className="inline-input"
                    />
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={editForm.password}
                      onChange={handleEditChange}
                      placeholder="Mật khẩu mới"
                      className="inline-input"
                    />
                  </td>
                  <td>
                    <ActionButton onClick={() => handleSave(u.id)}>
                      Lưu
                    </ActionButton>
                    <ActionButton onClick={handleCancel} $danger>
                      Hủy
                    </ActionButton>
                  </td>
                </tr>
              ) : (
                // ========== DÒNG BÌNH THƯỜNG ========== 
                <tr>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>••••••••</td>
                  <td>
                    <ActionButton onClick={() => startEditing(u)}>
                      Sửa
                    </ActionButton>
                    <ActionButton $danger onClick={() => handleDelete(u.id)}>
                      Xóa
                    </ActionButton>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// ============= Styled Components =============
const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 12px;
    border: 1px solid #dee2e6;
    text-align: center;
  }
  th {
    background: #f1f1f1;
  }
  tr:nth-child(even) {
    background: #fafafa;
  }

  /* Style cho input inline khi đang sửa */
  .inline-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  background-color: ${({ $danger }) => ($danger ? '#dc3545' : '#007bff')};
  color: white;
  border: none;
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ $danger }) => ($danger ? '#c82333' : '#0056b3')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
