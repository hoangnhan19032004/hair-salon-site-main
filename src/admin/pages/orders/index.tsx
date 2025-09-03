import { Routes, Route } from 'react-router-dom';

import OrdersList from './OrdersList';
import OrderForm  from './OrderForm';

/**
 * Nested routes cho /admin/orders
 *
 *  - /admin/orders            → danh sách đơn hàng
 *  - /admin/orders/new        → thêm đơn
 *  - /admin/orders/:id/edit   → sửa đơn
 */
export default function OrdersRoutes() {
  return (
    <Routes>
      <Route index          element={<OrdersList />} />
      <Route path="new"     element={<OrderForm />} />
      <Route path=":id/edit" element={<OrderForm edit />} />
    </Routes>
  );
}
