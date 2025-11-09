'use client'

const ProcessSection = () => {
  return (
    <section className="relative bg-white">
      <div className="container mx-auto">
        {/* Title and Subtitle */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="title !mb-4">
            Quy trình xuất khẩu đạt chuẩn Quốc tế
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Mỗi sản phẩm trước khi đến tay khách hàng đều trải qua quy trình nghiêm ngặt, từ chọn giống đến xuất khẩu.
          </p>
        </div>

        {/* Process Image */}
        <div className="mx-auto">
          <div className="bg-white rounded-[30px] shadow-lg overflow-hidden">
            <div className="relative w-full rounded-2xl overflow-hidden">
              <img 
                src="/images/quytrinh.jpg" 
                alt="Quy trình xuất nhập khẩu trái cây tại Tấn Phát Foods" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection

