'use client'

import Link from 'next/link'
import { LiaTelegramPlane } from 'react-icons/lia'

const AboutHeroSection = () => {
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
            {/* Panel 1: Hơn 10 năm kinh nghiệm */}
            <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
                HƠN 10 NĂM KINH NGHIỆM
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
                Tấn Phát Food đã có hơn 10 năm hoạt động trong lĩnh vực xuất nhập khẩu nông sản, mang trái cây Việt Nam đến với các thị trường quốc tế.
              </p>
            </div>

            {/* Panel 2: Tiêu chuẩn quốc tế */}
            <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
                TIÊU CHUẨN QUỐC TẾ
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
                Chứng nhận GlobalG.A.P và HACCP đảm bảo chất lượng sản phẩm đạt chuẩn quốc tế, an toàn cho người tiêu dùng.
              </p>
            </div>

            {/* Panel 3: Mạng lưới toàn cầu */}
            <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
              <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
                MẠNG LƯỚI TOÀN CẦU
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
                Xuất khẩu đến hơn 30 quốc gia và vùng lãnh thổ, với đối tác tin cậy tại Nhật Bản, Hàn Quốc, Singapore, Trung Quốc và châu Âu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 mb-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Giới thiệu về Tấn Phát Food
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Đơn vị tiên phong mang nông sản Việt Nam chất lượng cao đến với thị trường quốc tế
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="button-primary inline-flex items-center gap-2"
            >
              <span>Xem sản phẩm</span>
              <LiaTelegramPlane className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="button-secondary"
            >
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHeroSection

