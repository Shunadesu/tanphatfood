import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPlus, HiPencil, HiTrash, HiSearch, HiPhotograph } from 'react-icons/hi'
import { bannersApi } from '../../services/api'

interface Banner {
  id: string
  name: string
  slug: string
  image: string
  page: string
  title?: string
  subtitle?: string
  order: number
  isActive: boolean
  createdAt: string
}

const pageLabels: Record<string, string> = {
  home: 'Trang chủ',
  about: 'Giới thiệu',
  products: 'Sản phẩm',
  'products-fresh': 'Trái cây tươi',
  'products-dried': 'Trái cây sấy',
  'products-powder': 'Bột trái cây',
  handbook: 'Cẩm nang',
  contact: 'Liên hệ',
  news: 'Tin tức',
}

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPage, setFilterPage] = useState<string>('all')
  const [filterActive, setFilterActive] = useState<string>('all')

  useEffect(() => {
    fetchBanners()
  }, [searchQuery, filterPage, filterActive])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const params: any = {}
      
      // Only add isActive if not 'all'
      if (filterActive !== 'all') {
        params.isActive = filterActive === 'true'
      }
      
      // Only add page if not 'all'
      if (filterPage !== 'all') {
        params.page = filterPage
      }

      const response = await bannersApi.getAll(params)
      
      console.log('Banners API Response:', response) // Debug log

      if (response.success) {
        let bannersData: Banner[] = []
        
        // Backend returns: { success: true, count: number, data: Banner[] }
        // Backend now transforms _id to id, so response.data should be an array with id field
        if (response.data && Array.isArray(response.data)) {
          bannersData = response.data
          console.log('Banners data (array):', bannersData.length, 'items')
        } else if (response.data && typeof response.data === 'object') {
          // Fallback: check if data is nested
          const data = (response.data as any).data || response.data
          if (Array.isArray(data)) {
            bannersData = data
            console.log('Banners data (nested):', bannersData.length, 'items')
          } else {
            console.warn('Unexpected data structure:', response.data)
          }
        } else {
          console.warn('No banners data in response:', response)
        }

        // Ensure id field exists (backend should provide it, but just in case)
        bannersData = bannersData.map((banner: any) => ({
          ...banner,
          id: banner.id || banner._id?.toString() || banner._id,
        }))

        // Filter by search query if provided (client-side filter)
        if (searchQuery.trim()) {
          bannersData = bannersData.filter(
            (banner) =>
              banner.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              banner.page?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (banner.title && banner.title.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        }

        console.log('Final banners to display:', bannersData.length, 'items')
        setBanners(bannersData)
      } else {
        console.error('API Error:', response.message || response.error)
        alert(`Lỗi khi tải banners: ${response.message || response.error || 'Unknown error'}`)
        setBanners([])
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
      setBanners([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa banner này?')) return

    try {
      const response = await bannersApi.delete(id)
      if (response.success) {
        alert('Xóa banner thành công!')
        fetchBanners()
      } else {
        alert(response.message || response.error || 'Lỗi khi xóa banner')
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      alert('Lỗi khi xóa banner')
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Banner</h1>
        <Link
          to="/banners/new"
          className="button-primary inline-flex items-center gap-2"
        >
          <HiPlus className="w-5 h-5" />
          Thêm banner mới
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, trang, tiêu đề..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterPage}
          onChange={(e) => setFilterPage(e.target.value)}
        >
          <option value="all">Tất cả trang</option>
          <option value="home">Trang chủ</option>
          <option value="about">Giới thiệu</option>
          <option value="products">Sản phẩm</option>
          <option value="products-fresh">Trái cây tươi</option>
          <option value="products-dried">Trái cây sấy</option>
          <option value="products-powder">Bột trái cây</option>
          <option value="handbook">Cẩm nang</option>
          <option value="contact">Liên hệ</option>
          <option value="news">Tin tức</option>
        </select>

        <select
          className="select select-bordered w-full md:w-auto"
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="true">Đang hoạt động</option>
          <option value="false">Đã tắt</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      ) : banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Banner Image */}
              <div className="relative w-full h-48 bg-gray-200">
                <img
                  src={banner.image}
                  alt={banner.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder.jpg'
                  }}
                />
                {!banner.isActive && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Đã tắt
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {banner.name}
                </h3>
                <div className="space-y-2 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <HiPhotograph className="w-4 h-4 text-gray-400" />
                    <span>Trang: {pageLabels[banner.page] || banner.page}</span>
                  </div>
                  {banner.title && (
                    <p className="text-sm text-gray-600 line-clamp-1">Tiêu đề: {banner.title}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Thứ tự: {banner.order}</span>
                    <span>{formatDate(banner.createdAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/banners/${banner.id}/edit`}
                    className="button-secondary button-sm flex-1 inline-flex items-center justify-center gap-1"
                  >
                    <HiPencil className="w-4 h-4" />
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(banner.id)}
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
          Không có banner nào được tìm thấy.
        </div>
      )}
    </div>
  )
}

