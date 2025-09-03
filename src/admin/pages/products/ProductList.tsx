// src/pages/admin/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../api';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductList() {
  const [list, setList]   = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts()
      .then(res => setList(res.data))
      .catch(() => setError('Không tải được danh sách sản phẩm'));
  }, []);

  const remove = async (id: number) => {
    if (!window.confirm('Xoá sản phẩm?')) return;
    try {
      await deleteProduct(String(id));
      setList(l => l.filter(x => x.id !== id));
    } catch {
      alert('Xoá không thành công');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h4>Danh sách sản phẩm</h4>
        <Link to="new" className="btn btn-primary">➕ Thêm</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Hình</th>
            <th>Tên</th>
            <th>Giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td style={{ width: 80 }}>
                <img src={p.imageUrl} alt={p.name}
                     style={{ maxWidth:60, maxHeight:60, objectFit:'cover' }}/>
              </td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} đ</td>
              <td className="text-nowrap">
                <Link to={`${p.id}/edit`} className="btn btn-sm btn-primary me-1">Sửa</Link>
                <button onClick={() => remove(p.id)} className="btn btn-sm btn-danger">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="history">🔎 Xem lịch sử chỉnh sửa</Link>
    </>
  );
}
