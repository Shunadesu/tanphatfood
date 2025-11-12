'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GardenLibraryHeroSection from '@/components/GardenLibraryHeroSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface GardenImage {
  id: number
  image: string
  alt: string
  title?: string
  description?: string
}

export default function GardenLibraryPage() {
  const [selectedImage, setSelectedImage] = useState<GardenImage | null>(null)

  const gardenImages: GardenImage[] = [
    {
      id: 1,
      image: '/images/thuviennhavuon/nhavuon_1.png',
      alt: 'Vườn chuối Tấn Phát Food',
      title: 'Vườn chuối',
      description: 'Vườn chuối được chăm sóc theo tiêu chuẩn GlobalG.A.P, đảm bảo chất lượng và an toàn thực phẩm',
    },
    {
      id: 2,
      image: '/images/thuviennhavuon/nhavuon_2.png',
      alt: 'Vườn sầu riêng Tấn Phát Food',
      title: 'Vườn sầu riêng',
      description: 'Vườn sầu riêng với giống cây trồng chất lượng cao, đáp ứng tiêu chuẩn xuất khẩu',
    },
    {
      id: 3,
      image: '/images/thuviennhavuon/nhavuon_3.png',
      alt: 'Vườn thanh long Tấn Phát Food',
      title: 'Vườn thanh long',
      description: 'Thanh long được trồng và chăm sóc theo quy trình nghiêm ngặt, đảm bảo độ tươi ngon và chất lượng',
    },
    {
      id: 4,
      image: '/images/thuviennhavuon/nhavuon_4.png',
      alt: 'Vườn bưởi Tấn Phát Food',
      title: 'Vườn bưởi',
      description: 'Vườn bưởi với hệ thống tưới tiêu hiện đại, đảm bảo năng suất và chất lượng cao',
    },
    {
      id: 5,
      image: '/images/thuviennhavuon/nhavuon_5.png',
      alt: 'Vườn dừa Tấn Phát Food',
      title: 'Vườn dừa',
      description: 'Vườn dừa được quản lý theo tiêu chuẩn VietGAP, đảm bảo an toàn và chất lượng sản phẩm',
    },
    {
      id: 6,
      image: '/images/thuviennhavuon/nhavuon_6.png',
      alt: 'Vườn chanh Tấn Phát Food',
      title: 'Vườn chanh',
      description: 'Vườn chanh với quy trình canh tác bền vững, đảm bảo chất lượng và môi trường',
    },
  ]

  const openLightbox = (image: GardenImage) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return

    const currentIndex = gardenImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex: number

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : gardenImages.length - 1
    } else {
      newIndex = currentIndex < gardenImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(gardenImages[newIndex])
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedImage) return

    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev')
    } else if (e.key === 'ArrowRight') {
      navigateImage('next')
    }
  }

  return (
    <div className="min-h-screen bg-white" onKeyDown={handleKeyDown} tabIndex={0}>
      <Header />
      <main>
        {/* Hero Section */}
        <GardenLibraryHeroSection />

        {/* Gallery Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-[#E6F7ED] via-white to-[#E6F7ED]">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-10 md:mb-12 lg:mb-16">
              <h2 className="title !mb-4">Thư viện Nhà vườn Tấn Phát Food</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Sản phẩm chuẩn chất lượng được chọn lọc theo tiêu chuẩn, tươi ngon từ vùng trồng năng suất cao.
                Khám phá những vườn cây trái được chăm sóc kỹ lưỡng, đảm bảo chất lượng xuất khẩu.
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
              {gardenImages.map((item) => (
                <div
                  key={item.id}
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 rounded-lg px-4 py-2">
                        <p className="text-sm font-semibold text-gray-900">Xem chi tiết</p>
                      </div>
                    </div>
                  </div>
                  {/* Title overlay */}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-[#00652E] mb-6 text-center">
                  Tiêu chuẩn chất lượng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#00652E] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">GlobalG.A.P</h4>
                      <p className="text-gray-600 text-sm">
                        Chứng nhận thực hành nông nghiệp tốt toàn cầu, đảm bảo an toàn thực phẩm và bền vững môi trường
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#00652E] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">HACCP</h4>
                      <p className="text-gray-600 text-sm">
                        Hệ thống phân tích mối nguy và điểm kiểm soát quan trọng, đảm bảo an toàn thực phẩm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#00652E] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">VietGAP</h4>
                      <p className="text-gray-600 text-sm">
                        Tiêu chuẩn thực hành nông nghiệp tốt tại Việt Nam, đảm bảo chất lượng và an toàn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#00652E] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Quy trình chăm sóc</h4>
                      <p className="text-gray-600 text-sm">
                        Quy trình chăm sóc cây trồng được kiểm soát chặt chẽ, từ gieo trồng đến thu hoạch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Đóng"
          >
            <HiX className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            className="absolute left-4 md:left-8 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            aria-label="Ảnh trước"
          >
            <HiChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            className="absolute right-4 md:right-8 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            aria-label="Ảnh tiếp theo"
          >
            <HiChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          {/* Image Container */}
          <div
            className="max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Image Info */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="mt-6 text-center text-white max-w-2xl">
                {selectedImage.title && (
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-base md:text-lg text-gray-300">{selectedImage.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-4">
                  {gardenImages.findIndex((img) => img.id === selectedImage.id) + 1} / {gardenImages.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

