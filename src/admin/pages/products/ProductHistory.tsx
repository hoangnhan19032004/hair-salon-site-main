// src/pages/admin/ProductHistory.tsx
import React, { useEffect, useState } from 'react';
import { fetchProductHistory } from '../../api';

interface Log {
  id: number;
  productId: number;
  productName: string;
  action: string;
  user: string;
  at: string;
}

export default function ProductHistory() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    fetchProductHistory()
      .then(r => setLogs(r.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <h4>🕑 Lịch sử chỉnh sửa sản phẩm</h4>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>SP</th>
            <th>User</th>
            <th>Hành động</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.productName}</td>
              <td>{l.user}</td>
              <td>{l.action}</td>
              <td>{new Date(l.at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
