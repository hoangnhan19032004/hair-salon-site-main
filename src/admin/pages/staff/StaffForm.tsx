import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStaffById, createStaff, updateStaffById } from '../../api';

interface IForm {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export default function StaffForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState<IForm>({ username: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    fetchStaffById(id!).then(res => {
      setForm({
        username: res.data.name,
        email: res.data.email,
        password: '',
        phone: res.data.phone || ''
      });
    }).catch(() => {
      alert('Không tải được thông tin nhân viên');
      nav('..');
    }).finally(() => setLoading(false));
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const payload: any = { username: form.username, email: form.email, phone: form.phone };
        if (form.password) payload.password = form.password;
        await updateStaffById(id!, payload);
      } else {
        await createStaff({
          username: form.username,
          email: form.email,
          password: form.password,
          phone: form.phone
        });
      }
      nav('..', { replace: true });
    } catch {
      alert(isEdit ? 'Cập nhật thất bại' : 'Tạo mới thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>{isEdit ? 'Sửa nhân viên' : 'Thêm mới nhân viên'}</h3>
      {loading && <p>⏳ Đang tải...</p>}
      <form onSubmit={onSubmit} className="w-50">
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" required className="form-control" value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label>Mật khẩu {isEdit ? '(để trống nếu không đổi)' : ''}</label>
          <input name="password" type="password" {...(!isEdit && { required: true })} className="form-control" value={form.password} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label>Họ tên</label>
          <input name="username" required className="form-control" value={form.username} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input name="phone" required className="form-control" value={form.phone} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => nav('..')} disabled={loading}>
          Hủy
        </button>
      </form>
    </div>
  );
}
