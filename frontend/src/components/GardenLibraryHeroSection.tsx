'use client'

const GardenLibraryHeroSection = () => {
  return (
    <section className="relative bg-white min-h-[60vh] flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-none md:rounded-br-[70px] md:rounded-bl-[70px] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero_images.png)' }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Thư viện Nhà vườn
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Khám phá những vườn cây trái chất lượng cao của Tấn Phát Food, nơi sản xuất nông sản đạt chuẩn GlobalG.A.P & HACCP
          </p>
        </div>
      </div>
    </section>
  )
}

export default GardenLibraryHeroSection

