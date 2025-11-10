'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import ProductCard from '@/components/ProductCard'
import { useProductsStore } from '@/store/productsStore'

const PowderedFruitsSection = () => {
  const products = useProductsStore((state) => state.productsByType.powder)
  const loading = useProductsStore((state) => state.loading)
  const fetchProductsByType = useProductsStore((state) => state.fetchProductsByType)
  const initializeFromStorage = useProductsStore((state) => state.initializeFromStorage)

  useEffect(() => {
    // Initialize store and check cache version (will clear old cache if version mismatch)
    initializeFromStorage()
    
    // Always fetch fresh data from API to ensure latest products
    // Force fetch to bypass cache and get latest data
    fetchProductsByType('powder', { limit: 6, force: true })
  }, [fetchProductsByType, initializeFromStorage])
  
  // Get only first 6 products for display
  const displayProducts = products.slice(0, 6)

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="title !mb-4">
            Bột trái cây xuất khẩu
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Tấn Phát Food sản xuất từ 100% nguyên liệu tự nhiên, dễ hòa tan, phù hợp trong ngành thực phẩm và đồ uống.
          </p>
        </div>

        {/* Products Grid */}
        {loading && displayProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-2xl h-80" />
            ))}
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.shortDescription || product.description || ''}
                image={product.image || '/images/placeholder.jpg'}
                slug={product.slug}
                category="powder"
                isFeatured={product.isFeatured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Không có sản phẩm nào
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/san-pham/bot-trai-cay"
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

export default PowderedFruitsSection

