import { useEffect, useState } from 'react'
import { HiTrash, HiEye, HiSearch, HiMail, HiPhone, HiOfficeBuilding } from 'react-icons/hi'
import { quotesApi } from '../../services/api'

interface Quote {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  product?: {
    _id: string
    name: string
    slug: string
    image?: string
    type: string
  }
  productName?: string
  message?: string
  quantity?: string
  country?: string
  status: 'pending' | 'contacted' | 'quoted' | 'closed' | 'cancelled'
  notes?: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

const statusLabels: Record<string, string> = {
  pending: 'Chờ xử lý',
  contacted: 'Đã liên hệ',
  quoted: 'Đã báo giá',
  closed: 'Đã đóng',
  cancelled: 'Đã hủy',
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  quoted: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterRead, setFilterRead] = useState<string>('all')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchQuotes()
  }, [page, searchQuery, filterStatus, filterRead])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const params: any = {
        page,
        limit: 15,
        search: searchQuery || undefined,
      }
      if (filterStatus !== 'all') {
        params.status = filterStatus
      }
      if (filterRead !== 'all') {
        params.isRead = filterRead === 'true'
      }

      const response = await quotesApi.getAll(params)

      if (response.success) {
        const responseData = response.data as any
        const rawQuotes = Array.isArray(responseData)
          ? responseData
          : (responseData?.data && Array.isArray(responseData.data))
          ? responseData.data
          : []
        const quotesData = rawQuotes.map((q: any) => ({ id: q._id, ...q }))
        setQuotes(quotesData)
        setTotalPages((response as any).pages || responseData?.pages || 1)
        setTotalCount((response as any).total || responseData?.total || rawQuotes.length)
      } else {
        console.error('API Error:', response.message || response.error)
        setQuotes([])
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa yêu cầu báo giá này?')) return

    try {
      const response = await quotesApi.delete(id)
      if (response.success) {
        fetchQuotes()
      }
    } catch (error) {
      console.error('Error deleting quote:', error)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await quotesApi.markAsRead(id)
      if (response.success) {
        fetchQuotes()
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleView = (quote: Quote) => {
    setSelectedQuote(quote)
    setShowModal(true)
    if (!quote.isRead) {
      handleMarkAsRead(quote.id)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await quotesApi.update(id, { status })
      if (response.success) {
        fetchQuotes()
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote({ ...selectedQuote, status: status as any })
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý yêu cầu báo giá</h1>
        <span className="text-sm text-gray-500">Tổng: {totalCount} yêu cầu</span>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value)
            setPage(1)
          }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="quoted">Đã báo giá</option>
          <option value="closed">Đã đóng</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterRead}
          onChange={(e) => {
            setFilterRead(e.target.value)
            setPage(1)
          }}
        >
          <option value="all">Tất cả</option>
          <option value="false">Chưa đọc</option>
          <option value="true">Đã đọc</option>
        </select>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : quotes.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="px-2 py-2 w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-sm font-semibold text-gray-600 p-2">Khách hàng</th>
                  <th className="text-sm font-semibold text-gray-600">Liên hệ</th>
                  <th className="text-sm font-semibold text-gray-600">Sản phẩm</th>
                  <th className="text-sm font-semibold text-gray-600">Quốc gia</th>
                  <th className="text-sm font-semibold text-gray-600">Ngày gửi</th>
                  <th className="text-sm font-semibold text-gray-600">Trạng thái</th>
                  <th className="text-center text-sm font-semibold text-gray-600 w-24">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className={`hover:bg-gray-50 border-b border-gray-100 ${
                      !quote.isRead ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        {!quote.isRead && (
                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{quote.name}</p>
                          {quote.company && (
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <HiOfficeBuilding className="w-3 h-3" />
                              {quote.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-2'>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-700 flex items-center gap-1">
                          <HiMail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="truncate max-w-[180px]">{quote.email}</span>
                        </p>
                        {quote.phone && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <HiPhone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            {quote.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      {quote.productName ? (
                        <span className="text-sm text-gray-700">{quote.productName}</span>
                      ) : (
                        <span className="text-sm text-gray-400 italic">—</span>
                      )}
                    </td>
                    <td>
                      {quote.country ? (
                        <span className="text-sm text-gray-700">{quote.country}</span>
                      ) : (
                        <span className="text-sm text-gray-400 italic">—</span>
                      )}
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">{formatDate(quote.createdAt)}</span>
                    </td>
                    <td>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[quote.status] || statusColors.pending
                        }`}
                      >
                        {statusLabels[quote.status] || quote.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(quote)}
                          className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50"
                          title="Xem chi tiết"
                        >
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(quote.id)}
                          className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50"
                          title="Xóa"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Trang {page} / {totalPages}
              </span>
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  «
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        className={`join-item btn btn-sm ${page === pageNum ? 'btn-active' : ''}`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={i} className="join-item btn btn-sm btn-disabled">
                        ...
                      </span>
                    )
                  }
                  return null
                })}
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Không có yêu cầu báo giá nào được tìm thấy.
        </div>
      )}

      {/* Modal for viewing quote details */}
      {showModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Chi tiết yêu cầu báo giá</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Tên khách hàng</label>
                  <p className="text-gray-900">{selectedQuote.name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedQuote.email}</p>
                </div>

                {selectedQuote.phone && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                    <p className="text-gray-900">{selectedQuote.phone}</p>
                  </div>
                )}

                {selectedQuote.company && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Công ty</label>
                    <p className="text-gray-900">{selectedQuote.company}</p>
                  </div>
                )}

                {selectedQuote.country && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Quốc gia</label>
                    <p className="text-gray-900">{selectedQuote.country}</p>
                  </div>
                )}

                {selectedQuote.productName && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Sản phẩm</label>
                    <p className="text-gray-900">{selectedQuote.productName}</p>
                  </div>
                )}

                {selectedQuote.quantity && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Số lượng</label>
                    <p className="text-gray-900">{selectedQuote.quantity}</p>
                  </div>
                )}

                {selectedQuote.message && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Tin nhắn</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.message}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-700">Trạng thái</label>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateStatus(selectedQuote.id, e.target.value)}
                    className="select select-bordered w-full mt-1"
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="contacted">Đã liên hệ</option>
                    <option value="quoted">Đã báo giá</option>
                    <option value="closed">Đã đóng</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Ghi chú</label>
                  <textarea
                    value={selectedQuote.notes || ''}
                    onChange={(e) => {
                      setSelectedQuote({ ...selectedQuote, notes: e.target.value })
                    }}
                    onBlur={async () => {
                      await quotesApi.update(selectedQuote.id, { notes: selectedQuote.notes })
                    }}
                    className="textarea textarea-bordered w-full mt-1"
                    rows={3}
                    placeholder="Thêm ghi chú..."
                  />
                </div>

                <div className="text-sm text-gray-500">
                  <p>Ngày gửi: {formatDate(selectedQuote.createdAt)}</p>
                  {selectedQuote.updatedAt !== selectedQuote.createdAt && (
                    <p>Cập nhật: {formatDate(selectedQuote.updatedAt)}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="button-secondary flex-1"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
