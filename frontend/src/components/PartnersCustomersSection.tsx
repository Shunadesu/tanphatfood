'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PartnersCustomersSection = () => {
  const partners = [
    { name: 'ACB', image: '/banks/acb.png' },
    { name: 'Agribank', image: '/banks/agribank.png' },
    { name: 'BIDV', image: '/banks/bidv.png' },
    { name: 'JCB', image: '/banks/jcb.jpg' },
    { name: 'Mastercard', image: '/banks/mastercard.png' },
    { name: 'MoMo', image: '/banks/momo.png' },
    { name: 'ShopeePay', image: '/banks/shopeepay.png' },
    { name: 'Techcombank', image: '/banks/techcombank.png' },
    { name: 'Vietcombank', image: '/banks/vietcombank.png' },
    { name: 'Vietinbank', image: '/banks/vietinbank.png' },
    { name: 'Visa', image: '/banks/visa.png' },
    { name: 'VNPay', image: '/banks/vnpay.png' },
    { name: 'ZaloPay', image: '/banks/zalopay.png' },
  ]

  return (
    <section className="relative py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="title !mb-4">
            Đối tác & Khách hàng
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto">
            Xuất khẩu sang nhiều thị trường nước ngoài như Nhật Bản, Hàn Quốc, Thái Lan, Trung Quốc, EU ...
          </p>
        </div>
      </div>

      {/* Swiper Carousel - Full Width */}
      <div className="relative w-full -mx-4 md:-mx-6 lg:-mx-8">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 10,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="partners-swiper"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-4 md:p-6 h-32 md:h-40 flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default PartnersCustomersSection

