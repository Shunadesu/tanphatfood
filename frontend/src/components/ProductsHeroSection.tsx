'use client'

import Link from 'next/link'
import { LiaTelegramPlane } from 'react-icons/lia'

const ProductsHeroSection = () => {
  return (
    <section className="relative bg-white min-h-[95vh] flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-br-[70px] rounded-bl-[70px] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero_images.png)' }}
        />
        {/* Overlay gradient - từ trái sang phải */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-0 bg-gradient-to-t from-[#00652E]/90 via-[#00652E]/70 to-transparent rounded-br-[70px] rounded-bl-[70px] overflow-hidden h-[250px]">
        <div className='container mx-auto z-20 flex items-center justify-center absolute bottom-0 left-0 right-0'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Panel 1: Trái cây tươi xuất khẩu */}
            <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
                TRÁI CÂY TƯƠI XUẤT KHẨU
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
                Sầu riêng, thanh long, chuối, bưởi và nhiều loại trái cây tươi ngon đạt chuẩn quốc tế, được tuyển chọn từ những vùng trồng tốt nhất.
              </p>
            </div>

            {/* Panel 2: Trái cây sấy & đông lạnh */}
            <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
                TRÁI CÂY SẤY & ĐÔNG LẠNH
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
                Sầu riêng sấy, chuối sấy, xoài sấy và nhiều loại trái cây sấy khác, giữ nguyên hương vị và dinh dưỡng tự nhiên.
              </p>
            </div>

            {/* Panel 3: Bột trái cây tự nhiên */}
            <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
                BỘT TRÁI CÂY TỰ NHIÊN
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
                Bột chuối, bột thanh long, bột sầu riêng và nhiều loại bột trái cây khác, phù hợp cho ngành F&B và sản xuất thực phẩm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 mb-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Sản phẩm của Tấn Phát Food
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Khám phá bộ sưu tập nông sản chất lượng cao, đạt chuẩn quốc tế từ Việt Nam
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/gioi-thieu"
              className="button-primary inline-flex items-center gap-2"
            >
              <span>Tìm hiểu về chúng tôi</span>
              <LiaTelegramPlane className="w-5 h-5" />
            </Link>
            <Link
              href="/lien-he"
              className="button-secondary"
            >
              Liên hệ báo giá
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsHeroSection

