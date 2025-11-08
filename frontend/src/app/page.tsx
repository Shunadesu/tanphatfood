import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import FreshFruitsSection from '@/components/FreshFruitsSection'
import DriedFruitsSection from '@/components/DriedFruitsSection'
import PowderedFruitsSection from '@/components/PowderedFruitsSection'
import StandardsSection from '@/components/StandardsSection'
import AboutSection from '@/components/AboutSection'
import PartnersSection from '@/components/PartnersSection'
import CertificationsSection from '@/components/CertificationsSection'
import ProcessSection from '@/components/ProcessSection'
import ConnectionSection from '@/components/ConnectionSection'
import VideoSection from '@/components/VideoSection'
import BackgroundSection from '@/components/BackgroundSection'
import PartnersCustomersSection from '@/components/PartnersCustomersSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import GardenLibrarySection from '@/components/GardenLibrarySection'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      {/* <AboutSection /> */}
      <StandardsSection />
      <PartnersSection />
      <CertificationsSection />
      <FreshFruitsSection />
      <DriedFruitsSection />
      <PowderedFruitsSection />
      <ProcessSection />
      <ConnectionSection />
      <VideoSection />
      <BackgroundSection />
      <PartnersCustomersSection />
      <TestimonialsSection />
      <GardenLibrarySection />
      <NewsSection />
      <Footer />
      <FloatingContactButtons />
      <ScrollToTop />
    </main>
  )
}

