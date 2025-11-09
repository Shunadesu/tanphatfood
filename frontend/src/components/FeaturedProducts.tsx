'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'
// import Image from 'next/image' // Uncomment khi có ảnh

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      number: '01',
      title: 'Trái cây tươi xuất khẩu',
      description:
        'Tấn Phát Food liên kết trực tiếp với các vùng nguyên liệu đạt chuẩn GlobalG.A.P, đảm bảo trái cây luôn được thu hoạch đúng độ chín, sơ chế và bảo quản theo quy trình khép kín. Chúng tôi cung cấp đa dạng các loại trái cây tươi như sầu riêng Ri6, bưởi da xanh, chuối già Nam Mỹ, xoài cát Hòa Lộc,… phục vụ cho thị trường xuất khẩu sang Trung Quốc, Hàn Quốc, Nhật Bản và châu Âu.',
      imagePosition: 'left',
      imageUrl: '/images/fresh-fruit.png',
      link: '/products/fresh',
    },
    {
      id: 2,
      number: '02',
      title: 'Trái cây sấy xuất khẩu',
      description:
        'Tấn Phát Food liên kết trực tiếp với các vùng nguyên liệu đạt chuẩn GlobalG.A.P, đảm bảo trái cây luôn được thu hoạch đúng độ chín, sơ chế và bảo quản theo quy trình khép kín. Chúng tôi cung cấp đa dạng các loại trái cây tươi như sầu riêng Ri6, bưởi da xanh, chuối già Nam Mỹ, xoài cát Hòa Lộc,… phục vụ cho thị trường xuất khẩu sang Trung Quốc, Hàn Quốc, Nhật Bản và châu Âu.',
      imagePosition: 'right',
      imageUrl: '/images/dried-fruits.jpg', // Placeholder - bạn sẽ thay sau
      link: '/products/dried',
    },
    {
      id: 3,
      number: '03',
      title: 'Bột Trái cây xuất khẩu',
      description:
        'Tấn Phát Food liên kết trực tiếp với các vùng nguyên liệu đạt chuẩn GlobalG.A.P, đảm bảo trái cây luôn được thu hoạch đúng độ chín, sơ chế và bảo quản theo quy trình khép kín. Chúng tôi cung cấp đa dạng các loại trái cây tươi như sầu riêng Ri6, bưởi da xanh, chuối già Nam Mỹ, xoài cát Hòa Lộc,… phục vụ cho thị trường xuất khẩu sang Trung Quốc, Hàn Quốc, Nhật Bản và châu Âu.',
      imagePosition: 'left',
      imageUrl: '/images/fruit-powder.jpg', // Placeholder - bạn sẽ thay sau
      link: '/products/powder',
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#ECFFF3]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="title text-2xl md:text-3xl lg:text-4xl">
            Danh mục sản phẩm tiêu biểu
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4 px-4">
            Từ những nông trại đạt chuẩn GlobalG.A.P, Tấn Phát Food cung cấp
            đa dạng các loại trái cây tươi được yêu thích tại thị trường quốc
            tế.
          </p>
        </div>

        {/* Product Cards */}
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`flex flex-col ${
                  product.imagePosition === 'left'
                    ? 'lg:flex-row'
                    : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px] border-[3px] md:border-[5px] border-white/80 rounded-xl md:rounded-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover" 
                    />
                    {product.imagePosition === 'left' && (
                      <div className="bg-white w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 h-auto absolute top-4 right-2 sm:top-6 sm:right-4 md:top-8 md:right-4 lg:right-4 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-2xl md:rounded-3xl flex flex-col shadow-lg">
                        {/* Header: Logo và Số */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                          <div className="flex-shrink-0">
                            <img 
                              src="/images/global_gap.png" 
                              alt="Global Gap" 
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain" 
                            />
                          </div>
                          <h3 className="title-number mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            {product.number}
                          </h3>
                        </div>
                        
                        {/* Tiêu đề */}
                        <h3 className="title-secondary mb-3 sm:mb-4 md:mb-6 text-right text-lg sm:text-xl md:text-2xl lg:text-3xl"> 
                          {product.title}
                        </h3>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8 line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                          {product.description}
                        </p>
                        
                        {/* Nút CTA */}
                        <div className='flex justify-end mt-auto'>
                          <Link 
                            href={product.link}
                            className="button-primary self-start flex items-center gap-2 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3"
                          >
                            <span className="whitespace-nowrap">Khám phá sản phẩm</span>
                            <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          </Link>
                        </div>
                      </div>
                    )}
                    {product.imagePosition === 'right' && (
                      <div className="bg-white w-[90%] sm:w-4/5 md:w-3/5 lg:w-1/2 h-auto absolute top-4 left-2 sm:top-6 sm:left-4 md:top-8 md:left-4 lg:left-4 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-2xl md:rounded-3xl flex flex-col shadow-lg">
                        {/* Header: Logo và Số */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                          <h3 className="title-number mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            {product.number}
                          </h3>
                          <div className="flex-shrink-0">
                            <img 
                              src="/images/global_gap.png" 
                              alt="Global Gap" 
                              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain" 
                            />
                          </div>
                        </div>
                        
                        {/* Tiêu đề */}
                        <h3 className="title-secondary mb-3 sm:mb-4 md:mb-6 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl"> 
                          {product.title}
                        </h3>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8 line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                          {product.description}
                        </p>
                        
                        {/* Nút CTA */}
                        <div className='mt-auto'>
                          <Link 
                            href={product.link}
                            className="button-primary self-start flex items-center gap-2 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3"
                          >
                            <span className="whitespace-nowrap">Khám phá sản phẩm</span>
                            <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

