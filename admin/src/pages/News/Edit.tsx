import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { HiArrowLeft, HiX, HiPlus } from 'react-icons/hi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { newsCategoriesApi, newsApi, uploadApi } from '../../services/api'

interface NewsCategory {
  _id: string
  name: string
}

export default function NewsEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingNews, setLoadingNews] = useState(true)
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
    const loadData = async () => {
      await fetchCategories()
      if (id) {
        // Wait a bit for categories to be set, then fetch news
        setTimeout(() => {
          fetchNews()
        }, 100)
      }
    }
    loadData()
  }, [id])

  const fetchCategories = async () => {
    try {
      const response = await newsCategoriesApi.getAll()
      if (response.success) {
        setCategories(response.data?.data || response.data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchNews = async () => {
    if (!id) return
    
    try {
      setLoadingNews(true)
      const response = await newsApi.getById(id)
      if (response.success && response.data) {
        const news = response.data
        
        // Handle category - can be string (category name) or ObjectId
        // Backend returns category as populated object with name, but we need the ID
        let categoryId = ''
        if (news.category) {
          if (typeof news.category === 'object' && news.category._id) {
            // It's already an object with _id
            categoryId = news.category._id
          } else if (typeof news.category === 'string') {
            // It's a string - could be ID or name
            // Try to find by name first
            const foundCategory = categories.find(c => c.name === news.category)
            if (foundCategory) {
              categoryId = foundCategory._id
            } else {
              // Assume it's an ID
              categoryId = news.category
            }
          }
        }

        // Format publishedAt date
        let publishedAtDate = ''
        if (news.publishedAt) {
          const date = new Date(news.publishedAt)
          publishedAtDate = date.toISOString().split('T')[0]
        } else {
          publishedAtDate = new Date().toISOString().split('T')[0]
        }

        setFormData({
          title: news.title || '',
          slug: news.slug || '',
          category: categoryId,
          shortDescription: news.shortDescription || '',
          content: news.content || '',
          featuredImage: news.featuredImage || '',
          images: news.images && Array.isArray(news.images) ? news.images : [],
          author: news.author || 'Tấn Phát Food',
          tags: news.tags && Array.isArray(news.tags) ? news.tags : [],
          publishedAt: publishedAtDate,
          isPublished: news.isPublished !== undefined ? news.isPublished : false,
          isFeatured: news.isFeatured !== undefined ? news.isFeatured : false,
          order: news.order !== undefined ? news.order : 0,
        })
      } else {
        alert(response.message || 'Không tìm thấy tin tức')
        navigate('/news')
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      alert('Có lỗi xảy ra khi tải tin tức')
      navigate('/news')
    } finally {
      setLoadingNews(false)
    }
  }

  // Re-fetch news when categories are loaded (to properly map category name to ID)
  useEffect(() => {
    if (categories.length > 0 && id && !formData.title) {
      // Only fetch if we don't have data yet
      fetchNews()
    }
  }, [categories])

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
    
    if (!id) {
      alert('Không tìm thấy ID tin tức')
      return
    }

    // Validate only required field: title
    if (!formData.title || !formData.title.trim()) {
      alert('Vui lòng nhập tiêu đề tin tức')
      return
    }

    setLoading(true)

    try {
      // Clean up data: only send fields that have actual values or need to be cleared
      const newsData: any = {}

      // Always update title if provided
      if (formData.title !== undefined && formData.title !== null) {
        newsData.title = formData.title.trim()
      }

      // Update slug - if provided and not empty, update it
      if (formData.slug !== undefined) {
        if (formData.slug && formData.slug.trim()) {
          newsData.slug = formData.slug.trim()
        }
        // If slug is empty string, don't update (keep existing or let pre-save hook regenerate)
      }

      // Update category - can be set to null to remove
      if (formData.category !== undefined) {
        if (formData.category === '' || formData.category === null) {
          newsData.category = null // Send null to remove category
        } else {
          newsData.category = formData.category
        }
      }

      // Update optional fields - always send to allow clearing
      if (formData.shortDescription !== undefined) {
        newsData.shortDescription = formData.shortDescription && formData.shortDescription.trim() ? formData.shortDescription.trim() : ''
      }

      if (formData.content !== undefined) {
        newsData.content = formData.content && formData.content.trim() ? formData.content.trim() : ''
      }

      if (formData.featuredImage !== undefined) {
        newsData.featuredImage = formData.featuredImage && formData.featuredImage.trim() ? formData.featuredImage.trim() : ''
      }

      // Update arrays - always send to allow clearing
      if (formData.images !== undefined) {
        if (Array.isArray(formData.images)) {
          newsData.images = formData.images.filter(img => img && img.trim())
        } else {
          newsData.images = []
        }
      }

      if (formData.tags !== undefined) {
        if (Array.isArray(formData.tags)) {
          newsData.tags = formData.tags.filter(tag => tag && tag.trim())
        } else {
          newsData.tags = []
        }
      }

      if (formData.author !== undefined) {
        newsData.author = formData.author && formData.author.trim() ? formData.author.trim() : 'Tấn Phát Food'
      }

      if (formData.publishedAt) {
        newsData.publishedAt = new Date(formData.publishedAt).toISOString()
      }

      // Update status fields
      if (formData.isPublished !== undefined) {
        newsData.isPublished = formData.isPublished
      }

      if (formData.isFeatured !== undefined) {
        newsData.isFeatured = formData.isFeatured
      }

      if (formData.order !== undefined && formData.order !== null) {
        newsData.order = formData.order
      }
      
      const response = await newsApi.update(id, newsData)
      if (response.success) {
        navigate('/news')
      } else {
        alert(response.message || 'Có lỗi xảy ra khi cập nhật tin tức')
      }
    } catch (error) {
      console.error('Error updating news:', error)
      alert('Có lỗi xảy ra khi cập nhật tin tức')
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

  if (loadingNews) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa tin tức</h1>
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
            {loading ? 'Đang cập nhật...' : 'Cập nhật tin tức'}
          </button>
        </div>
      </form>
    </div>
  )
}

