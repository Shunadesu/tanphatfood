'use client'

import { HiPlus } from 'react-icons/hi'

const GardenLibrarySection = () => {
  const gardenImages = [
    {
      id: 1,
      image: '/images/thuviennhavuon/nhavuon_1.png',
      alt: 'Vườn chuối Tấn Phát Food',
    },
    {
      id: 2,
      image: '/images/thuviennhavuon/nhavuon_2.png',
      alt: 'Vườn sầu riêng Tấn Phát Food',
    },
    {
      id: 3,
      image: '/images/thuviennhavuon/nhavuon_3.png',
      alt: 'Vườn thanh long Tấn Phát Food',
    },
    {
      id: 4,
      image: '/images/thuviennhavuon/nhavuon_4.png',
      alt: 'Vườn bưởi Tấn Phát Food',
    },
    {
      id: 5,
      image: '/images/thuviennhavuon/nhavuon_5.png',
      alt: 'Vườn dừa Tấn Phát Food',
    },
    {
      id: 6,
      image: '/images/thuviennhavuon/nhavuon_6.png',
      alt: 'Vườn chanh Tấn Phát Food',
    },
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#E6F7ED] via-white to-[#E6F7ED] py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="title !mb-4">
            Thư viện Nhà vườn Tấn Phát Food
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Sản phẩm chuẩn chất lượng được chọn lọc theo tiêu chuẩn, tươi ngon từ vùng trồng năng suất cao.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          {gardenImages.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="aspect-16/9 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="button-primary inline-flex items-center gap-2">
            <span>Xuất khẩu Nông sản</span>
            <HiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default GardenLibrarySection

