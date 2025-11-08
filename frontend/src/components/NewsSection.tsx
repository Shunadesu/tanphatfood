'use client'

import { HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import { getAllNews } from '@/data/mockNews'

const NewsSection = () => {
  const news = getAllNews().slice(0, 6) // Hiển thị 6 bài viết đầu tiên

  return (
    <section className="relative py-16 md:py-20 bg-white">
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
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to gray background if image fails to load
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                {/* Logo Badge - Top Left */}
                <div className="absolute top-0 left-0 bg-white rounded-br-3xl px-3 py-2 shadow-md z-10">
                  <img src="/images/logo.png" alt="Global Gap" className="w-12 h-12" />
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
                  {item.description}
                </p>

                {/* Bottom Row: Button and Date */}
                <div className="flex items-center justify-between gap-4 mt-auto pt-2">
                  {/* CTA Button */}
                  <Link
                    href={`/news/${item.slug}`}
                    className="button-primary-outline whitespace-nowrap flex-shrink-0 text-sm"
                  >
                    Xem chi tiết
                  </Link>
                  {/* Date */}
                  <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                    Ngày {item.date}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="button-primary inline-flex items-center gap-2">
            <span>Xem thêm tin tức</span>
            <HiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewsSection

