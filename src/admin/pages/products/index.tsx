import { Routes, Route } from 'react-router-dom';

import ProductList    from './ProductList';
import ProductForm    from './ProductForm';
import ProductHistory from './ProductHistory';

/**
 * Nested routes cho /admin/products
 *
 *  - /admin/products              → list sản phẩm
 *  - /admin/products/new          → thêm mới
 *  - /admin/products/:id/edit     → chỉnh sửa
 *  - /admin/products/history      → lịch sử chỉnh sửa
 */
export default function ProductsRoutes() {
  return (
    <Routes>
      <Route index             element={<ProductList />} />
      <Route path="new"        element={<ProductForm />} />
      <Route path=":id/edit"   element={<ProductForm edit />} />
      <Route path="history"    element={<ProductHistory />} />
    </Routes>
  );
}
