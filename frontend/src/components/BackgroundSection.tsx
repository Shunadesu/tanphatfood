'use client'

const BackgroundSection = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/bg-layout.jpg)',
          }}
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-[#00652E]/50" />
      </div>

      {/* White Gradient Fade from Bottom - Tạo cảm giác mờ dần */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1/4 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />

      {/* Content can be added here if needed */}
      <div className="relative z-20 min-h-screen flex items-end">
        <div className="container mx-auto px-4 max-w-7xl w-full pb-20">
          {/* Optional content area */}
        </div>
      </div>
    </section>
  )
}

export default BackgroundSection

