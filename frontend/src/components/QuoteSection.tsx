'use client'

import { useState, useEffect, useRef } from 'react'
import { LiaTelegramPlane } from 'react-icons/lia'
import { HiChevronDown } from 'react-icons/hi'
import { quotesApi } from '@/services/api'

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    productName: '',
    productType: 'Trái cây tươi',
    market: '',
  })
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.fullName.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên)',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Prepare data for API
      // Note: Email is required by backend, so we'll use a placeholder or generate from phone if available
      const quoteData: any = {
        name: formData.fullName.trim(),
        email: formData.phone.trim() 
          ? `contact_${formData.phone.trim().replace(/\s+/g, '')}@tanphatfood.com`
          : `contact_${Date.now()}@tanphatfood.com`, // Fallback email if no phone
      }

      // Add optional fields if they have values
      if (formData.phone.trim()) {
        quoteData.phone = formData.phone.trim()
      }

      if (formData.productName.trim()) {
        quoteData.productName = formData.productName.trim()
      }

      if (formData.market.trim()) {
        quoteData.country = formData.market.trim()
      }

      // Add productType to message
      if (formData.productType) {
        quoteData.message = `Loại sản phẩm: ${formData.productType}`
      }

      // Submit to API
      const response = await quotesApi.create(quoteData)

      if (response.success) {
        // Success - reset form and show success message
        setFormData({
          fullName: '',
          phone: '',
          productName: '',
          productType: 'Trái cây tươi',
          market: '',
        })
        setSubmitStatus({
          type: 'success',
          message: 'Gửi yêu cầu báo giá thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
        })

        // Scroll to top of form to show success message
        setTimeout(() => {
          const formElement = document.getElementById('quote-form')
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else {
        // Error from API
        setSubmitStatus({
          type: 'error',
          message: response.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.',
        })
      }
    } catch (error: any) {
      console.error('Error submitting quote:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.',
      })
    } finally {
      setIsSubmitting(false)
    }
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
                <form id="quote-form" onSubmit={handleSubmit} className="p-6 md:p-8" style={{ paddingBottom: isProductTypeOpen ? '140px' : '2rem' }}>
                  {/* Status Message */}
                  {submitStatus.type && (
                    <div
                      className={`mb-6 p-4 rounded-lg ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  )}

                  <div className="space-y-4 md:space-y-6 mb-6">
                    {/* Two Column Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Left Column */}
                      <div>
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
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
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
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Two Column Fields - Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Left Column */}
                      <div>
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
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
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
                            disabled={isSubmitting}
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
                            if (!isSubmitting) {
                              setIsProductTypeOpen(!isProductTypeOpen)
                            }
                          }}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00652E] focus:border-transparent text-gray-900 bg-white flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed text-left"
                        >
                          <span>{formData.productType}</span>
                          <HiChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                              isProductTypeOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isProductTypeOpen && !isSubmitting && (
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
                      disabled={isSubmitting}
                      className="button-primary flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <span>Liên hệ báo giá!</span>
                          <LiaTelegramPlane className="w-5 h-5" />
                        </>
                      )}
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

