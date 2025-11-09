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
      

        {/* Standards Section */}
        {/* <StandardsSection /> */}

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

