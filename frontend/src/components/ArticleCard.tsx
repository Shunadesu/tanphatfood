'use client'

import Link from 'next/link'

interface ArticleCardProps {
  id: number
  title: string
  description: string
  image: string
  date: string
  slug: string
  category?: string
  basePath?: string // Path base cho link, default là '/handbook'
}

const ArticleCard = ({ 
  id, 
  title, 
  description, 
  image, 
  date, 
  slug, 
  category,
  basePath = '/handbook'
}: ArticleCardProps) => {
  return (
    <Link href={`${basePath}/${slug}`} className="block h-full">
      <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group h-full cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full flex-[1.4] bg-gray-200 min-h-[240px]">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          {/* Logo Badge - Top Left */}
          <div className="absolute top-0 left-0 bg-white rounded-br-3xl px-3 py-2 shadow-md z-10">
            <img src="/images/logo.png" alt="Logo" className="w-12 h-12" />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-5 md:p-6 flex flex-col flex-1">
          {/* Category */}
          {category && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-[#00652E]/10 text-[#00652E] rounded-full text-xs font-semibold">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00652E] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
            {description}
          </p>

          {/* Bottom Row: Button and Date */}
          <div className="flex items-center justify-between gap-4 mt-auto pt-2">
            {/* CTA Button */}
            <span className="button-primary-outline whitespace-nowrap flex-shrink-0 text-sm">
              Xem chi tiết
            </span>
            {/* Date */}
            <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
              Ngày {date}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ArticleCard

