import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiPlus, HiPencil, HiTrash, HiSearch, HiEye } from 'react-icons/hi'
import { newsApi, newsCategoriesApi } from '../../services/api'

interface NewsCategory {
  _id: string
  name: string
}

interface News {
  _id: string
  id: string
  title: string
  slug: string
  shortDescription: string
  featuredImage: string
  author: string
  category: string | NewsCategory
  tags: string[]
  views: number
  publishedAt: string
  isPublished: boolean
  isFeatured: boolean
  order: number
}

export default function News() {
  const navigate = useNavigate()
  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterPublished, setFilterPublished] = useState<string>('all')

  useEffect(() => {
    fetchCategories()
    fetchNews()
  }, [page, searchQuery, filterCategory, filterPublished])

  const fetchCategories = async () => {
    try {
      const response = await newsCategoriesApi.getAll()
      if (response.success) {
        const responseData = response.data as any
        if (Array.isArray(responseData)) {
          setCategories(responseData)
        } else if (responseData?.data && Array.isArray(responseData.data)) {
          setCategories(responseData.data)
        } else {
          setCategories([])
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await newsApi.getAll({
        page,
        limit: 12,
        category: filterCategory !== 'all' ? filterCategory : undefined,
        isPublished: filterPublished !== 'all' ? filterPublished === 'published' : undefined,
        search: searchQuery || undefined,
      })

      if (response.success) {
        let newsData = []
        let totalPagesData = 1
        const responseData = response.data as any
        
        if (Array.isArray(responseData)) {
          newsData = responseData
        } else if (responseData && Array.isArray(responseData.data)) {
          newsData = responseData.data
          totalPagesData = responseData.pages || (response as any).pages || 1
        } else {
          newsData = []
        }
        
        totalPagesData = (response as any).pages || responseData?.pages || 1
        
        // Map _id to id for consistency
        newsData = newsData.map((item: any) => ({
          ...item,
          id: item._id || item.id,
        }))
        
        setNews(newsData)
        setTotalPages(totalPagesData)
      } else {
        console.error('API Error:', response.message || response.error)
        setNews([])
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin tức này?')) return

    try {
      const response = await newsApi.delete(id)
      if (response.success) {
        fetchNews()
      } else {
        alert(response.message || 'Có lỗi xảy ra khi xóa tin tức')
      }
    } catch (error) {
      console.error('Error deleting news:', error)
      alert('Có lỗi xảy ra khi xóa tin tức')
    }
  }

  const getCategoryName = (category: string | NewsCategory) => {
    if (typeof category === 'object' && category.name) {
      return category.name
    }
    if (typeof category === 'string') {
      const found = categories.find(c => c._id === category)
      return found?.name || category
    }
    return ''
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý tin tức</h1>
        <Link
          to="/news/new"
          className="flex items-center gap-2 bg-[#00652E] text-white px-4 py-2 rounded-lg hover:bg-[#005a28] transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          <span>Thêm tin tức</span>
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
                placeholder="Tìm kiếm tin tức..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
            </div>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Không có tin tức nào</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                {/* Featured Image */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={item.featuredImage || '/placeholder.png'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.png'
                    }}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.isFeatured && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500 text-white">
                        Nổi bật
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.isPublished
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {item.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </div>
                </div>

                {/* News Info */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Category */}
                  {item.category && (
                    <div className="mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getCategoryName(item.category)}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  {item.shortDescription && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">
                      {item.shortDescription}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pt-3 border-t border-gray-100">
                    <span>{item.author || 'Tấn Phát Food'}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <HiEye className="w-4 h-4" />
                        {item.views || 0}
                      </span>
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/news/${item.id}/edit`)}
                      className="p-2 text-[#00652E] hover:bg-green-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

