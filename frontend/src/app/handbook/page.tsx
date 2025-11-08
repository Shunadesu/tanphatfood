'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HandbookHeroSection from '@/components/HandbookHeroSection'
import ArticleCard from '@/components/ArticleCard'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { HiChevronRight, HiSearch, HiX } from 'react-icons/hi'
import { getAllHandbook } from '@/data/mockHandbook'

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 12

  const allArticles = getAllHandbook()

  // Filter articles by search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return allArticles
    }

    const query = searchQuery.toLowerCase().trim()
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        (article.category && article.category.toLowerCase().includes(query))
    )
  }, [allArticles, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  // Reset to page 1 when search changes
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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = allArticles
      .map((article) => article.category)
      .filter((cat): cat is string => cat !== undefined)
    return Array.from(new Set(cats))
  }, [allArticles])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <HandbookHeroSection />

        {/* Breadcrumb Section */}
        <section className="relative py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-fit bg-white rounded-xl p-2 flex items-center justify-center gap-2 shadow-md">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-[#00652E] transition-colors"
                >
                  Trang chủ
                </Link>
                <HiChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-[#00652E] font-semibold">Cẩm nang</span>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Title */}
            <div className="text-center mb-10 md:mb-12">
              <h1 className="title !mb-4">Cẩm nang xuất khẩu nông sản</h1>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                Kiến thức và kinh nghiệm về nông sản xuất khẩu, quy trình sản xuất, bảo quản và
                các tiêu chuẩn chất lượng
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
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

            {/* Results Count */}
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Tìm thấy <span className="font-bold text-[#00652E]">{filteredArticles.length}</span>{' '}
                bài viết
                {searchQuery && (
                  <span>
                    {' '}
                    cho từ khóa &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </p>
            </div>

            {/* Articles Grid */}
            {paginatedArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                  {paginatedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      description={article.description}
                      image={article.image}
                      date={article.date}
                      slug={article.slug}
                      category={article.category}
                      basePath="/handbook"
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
                <p className="text-xl text-gray-600 mb-4">Không tìm thấy bài viết nào</p>
                <p className="text-gray-500 mb-6">
                  Vui lòng thử lại với từ khóa khác
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
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
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}

