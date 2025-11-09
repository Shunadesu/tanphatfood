'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import ProductCard from '@/components/ProductCard'
import { useProductsStore } from '@/store/productsStore'

const FreshFruitsSection = () => {
  const products = useProductsStore((state) => state.productsByType.fresh)
  const loading = useProductsStore((state) => state.loading)
  const fetchProductsByType = useProductsStore((state) => state.fetchProductsByType)
  const initializeFromStorage = useProductsStore((state) => state.initializeFromStorage)

  useEffect(() => {
    // Initialize from storage first
    initializeFromStorage()
    
    // Fetch products if not already loaded
    fetchProductsByType('fresh', { limit: 6 })
  }, [fetchProductsByType, initializeFromStorage])
  
  // Get only first 6 products for display
  const displayProducts = products.slice(0, 6)

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
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
                category="fresh"
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
            href="/san-pham/trai-cay-tuoi"
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

