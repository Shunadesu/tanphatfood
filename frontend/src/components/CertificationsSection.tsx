'use client'

const CertificationsSection = () => {
  return (
    <section className="relative container mx-auto">
        {/* Certification Image Card */}
          <div className="bg-white rounded-[30px]">
            <div className="relative w-full rounded-2xl overflow-hidden">
              {/* Desktop Image */}
              <img 
                src="/images/chungnhan.jpg" 
                alt="Food Safety Certifications - VietGAP, GlobalG.A.P, USDA Organic, ISO 22000" 
                className="hidden md:block w-full h-auto object-cover"
              />
              {/* Mobile Image */}
              <img 
                src="/images/chungnhanmb.jpg" 
                alt="Food Safety Certifications - VietGAP, GlobalG.A.P, USDA Organic, ISO 22000" 
                className="block md:hidden w-full h-full object-cover"
              />
            </div>
          </div>
    </section>
  )
}

export default CertificationsSection

