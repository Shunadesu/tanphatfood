'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  id: number | string
  title: string
  description: string
  image: string
  slug: string
  category?: 'fresh' | 'dried' | 'powder' // Thêm prop để xác định category
}

const ProductCard = ({ id, title, description, image, slug, category = 'fresh' }: ProductCardProps) => {
      // All products now use the unified route
      const href = `/san-pham/${slug}`
  
  return (
    <Link href={href} className="group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
        {/* Image Container - Top Section */}
        <div className="relative w-full flex-[1.4] bg-gray-200 min-h-[240px]">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.jpg'
              }}
            />
          </div>
          {/* Logo Badge - Top Left */}
          <div className="absolute top-0 left-0 bg-white rounded-br-xl px-3 py-2 shadow-md z-10">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="w-10 h-10" />
          </div>
        </div>

        {/* Content Section - Bottom */}
        <div className="bg-white p-5 md:p-6 flex flex-col">
          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00652E] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-900 text-sm md:text-base leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard

