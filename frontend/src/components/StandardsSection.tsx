'use client'

const StandardsSection = () => {
  return (
    <section className="relative bg-white">
      <div className="mx-auto">
        <div className="w-full overflow-hidden shadow-xl">
          {/* Desktop Image */}
          <img
            src="/images/gioithieu.jpg"
            alt="Tiêu chuẩn Global G.A.P & HACCP, Vùng nguyên liệu đạt chuẩn, Đối tác quốc tế tin cậy"
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Mobile Image */}
          <img
            src="/images/gioithieumb.jpg"
            alt="Tiêu chuẩn Global G.A.P & HACCP, Vùng nguyên liệu đạt chuẩn, Đối tác quốc tế tin cậy"
            className="block md:hidden w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default StandardsSection
