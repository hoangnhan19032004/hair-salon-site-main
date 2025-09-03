// src/admin/pages/OrderForm.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

interface OrderData {
  totalAmount: number;
  note: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
}

export default function OrderForm({ edit }: { edit?: boolean }) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<OrderData>({
    totalAmount: 0,
    note: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (edit && id) {
      setLoading(true);
      api.get(`/api/orders/${id}`)
        .then(res => {
          const data = res.data;
          setForm({
            totalAmount: data.totalAmount ?? 0,
            note: data.note ?? '',
            status: data.status as OrderData['status'],
          });
        })
        .catch(() => setErr('❌ Lỗi khi tải dữ liệu đơn hàng'))
        .finally(() => setLoading(false));
    }
  }, [edit, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'totalAmount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      if (edit && id) {
        // Chỉ cập nhật note và status
        await api.put(`/api/orders/${id}`, {
          note: form.note,
          status: form.status,
        });
      } else {
        // Tạo mới: cần tối thiểu xác định totalAmount và note
        await api.post('/api/orders', {
          totalAmount: form.totalAmount,
          note: form.note,
          items: [], // Hoặc bỏ hẳn nếu tạo mới không qua form này
        });
      }
      navigate('/admin/orders');
    } catch {
      setErr('❌ Lỗi khi lưu đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="mb-4">
        {edit ? '✏️ Sửa đơn hàng' : '➕ Tạo đơn hàng'}
      </h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={handleSubmit}>
        {!edit && (
          <div className="mb-4">
            <label className="form-label">Tổng tiền</label>
            <input
              type="number"
              name="totalAmount"
              value={form.totalAmount}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="form-label">Ghi chú</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            className="form-control"
            rows={3}
          />
        </div>

        {edit && (
          <div className="mb-4">
            <label className="form-label">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Pending">Chờ duyệt</option>
              <option value="Approved">Đã duyệt</option>
              <option value="Cancelled">Đã huỷ</option>
            </select>
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : '💾 Lưu'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/orders')}
            disabled={loading}
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}
