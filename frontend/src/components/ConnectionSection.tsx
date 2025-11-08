'use client'

import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'

const ConnectionSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const fullContent = `Tấn Phát Food mang đến những sản phẩm nông sản Việt Nam chất lượng cao đến với thị trường quốc tế. Chúng tôi cam kết đảm bảo chất lượng từ khâu nguyên liệu đến khi xuất khẩu, với quy trình kiểm soát nghiêm ngặt.

Các loại trái cây tươi, sấy khô và bột trái cây được lựa chọn từ các nông trại đạt chuẩn GlobalG.A.P, chế biến tại các nhà máy đạt chứng nhận HACCP, đảm bảo đáp ứng các tiêu chuẩn an toàn thực phẩm quốc tế.

Với hệ thống quản lý chất lượng khép kín, công nghệ bảo quản tiên tiến và đội ngũ nhân viên giàu kinh nghiệm, chúng tôi đảm bảo sản phẩm luôn giữ được độ tươi ngon, giá trị dinh dưỡng và hương vị tự nhiên.

Chúng tôi không ngừng mở rộng thị trường và hợp tác với các đối tác tại Nhật Bản, Hàn Quốc, Trung Quốc và châu Âu, nhằm xây dựng Tấn Phát Food trở thành đối tác tin cậy trong ngành xuất khẩu nông sản Việt Nam.

**Sản phẩm đa dạng:**
Chúng tôi cung cấp đầy đủ các loại trái cây tươi xuất khẩu như sầu riêng Ri6, bưởi da xanh, chuối già Nam Mỹ, xoài cát Hòa Lộc, thanh long, và nhiều loại trái cây đặc sản khác của Việt Nam. Ngoài ra, chúng tôi còn cung cấp các sản phẩm trái cây sấy khô và bột trái cây với công nghệ sấy lạnh hiện đại, giữ nguyên hương vị và dinh dưỡng.

**Quy trình chất lượng nghiêm ngặt:**
Mỗi sản phẩm đều được kiểm tra kỹ lưỡng từ khâu chọn giống, canh tác, thu hoạch, sơ chế đến đóng gói. Chúng tôi áp dụng công nghệ bảo quản tiên tiến, đảm bảo sản phẩm giữ được độ tươi ngon trong suốt quá trình vận chuyển và phân phối.

**Cam kết phát triển bền vững:**
Tấn Phát Food cam kết phát triển bền vững, hỗ trợ nông dân địa phương, áp dụng các phương pháp canh tác thân thiện với môi trường và đảm bảo công bằng xã hội trong toàn bộ chuỗi cung ứng.`

  const shortContent = `Tấn Phát Food mang đến những sản phẩm nông sản Việt Nam chất lượng cao đến với thị trường quốc tế. Chúng tôi cam kết đảm bảo chất lượng từ khâu nguyên liệu đến khi xuất khẩu, với quy trình kiểm soát nghiêm ngặt.`

  return (
    <section className="relative min-h-screen md:min-h-[800px] lg:min-h-[900px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/bg-ketnoi.jpg)',
          }}
        />
        {/* Overlay để làm nổi bật white box */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* White Content Box - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-white rounded-t-[30px] p-8 md:p-10 lg:p-12 shadow-2xl">
            {/* Title */}
            <h2 className="title">
              Tấn Phát Food – Kết nối nông sản Việt với thị trường toàn cầu
            </h2>

            {/* Content */}
            <div className="mb-6">
              {isExpanded ? (
                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>Tấn Phát Food mang đến những sản phẩm nông sản Việt Nam chất lượng cao đến với thị trường quốc tế. Chúng tôi cam kết đảm bảo chất lượng từ khâu nguyên liệu đến khi xuất khẩu, với quy trình kiểm soát nghiêm ngặt.</p>
                  
                  <p>Các loại trái cây tươi, sấy khô và bột trái cây được lựa chọn từ các nông trại đạt chuẩn GlobalG.A.P, chế biến tại các nhà máy đạt chứng nhận HACCP, đảm bảo đáp ứng các tiêu chuẩn an toàn thực phẩm quốc tế.</p>
                  
                  <p>Với hệ thống quản lý chất lượng khép kín, công nghệ bảo quản tiên tiến và đội ngũ nhân viên giàu kinh nghiệm, chúng tôi đảm bảo sản phẩm luôn giữ được độ tươi ngon, giá trị dinh dưỡng và hương vị tự nhiên.</p>
                  
                  <p>Chúng tôi không ngừng mở rộng thị trường và hợp tác với các đối tác tại Nhật Bản, Hàn Quốc, Trung Quốc và châu Âu, nhằm xây dựng Tấn Phát Food trở thành đối tác tin cậy trong ngành xuất khẩu nông sản Việt Nam.</p>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p>Chúng tôi cung cấp đa dạng các loại trái cây đặc sản Việt Nam như sầu riêng Ri6, bưởi da xanh, chuối già Nam Mỹ, xoài cát Hòa Lộc, thanh long và nhiều sản phẩm khác, đảm bảo chất lượng và an toàn thực phẩm cho thị trường quốc tế.</p>
                  </div>
                </div>
              ) : (
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {shortContent}
                </p>
              )}
            </div>

            {/* Expand Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00652E] bg-white text-[#00652E] rounded-lg font-semibold hover:bg-[#00652E] hover:text-white transition-all duration-300"
              >
                <span>{isExpanded ? 'Thu gọn' : 'Mở rộng'}</span>
                <HiChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConnectionSection

