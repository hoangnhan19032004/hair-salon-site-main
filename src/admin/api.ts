import axios, { AxiosResponse } from 'axios'

// base URL (có thể override bằng .env)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// tạo client chung, tự động gắn JSON header + token
const client = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// interceptor tự gắn token nếu có
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/** ====== STAFF ====== */
export interface Staff {
  id: string
  username: string
  email: string
  phone: string
}
export function fetchStaff(): Promise<AxiosResponse<Staff[]>> {
  return client.get('/api/staff')
}
export function fetchStaffById(id: string): Promise<AxiosResponse<Staff>> {
  return client.get(`/api/staff/${id}`)
}
export function createStaff(data: {
  username: string
  email: string
  password: string
  phone: string
}): Promise<AxiosResponse<Staff>> {
  return client.post('/api/staff', data)
}
export function updateStaffById(
  id: string,
  data: { username?: string; email?: string; phone?: string; password?: string }
): Promise<AxiosResponse<Staff>> {
  return client.put(`/api/staff/${id}`, data)
}
export function deleteStaff(id: string): Promise<AxiosResponse<void>> {
  return client.delete(`/api/staff/${id}`)
}

/** ====== USERS ====== */
export function fetchUsers(): Promise<AxiosResponse<any[]>> {
  return client.get('/api/users')
}
export function fetchUser(id: string): Promise<AxiosResponse<any>> {
  return client.get(`/api/users/${id}`)
}
export function updateUser(
  id: string,
  data: { username?: string; email?: string; phone?: string; password?: string }
): Promise<AxiosResponse<any>> {
  return client.put(`/api/users/${id}`, data)
}
export function deleteUser(id: string): Promise<AxiosResponse<void>> {
  return client.delete(`/api/users/${id}`)
}

/** ====== PRODUCTS ====== */
export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
}
export type ProductInput = Partial<Omit<Product, 'id'>>
export function fetchProducts(): Promise<AxiosResponse<Product[]>> {
  return client.get('/api/products')
}
export function fetchProductById(id: string): Promise<AxiosResponse<Product>> {
  return client.get(`/api/products/${id}`)
}
export function createProduct(data: ProductInput): Promise<AxiosResponse<{ id: number }>> {
  return client.post('/api/products', data)
}
export function updateProduct(
  id: string,
  data: ProductInput
): Promise<AxiosResponse<Product>> {
  return client.put(`/api/products/${id}`, data)
}
export function deleteProduct(id: string): Promise<AxiosResponse<void>> {
  return client.delete(`/api/products/${id}`)
}

/** ====== PRODUCT HISTORY ====== */
export interface ProductLog {
  id: number
  productId: number
  productName: string
  action: string
  user: string
  at: string
}
export function fetchProductHistory(): Promise<AxiosResponse<ProductLog[]>> {
  return client.get('/api/products/history')
}

/** ====== CART ====== */
export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}
export function fetchCart(): Promise<AxiosResponse<CartItem[]>> {
  return client.get('/api/cart')
}
export function saveCart(cart: CartItem[]): Promise<AxiosResponse<void>> {
  return client.put('/api/cart', cart)
}

/** ====== ORDER (USER) ====== */
export interface OrderItem {
  orderId: number
  itemId: number
  productName: string
  quantity: number
  unitPrice: number
  totalAmount: number
  createdAt: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
}

export function createOrder(payload: {
  name: string
  email: string
  phone: string
  address: string
  city: string
  note?: string
  items: CartItem[]
}): Promise<AxiosResponse<{ orderId: number }>> {
  return client.post('/api/orders', payload)
}

export function fetchOrders(): Promise<AxiosResponse<OrderItem[]>> {
  return client.get('/api/orders')
}

export function cancelOrder(orderId: number): Promise<AxiosResponse<{ message: string }>> {
  return client.patch(`/api/orders/${orderId}/cancel`)
}

/** ====== ADMIN / STAFF ORDER MANAGEMENT ====== */
export interface OrderOverview {
  orderId: number
  userId: number
  username?: string
  userEmail:  string
  userPhone:  string
  productName?: string
  quantity?: number
  totalAmount: number
  note?: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  createdAt: string
}

// Lấy tất cả đơn hàng (admin/staff)
// → GET /api/orders/all
export function fetchAllOrders(): Promise<AxiosResponse<OrderOverview[]>> {
  return client.get('/api/orders/all')
}

// Duyệt đơn hàng (admin/staff)
// → PATCH /api/orders/:id/duyet
export function approveOrder(orderId: number): Promise<AxiosResponse<{ message: string }>> {
  return client.patch(`/api/orders/${orderId}/duyet`)
}

// Từ chối đơn hàng (admin/staff)
// → PATCH /api/orders/:id/tuchoi
export function rejectOrder(orderId: number): Promise<AxiosResponse<{ message: string }>> {
  return client.patch(`/api/orders/${orderId}/tuchoi`)
}

/** ====== DEFAULT EXPORT ====== */
export default client