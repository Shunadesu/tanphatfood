'use client'

const CertificationsSection = () => {
  return (
    <section className="relative py-8 md:py-12 container mx-auto">
        {/* Certification Image Card */}
          <div className="bg-white rounded-[30px]">
            <div className="relative w-full rounded-2xl overflow-hidden">
              <img 
                src="/images/chungnhan.jpg" 
                alt="Food Safety Certifications - VietGAP, GlobalG.A.P, USDA Organic, ISO 22000" 
                className="w-full h-full md:h-auto object-cover"
              />
            </div>
          </div>
    </section>
  )
}

export default CertificationsSection

