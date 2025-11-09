import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiArrowLeft, HiX, HiPlus } from 'react-icons/hi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { newsCategoriesApi, newsApi, uploadApi } from '../../services/api'

interface NewsCategory {
  _id: string
  name: string
}

export default function NewsNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    shortDescription: '',
    content: '',
    featuredImage: '',
    images: [] as string[],
    author: 'Tấn Phát Food',
    tags: [] as string[],
    publishedAt: new Date().toISOString().split('T')[0],
    isPublished: false,
    isFeatured: false,
    order: 0,
  })

  const [newTag, setNewTag] = useState('')
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

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

  // Hàm tạo slug từ title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
      }
      
      // Tự động tạo slug từ title nếu người dùng thay đổi title và chưa có slug hoặc slug rỗng
      if (name === 'title' && (!prev.slug || prev.slug === '')) {
        updated.slug = generateSlug(value)
      }
      
      return updated
    })
  }

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      content: value,
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'featuredImage') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 5MB')
      return
    }

    setUploadingImage(field)
    try {
      const response = await uploadApi.uploadImage(file, 'news')
      if (response.success && response.data) {
        setFormData(prev => ({
          ...prev,
          [field]: response.data.secure_url || response.data.url,
        }))
      } else {
        alert(response.message || 'Lỗi khi upload ảnh')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Lỗi khi upload ảnh')
    } finally {
      setUploadingImage(null)
    }
  }

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB')
        return
      }
    }

    setUploadingImage('multiple')
    try {
      const response = await uploadApi.uploadMultipleImages(files, 'news')
      if (response.success && response.data) {
        const imageUrls = Array.isArray(response.data) 
          ? response.data.map((img: any) => img.secure_url || img.url)
          : [response.data.secure_url || response.data.url]
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...imageUrls],
        }))
      } else {
        alert(response.message || 'Lỗi khi upload ảnh')
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Lỗi khi upload ảnh')
    } finally {
      setUploadingImage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate only required field: title
    if (!formData.title || !formData.title.trim()) {
      alert('Vui lòng nhập tiêu đề tin tức')
      return
    }

    setLoading(true)

    try {
      // Clean up data: only send fields that have actual values
      const newsData: any = {
        title: formData.title.trim(),
      }

      // Only add slug if provided (not empty)
      if (formData.slug && formData.slug.trim()) {
        newsData.slug = formData.slug.trim()
      }

      // Only add category if it exists
      if (formData.category) {
        newsData.category = formData.category
      }

      // Optional fields - only include if they have values
      if (formData.shortDescription && formData.shortDescription.trim()) {
        newsData.shortDescription = formData.shortDescription.trim()
      }

      if (formData.content && formData.content.trim()) {
        newsData.content = formData.content.trim()
      }

      if (formData.featuredImage && formData.featuredImage.trim()) {
        newsData.featuredImage = formData.featuredImage.trim()
      }

      if (formData.images && formData.images.length > 0) {
        newsData.images = formData.images.filter(img => img && img.trim())
      }

      if (formData.author && formData.author.trim()) {
        newsData.author = formData.author.trim()
      }

      if (formData.tags && formData.tags.length > 0) {
        newsData.tags = formData.tags.filter(tag => tag && tag.trim())
      }

      if (formData.publishedAt) {
        newsData.publishedAt = new Date(formData.publishedAt).toISOString()
      }

      // Status fields - always include with defaults
      newsData.isPublished = formData.isPublished !== undefined ? formData.isPublished : false
      newsData.isFeatured = formData.isFeatured !== undefined ? formData.isFeatured : false
      newsData.order = formData.order !== undefined ? formData.order : 0
      
      const response = await newsApi.create(newsData)
      if (response.success) {
        navigate('/news')
      } else {
        alert(response.message || 'Có lỗi xảy ra khi tạo tin tức')
      }
    } catch (error) {
      console.error('Error creating news:', error)
      alert('Có lỗi xảy ra khi tạo tin tức')
    } finally {
      setLoading(false)
    }
  }

  // Quill modules configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/news"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Thêm tin tức mới</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="Tự động tạo từ tiêu đề"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Slug sẽ được tự động tạo từ tiêu đề nếu để trống
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tác giả
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả ngắn
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                placeholder="Mô tả ngắn gọn về tin tức"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nội dung</h2>
            <div className="border border-gray-300 rounded-lg">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                placeholder="Nhập nội dung tin tức..."
                className="bg-white"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hình ảnh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'featuredImage')}
                  disabled={uploadingImage === 'featuredImage'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] disabled:opacity-50"
                />
                {uploadingImage === 'featuredImage' && (
                  <p className="mt-2 text-sm text-gray-500">Đang upload...</p>
                )}
                {formData.featuredImage && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.featuredImage} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh bổ sung (nhiều ảnh)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImagesUpload}
                  disabled={uploadingImage === 'multiple'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] disabled:opacity-50"
                />
                {uploadingImage === 'multiple' && (
                  <p className="mt-2 text-sm text-gray-500">Đang upload...</p>
                )}
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thẻ (Tags)</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Nhập thẻ và nhấn Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors flex items-center gap-2"
              >
                <HiPlus className="w-5 h-5" />
                Thêm
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-sm text-gray-700">{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Publishing Options */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tùy chọn xuất bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày xuất bản
                </label>
                <input
                  type="date"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#00652E] border-gray-300 rounded focus:ring-[#00652E]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Xuất bản ngay
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#00652E] border-gray-300 rounded focus:ring-[#00652E]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Tin tức nổi bật
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/news"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang tạo...' : 'Tạo tin tức'}
          </button>
        </div>
      </form>
    </div>
  )
}

