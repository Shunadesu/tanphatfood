'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi'
import { bannersApi } from '@/services/api'

interface BreadcrumbItem {
  label: string
  href: string | null
}

interface HeroSectionWithBreadcrumbProps {
  page: string
  breadcrumbItems: BreadcrumbItem[]
  fallbackImage?: string
}

const HeroSectionWithBreadcrumb = ({
  page,
  breadcrumbItems,
  fallbackImage = '/images/bg-layout.jpg',
}: HeroSectionWithBreadcrumbProps) => {
  const [banner, setBanner] = useState<{
    image?: string
    title?: string
    subtitle?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true)
        const response = await bannersApi.getByPage(page)
        if (response.success && response.data) {
          setBanner({
            image: response.data.image,
            title: response.data.title,
            subtitle: response.data.subtitle,
          })
        }
      } catch (error) {
        console.error('Error fetching banner:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBanner()
  }, [page])

  const backgroundImage = banner?.image || fallbackImage

  return (
    <>
      <section 
        className="relative min-h-[50vh] lg:min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="container w-full h-full mx-auto px-4 max-w-7xl relative z-10">
          {/* Optional Title and Subtitle */}
          {(banner?.title || banner?.subtitle) && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
              {banner?.title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>
              )}
              {banner?.subtitle && (
                <p className="text-lg md:text-xl text-white/90">
                  {banner.subtitle}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="absolute z-10 bottom-0 right-0 left-0 flex items-center justify-center gap-2 text-sm mb-4">
            <div className="w-fit bg-white rounded-xl p-2 flex items-center justify-center gap-2 shadow-md">
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#00652E] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[#00652E] font-semibold">
                      {item.label}
                    </span>
                  )}
                  {index < breadcrumbItems.length - 1 && (
                    <HiChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
    </>
  )
}

export default HeroSectionWithBreadcrumb

