'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import ProductCard from '@/components/ProductCard'
import { productsApi } from '@/services/api'

interface Product {
  id: string
  title: string
  description: string
  shortDescription?: string
  image: string
  slug: string
  type: 'fresh' | 'dried' | 'powder'
}

const DriedFruitsSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productsApi.getAll({
          type: 'dried',
          isActive: true,
          limit: 6,
        })

        if (response.success) {
          // Backend returns: { success: true, data: [...], count, total, page, pages }
          let productsData: Product[] = []
          
          if (Array.isArray(response.data)) {
            productsData = response.data
          } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
            // Nested structure
            productsData = Array.isArray((response.data as any).data) 
              ? (response.data as any).data 
              : []
          }
          
          setProducts(productsData)
        }
      } catch (error) {
        console.error('Error fetching dried products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-white via-[#E6F7ED]/30 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="title !mb-4">
            Trái cây sấy xuất khẩu
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Tấn Phát Food ứng dụng công nghệ sấy lạnh hiện đại, giữ nguyên màu sắc và dinh dưỡng của trái cây tươi.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-2xl h-80" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.shortDescription || product.description || ''}
                image={product.image || '/images/placeholder.jpg'}
                slug={product.slug}
                category="dried"
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
            href="/products/dried"
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

export default DriedFruitsSection

