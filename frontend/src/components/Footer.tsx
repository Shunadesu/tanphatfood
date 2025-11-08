'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="relative bg-[#00652E] text-white pt-12 pb-8 md:pt-16 md:pb-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-[0.05]"
          style={{ backgroundImage: 'url(/images/bg-footer.jpg)' }}
        />
      </div>

      <div className="mx-auto px-4 relative z-10 max-w-[1440px]">
        {/* Top Section: Logo + Description | Menu Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Left: Logo and Company Description + Contact Info */}
          <div className="lg:col-span-1">
            {/* Logo in white box */}
            <div className="mb-6">
              <div className="bg-white rounded-lg p-4 inline-block">
                <Image
                  src="/images/logo.png"
                  alt="Tấn Phát Food Logo"
                  width={120}
                  height={120}
                  className="h-auto"
                />
              </div>
            </div>
            {/* Company Description */}
            <p className="text-white text-lg font-bold leading-relaxed mb-6">
              Tấn Phát Food là doanh nghiệp chuyên sản xuất – chế biến – xuất khẩu nông sản Việt Nam đạt chuẩn GlobalG.A.P & HACCP.
            </p>
            
          </div>

          {/* Right: Menu Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Về chúng tôi */}
            <div className='flex flex-col gap-4'>
                <div>
                <h3 className="text-base font-semibold text-white mb-4">VỀ CHÚNG TÔI</h3>
                <ul className="space-y-3">
                    <li>
                    <Link
                        href="/about"
                        className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                    >
                        Giới thiệu
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/garden-library"
                        className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                    >
                        Thư viện nhà vườn
                    </Link>
                    </li>
                    <li>
                    <Link
                        href="/careers"
                        className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                    >
                        Tuyển dụng
                    </Link>
                    </li>
                </ul>
                </div>

                {/* Contact Information */}
                <div>
                <h3 className="text-base font-semibold text-white mb-4">THÔNG TIN LIÊN HỆ</h3>
                <ul className="space-y-3">
                    <li className="text-white text-sm">
                    <span className="font-medium">Địa chỉ:</span> Số ...., Phường Long Khánh, Tỉnh Đồng Nai, Việt Nam
                    </li>
                    <li className="text-white text-sm">
                    <span className="font-medium">Điện thoại:</span> +84 9xx
                    </li>
                    <li className="text-white text-sm">
                    <span className="font-medium">Email:</span> sale9@xx.com
                    </li>
                </ul>
                </div>
            </div>

            {/* Column 2: Sản phẩm */}
            <div>
              <h3 className="text-base font-semibold text-white mb-4">SẢN PHẨM</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products/fresh-fruit"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Trái cây tươi xuất khẩu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/dried-frozen"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Trái cây sấy & đông lạnh
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/fruit-powder"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Bột trái cây tự nhiên
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/spices"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Gia vị – Nông sản khô
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Hỗ trợ khách hàng + Social Media */}
            <div>
              <h3 className="text-base font-semibold text-white mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link
                    href="/cooperation-policy"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Chính sách hợp tác
                  </Link>
                </li>
                <li>
                  <Link
                    href="/export-process"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Quy trình xuất khẩu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Câu hỏi thường gặp (FAQ)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
              {/* Social Media */}
              <div>
                <h3 className="text-base font-semibold text-white mb-4">KẾT NỐI MẠNG XÃ HỘI</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                    >
                      <FaFacebookF className="w-4 h-4" />
                      <span>Facebook: Tấn Phát Food</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-white hover:text-[#00CB5C] transition-colors duration-300 text-sm"
                    >
                      <FaYoutube className="w-4 h-4" />
                      <span>YouTube: Tấn Phát Food Official</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section - Full Width, Large */}
        <div className="mb-10">
          <div className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4990700000003!2d106.69999999999999!3d10.775555555555556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAuNzc1NTU1NTU1NTU1NTU2LDEwNi42OTk5OTk5OTk5OTk5OTk!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Tấn Phát Food - Đồng Nai, Việt Nam"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Copyright and Design Credit */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white text-xs md:text-sm">
            <div>
              © 2025 Tấn Phát Food Co., Ltd. - All rights reserved.
            </div>
            <div>
              Thiết kế & phát triển bởi Tấn Phát Food.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
