'use client'

import { useParams, useRouter } from 'next/navigation'
import { getHandbookBySlug } from '@/data/mockHandbook'
import { HiArrowLeft, HiCalendar, HiUser } from 'react-icons/hi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'

export default function HandbookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const article = getHandbookBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bài viết không tồn tại</h1>
          <button
            onClick={() => router.push('/handbook')}
            className="button-primary"
          >
            Về trang cẩm nang
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Article Header */}
        <article className="py-8 md:py-12 mt-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Category */}
            {article.category && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-[#00652E]/10 text-[#00652E] rounded-full text-sm font-semibold">
                  {article.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-6 border-b border-gray-200">
              {article.author && (
                <div className="flex items-center gap-2 text-gray-600">
                  <HiUser className="w-5 h-5" />
                  <span className="text-sm md:text-base">{article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <HiCalendar className="w-5 h-5" />
                <span className="text-sm md:text-base">Ngày {article.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.jpg'
                }}
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-[#00652E] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ul:ml-6
                prose-ol:text-gray-700 prose-ol:ml-6
                prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={() => router.back()}
                className="button-primary-outline inline-flex items-center gap-2"
              >
                <HiArrowLeft className="w-5 h-5" />
                <span>Quay lại danh sách cẩm nang</span>
              </button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}

