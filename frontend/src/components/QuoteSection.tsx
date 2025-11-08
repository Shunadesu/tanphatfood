'use client'

import { useState, useEffect, useRef } from 'react'
import { LiaTelegramPlane } from 'react-icons/lia'
import { HiChevronDown } from 'react-icons/hi'

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    productName: '',
    productType: 'Trái cây tươi',
    market: '',
  })
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductTypeOpen(false)
      }
    }

    if (isProductTypeOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProductTypeOpen])

  const productTypes = [
    'Trái cây tươi',
    'Trái cây sấy',
    'Bột trái cây',
    'Gia vị - Nông sản khô',
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section className="relative py-16 md:py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/bg-layout.jpg)',
          }}
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#00652E]/50" />
        {/* White Gradient Fade from Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1/4 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Call to Action Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Nhận thông tin báo giá xuất khẩu nông sản
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              Điền ngay thông tin đơn hàng để nhận báo giá chính xác từ Tấn Phát Food. Chúng tôi cam kết phản hồi chỉ trong 5 – 15 phút, giúp bạn tiết kiệm thời gian và chọn được giải pháp xuất khẩu tối ưu nhất !
            </p>
          </div>

          {/* Right: Quote Request Form */}
          <div className="relative z-20">
            <div className="bg-white rounded-2xl shadow-2xl relative" style={{ overflow: 'visible' }}>
              {/* Form Header */}
              <div className="bg-[#00652E] rounded-t-2xl px-6 py-4 relative z-10">
                <h3 className="text-white font-bold text-lg md:text-xl text-center">
                  Điền thông tin nhận báo giá từ Tấn Phát Food !
                </h3>
              </div>

              {/* Form Content */}
              <div className="relative" style={{ overflow: 'visible' }}>
                <form onSubmit={handleSubmit} className="p-6 md:p-8" style={{ paddingBottom: isProductTypeOpen ? '140px' : '2rem' }}>
                  <div className="space-y-4 md:space-y-6 mb-6">
                    {/* Two Column Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Left Column */}
                      <div className="space-y-4 md:space-y-6">
                        {/* Họ và tên */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Nhập tên của bạn..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900"
                            required
                          />
                        </div>

                        {/* Tên sản phẩm */}
                        <div>
                          <label
                            htmlFor="productName"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Tên sản phẩm
                          </label>
                          <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleInputChange}
                            placeholder="Nhập thông tin ..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900"
                            required
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4 md:space-y-6">
                        {/* Điện thoại */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Điện thoại
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Nhập điện thoại của bạn..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900"
                            required
                          />
                        </div>

                        {/* Thị trường */}
                        <div>
                          <label
                            htmlFor="market"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Thị trường
                          </label>
                          <input
                            type="text"
                            id="market"
                            name="market"
                            value={formData.market}
                            onChange={handleInputChange}
                            placeholder="Nhập thông tin ..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Loại sản phẩm - Full Width */}
                    <div className="relative" ref={dropdownRef}>
                      <label
                        htmlFor="productType"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Loại sản phẩm
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setIsProductTypeOpen(!isProductTypeOpen)
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900 bg-white flex items-center justify-between"
                        >
                          <span>{formData.productType}</span>
                          <HiChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              isProductTypeOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isProductTypeOpen && (
                          <div className="absolute z-[9999] w-full top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl">
                            {productTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setFormData((prev) => ({ ...prev, productType: type }))
                                  setIsProductTypeOpen(false)
                                }}
                                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#00652E] hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="button-primary flex-1 inline-flex items-center justify-center gap-2"
                    >
                      <span>Liên hệ báo giá!</span>
                      <LiaTelegramPlane className="w-5 h-5" />
                    </button>

                    {/* Hotline Button */}
                    <a
                      href="tel:+84913224378"
                      className="button-primary-outline flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span>Hotline: +84 913 224 378</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuoteSection

