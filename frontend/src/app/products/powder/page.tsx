'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import QuoteSection from '@/components/QuoteSection'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi'
import { useState } from 'react'
import ConnectionSection from '@/components/ConnectionSection'
import ProcessSection from '@/components/ProcessSection'
import NewsSection from '@/components/NewsSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { getAllPowderProducts } from '@/data/mockProducts'

export default function PowderFruitsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const products = getAllPowderProducts()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // window.scrollTo({ top: 0, behavior: 'smooth' })
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
              <span className="text-[#00652E] font-semibold">
                Bột trái cây xuất khẩu
              </span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center">
            {/* Title */}
            <h1 className="title !mb-10 md:!mb-12">
              Bột trái cây xuất khẩu
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
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

