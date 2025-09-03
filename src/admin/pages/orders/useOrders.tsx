import axios from 'axios';

// Lấy API URL từ môi trường
const API = import.meta.env.VITE_API_URL || '';

// Hàm tạo header với token
function authHeader() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Không tìm thấy token. Vui lòng đăng nhập.');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
}

// Hook sử dụng để quản lý đơn hàng
export function useOrders() {
  // Lấy tất cả đơn hàng
  async function getAll(): Promise<any[]> {
    try {
      const res = await axios.get(`${API}/api/orders`, authHeader());
      return res.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng', error);
      throw error;
    }
  }

  // Lấy đơn hàng theo ID
  async function getById(id: number): Promise<any> {
    try {
      const res = await axios.get(`${API}/api/orders/${id}`, authHeader());
      return res.data;
    } catch (error) {
      console.error(`Lỗi khi lấy đơn hàng với ID: ${id}`, error);
      throw error;
    }
  }

  // Tạo mới đơn hàng (dùng cho checkout)
  async function create(order: any): Promise<any> {
    try {
      const res = await axios.post(`${API}/api/orders`, order, authHeader());
      return res.data;
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng', error);
      throw error;
    }
  }

  // Cập nhật trạng thái, ghi chú đơn hàng
  async function update(id: number, order: any): Promise<any> {
    try {
      const res = await axios.put(`${API}/api/orders/${id}`, order, authHeader());
      return res.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật đơn hàng với ID: ${id}`, error);
      throw error;
    }
  }

  // Xoá đơn hàng
  async function remove(id: number): Promise<void> {
    try {
      await axios.delete(`${API}/api/orders/${id}`, authHeader());
    } catch (error) {
      console.error(`Lỗi khi xoá đơn hàng với ID: ${id}`, error);
      throw error;
    }
  }

  // Duyệt đơn hàng
  async function approve(id: number): Promise<any> {
    try {
      const res = await axios.post(`${API}/api/orders/${id}/approve`, {}, authHeader());
      return res.data;
    } catch (error) {
      console.error(`Lỗi khi duyệt đơn hàng với ID: ${id}`, error);
      throw error;
    }
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    approve
  };
}
