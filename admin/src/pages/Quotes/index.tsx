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
        limit: 20,
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
        const quotesData = Array.isArray(responseData)
          ? responseData
          : (responseData?.data && Array.isArray(responseData.data))
          ? responseData.data
          : []
        setQuotes(quotesData)
        setTotalPages((response as any).pages || responseData?.pages || 1)
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
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý yêu cầu báo giá</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại, công ty..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
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
          onChange={(e) => setFilterRead(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="false">Chưa đọc</option>
          <option value="true">Đã đọc</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      ) : quotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col border-l-4 ${
                !quote.isRead ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
                    {quote.name}
                  </h3>
                  {!quote.isRead && (
                    <span className="ml-2 px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                      Mới
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <HiMail className="w-4 h-4 text-gray-400" />
                    <span className="line-clamp-1">{quote.email}</span>
                  </div>
                  {quote.phone && (
                    <div className="flex items-center gap-2">
                      <HiPhone className="w-4 h-4 text-gray-400" />
                      <span>{quote.phone}</span>
                    </div>
                  )}
                  {quote.company && (
                    <div className="flex items-center gap-2">
                      <HiOfficeBuilding className="w-4 h-4 text-gray-400" />
                      <span className="line-clamp-1">{quote.company}</span>
                    </div>
                  )}
                </div>

                {quote.productName && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Sản phẩm:</p>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {quote.productName}
                    </p>
                  </div>
                )}

                {quote.message && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Tin nhắn:</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{quote.message}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{formatDate(quote.createdAt)}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[quote.status] || statusColors.pending
                    }`}
                  >
                    {statusLabels[quote.status] || quote.status}
                  </span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleView(quote)}
                    className="button-info button-sm flex-1 inline-flex items-center justify-center gap-1"
                  >
                    <HiEye className="w-4 h-4" />
                    Xem
                  </button>
                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="button-danger button-sm flex-1 inline-flex items-center justify-center gap-1"
                  >
                    <HiTrash className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Không có yêu cầu báo giá nào được tìm thấy.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn ${page === i + 1 ? 'btn-active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              »
            </button>
          </div>
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

