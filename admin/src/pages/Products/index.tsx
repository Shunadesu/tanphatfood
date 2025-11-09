import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi'
import { productsApi } from '../../services/api'

interface Product {
  id: string
  title: string
  description: string
  image: string
  type: 'fresh' | 'dried' | 'powder'
  category: string | null | undefined
  isActive: boolean
  isFeatured: boolean
  slug?: string
  note?: string
}

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    fetchProducts()
  }, [page, searchQuery, filterType])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productsApi.getAll({
        page,
        limit: 10,
        type: filterType !== 'all' ? filterType : undefined,
        search: searchQuery || undefined,
      })

      if (response.success) {
        // Backend response structure: { success: true, data: [...], pages: 1, total: 1, ... }
        // The apiCall function returns the entire backend response directly
        // So response.data is the array of products, response.pages is total pages
        let productsData = []
        let totalPagesData = 1
        
        // Handle different response structures
        const responseData = response.data as any
        if (Array.isArray(responseData)) {
          // Direct array
          productsData = responseData
        } else if (responseData && Array.isArray(responseData.data)) {
          // Nested structure: { data: { data: [...] } }
          productsData = responseData.data
          totalPagesData = responseData.pages || (response as any).pages || 1
        } else {
          productsData = []
        }
        
        totalPagesData = (response as any).pages || responseData?.pages || 1
        
        console.log('Setting products:', productsData.length, 'items')
        setProducts(productsData)
        setTotalPages(totalPagesData)
      } else {
        console.error('API Error:', response.message || response.error)
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return

    try {
      const response = await productsApi.delete(id)
      if (response.success) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      fresh: 'Trái cây tươi',
      dried: 'Trái cây sấy',
      powder: 'Bột trái cây',
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      fresh: 'bg-green-100 text-green-800',
      dried: 'bg-orange-100 text-orange-800',
      powder: 'bg-purple-100 text-purple-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <Link
          to="/products/new"
          className="flex items-center gap-2 bg-[#00652E] text-white px-4 py-2 rounded-lg hover:bg-[#005a28] transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          <span>Thêm sản phẩm</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
            >
              <option value="all">Tất cả loại</option>
              <option value="fresh">Trái cây tươi</option>
              <option value="dried">Trái cây sấy</option>
              <option value="powder">Bột trái cây</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Không có sản phẩm nào</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.png'
                    }}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.isActive
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {product.isActive ? 'Hoạt động' : 'Tạm khóa'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Type Badge */}
                  <div className="mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(product.type)}`}>
                      {getTypeLabel(product.type)}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Product Description */}
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="p-2 text-[#00652E] hover:bg-green-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Trước
              </button>
              <span className="text-gray-700">
                Trang {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

