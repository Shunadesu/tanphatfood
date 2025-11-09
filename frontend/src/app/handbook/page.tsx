'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HandbookHeroSection from '@/components/HandbookHeroSection'
import ArticleCard from '@/components/ArticleCard'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { HiChevronRight, HiSearch, HiX } from 'react-icons/hi'
import { newsApi } from '@/services/api'

interface Article {
  id: string
  title: string
  description: string
  image: string
  date: string
  slug: string
  category?: string
}

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState<Article[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const articlesPerPage = 12

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await newsApi.getAll({
          page: currentPage,
          limit: articlesPerPage,
          isPublished: true,
          search: searchQuery.trim() || undefined,
        })

        if (response.success && response.data) {
          // Handle both array and nested data structure
          const responseData = response.data as any
          const articlesData = Array.isArray(responseData) ? responseData : (responseData?.data || [])
          
          // Transform news data to article format
          const transformedArticles: Article[] = articlesData.map((news: any) => ({
            id: String(news.id || news._id),
            title: news.title,
            description: news.excerpt || news.description || '',
            image: news.image || news.thumbnail || '',
            date: news.publishedAt || news.createdAt || news.date || '',
            slug: news.slug,
            category: news.category,
          }))

          setArticles(transformedArticles)
          
          // Get total pages from response
          const pagesFromApi = (response as any).pages || responseData?.pages || 1
          setTotalPages(pagesFromApi)
        } else {
          setError(response.message || 'Không thể tải bài viết')
          setArticles([])
        }
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Đã xảy ra lỗi khi tải bài viết')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [currentPage, searchQuery])

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

  // Get unique categories from articles
  const categories = useMemo(() => {
    const cats = articles
      .map((article) => article.category)
      .filter((cat): cat is string => cat !== undefined)
    return Array.from(new Set(cats))
  }, [articles])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <HandbookHeroSection />

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

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00652E]"></div>
                <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setCurrentPage(1)
                    setSearchQuery('')
                    window.location.reload()
                  }}
                  className="button-primary"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Results Count */}
            {!loading && !error && (
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Tìm thấy <span className="font-bold text-[#00652E]">{articles.length}</span>{' '}
                  bài viết
                  {searchQuery && (
                    <span>
                      {' '}
                      cho từ khóa &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Articles Grid */}
            {!loading && !error && articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                  {articles.map((article) => (
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
                      disabled={currentPage === 1 || loading}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === 1 || loading
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
            ) : !loading && !error ? (
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
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}
