// src/admin/pages/staff/index.tsx
import { Routes, Route } from 'react-router-dom';
import StaffList   from './StaffList';
import StaffForm   from './StaffForm';

export default function StaffRoutes() {
  return (
    <Routes>
      <Route index            element={<StaffList />} />
      <Route path="new"        element={<StaffForm />} />
      <Route path=":id/edit"   element={<StaffForm />} />
    </Routes>
  );
}
