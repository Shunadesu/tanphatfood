'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHeroSection from '@/components/AboutHeroSection'
import AboutSection from '@/components/AboutSection'
import StandardsSection from '@/components/StandardsSection'
import PartnersSection from '@/components/PartnersSection'
import CertificationsSection from '@/components/CertificationsSection'
import ProcessSection from '@/components/ProcessSection'
import ConnectionSection from '@/components/ConnectionSection'
import VideoSection from '@/components/VideoSection'
import PartnersCustomersSection from '@/components/PartnersCustomersSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'
import { HiChevronRight } from 'react-icons/hi'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <AboutHeroSection />
        
        {/* Breadcrumb Section */}
        <section className="relative py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className='w-fit bg-white rounded-xl p-2 flex items-center justify-center gap-2 shadow-md'>
              <Link
                href="/"
                className="text-gray-600 hover:text-[#00652E] transition-colors"
              >
                Trang chủ
              </Link>
              <HiChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#00652E] font-semibold">
                Giới thiệu
              </span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        {/* <AboutSection /> */}

        {/* Standards Section */}
        <StandardsSection />

        {/* Partners Section - Statistics */}
        <PartnersSection />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Connection Section */}
        <ConnectionSection />

        {/* Video Section */}
        <VideoSection />

        {/* Partners & Customers Section */}
        <PartnersCustomersSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </div>
  )
}

