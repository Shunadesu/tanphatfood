'use client'

import Link from 'next/link'
import { LiaTelegramPlane } from 'react-icons/lia'

const HeroSection = () => {
  return (
    <section className="relative bg-white min-h-[95vh] flex items-center justify-center pt-20 ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-br-[70px] rounded-bl-[70px] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: 'url(/images/hero/hero_images.png)' }}
        />
        {/* Overlay gradient - từ trái sang phải */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-0 bg-gradient-to-t from-[#00652E]/90 via-[#00652E]/70 to-transparent rounded-br-[70px] rounded-bl-[70px] overflow-hidden h-[250px]">
       <div className='container mx-auto z-20 flex items-center justify-center absolute bottom-0 left-0 right-0'>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
           {/* Panel 1: Sản phẩm chuẩn chất lượng */}
           <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
             <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
               SẢN PHẨM CHUẨN CHẤT LƯỢNG
             </h3>
             <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
               Tấn Phát đảm bảo quy trình canh tác – chế biến – xuất khẩu đạt chuẩn quốc tế.
             </p>
           </div>

           {/* Panel 2: Vùng nguyên liệu đạt chuẩn */}
           <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
             <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
               VÙNG NGUYÊN LIỆU ĐẠT CHUẨN
             </h3>
             <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
               Liên kết trực tiếp với nông trại sạch, truy xuất nguồn gốc vùng trồng rõ ràng.
             </p>
           </div>

           {/* Panel 3: Đối tác quốc tế đáng tin cậy */}
           <div className="bg-[#00652E] rounded-tl-[40px] rounded-tr-[40px] p-6 text-center border border-white/20 shadow-lg shadow-black/30 flex flex-col items-start">
             <h3 className="text-lg md:text-xl font-bold text-white uppercase mb-3">
               ĐỐI TÁC QUỐC TẾ ĐÁNG TIN CẬY
             </h3>
             <p className="text-sm md:text-base text-white/90 leading-relaxed text-left">
               Chúng tôi cung ứng nông sản chất lượng cao cho thị trường châu Á và châu Âu, hơn 30 quốc gia và vùng lãnh thổ.
             </p>
           </div>
         </div>
       </div>
      </div> 

      {/* Content - Left aligned */}
      <div className="container mx-auto relative z-20 mb-28">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Hương vị tinh túy từ nông sản Việt Nam.
          </h1>

          {/* Subheading */}
          <p className="text-base text-white/80 mb-10 leading-relaxed max-w-3xl drop-shadow-md">
            Tấn Phát Food mang đến những loại trái cây tươi ngon, đạt chuẩn
            quốc tế – được tuyển chọn từ những vùng trồng tốt nhất Việt Nam.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className='button-primary flex items-center gap-2'>
                Khám phá sản phẩm
                <LiaTelegramPlane className='w-5 h-5' />
              </button>
              <button className='button-secondary'>
                Liên hệ báo giá
              </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

