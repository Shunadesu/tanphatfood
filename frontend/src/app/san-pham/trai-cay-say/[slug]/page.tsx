'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDriedProductBySlug } from '@/data/mockDriedProducts'
import { LiaTelegramPlane } from 'react-icons/lia'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import HeroSectionWithBreadcrumb from '@/components/HeroSectionWithBreadcrumb'

export default function DriedProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [selectedImage, setSelectedImage] = useState(0)

  const product = getDriedProductBySlug(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
          <button
            onClick={() => router.push('/san-pham/trai-cay-say')}
            className="button-primary"
          >
            Về danh sách sản phẩm
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section with Breadcrumb */}
        <HeroSectionWithBreadcrumb
          page="products-dried"
          breadcrumbItems={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Sản phẩm', href: '/san-pham' },
            { label: 'Trái cây sấy xuất khẩu', href: '/san-pham/trai-cay-say' },
            { label: product.title, href: null },
          ]}
        />

        {/* Product Detail Section */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Main Title */}
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00652E] mb-4">
                {product.title} xuất khẩu Tấn Phát
              </h1>
              {product.companyIntro && (
                <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl">
                  {product.companyIntro}
                </p>
              )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {/* Left: Product Images (2 columns) */}
              <div className="lg:col-span-2">
                <div className="flex gap-4">
                  {/* Thumbnails - Vertical on left */}
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

                  {/* Main Image */}
                  <div className="relative flex-1">
                    <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                      <img
                        src={product.images[selectedImage]}
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

              {/* Right: Detailed Information Box (1 column) */}
              <div className="lg:col-span-1">
                <div className="bg-[#00652E] rounded-2xl p-6 md:p-8 shadow-lg h-fit">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                    Thông tin chi tiết
                  </h2>
                  <div className="space-y-4">
                    {product.detailedInfo?.brand && (
                      <div>
                        <p className="text-white/80 text-sm mb-1">Thương hiệu</p>
                        <p className="text-white font-semibold">{product.detailedInfo.brand}</p>
                      </div>
                    )}
                    {product.detailedInfo?.origin && (
                      <div>
                        <p className="text-white/80 text-sm mb-1">Xuất xứ</p>
                        <p className="text-white font-semibold">{product.detailedInfo.origin}</p>
                      </div>
                    )}
                    {product.detailedInfo?.fruitType && (
                      <div>
                        <p className="text-white/80 text-sm mb-1">Loại trái cây</p>
                        <p className="text-white font-semibold">{product.detailedInfo.fruitType}</p>
                      </div>
                    )}
                    {product.detailedInfo?.storageInstructions && (
                      <div>
                        <p className="text-white/80 text-sm mb-1">Hướng dẫn bảo quản</p>
                        <p className="text-white font-semibold">{product.detailedInfo.storageInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info Box */}
                <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
                  {/* Category */}
                  <p className="text-sm text-gray-500 mb-4">{product.category}</p>

                  {/* Đặc điểm nổi bật */}
                  <div className="mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                      Đặc điểm nổi bật
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="text-[#00652E] mt-1.5">•</span>
                          <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cách xuất khẩu */}
                  <div className="mb-6">
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

                  {/* Call to Action Button */}
                  <button className="button-primary w-full inline-flex items-center justify-center gap-2">
                    <span>Liên hệ báo giá</span>
                    <LiaTelegramPlane className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Full Content Sections */}
            <div className="space-y-8 md:space-y-12">
              {/* Section 1: Chất lượng tạo nên thương hiệu */}
              {product.qualityDescription && (
                <div className="bg-gradient-to-br from-[#E6F7ED] to-white rounded-2xl p-6 md:p-8 lg:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-4">
                    Chất lượng tạo nên thương hiệu
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {product.qualityDescription}
                  </p>
                </div>
              )}

              {/* Section 2: Tiêu chuẩn & Chứng nhận */}
              {product.certifications && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 lg:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6">
                    Tiêu chuẩn & Chứng nhận
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    Tấn Phát Food giám sát nghiêm ngặt từ khâu canh tác, thu hoạch, chế biến đến đóng gói. Các chứng nhận và tiêu chuẩn quốc tế đảm bảo chất lượng và an toàn thực phẩm tuyệt đối.
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
                    {product.certifications.co && (
                      <div className="bg-[#E6F7ED] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#00652E] mb-2">C/O</div>
                        <p className="text-sm text-gray-700">Giấy chứng nhận xuất xứ: {product.certifications.co}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section 3: Thị trường & Năng lực cung ứng */}
              {(product.markets || product.supplyCapacity) && (
                <div className="bg-gradient-to-br from-white to-[#E6F7ED] rounded-2xl p-6 md:p-8 lg:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6">
                    Thị trường & Năng lực cung ứng
                  </h2>
                  {product.markets && product.markets.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                        Thị trường xuất khẩu
                      </h3>
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
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                        Năng lực cung ứng
                      </h3>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Tấn Phát Food đảm bảo năng lực cung ứng <strong className="text-[#00652E]">{product.supplyCapacity}</strong>, 
                        đảm bảo giao hàng đúng hẹn, chất lượng và logistics tối ưu cho đối tác quốc tế.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Full Description */}
              {product.fullDescription && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 lg:p-10">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}
