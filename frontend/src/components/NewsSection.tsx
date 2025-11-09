'use client'

import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import { newsApi } from '@/services/api'
import Image from 'next/image'

interface News {
  id: string
  title: string
  shortDescription?: string
  description?: string
  featuredImage?: string
  image?: string
  slug: string
  publishedAt?: string
  date?: string
}

const NewsSection = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await newsApi.getAll({
          isPublished: true,
          limit: 6,
        })

        if (response.success) {
          // Backend returns: { success: true, data: [...], count, total, page, pages }
          let newsData: any[] = []
          
          if (Array.isArray(response.data)) {
            newsData = response.data
          } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
            // Nested structure
            newsData = Array.isArray((response.data as any).data) 
              ? (response.data as any).data 
              : []
          }
          
          // Format date if needed
          const formattedNews = newsData.map((item: any) => ({
            ...item,
            date: item.publishedAt 
              ? new Date(item.publishedAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              : item.date,
          }))
          
          setNews(formattedNews)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="title !mb-4">
            Tin tức & Thị trường xuất khẩu
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Hợp tác cùng nhiều doanh nghiệp tại Nhật Bản, Hàn Quốc, Thái Lan, Trung Quốc, EU.
          </p>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-3xl h-96" />
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
              >
                {/* Image Container - Top Section (55-60% height) */}
                <div className="relative w-full flex-[1.4] bg-gray-200 min-h-[240px]">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={item.featuredImage || item.image || '/images/placeholder.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg'
                      }}
                    />
                  </div>
                  {/* Logo Badge - Top Left */}
                  <div className="absolute top-0 left-0 bg-white rounded-br-3xl px-3 py-2 shadow-md z-10">
                    <Image src="/images/logo.png" alt="Logo" width={48} height={48} className="w-12 h-12" />
                  </div>
                </div>

                {/* Content Section - Bottom (40-45% height) */}
                <div className="bg-white p-5 md:p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#00652E] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
                    {item.shortDescription || item.description || ''}
                  </p>

                  {/* Bottom Row: Button and Date */}
                  <div className="flex items-center justify-between gap-4 mt-auto pt-2">
                    {/* CTA Button */}
                    <Link
                      href={`/tin-tuc/${item.slug}`}
                      className="button-primary-outline whitespace-nowrap flex-shrink-0 text-sm"
                    >
                      Xem chi tiết
                    </Link>
                    {/* Date */}
                    {item.publishedAt && (
                      <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(item.publishedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Không có tin tức nào
          </div>
        )}

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/tin-tuc"
            className="button-primary inline-flex items-center gap-2"
          >
            <span>Xem thêm tin tức</span>
            <HiPlus className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewsSection

