// src/pages/admin/ProductForm.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState }       from 'react';
import { fetchProductById, createProduct, updateProduct } from '../../api';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductForm({ edit }: { edit?: boolean }) {
  const nav    = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [f, setF] = useState<FormData>({ name:'', price:0, imageUrl:'' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && id) {
      fetchProductById(id)
        .then(res => {
          const { name, price, imageUrl } = res.data;
          setF({ name, price, imageUrl });
        })
        .catch(err => {
          console.error(err);
          toast.error('Không tải được thông tin sản phẩm.');
        });
    }
  }, [edit, id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (edit && id) {
        await updateProduct(id, f);
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        await createProduct(f);
        toast.success('Đã thêm sản phẩm thành công!');
      }
      nav('/admin/products');
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || 'Lỗi server';
      toast.error('Thao tác thất bại: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h4>{edit ? '✏️ Sửa' : '➕ Thêm'} sản phẩm</h4>
      <form onSubmit={save}>
        <label>Tên</label>
        <input
          className="form-control mb-2"
          value={f.name}
          onChange={e => setF({ ...f, name: e.target.value })}
          required
        />

        <label>Giá</label>
        <input
          type="number"
          className="form-control mb-2"
          value={f.price}
          onChange={e => setF({ ...f, price: +e.target.value })}
          required
        />

        <label>URL hình</label>
        <input
          className="form-control mb-3"
          value={f.imageUrl}
          onChange={e => setF({ ...f, imageUrl: e.target.value })}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? edit ? 'Đang cập nhật…' : 'Đang tạo…'
            : edit ? 'Cập nhật'       : 'Tạo'}
        </button>
      </form>
    </div>
  );
}
