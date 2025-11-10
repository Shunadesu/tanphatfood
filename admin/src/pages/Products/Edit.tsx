import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { HiArrowLeft, HiX, HiPlus, HiRefresh } from 'react-icons/hi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { categoriesApi, productsApi, uploadApi } from '../../services/api'

interface Category {
  _id: string
  name: string
}

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    type: 'fresh' as 'fresh' | 'dried' | 'powder',
    description: '',
    shortDescription: '',
    image: '',
    images: [] as string[],
    features: [] as string[],
    exportInfo: {
      variety: '',
      weight: '',
      packaging: '',
      condition: '',
    },
    companyIntro: '',
    qualityDescription: '',
    qualityImage: '',
    certifications: {
      haccp: false,
      globalgap: false,
      vietgap: false,
      co: '',
    },
    markets: [] as string[],
    supplyCapacity: '',
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: '',
      storageInstructions: '',
    },
    fullDescription: '',
    price: 0,
    unit: 'kg',
    specifications: {} as Record<string, string>,
    isActive: true,
    isFeatured: false,
    order: 0,
    note: '',
  })

  const [newFeature, setNewFeature] = useState('')
  const [newMarket, setNewMarket] = useState('')
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories()
      if (id) {
        // Wait a bit for categories to be set, then fetch product
        setTimeout(() => {
          fetchProduct()
        }, 100)
      }
    }
    loadData()
  }, [id])

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll()
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

  const fetchProduct = async () => {
    if (!id) return
    
    try {
      setLoadingProduct(true)
      const response = await productsApi.getById(id)
      if (response.success && response.data) {
        const product = response.data as any
        
        // Handle category - can be string (category name) or ObjectId
        // Backend returns category name as string, but we need to find the category ID
        let categoryId = ''
        if (product.category) {
          // If category is a string (category name), find the matching category ID
          const matchingCategory = categories.find(cat => cat.name === product.category)
          if (matchingCategory) {
            categoryId = matchingCategory._id
          }
        }
        // If category is already an ObjectId string, use it directly
        // Note: Backend transformProduct returns category as name string, not ID
        // So we need to look it up by name
        
        setFormData({
          name: product.title || product.name || '',
          slug: product.slug || '',
          category: categoryId, // Use the found category ID
          type: product.type || 'fresh',
          description: product.description || '',
          shortDescription: product.shortDescription || '',
          image: product.image || '',
          images: Array.isArray(product.images) ? product.images : [],
          features: Array.isArray(product.features) ? product.features : [],
          exportInfo: product.exportInfo && typeof product.exportInfo === 'object' ? {
            variety: product.exportInfo.variety || '',
            weight: product.exportInfo.weight || '',
            packaging: product.exportInfo.packaging || '',
            condition: product.exportInfo.condition || '',
          } : {
            variety: '',
            weight: '',
            packaging: '',
            condition: '',
          },
          companyIntro: product.companyIntro || '',
          qualityDescription: product.qualityDescription || '',
          qualityImage: product.qualityImage || '',
          certifications: product.certifications && typeof product.certifications === 'object' ? {
            haccp: product.certifications.haccp || false,
            globalgap: product.certifications.globalgap || false,
            vietgap: product.certifications.vietgap || false,
            co: product.certifications.co || '',
          } : {
            haccp: false,
            globalgap: false,
            vietgap: false,
            co: '',
          },
          markets: Array.isArray(product.markets) ? product.markets : [],
          supplyCapacity: product.supplyCapacity || '',
          detailedInfo: product.detailedInfo && typeof product.detailedInfo === 'object' ? {
            brand: product.detailedInfo.brand || 'Tấn Phát Food',
            origin: product.detailedInfo.origin || 'Việt Nam',
            fruitType: product.detailedInfo.fruitType || '',
            storageInstructions: product.detailedInfo.storageInstructions || '',
          } : {
            brand: 'Tấn Phát Food',
            origin: 'Việt Nam',
            fruitType: '',
            storageInstructions: '',
          },
          fullDescription: product.fullDescription || '',
          price: product.price !== undefined && product.price !== null ? product.price : 0,
          unit: product.unit || 'kg',
          specifications: product.specifications && typeof product.specifications === 'object' ? product.specifications : {},
          isActive: product.isActive !== undefined ? product.isActive : true,
          isFeatured: product.isFeatured !== undefined ? product.isFeatured : false,
          order: product.order !== undefined && product.order !== null ? product.order : 0,
          note: product.note || '',
        })
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Không thể tải thông tin sản phẩm')
      navigate('/products')
    } finally {
      setLoadingProduct(false)
    }
  }

  // Map type to category name
  const getCategoryNameByType = (type: string) => {
    const typeMap: Record<string, string> = {
      fresh: 'Trái cây tươi xuất khẩu',
      dried: 'Trái cây sấy xuất khẩu',
      powder: 'Bột trái cây xuất khẩu',
    }
    return typeMap[type] || ''
  }

  // Auto-select category when type changes (only if category is not already set)
  useEffect(() => {
    if (formData.type && categories.length > 0 && !formData.category) {
      const categoryName = getCategoryNameByType(formData.type)
      const matchingCategory = categories.find(cat => cat.name === categoryName)
      if (matchingCategory) {
        setFormData(prev => ({
          ...prev,
          category: matchingCategory._id,
        }))
      }
    }
  }, [formData.type, categories])

  // Hàm tạo slug từ tên
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

    if (name.startsWith('exportInfo.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        exportInfo: {
          ...prev.exportInfo,
          [field]: value,
        },
      }))
    } else if (name.startsWith('certifications.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        certifications: {
          ...prev.certifications,
          [field]: type === 'checkbox' ? checked : value,
        },
      }))
    } else if (name.startsWith('detailedInfo.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        detailedInfo: {
          ...prev.detailedInfo,
          [field]: value,
        },
      }))
    } else {
      setFormData(prev => {
        const updated = {
          ...prev,
          [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
        }
        
        // Xử lý slug khi thay đổi tên sản phẩm
        if (name === 'name') {
          // Nếu xóa tên sản phẩm (value rỗng), xóa cả slug
          if (!value || value.trim() === '') {
            updated.slug = ''
          }
        }
        
        return updated
      })
    }
  }

  const handleGenerateSlug = () => {
    if (formData.name && formData.name.trim()) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name),
      }))
    } else {
      alert('Vui lòng nhập tên sản phẩm trước')
    }
  }

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      fullDescription: value,
    }))
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature('')
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleAddMarket = () => {
    if (newMarket.trim()) {
      setFormData(prev => ({
        ...prev,
        markets: [...prev.markets, newMarket.trim()],
      }))
      setNewMarket('')
    }
  }

  const handleRemoveMarket = (index: number) => {
    setFormData(prev => ({
      ...prev,
      markets: prev.markets.filter((_, i) => i !== index),
    }))
  }

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const handleRemoveSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs,
      }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'qualityImage') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 5MB')
      return
    }

    setUploadingImage(field)
    try {
      const response = await uploadApi.uploadImage(file, 'products')
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

    // Validate files
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
      const response = await uploadApi.uploadMultipleImages(files, 'products')
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
      alert('Không tìm thấy ID sản phẩm')
      return
    }

    // Validate only required fields: name and type
    if (!formData.name || !formData.name.trim()) {
      alert('Vui lòng nhập tên sản phẩm')
      return
    }

    if (!formData.type) {
      alert('Vui lòng chọn loại sản phẩm')
      return
    }

    setLoading(true)

    try {
      // Try to auto-map category if available, but don't require it
      let categoryId = formData.category
      if (!categoryId && categories.length > 0) {
        const categoryName = getCategoryNameByType(formData.type)
        const matchingCategory = categories.find(cat => cat.name === categoryName)
        if (matchingCategory) {
          categoryId = matchingCategory._id
        }
      }

      // Clean up data: remove empty strings, empty arrays, empty objects, and undefined values
      // Only send fields that have actual values or need to be explicitly set
      const productData: any = {
        name: formData.name.trim(),
        type: formData.type,
      }

      // Only add slug if provided (not empty) - if empty, backend will keep existing or regenerate
      if (formData.slug && formData.slug.trim()) {
        productData.slug = formData.slug.trim()
      }

      // Category - explicitly set (can be empty string to remove category)
      if (categoryId) {
        productData.category = categoryId
      } else if (formData.category === '') {
        // Explicitly set to null to remove category
        productData.category = null
      }

      // Optional fields - only include if they have values or need to be updated
      if (formData.description !== undefined) {
        productData.description = formData.description.trim()
      }

      if (formData.shortDescription !== undefined) {
        productData.shortDescription = formData.shortDescription.trim()
      }

      if (formData.image !== undefined) {
        productData.image = formData.image.trim()
      }

      // Always send images array (even if empty) to allow clearing images
      productData.images = (formData.images || []).filter(img => img && img.trim())

      // Always send features array (even if empty) to allow clearing features
      productData.features = (formData.features || []).filter(f => f && f.trim())

      // Export Info - send if provided or if all fields are empty (to clear)
      if (formData.exportInfo) {
        const hasExportInfo = Object.values(formData.exportInfo).some(v => v && v.trim())
        if (hasExportInfo) {
          productData.exportInfo = {}
          if (formData.exportInfo.variety !== undefined) {
            productData.exportInfo.variety = formData.exportInfo.variety.trim()
          }
          if (formData.exportInfo.weight !== undefined) {
            productData.exportInfo.weight = formData.exportInfo.weight.trim()
          }
          if (formData.exportInfo.packaging !== undefined) {
            productData.exportInfo.packaging = formData.exportInfo.packaging.trim()
          }
          if (formData.exportInfo.condition !== undefined) {
            productData.exportInfo.condition = formData.exportInfo.condition.trim()
          }
        } else {
          // All empty - set to empty object to clear
          productData.exportInfo = {}
        }
      }

      if (formData.companyIntro !== undefined) {
        productData.companyIntro = formData.companyIntro.trim()
      }

      if (formData.qualityDescription !== undefined) {
        productData.qualityDescription = formData.qualityDescription.trim()
      }

      if (formData.qualityImage !== undefined) {
        productData.qualityImage = formData.qualityImage.trim()
      }

      // Certifications - always send to allow updating checkboxes
      if (formData.certifications) {
        productData.certifications = {
          haccp: formData.certifications.haccp || false,
          globalgap: formData.certifications.globalgap || false,
          vietgap: formData.certifications.vietgap || false,
        }
        if (formData.certifications.co !== undefined) {
          if (formData.certifications.co && formData.certifications.co.trim()) {
            productData.certifications.co = formData.certifications.co.trim()
          }
          // If co is empty string, don't include it (will clear it)
        }
      }

      // Always send markets array (even if empty) to allow clearing markets
      productData.markets = (formData.markets || []).filter(m => m && m.trim())

      if (formData.supplyCapacity !== undefined) {
        productData.supplyCapacity = formData.supplyCapacity.trim()
      }

      // Detailed Info - send if provided or if all fields are empty (to clear)
      if (formData.detailedInfo) {
        const hasDetailedInfo = Object.values(formData.detailedInfo).some(v => v && v.trim)
        if (hasDetailedInfo) {
          productData.detailedInfo = {}
          if (formData.detailedInfo.brand !== undefined) {
            productData.detailedInfo.brand = formData.detailedInfo.brand.trim()
          }
          if (formData.detailedInfo.origin !== undefined) {
            productData.detailedInfo.origin = formData.detailedInfo.origin.trim()
          }
          if (formData.detailedInfo.fruitType !== undefined) {
            productData.detailedInfo.fruitType = formData.detailedInfo.fruitType.trim()
          }
          if (formData.detailedInfo.storageInstructions !== undefined) {
            productData.detailedInfo.storageInstructions = formData.detailedInfo.storageInstructions.trim()
          }
        } else {
          // All empty - set to empty object to clear
          productData.detailedInfo = {}
        }
      }

      if (formData.fullDescription !== undefined) {
        productData.fullDescription = formData.fullDescription.trim()
      }

      // Price and unit - always send
      productData.price = formData.price !== undefined && formData.price !== null ? formData.price : 0
      productData.unit = formData.unit && formData.unit.trim() ? formData.unit.trim() : 'kg'

      // Specifications - send if provided (even if empty to clear)
      if (formData.specifications !== undefined) {
        if (Object.keys(formData.specifications).length > 0) {
          const cleanedSpecs: Record<string, string> = {}
          Object.entries(formData.specifications).forEach(([key, value]) => {
            if (key && key.trim() && value && value.trim()) {
              cleanedSpecs[key.trim()] = value.trim()
            }
          })
          productData.specifications = cleanedSpecs
        } else {
          productData.specifications = {}
        }
      }

      // Status fields - always send
      productData.isActive = formData.isActive !== undefined ? formData.isActive : true
      productData.isFeatured = formData.isFeatured !== undefined ? formData.isFeatured : false
      productData.order = formData.order !== undefined && formData.order !== null ? formData.order : 0

      // Note - send if provided
      if (formData.note !== undefined) {
        productData.note = formData.note.trim()
      }
      
      const response = await productsApi.update(id, productData)
      if (response.success) {
        navigate('/products')
      } else {
        alert(response.message || 'Có lỗi xảy ra khi cập nhật sản phẩm')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Có lỗi xảy ra khi cập nhật sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải thông tin sản phẩm...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
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
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="Nhập slug hoặc click nút để tạo tự động"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    disabled={!formData.name || !formData.name.trim()}
                    className="px-4 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                    title="Tạo slug từ tên sản phẩm"
                  >
                    <HiRefresh className="w-5 h-5" />
                    <span className="hidden sm:inline">Tạo slug</span>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Click nút "Tạo slug" để tự động tạo slug từ tên sản phẩm
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại sản phẩm <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                >
                  <option value="">Chọn loại sản phẩm</option>
                  <option value="fresh">Trái cây tươi xuất khẩu</option>
                  <option value="dried">Trái cây sấy xuất khẩu</option>
                  <option value="powder">Bột trái cây xuất khẩu</option>
                </select>
                {formData.type && formData.category && (
                  <p className="mt-1 text-sm text-gray-500">
                    Danh mục: <span className="font-semibold text-[#00652E]">{categories.find(c => c._id === formData.category)?.name || 'Đang tải...'}</span>
                  </p>
                )}
                {formData.type && !formData.category && categories.length > 0 && (
                  <p className="mt-1 text-sm text-blue-600">
                    ℹ️ Sản phẩm sẽ được cập nhật chỉ với loại sản phẩm. Bạn có thể cập nhật danh mục sau.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả ngắn
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thông tin sản phẩm
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={3}
                placeholder="Ghi chú nội bộ về sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
              
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hình ảnh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh chính
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image')}
                  disabled={uploadingImage === 'image'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] disabled:opacity-50"
                />
                {uploadingImage === 'image' && (
                  <p className="mt-2 text-sm text-gray-500">Đang upload...</p>
                )}
                {formData.image && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh chất lượng
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'qualityImage')}
                  disabled={uploadingImage === 'qualityImage'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] disabled:opacity-50"
                />
                {uploadingImage === 'qualityImage' && (
                  <p className="mt-2 text-sm text-gray-500">Đang upload...</p>
                )}
                {formData.qualityImage && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.qualityImage} alt="Quality Preview" className="w-32 h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, qualityImage: '' }))}
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

          {/* Features */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Đặc điểm nổi bật</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                placeholder="Nhập đặc điểm nổi bật"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors flex items-center gap-2"
              >
                <HiPlus className="w-5 h-5" />
                Thêm
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin xuất khẩu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại
                </label>
                <input
                  type="text"
                  name="exportInfo.variety"
                  value={formData.exportInfo.variety}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trọng lượng
                </label>
                <input
                  type="text"
                  name="exportInfo.weight"
                  value={formData.exportInfo.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đóng gói
                </label>
                <input
                  type="text"
                  name="exportInfo.packaging"
                  value={formData.exportInfo.packaging}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tình trạng
                </label>
                <input
                  type="text"
                  name="exportInfo.condition"
                  value={formData.exportInfo.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
            </div>
          </div>

          {/* Company Intro & Quality */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Giới thiệu công ty & Chất lượng</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới thiệu công ty
                </label>
                <textarea
                  name="companyIntro"
                  value={formData.companyIntro}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  placeholder="Giới thiệu về công ty liên quan đến sản phẩm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chất lượng
                </label>
                <textarea
                  name="qualityDescription"
                  value={formData.qualityDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  placeholder="Mô tả về chất lượng sản phẩm"
                />
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tiêu chuẩn & Chứng nhận</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="certifications.haccp"
                  checked={formData.certifications.haccp}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#00652E] border-gray-300 rounded focus:ring-[#00652E]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  HACCP
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="certifications.globalgap"
                  checked={formData.certifications.globalgap}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#00652E] border-gray-300 rounded focus:ring-[#00652E]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  GlobalG.A.P
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="certifications.vietgap"
                  checked={formData.certifications.vietgap}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#00652E] border-gray-300 rounded focus:ring-[#00652E]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  VietGAP
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  C/O (Certificate of Origin)
                </label>
                <input
                  type="text"
                  name="certifications.co"
                  value={formData.certifications.co}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  placeholder="Ví dụ: Form A, Form D, Form E..."
                />
              </div>
            </div>
          </div>

          {/* Markets & Supply Capacity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thị trường & Năng lực cung ứng</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thị trường xuất khẩu
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newMarket}
                    onChange={(e) => setNewMarket(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMarket())}
                    placeholder="Nhập thị trường (ví dụ: Mỹ, EU, Nhật Bản...)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  />
                  <button
                    type="button"
                    onClick={handleAddMarket}
                    className="px-4 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors flex items-center gap-2"
                  >
                    <HiPlus className="w-5 h-5" />
                    Thêm
                  </button>
                </div>
                {formData.markets.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.markets.map((market, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                        <span className="text-sm text-gray-700">{market}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMarket(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Năng lực cung ứng
                </label>
                <input
                  type="text"
                  name="supplyCapacity"
                  value={formData.supplyCapacity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  placeholder="Ví dụ: 1000 tấn/tháng"
                />
              </div>
            </div>
          </div>

          {/* Detailed Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin chi tiết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thương hiệu
                </label>
                <input
                  type="text"
                  name="detailedInfo.brand"
                  value={formData.detailedInfo.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xuất xứ
                </label>
                <input
                  type="text"
                  name="detailedInfo.origin"
                  value={formData.detailedInfo.origin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại trái cây
                </label>
                <input
                  type="text"
                  name="detailedInfo.fruitType"
                  value={formData.detailedInfo.fruitType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hướng dẫn bảo quản
                </label>
                <input
                  type="text"
                  name="detailedInfo.storageInstructions"
                  value={formData.detailedInfo.storageInstructions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả đầy đủ</h2>
            <div className="border border-gray-300 rounded-lg">
              <ReactQuill
                theme="snow"
                value={formData.fullDescription}
                onChange={handleContentChange}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    [{ 'color': [] }, { 'background': [] }],
                    ['clean'],
                  ],
                }}
                placeholder="Nhập mô tả đầy đủ về sản phẩm..."
                className="bg-white"
                style={{ minHeight: '300px' }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Sử dụng thanh công cụ để định dạng nội dung, thêm link, tiêu đề, danh sách, v.v.
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Tên thông số (ví dụ: Kích thước)"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Giá trị (ví dụ: 10-15cm)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="px-4 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors flex items-center gap-2"
                >
                  <HiPlus className="w-5 h-5" />
                  Thêm
                </button>
              </div>
            </div>
            {Object.keys(formData.specifications).length > 0 && (
              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900">{key}:</span>
                      <span className="ml-2 text-gray-700">{value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(key)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price & Unit */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Giá & Đơn vị</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đơn vị
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E]"
                  placeholder="kg, tấn, thùng..."
                />
              </div>
            </div>
          </div>

          {/* Status & Settings */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trạng thái & Cài đặt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#00652E] border-gray-300 rounded focus:ring-[#00652E]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Đang hoạt động
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
                  Sản phẩm nổi bật
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
            to="/products"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#00652E] text-white rounded-lg hover:bg-[#005a28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  )
}

