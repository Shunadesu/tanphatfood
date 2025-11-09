'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { productsApi } from '@/services/api'
import { HiChevronRight } from 'react-icons/hi'
import { LiaTelegramPlane } from 'react-icons/lia'
import { HiDocumentText } from 'react-icons/hi'
import NewsSection from '@/components/NewsSection'
import QuoteSection from '@/components/QuoteSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'

interface Product {
  id: string
  title: string
  description: string
  image: string
  slug: string
  type: 'fresh' | 'dried' | 'powder'
  category: string
  images: string[]
  features: string[]
  exportInfo: {
    variety?: string
    weight?: string
    packaging?: string
    condition?: string
  }
  companyIntro?: string
  qualityDescription?: string
  qualityImage?: string
  certifications?: {
    haccp?: boolean
    globalgap?: boolean
    vietgap?: boolean
    co?: string
  }
  markets?: string[]
  supplyCapacity?: string
  detailedInfo?: {
    brand?: string
    origin?: string
    fruitType?: string
    storageInstructions?: string
  }
  fullDescription?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        setError(null)
        const response = await productsApi.getBySlug(slug)
        
        if (response.success && response.data) {
          const productData = response.data
          
          // Đảm bảo images array bao gồm cả image chính
          let images = productData.images || []
          if (productData.image && !images.includes(productData.image)) {
            images = [productData.image, ...images]
          }
          // Nếu không có images, sử dụng image chính
          if (images.length === 0 && productData.image) {
            images = [productData.image]
          }
          
          // Ensure all fields have proper defaults
          setProduct({
            id: productData.id || '',
            title: productData.title || '',
            description: productData.description || '',
            shortDescription: productData.shortDescription || '',
            image: productData.image || '',
            slug: productData.slug || slug,
            type: productData.type || 'fresh',
            category: productData.category || '',
            images: images,
            features: productData.features || [],
            exportInfo: productData.exportInfo || {
              variety: '',
              weight: '',
              packaging: '',
              condition: '',
            },
            companyIntro: productData.companyIntro || '',
            qualityDescription: productData.qualityDescription || '',
            qualityImage: productData.qualityImage || '',
            certifications: productData.certifications || {
              haccp: false,
              globalgap: false,
              vietgap: false,
              co: '',
            },
            markets: productData.markets || [],
            supplyCapacity: productData.supplyCapacity || '',
            detailedInfo: productData.detailedInfo || {
              brand: '',
              origin: '',
              fruitType: '',
              storageInstructions: '',
            },
            fullDescription: productData.fullDescription || '',
          })
        } else {
          setError(response.message || 'Không tìm thấy sản phẩm')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Có lỗi xảy ra khi tải sản phẩm')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {/* Hero Section Skeleton */}
          <section className="relative min-h-screen pb-8 bg-gray-200">
            <div className="container w-full h-full mx-auto px-4 max-w-7xl">
              <div className="absolute bottom-0 right-0 left-0 flex items-center justify-center gap-2 text-sm mb-4">
                <div className="w-fit bg-white rounded-xl p-2 animate-pulse">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Product Summary Skeleton */}
          <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Images Skeleton */}
                <div className="lg:col-span-2">
                  <div className="flex gap-4">
                    <div className="w-24 h-[600px] bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1 h-[600px] bg-gray-200 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
                {/* Info Box Skeleton */}
                <div className="lg:col-span-1">
                  <div className="h-[600px] bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Info Skeleton */}
          <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="mb-8">
                <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Sản phẩm không tồn tại'}
          </h1>
          <button
            onClick={() => router.push('/products')}
            className="button-primary"
          >
            Về danh sách sản phẩm
          </button>
        </div>
      </div>
    )
  }

  // Get category page URL based on product type
  const getCategoryUrl = () => {
    if (product.type === 'fresh') return '/products/fresh'
    if (product.type === 'dried') return '/products/dried'
    if (product.type === 'powder') return '/products/powder'
    return '/products'
  }

  const getCategoryName = () => {
    if (product.type === 'fresh') return 'Trái cây tươi xuất khẩu'
    if (product.type === 'dried') return 'Trái cây sấy xuất khẩu'
    if (product.type === 'powder') return 'Bột trái cây xuất khẩu'
    return 'Sản phẩm'
  }

  // Get title suffix based on type
  const getTitleSuffix = () => {
    if (product.type === 'fresh') return 'tươi xuất khẩu Tấn Phát'
    if (product.type === 'dried') return 'xuất khẩu Tấn Phát'
    if (product.type === 'powder') return 'xuất khẩu Tấn Phát'
    return 'xuất khẩu Tấn Phát'
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section with Breadcrumb */}
        <section className="relative min-h-screen pb-8 bg-gray-200">
          <div className="container w-full h-full mx-auto px-4 max-w-7xl">
            {/* Breadcrumb */}
            <div className="absolute bottom-0 right-0 left-0 flex items-center justify-center gap-2 text-sm mb-4">
              <div className='w-fit bg-white rounded-xl p-2 flex items-center justify-center gap-2'>
              <Link
                href="/"
                className="text-gray-600 hover:text-[#00652E] transition-colors"
              >
                Trang chủ
              </Link>
              <HiChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href="/products"
                className="text-gray-600 hover:text-[#00652E] transition-colors"
              >
                Sản phẩm
              </Link>
              <HiChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href={getCategoryUrl()}
                className="text-gray-600 hover:text-[#00652E] transition-colors"
              >
                {getCategoryName()}
              </Link>
              <HiChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#00652E] font-semibold line-clamp-1">
                {product.title}
              </span>
              </div>
            </div>
          </div>
        </section>

        {/* PART 1: Product Summary Section (Top) */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left: Product Images (2 columns) */}
              <div className="lg:col-span-2">
                <div className="flex gap-4">
                  {/* Thumbnails - Vertical on left - chỉ hiển thị nếu có nhiều hơn 1 ảnh */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex flex-col gap-3 flex-shrink-0 w-20 md:w-24 lg:w-28 h-[500px] lg:h-[600px]">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index
                              ? 'border-[#00652E] shadow-md'
                              : 'border-gray-200 hover:border-[#00652E]/50'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder.jpg'
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Main Image */}
                  <div className="relative flex-1">
                    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                      <img
                        src={product.images && product.images.length > 0 
                          ? product.images[selectedImage] 
                          : product.image || '/images/placeholder.jpg'}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder.jpg'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Product Summary Box (1 column) */}
              <div className="lg:col-span-1 flex flex-col h-[500px] lg:h-[600px]">
                {/* Category Header */}
                <div className="bg-[#00652E] rounded-t-2xl px-6 py-3 flex-shrink-0">
                  <p className="text-white text-sm font-semibold">{product.category}</p>
                </div>

                {/* Product Info Box - Flex container với chiều cao bằng image */}
                <div className="bg-white rounded-b-2xl border-x border-b border-gray-200 shadow-lg p-6 md:p-8 flex flex-col flex-1 overflow-hidden">
                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00652E] mb-6 flex-shrink-0">
                    {product.title}
                  </h1>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar mb-6">
                    {/* Đặc điểm nổi bật */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                          Đặc điểm nổi bật
                        </h3>
                        <ul className="space-y-3">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-[#00652E] mt-1.5">•</span>
                              <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Cách xuất khẩu - chỉ hiển thị nếu có thông tin */}
                    {(product.exportInfo?.variety || 
                      product.exportInfo?.weight || 
                      product.exportInfo?.packaging || 
                      product.exportInfo?.condition) && (
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                          Cách xuất khẩu
                        </h3>
                        <ul className="space-y-3">
                          {product.exportInfo.variety && (
                            <li className="flex items-start gap-3">
                              <span className="text-[#00652E] font-semibold min-w-[100px] flex-shrink-0 text-sm">
                                Loại:
                              </span>
                              <span className="text-gray-700 text-sm md:text-base">
                                {product.exportInfo.variety}
                              </span>
                            </li>
                          )}
                          {product.exportInfo.weight && (
                            <li className="flex items-start gap-3">
                              <span className="text-[#00652E] font-semibold min-w-[100px] flex-shrink-0 text-sm">
                                Trọng lượng:
                              </span>
                              <span className="text-gray-700 text-sm md:text-base">
                                {product.exportInfo.weight}
                              </span>
                            </li>
                          )}
                          {product.exportInfo.packaging && (
                            <li className="flex items-start gap-3">
                              <span className="text-[#00652E] font-semibold min-w-[100px] flex-shrink-0 text-sm">
                                Đóng gói:
                              </span>
                              <span className="text-gray-700 text-sm md:text-base">
                                {product.exportInfo.packaging}
                              </span>
                            </li>
                          )}
                          {product.exportInfo.condition && (
                            <li className="flex items-start gap-3">
                              <span className="text-[#00652E] font-semibold min-w-[100px] flex-shrink-0 text-sm">
                                Tình trạng:
                              </span>
                              <span className="text-gray-700 text-sm md:text-base">
                                {product.exportInfo.condition}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {/* Hiển thị thông báo nếu không có thông tin xuất khẩu */}
                    {!product.exportInfo?.variety && 
                     !product.exportInfo?.weight && 
                     !product.exportInfo?.packaging && 
                     !product.exportInfo?.condition && (
                      <div className="text-gray-500 text-sm italic">
                        Thông tin xuất khẩu sẽ được cập nhật sớm.
                      </div>
                    )}
                  </div>

                  {/* Call to Action Button - Fixed at bottom */}
                  <div className="flex-shrink-0 pt-4 border-t border-gray-200">
                    <button className="button-primary w-full inline-flex items-center justify-center gap-2">
                      <span>Liên hệ báo giá</span>
                      <LiaTelegramPlane className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PART 2: Detailed Product Information Section (Bottom) */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Main Title */}
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00652E] mb-4">
                {product.title} {getTitleSuffix()}
              </h1>
              {product.companyIntro && (
                <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl">
                  {product.companyIntro}
                </p>
              )}
            </div>

            {/* Detailed Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left: Detailed Sections (2 columns) */}
              <div className="lg:col-span-2 space-y-8 md:space-y-12">
                {/* Section 1: Chất lượng tạo nên thương hiệu */}
                {product.qualityDescription && (
                  <div className="bg-gradient-to-br from-[#E6F7ED] to-white rounded-2xl p-6 md:p-8 lg:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6">
                      1. Chất lượng tạo nên thương hiệu
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                          {product.qualityDescription}
                        </p>
                      </div>
                      {/* Hiển thị qualityImage nếu có, nếu không thì hiển thị ảnh chính */}
                      {(product.qualityImage || product.image) && (
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src={product.qualityImage || product.image}
                            alt={`${product.title} - Chất lượng`}
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder.jpg'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Section 2: Đặc điểm nổi bật (Expanded) */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 lg:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6">
                      2. Đặc điểm nổi bật
                    </h2>
                    <ul className="space-y-4">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#00652E] mt-1.5 font-bold text-xl">•</span>
                          <span className="text-gray-700 text-base md:text-lg leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section 3: Tiêu chuẩn & Chứng nhận - chỉ hiển thị nếu có chứng nhận */}
                {product.certifications && (
                  (product.certifications.haccp || 
                   product.certifications.globalgap || 
                   product.certifications.vietgap || 
                   (product.certifications.co && product.certifications.co.trim())) && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 lg:p-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6">
                        3. Tiêu chuẩn & Chứng nhận
                      </h2>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                        Tấn Phát Food giám sát nghiêm ngặt từ khâu canh tác, thu hoạch, phân loại đến đóng gói. Các chứng nhận và tiêu chuẩn quốc tế đảm bảo chất lượng và an toàn thực phẩm tuyệt đối.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {product.certifications.haccp && (
                          <div className="bg-[#E6F7ED] rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-[#00652E] mb-2">HACCP</div>
                            <p className="text-sm text-gray-700">Hazard Analysis and Critical Control Points</p>
                          </div>
                        )}
                        {product.certifications.globalgap && (
                          <div className="bg-[#E6F7ED] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-[#00652E] mb-2">GlobalG.A.P</div>
                            <p className="text-sm text-gray-700">Canh tác bền vững, an toàn, truy xuất nguồn gốc</p>
                          </div>
                        )}
                        {product.certifications.vietgap && (
                          <div className="bg-[#E6F7ED] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-[#00652E] mb-2">VietGAP</div>
                            <p className="text-sm text-gray-700">Tiêu chuẩn thực hành nông nghiệp tốt Việt Nam</p>
                          </div>
                        )}
                        {product.certifications.co && product.certifications.co.trim() && (
                          <div className="bg-[#E6F7ED] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-[#00652E] mb-2">C/O</div>
                            <p className="text-sm text-gray-700">Giấy chứng nhận xuất xứ: {product.certifications.co}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}

                {/* Section 4: Thị trường & Năng lực cung ứng */}
                {(product.markets || product.supplyCapacity) && (
                  <div className="bg-gradient-to-br from-white to-[#E6F7ED] rounded-2xl p-6 md:p-8 lg:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6">
                      4. Thị trường & Năng lực cung ứng
                    </h2>
                    {product.markets && product.markets.length > 0 && (
                      <div className="mb-6">
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                          Tấn Phát Food hiện đang xuất khẩu {product.title} đến các thị trường:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.markets.map((market, index) => (
                            <span
                              key={index}
                              className="inline-block bg-[#00652E] text-white px-4 py-2 rounded-lg text-sm md:text-base font-semibold"
                            >
                              {market}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.supplyCapacity && (
                      <div>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                          Tấn Phát Food đảm bảo năng lực cung ứng <strong className="text-[#00652E]">{product.supplyCapacity}</strong>, 
                          đảm bảo giao hàng đúng hẹn, chất lượng và logistics tối ưu cho đối tác quốc tế.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Section 5: Mô tả chi tiết (Full Description) */}
                {product.fullDescription && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 lg:p-10">
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-[#00652E] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-[#00652E] prose-ul:text-gray-700 prose-li:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                    />
                  </div>
                )}
              </div>

              {/* Right: Detailed Information Box (1 column) */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-fit sticky top-24">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <HiDocumentText className="w-6 h-6 text-[#00652E] flex-shrink-0" />
                    <h2 className="text-xl md:text-2xl font-bold text-[#00652E]">
                      Thông tin chi tiết
                    </h2>
                  </div>
                  
                  {/* Table Format */}
                  <div className="overflow-hidden rounded-lg">
                    <table className="w-full border-collapse">
                      <tbody>
                        {product.detailedInfo?.brand && (
                          <tr className="bg-white border-b border-gray-200">
                            <td className="py-4 px-4 font-bold text-gray-900 text-sm align-top w-[40%]">Thương hiệu</td>
                            <td className="py-4 px-4 text-gray-700 text-sm">{product.detailedInfo.brand}</td>
                          </tr>
                        )}
                        {product.detailedInfo?.origin && (
                          <tr className="bg-[#E6F7ED]/50 border-b border-gray-200">
                            <td className="py-4 px-4 font-bold text-gray-900 text-sm align-top w-[40%]">Xuất xứ</td>
                            <td className="py-4 px-4 text-gray-700 text-sm">{product.detailedInfo.origin}</td>
                          </tr>
                        )}
                        {product.detailedInfo?.fruitType && (
                          <tr className="bg-white border-b border-gray-200">
                            <td className="py-4 px-4 font-bold text-gray-900 text-sm align-top w-[40%]">Loại trái cây</td>
                            <td className="py-4 px-4 text-gray-700 text-sm">{product.detailedInfo.fruitType}</td>
                          </tr>
                        )}
                        {product.detailedInfo?.storageInstructions && (
                          <tr className="bg-[#E6F7ED]/50">
                            <td className="py-4 px-4 font-bold text-gray-900 text-sm align-top w-[40%]">Hướng dẫn bảo quản</td>
                            <td className="py-4 px-4 text-gray-700 text-sm">{product.detailedInfo.storageInstructions}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <QuoteSection />
      <NewsSection />
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}

