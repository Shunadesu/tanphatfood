'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuoteSection from '@/components/QuoteSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { HiChevronRight, HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi'
import { LiaTelegramPlane } from 'react-icons/lia'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-8">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 mt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <h1 className="title">
                Liên hệ với chúng tôi
              </h1>
              <p className="description">
                Tấn Phát Food luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi để được tư vấn và nhận báo giá tốt nhất.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Request Form Section */}
        <section id="contact">
          <QuoteSection />
        </section>
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}

