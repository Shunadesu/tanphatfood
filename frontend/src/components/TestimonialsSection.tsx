'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import { useState, useEffect } from 'react'

// Separate component for avatar with error handling
const TestimonialAvatar = ({ avatar, name }: { avatar?: string; name: string }) => {
  const [imageError, setImageError] = useState(false)
  const [hasValidAvatar, setHasValidAvatar] = useState(false)

  useEffect(() => {
    // Check if avatar exists and is not placeholder
    const isValid = !!(avatar && avatar.trim() && avatar !== '/images/avatar-placeholder.png')
    setHasValidAvatar(isValid)
    setImageError(false) // Reset error when avatar changes
  }, [avatar])

  const shouldShowImage = hasValidAvatar && !imageError

  return (
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200 relative">
      {shouldShowImage ? (
        <img
          src={avatar}
          alt={name}
          className="w-full h-full rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <HiUser className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />
      )}
    </div>
  )
}

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Lê Công Đức',
      role: 'Khách hàng',
      rating: 4,
      text: 'Tôi đã hợp tác với Tấn Phát Food trong nhiều năm và luôn hài lòng với chất lượng sản phẩm. Trái cây tươi ngon, đóng gói cẩn thận, giao hàng đúng hẹn.',
      avatar: '', // No avatar - will show user icon
    },
    {
      id: 2,
      name: 'Hoàng Vinh',
      role: 'Giám Đốc Công ty CBC',
      rating: 4,
      text: 'Trái cây sấy của Tấn Phát Food có hương vị tự nhiên, giữ nguyên màu sắc và giá trị dinh dưỡng. Quy trình kiểm soát chất lượng rất bài bản, đạt chuẩn quốc tế.',
      avatar: '',
    },
    {
      id: 3,
      name: 'Hữu Đức Cường',
      role: 'Khách hàng',
      rating: 4,
      text: 'Đối tác Việt Nam này mang lại trải nghiệm xuất khẩu tuyệt vời: rõ ràng, chuyên nghiệp, giao hàng đúng thời gian. Chúng tôi đánh giá cao tinh thần hợp tác và trách nhiệm của đội ngũ.',
      avatar: '',
    },
    {
      id: 4,
      name: 'Nguyễn Thúy Vy',
      role: 'Khách hàng',
      rating: 4,
      text: 'Chất lượng sản phẩm của Tấn Phát Food luôn đảm bảo, từ khâu chọn lựa nguyên liệu đến khi xuất khẩu. Đội ngũ tư vấn nhiệt tình, hỗ trợ tốt.',
      avatar: '',
    },
    {
      id: 5,
      name: 'Trần Minh Tuấn',
      role: 'Giám Đốc Kinh doanh',
      rating: 4,
      text: 'Tấn Phát Food là đối tác tin cậy của chúng tôi. Sản phẩm đa dạng, chất lượng cao, phù hợp với yêu cầu của thị trường quốc tế.',
      avatar: '',
    },
    {
      id: 6,
      name: 'Nguyễn Văn An',
      role: 'Chủ tịch HĐQT',
      rating: 4,
      text: 'Làm việc với Tấn Phát Food là một trải nghiệm tuyệt vời. Họ có hệ thống quản lý chất lượng chuyên nghiệp, đáp ứng đầy đủ các tiêu chuẩn quốc tế mà chúng tôi yêu cầu.',
      avatar: '',
    },
    {
      id: 7,
      name: 'Phạm Thị Lan',
      role: 'Nhà nhập khẩu',
      rating: 4,
      text: 'Sản phẩm của Tấn Phát Food luôn đạt chất lượng cao, đặc biệt là các loại trái cây sấy khô. Quy trình sản xuất sạch, an toàn và đáng tin cậy.',
      avatar: '',
    },
    {
      id: 8,
      name: 'Lý Hoàng Nam',
      role: 'Giám đốc Điều hành',
      rating: 4,
      text: 'Chúng tôi đánh giá rất cao về dịch vụ của Tấn Phát Food. Họ không chỉ cung cấp sản phẩm chất lượng mà còn hỗ trợ tận tình trong quá trình xuất nhập khẩu.',
      avatar: '',
    },
    {
      id: 9,
      name: 'Võ Thị Mai',
      role: 'Khách hàng',
      rating: 4,
      text: 'Tấn Phát Food đã trở thành đối tác lâu dài của chúng tôi. Chất lượng sản phẩm ổn định, giá cả hợp lý và dịch vụ giao hàng nhanh chóng, đúng hẹn.',
      avatar: '',
    },
    {
      id: 10,
      name: 'Đặng Quang Huy',
      role: 'Giám đốc Thương mại',
      rating: 4,
      text: 'Với hơn 10 năm kinh nghiệm trong ngành, Tấn Phát Food đã chứng minh được năng lực và uy tín của mình. Chúng tôi rất hài lòng với sự hợp tác này.',
      avatar: '',
    },
  ]

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-[#00652E] w-4 h-4" />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#00652E] w-4 h-4" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 w-4 h-4" />)
    }

    return stars
  }

  return (
    <section className="relative lg:min-h-[70vh] min-h-[50vh] bg-white flex flex-col pb-8 lg:pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 pt-16 md:pt-20">
          <h2 className="title !mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto">
            Xuất khẩu sang nhiều thị trường nước ngoài như Nhật Bản, Hàn Quốc, Thái Lan, Trung Quốc, EU ...
          </p>
        </div>
      </div>

      {/* Swiper Carousel - Full Width */}
      <div className="relative w-full flex-grow -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonials-swiper h-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col my-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <div className="mb-6 flex-grow">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                {/* Customer Profile */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <TestimonialAvatar 
                    avatar={testimonial.avatar} 
                    name={testimonial.name}
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm md:text-base mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialsSection
