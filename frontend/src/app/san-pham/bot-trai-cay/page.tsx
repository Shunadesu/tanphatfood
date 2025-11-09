'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import QuoteSection from '@/components/QuoteSection'
import HeroSectionWithBreadcrumb from '@/components/HeroSectionWithBreadcrumb'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import ConnectionSection from '@/components/ConnectionSection'
import ProcessSection from '@/components/ProcessSection'
import NewsSection from '@/components/NewsSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { productsApi } from '@/services/api'

interface Product {
  id: string
  title: string
  description: string
  image: string
  slug: string
  type: string
}

export default function PowderFruitsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const productsPerPage = 12

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productsApi.getAll({
          page: currentPage,
          limit: productsPerPage,
          type: 'powder',
          isActive: true,
        })

        if (response.success && response.data) {
          // Handle both array and nested data structure
          const responseData = response.data as any
          const productsData = Array.isArray(responseData) ? responseData : (responseData?.data || [])
          setProducts(productsData)
          
          // Get total pages from response
          const pagesFromApi = (response as any).pages || responseData?.pages || 1
          setTotalPages(pagesFromApi)
        } else {
          setError(response.message || 'Không thể tải sản phẩm')
          setProducts([])
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Đã xảy ra lỗi khi tải sản phẩm')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages - 1, totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-white flex flex-col gap-8">
      <Header />
      <main>
        {/* Hero Section with Breadcrumb */}
        <HeroSectionWithBreadcrumb
          page="products-powder"
          breadcrumbItems={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Sản phẩm', href: '/products' },
            { label: 'Bột trái cây xuất khẩu', href: null },
          ]}
        />

        {/* Product Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center">
            {/* Title */}
            <h1 className="title !mb-10 md:!mb-12">
              Bột trái cây xuất khẩu
            </h1>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00652E]"></div>
                <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setCurrentPage(1)
                    window.location.reload()
                  }}
                  className="button-primary"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Product Grid */}
            {!loading && !error && products.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 w-full">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      slug={product.slug}
                      category="powder"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 w-full max-w-4xl">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === 1 || loading
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#00652E] hover:bg-[#00652E] hover:text-white'
                      }`}
                    >
                      <HiChevronLeft className="w-5 h-5" />
                      <span>Trang trước</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">
                      {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                          return (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                              ...
                            </span>
                          )
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page as number)}
                            disabled={loading}
                            className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                              currentPage === page
                                ? 'bg-[#00652E] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === totalPages || loading
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#00652E] hover:bg-[#00652E] hover:text-white'
                      }`}
                    >
                      <span>Tiếp theo</span>
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-4">Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </div>
        </section>

        {/* Quote Section */}
      </main>
      <ConnectionSection />
      <ProcessSection />
        <QuoteSection />

      <NewsSection />
      <FloatingContactButtons />
      <ScrollToTop />
      <Footer />
    </div>
  )
}
