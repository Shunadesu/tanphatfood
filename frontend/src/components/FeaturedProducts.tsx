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
    <section className="py-20 bg-[#ECFFF3]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="title">
            Danh mục sản phẩm tiêu biểu
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Từ những nông trại đạt chuẩn GlobalG.A.P, Tấn Phát Food cung cấp
            đa dạng các loại trái cây tươi được yêu thích tại thị trường quốc
            tế.
          </p>
        </div>

        {/* Product Cards */}
        <div className="space-y-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`flex flex-col ${
                  product.imagePosition === 'left'
                    ? 'lg:flex-row'
                    : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full h-80 lg:h-[600px] border-[5px] border-white/80 rounded-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    {product.imagePosition === 'left' && (
                      <div className="bg-white w-1/2 h-auto absolute top-8 right-4 bottom-6 md:bottom-8 lg:bottom-10 p-6 md:p-8 lg:p-10 rounded-3xl flex flex-col shadow-lg">
                        {/* Header: Logo và Số */}
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <div className="flex-shrink-0">
                            <img src="/images/global_gap.png" alt="Global Gap" className="w-28 h-28 md:w-32 md:h-32 object-contain" />
                          </div>
                          <h3 className="title-number mb-0">
                            {product.number}
                          </h3>
                        </div>
                        
                        {/* Tiêu đề */}
                        <h3 className="title-secondary mb-4 md:mb-6 text-right"> 
                          {product.title}
                        </h3>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                          {product.description}
                        </p>
                        
                        {/* Nút CTA */}
                        <div className='flex justify-end'>
                          <button className="button-primary self-start flex items-center gap-2">
                            Khám phá sản phẩm
                            <HiArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                    {product.imagePosition === 'right' && (
                      <div className="bg-white w-1/2 h-auto absolute top-8 left-4 bottom-6 md:bottom-8 lg:bottom-10 p-6 md:p-8 lg:p-10 rounded-3xl flex flex-col shadow-lg">
                        {/* Header: Logo và Số */}
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <h3 className="title-number mb-0">
                            {product.number}
                          </h3>
                          <div className="flex-shrink-0">
                            <img src="/images/global_gap.png" alt="Global Gap" className="w-28 h-28 md:w-32 md:h-32 object-contain" />
                          </div>
                          
                        </div>
                        
                        {/* Tiêu đề */}
                        <h3 className="title-secondary mb-4 md:mb-6 text-left"> 
                          {product.title}
                        </h3>
                        
                        {/* Mô tả */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                          {product.description}
                        </p>
                        
                        {/* Nút CTA */}
                        <button className="button-primary self-start flex items-center gap-2">
                          Khám phá sản phẩm
                          <HiArrowRight className="w-5 h-5" />
                        </button>
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

