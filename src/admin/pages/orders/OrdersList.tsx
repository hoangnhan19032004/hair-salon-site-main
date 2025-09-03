// src/admin/pages/orders/OrdersList.tsx
import React, { useEffect, useState } from 'react'
import { fetchAllOrders, approveOrder, rejectOrder, type OrderOverview } from '../../api'

/** 
 * Dùng luôn type OrderOverview bên api.ts, không tự định nghĩa lại.
 * OrderOverview phải gồm đầy đủ: orderId, username, userEmail, userPhone, productName, quantity, totalAmount, note, status, createdAt
 */

/** 
 * Sau khi gộp, mỗi đơn sẽ có một bản ghi duy nhất với nhiều sản phẩm
 */
interface GroupedOrder {
  orderId: number
  username: string
  userEmail: string
  userPhone: string
  items: { productName: string; quantity: number }[]
  totalAmount: number
  note: string
  status: string
  createdAt: string
}

export default function OrdersList() {
  const [orders, setOrders] = useState<GroupedOrder[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetchAllOrders()    // GET /api/orders/all
      const data: OrderOverview[] = res.data

      // Gộp theo orderId
      const map = new Map<number, GroupedOrder>()
      data.forEach(o => {
        if (!map.has(o.orderId)) {
          map.set(o.orderId, {
            orderId:     o.orderId,
            username:    o.username ?? '',
            userEmail:   o.userEmail ?? '',
            userPhone:   o.userPhone ?? '',
            items:       [],
            totalAmount: o.totalAmount,
            note:        o.note ?? '',
            status:      o.status ?? '',
            createdAt:   o.createdAt ?? '',
          })
        }
        map.get(o.orderId)!.items.push({
          productName: o.productName ?? '',
          quantity:    o.quantity ?? 0,
        })
      })

      setOrders(Array.from(map.values()))
      setError('')
    } catch {
      setError('❌ Không thể tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      await approveOrder(id)
      load()
    } catch {
      alert('Duyệt đơn thất bại')
    }
  }

  const handleReject = async (id: number) => {
    try {
      await rejectOrder(id)
      load()
    } catch {
      alert('Từ chối đơn thất bại')
    }
  }

  return (
    <div>
      <h3 className="mb-4">📦 Danh sách đơn hàng</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>⏳ Đang tải...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o.orderId}>
                  <td>
                    {o.username}<br/>
                    <small>{o.userEmail}</small><br/>
                    <small>{o.userPhone}</small>
                  </td>
                  <td>
                    {o.items.map((it, i) => (
                      <div key={i}>{it.productName}</div>
                    ))}
                  </td>
                  <td>
                    {o.items.map((it, i) => (
                      <div key={i}>{it.quantity}</div>
                    ))}
                  </td>
                  <td>{new Date(o.createdAt).toLocaleString('vi-VN')}</td>
                  <td>{o.totalAmount.toLocaleString('vi-VN')}đ</td>
                  <td>{o.note || '(Không có)'}</td>
                  <td>
                    <span className={`badge bg-${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="d-flex gap-1">
                    {o.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(o.orderId)}
                          className="btn btn-sm btn-success"
                        >
                          ✅ Duyệt
                        </button>
                        <button
                          onClick={() => handleReject(o.orderId)}
                          className="btn btn-sm btn-danger"
                        >
                          ❌ Từ chối
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Approved':  return 'success'
    case 'Pending':   return 'secondary'
    case 'Rejected':
    case 'Cancelled': return 'danger'
    default:          return 'light'
  }
}
