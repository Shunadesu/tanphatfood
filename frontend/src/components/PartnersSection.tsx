'use client'

const PartnersSection = () => {
  const statistics = [
    {
      value: '120,000m²',
      label: 'Nhà máy đóng gói',
      description: 'Packaging factory',
    },
    {
      value: '200.000+',
      label: 'Sản lượng tấn/ Năm',
      description: 'Production tons/year',
    },
    {
      value: '10+',
      label: 'Năm kinh nghiệm',
      description: 'Years of experience',
    },
    {
      value: '20+',
      label: 'Quốc gia xuất khẩu',
      description: 'Export countries',
    },
  ]

  return (
    <section className="relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Card - Contains Map and Statistics */}
        <div className="bg-white rounded-[30px] shadow-sm overflow-hidden">
          {/* World Map Section */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="relative w-full rounded-2xl overflow-hidden">
              {/* Desktop Image */}
              <img 
                src="/images/doitac.jpg" 
                alt="Global Partners Map" 
                className="hidden md:block w-full h-auto object-cover"
              />
              {/* Mobile Image */}
              <img 
                src="/images/doitacmb.jpg" 
                alt="Global Partners Map" 
                className="block md:hidden w-full h-[30vh] object-cover"
              />
            </div>
          </div>

          {/* Statistics Section */}
          <div className="px-6 md:px-8 lg:px-10 pb-6 md:pb-8 lg:pb-10 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {statistics.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center py-6 md:py-8 px-4 md:px-6 relative"
                >
                  {/* Vertical divider - chỉ giữa cột 1 và 2 trên mobile, tất cả các cột trên desktop */}
                  {index < statistics.length - 1 && (
                    <div className={`absolute top-0 right-0 bottom-0 w-px bg-gray-200 ${index === 1 ? 'hidden md:block' : ''}`} />
                  )}
                  
                  {/* Horizontal divider trên mobile - chỉ ở hàng đầu tiên */}
                  {index < 2 && (
                    <div className="md:hidden absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
                  )}

                  <div className="mb-4">
                    <div className="stat-number">
                      {stat.value}
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </p>
                  
                  <p className="text-xs md:text-sm text-gray-500">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection

