import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiArrowLeft, HiX } from 'react-icons/hi'
import { bannersApi, uploadApi } from '../../services/api'

export default function BannerNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    page: 'home',
    title: '',
    subtitle: '',
    order: 0,
    isActive: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: type === 'checkbox' ? checked : value }

      // Auto-generate slug if name changes and slug is empty
      if (name === 'name' && !prev.slug) {
        updatedForm.slug = value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }
      return updatedForm
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const response = await uploadApi.uploadImage(file, 'banners')
      if (response.success && response.data?.url) {
        setFormData((prev) => ({ ...prev, image: response.data.url }))
      } else {
        alert(response.message || 'Lỗi khi upload ảnh')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Lỗi khi upload ảnh')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Basic validation
    if (!formData.name.trim() || !formData.image.trim()) {
      alert('Vui lòng nhập tên banner và upload ảnh.')
      setLoading(false)
      return
    }

    const bannerData: any = {
      name: formData.name.trim(),
      image: formData.image.trim(),
      page: formData.page,
    }

    if (formData.slug.trim()) {
      bannerData.slug = formData.slug.trim()
    }
    if (formData.title.trim()) {
      bannerData.title = formData.title.trim()
    }
    if (formData.subtitle.trim()) {
      bannerData.subtitle = formData.subtitle.trim()
    }
    bannerData.order = formData.order
    bannerData.isActive = formData.isActive

    try {
      const response = await bannersApi.create(bannerData)
      if (response.success) {
        alert('Tạo banner thành công!')
        // Navigate back and the parent component will refresh the list
        navigate('/banners')
        // Force a page reload to ensure banners are fetched
        window.location.reload()
      } else {
        alert(response.message || response.error || 'Lỗi khi tạo banner')
      }
    } catch (error) {
      console.error('Error creating banner:', error)
      alert('Lỗi khi tạo banner')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Thêm banner mới</h1>
        <Link to="/banners" className="button-secondary inline-flex items-center gap-2">
          <HiArrowLeft className="w-5 h-5" />
          Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin cơ bản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="label">
                Tên banner <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="slug" className="label">
                Slug (URL thân thiện)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Tự động tạo nếu để trống"
              />
            </div>
            <div>
              <label htmlFor="page" className="label">
                Trang hiển thị <span className="text-red-500">*</span>
              </label>
              <select
                id="page"
                name="page"
                value={formData.page}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
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
            </div>
            <div>
              <label htmlFor="order" className="label">
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tiêu đề và mô tả (tùy chọn)</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="title" className="label">
                Tiêu đề
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Tiêu đề hiển thị trên banner"
              />
            </div>
            <div>
              <label htmlFor="subtitle" className="label">
                Mô tả phụ
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Mô tả phụ hiển thị trên banner"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="label">
            Ảnh banner <span className="text-red-500">*</span>
          </label>
          {formData.image ? (
            <div className="relative w-full h-64 mb-2">
              <img src={formData.image} alt="Banner" className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-xs"
              >
                <HiX />
              </button>
            </div>
          ) : (
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
              disabled={uploadingImage}
              required
            />
          )}
          {uploadingImage && <span className="loading loading-spinner loading-sm mt-2"></span>}
        </div>

        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="form-control">
            <label className="label cursor-pointer gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Đang hoạt động</span>
            </label>
          </div>
        </div>

        <button type="submit" className="button-primary w-full" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo banner'}
        </button>
      </form>
    </div>
  )
}

