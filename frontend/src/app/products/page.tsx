'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductsHeroSection from '@/components/ProductsHeroSection'
import ProductCard from '@/components/ProductCard'
import QuoteSection from '@/components/QuoteSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { HiChevronRight, HiSearch, HiX } from 'react-icons/hi'
import { getAllProducts, getAllFreshProducts, getAllDriedProducts, getAllPowderProducts } from '@/data/mockProducts'

type ProductCategory = 'all' | 'fresh' | 'dried' | 'powder'

interface UnifiedProduct {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category: ProductCategory
  categoryName: string
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Combine all products
  const allProducts: UnifiedProduct[] = useMemo(() => {
    const fresh = getAllFreshProducts().map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      slug: p.slug,
      category: 'fresh' as ProductCategory,
      categoryName: p.category,
    }))

    const dried = getAllDriedProducts().map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      slug: p.slug,
      category: 'dried' as ProductCategory,
      categoryName: p.category,
    }))

    const powder = getAllPowderProducts().map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image,
      slug: p.slug,
      category: 'powder' as ProductCategory,
      categoryName: p.category,
    }))

    return [...fresh, ...dried, ...powder]
  }, [])

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allProducts, selectedCategory, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filter/search changes
  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pages = []
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

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', count: allProducts.length },
    { id: 'fresh', name: 'Trái cây tươi', count: allProducts.filter((p) => p.category === 'fresh').length },
    { id: 'dried', name: 'Trái cây sấy', count: allProducts.filter((p) => p.category === 'dried').length },
    { id: 'powder', name: 'Bột trái cây', count: allProducts.filter((p) => p.category === 'powder').length },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <ProductsHeroSection />
        
        {/* Breadcrumb Section */}
        <section className="relative py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className='w-fit bg-white rounded-xl p-2 flex items-center justify-center gap-2 shadow-md'>
              <Link
                href="/"
                className="text-gray-600 hover:text-[#00652E] transition-colors"
              >
                Trang chủ
              </Link>
              <HiChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#00652E] font-semibold">
                Sản phẩm
              </span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Title */}
            <div className="text-center mb-10 md:mb-12">
              <h1 className="title !mb-4">
                Sản phẩm của chúng tôi
              </h1>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                Khám phá bộ sưu tập nông sản chất lượng cao từ Tấn Phát Food
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id as ProductCategory)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-[#00652E] text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#00652E] hover:text-[#00652E]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Tìm thấy <span className="font-bold text-[#00652E]">{filteredProducts.length}</span> sản phẩm
                {searchQuery && (
                  <span>
                    {' '}cho từ khóa &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </p>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={`${product.category}-${product.id}`}
                      id={product.id}
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      slug={product.slug}
                      category={product.category !== 'all' ? product.category : undefined}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#00652E] hover:bg-[#00652E] hover:text-white'
                      }`}
                    >
                      <HiChevronRight className="w-5 h-5 rotate-180" />
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
                            className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                              currentPage === page
                                ? 'bg-[#00652E] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === totalPages
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
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">
                  Không tìm thấy sản phẩm nào
                </p>
                <p className="text-gray-500 mb-6">
                  Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setCurrentPage(1)
                  }}
                  className="button-primary"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quote Section */}
        <QuoteSection />
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}

