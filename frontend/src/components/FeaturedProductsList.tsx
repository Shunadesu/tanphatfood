'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
import { productsApi } from '@/services/api'

interface FeaturedProduct {
  id: string
  number: string
  title: string
  description: string
  imagePosition: 'left' | 'right'
  imageUrl: string
  link: string
}

const FeaturedProductsList = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productsApi.getFeatured(10) // Lấy tối đa 10 sản phẩm nổi bật
        
        if (response.success && response.data) {
          const responseData = response.data as any
          const productsData = Array.isArray(responseData) ? responseData : (responseData?.data || [])
          
          // Map dữ liệu từ API sang format hiện tại
          const mappedProducts: FeaturedProduct[] = productsData.map((product: any, index: number) => {
            // Tạo link từ slug hoặc type
            let link = '/san-pham'
            if (product.slug) {
              link = `/san-pham/${product.slug}`
            } else if (product.type === 'fresh') {
              link = '/san-pham/trai-cay-tuoi'
            } else if (product.type === 'dried') {
              link = '/san-pham/trai-cay-say'
            } else if (product.type === 'powder') {
              link = '/san-pham/bot-trai-cay'
            }

            return {
              id: product.id || product._id || String(index + 1),
              number: String(index + 1).padStart(2, '0'),
              title: product.title || product.name || '',
              description: product.description || product.shortDescription || '',
              imagePosition: index % 2 === 0 ? 'left' : 'right' as 'left' | 'right',
              imageUrl: product.image || product.images?.[0] || '/images/placeholder.jpg',
              link: link,
            }
          })
          
          setProducts(mappedProducts)
        } else {
          setError(response.message || 'Không thể tải sản phẩm nổi bật')
          setProducts([])
        }
      } catch (err) {
        console.error('Error fetching featured products:', err)
        setError('Đã xảy ra lỗi khi tải sản phẩm nổi bật')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-12 md:py-16 lg:py-20 ">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="title text-2xl md:text-3xl lg:text-4xl">
            Sản phẩm nổi bật
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4 px-4">
            Những sản phẩm được yêu thích và đánh giá cao từ khách hàng
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00652E]"></div>
            <p className="mt-4 text-gray-600">Đang tải sản phẩm nổi bật...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="button-primary"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Product Cards */}
        {!loading && !error && products.length > 0 && (
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`flex flex-col ${
                  product.imagePosition === 'left'
                    ? 'lg:flex-row'
                    : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px] border-[3px] md:border-[5px] border-white/80 rounded-xl md:rounded-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg'
                      }}
                    />
                    {product.imagePosition === 'left' && (
                      <div className="bg-white w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 h-auto absolute top-4 right-2 sm:top-6 sm:right-4 md:top-8 md:right-4 lg:right-4 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-2xl md:rounded-3xl flex flex-col shadow-lg">
                        {/* Header: Logo và Số */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                          <div className="flex-shrink-0">
                            <img 
                              src="/images/global_gap.png" 
                              alt="Global Gap" 
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain" 
                            />
                          </div>
                          <span className="title-number mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            {product.number}
                          </span>
                        </div>
                        
                        {/* Tiêu đề */}
                        <h2 className="title-secondary mb-3 sm:mb-4 md:mb-6 text-right text-lg sm:text-xl md:text-2xl lg:text-3xl"> 
                          {product.title}
                        </h2>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8 line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                          {product.description}
                        </p>
                        
                        {/* Nút CTA */}
                        <div className='flex justify-end mt-auto'>
                          <Link 
                            href={product.link}
                            className="button-primary self-start flex items-center gap-2 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3"
                          >
                            <span className="whitespace-nowrap">Khám phá sản phẩm</span>
                            <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          </Link>
                        </div>
                      </div>
                    )}
                    {product.imagePosition === 'right' && (
                      <div className="bg-white w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 h-auto absolute top-4 left-2 sm:top-6 sm:left-4 md:top-8 md:left-4 lg:left-4 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-2xl md:rounded-3xl flex flex-col shadow-lg">
                        {/* Header: Logo và Số */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                          <span className="title-number mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            {product.number}
                          </span>
                          <div className="flex-shrink-0">
                            <img 
                              src="/images/global_gap.png" 
                              alt="Global Gap" 
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain" 
                            />
                          </div>
                        </div>
                        
                        {/* Tiêu đề */}
                        <h2 className="title-secondary mb-3 sm:mb-4 md:mb-6 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl"> 
                          {product.title}
                        </h2>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8 line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                          {product.description}
                        </p>
                        
                        {/* Nút CTA */}
                        <div className='mt-auto'>
                          <Link 
                            href={product.link}
                            className="button-primary self-start flex items-center gap-2 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3"
                          >
                            <span className="whitespace-nowrap">Khám phá sản phẩm</span>
                            <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">Chưa có sản phẩm nổi bật nào</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProductsList

