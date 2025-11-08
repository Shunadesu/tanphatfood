'use client'

import Link from 'next/link'
import { LiaTelegramPlane } from 'react-icons/lia'

const AboutSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#E6F7ED] via-white to-[#E6F7ED]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="title !mb-0">
              Lời giới thiệu về Tấn Phát Food
            </h2>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Với hơn 10 năm hoạt động trong lĩnh vực xuất nhập khẩu nông sản, Tấn Phát Food tự hào là đơn vị tiên phong mang trái cây Việt Nam đến với các thị trường quốc tế như Nhật Bản, Hàn Quốc, Singapore, và Trung Quốc.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              {/* Button 1: Tìm hiểu thêm - Green */}
              <Link
                href="/about"
                className="button-primary flex items-center gap-2"
              >
                <span>Tìm hiểu thêm</span>
                <LiaTelegramPlane className="w-5 h-5" />
              </Link>

              {/* Button 2: Liên hệ báo giá - White with green border */}
              <Link
                href="/contact"
                className="button-secondary"
              >
                Liên hệ báo giá!
              </Link>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative">
            {/* Main White Card */}
            <div className="bg-white rounded-[30px] p-8 md:p-10 lg:p-12 shadow-xl border border-gray-200 relative">
              {/* Logo công ty ở trên cùng, căn giữa */}
              <div className="flex flex-col items-center mb-8 md:mb-12">
                <div className="relative mb-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#00652E] to-[#00CB5C] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl md:text-5xl font-bold text-white">TP</span>
                  </div>
                  {/* Decorative leaves at base */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-[#00652E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-[#00652E]" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'scaleX(-1)' }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#00652E] uppercase">
                  TAN PHAT FOOD
                </h3>
              </div>

              {/* HACCP Badge - góc trên bên phải */}
              <div className="absolute top-4 right-4 bg-gradient-to-br from-[#00652E] to-[#004A1F] rounded-full p-4 md:p-6 shadow-xl z-20 w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center">
                <p className="text-[7px] md:text-[8px] text-white font-semibold text-center leading-tight mb-1">
                  FOOD SAFETY
                </p>
                <p className="text-xl md:text-2xl font-bold text-white mb-1">HACCP</p>
                <p className="text-[7px] md:text-[8px] text-white font-semibold text-center leading-tight">
                  100% GUARANTEE
                </p>
                <div className="flex space-x-1 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* GLOBALG.A.P. Badge - góc dưới bên phải */}
              <div className="absolute bottom-4 right-4 bg-white rounded-xl p-3 md:p-4 shadow-xl z-20 w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center border-2 border-gray-200">
                <img src="/images/global_gap.png" alt="GlobalG.A.P" className="w-12 h-12 md:w-16 md:h-16 object-contain mb-1" />
                <p className="text-[10px] md:text-xs font-bold text-[#00652E] text-center">GLOBALG.A.P.</p>
              </div>

              {/* 3 hình ảnh sản phẩm ở phía dưới cùng, sắp xếp hàng ngang */}
              <div className="flex gap-3 md:gap-4 mt-8 md:mt-12">
                {/* Hình 1: Hoa/nụ thanh long màu hồng */}
                <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🌸</span>
                  </div>
                </div>
                
                {/* Hình 2: Bát trái cây sấy khô và hạt */}
                <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🥜</span>
                  </div>
                </div>
                
                {/* Hình 3: Chùm sầu riêng treo trên cây */}
                <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🥭</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

