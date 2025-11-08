'use client'

import Link from 'next/link'
import { getAllFreshProducts } from '@/data/mockProducts'
import { HiPlus } from 'react-icons/hi'
import ProductCard from '@/components/ProductCard'

const FreshFruitsSection = () => {
  const freshProducts = getAllFreshProducts().slice(0, 6) // Lấy 6 sản phẩm đầu tiên

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="title !mb-4">
            Trái cây tươi xuất khẩu
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Từ những nông trại đạt chuẩn GlobalG.A.P, Tấn Phát Food cung cấp đa dạng các loại trái cây tươi được yêu thích tại thị trường quốc tế.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {freshProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              slug={product.slug}
              category="fresh"
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/products/fresh"
            className="button-primary inline-flex items-center gap-2"
          >
            Khám phá sản phẩm
            <HiPlus className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FreshFruitsSection

