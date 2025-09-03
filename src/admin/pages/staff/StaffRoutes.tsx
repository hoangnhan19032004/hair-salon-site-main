import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StaffList from './StaffList';
import StaffForm, { Staff } from './StaffForm';

const API = import.meta.env.VITE_API_URL as string;

export default function StaffRoutes() {
  // Hàm reload lại trang hiện tại
  const navigate = useNavigate();
  const refresh = () => navigate(0);

  // Sử dụng useState để lưu trữ thông tin nhân viên cần chỉnh sửa
  const [editData, setEditData] = useState<Staff | null>(null);

  // Lấy id từ URL để fetch dữ liệu nhân viên cho phần sửa
  const { id } = useParams();

  // Lấy dữ liệu nhân viên khi vào trang sửa
  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/api/staff/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          setEditData(response.data);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu nhân viên', error);
        });
    }
  }, [id]);

  // Component thêm mới nhân viên
  const NewStaff = () => (
    <StaffForm close={() => navigate('/admin/staff')} refresh={refresh} />
  );

  // Component sửa nhân viên
  const EditStaff = () => {
    if (!editData) {
      return <div>Đang tải dữ liệu nhân viên...</div>; // Thêm thông báo khi dữ liệu chưa được tải xong
    }

    return (
      <StaffForm
        editData={editData}  // Truyền dữ liệu nhân viên vào form
        close={() => navigate('/admin/staff')}
        refresh={refresh}
      />
    );
  };

  return (
    <Routes>
      <Route index element={<StaffList />} />
      <Route path="new" element={<NewStaff />} />
      <Route path=":id/edit" element={<EditStaff />} />
    </Routes>
  );
}
