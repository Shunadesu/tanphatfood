'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LiaTelegramPlane } from "react-icons/lia";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Giới thiệu', href: '/about' },
    // {
    //   name: 'Sản phẩm',
    //   href: '/products',
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { name: 'Tất cả sản phẩm', href: '/products' },
    //     { name: '─', href: '#', divider: true },
    //     { name: 'Trái cây tươi xuất khẩu', href: '/products/fresh' },
    //     { name: 'Trái cây sấy xuất khẩu', href: '/products/dried' },
    //     { name: 'Bột trái cây xuất khẩu', href: '/products/powder' },
    //   ],
    // },
    {
      name: 'Trái cây tươi',
      href: '/products/fresh',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Sầu riêng', href: '/products/sau-rieng' },
        { name: 'Thanh Long', href: '/products/thanh-long' },
        { name: 'Chuối', href: '/products/chuoi' },
        { name: 'Bưởi', href: '/products/buoi' },
        { name: 'Dừa tươi', href: '/products/dua-tuoi' },
        { name: 'Chanh không hạt', href: '/products/chanh-khong-hat' },
        { name: 'Cam', href: '/products/cam' },
        { name: 'Ổi', href: '/products/oi' },
      ],
    },
    {
      name: 'Trái cây sấy',
      href: '/products/dried',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Sầu riêng sấy', href: '/products/sau-rieng-say' },
        { name: 'Chuối sấy', href: '/products/chuoi-say' },
        { name: 'Xoài sấy', href: '/products/xoai-say' },
        { name: 'Dứa sấy', href: '/products/dua-say' },
        { name: 'Khoai lang sấy', href: '/products/khoai-lang-say' },
        { name: 'Ổi sấy', href: '/products/oi-say' },
        { name: 'Táo sấy', href: '/products/tao-say' },
        { name: 'Mít sấy', href: '/products/mit-say' },
      ],
    },
    {
      name: 'Bột trái cây',
      href: '/products/powder',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Bột chuối', href: '/products/bot-chuoi' },
        { name: 'Bột thanh long', href: '/products/bot-thanh-long' },
        { name: 'Bột sầu riêng', href: '/products/bot-sau-rieng' },
        { name: 'Bột xoài', href: '/products/bot-xoai' },
        { name: 'Bột dứa', href: '/products/bot-dua' },
        { name: 'Bột cam', href: '/products/bot-cam' },
        { name: 'Bột ổi', href: '/products/bot-oi' },
        { name: 'Bột chanh dây', href: '/products/bot-chanh-day' },
      ],
    },
    {
      name: 'Cẩm nang',
      href: '/handbook',
      hasDropdown: false,
    },
    { name: 'Liên hệ', href: '#contact' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 bg-white rounded-lg px-4 py-2 ">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
            </Link>
            <div className='w-[0.5px] h-10 bg-gray-200' />
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setIsDropdownOpen(item.name)
                }
                onMouseLeave={() => setIsDropdownOpen(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 font-medium text-lg transition-colors duration-200 hover:text-[#00652E]"
                >
                  <span className='text-base font-medium text-gray-700'>{item.name}</span>
                  {item.hasDropdown && (
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && isDropdownOpen === item.name && item.dropdownItems && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-48 z-50"
                    onMouseEnter={() => setIsDropdownOpen(item.name)}
                    onMouseLeave={() => setIsDropdownOpen(null)}
                  >
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-0 left-0 right-0 h-2" />
                    
                    {/* Dropdown content */}
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 animate-[fadeIn_0.2s_ease-in-out_forwards]">
                      {/* Arrow pointer */}
                      <div className="absolute -top-2 left-2 w-3 h-3 bg-white border-l border-t border-gray-100 transform rotate-45" />
                      
                      {item.dropdownItems.map((dropdownItem, index) => (
                        dropdownItem.divider ? (
                          <div key={`divider-${index}`} className="border-t border-gray-200 my-1" />
                        ) : (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-[#00652E] hover:text-white transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <Link href="#contact" className='button-primary flex items-center gap-2'>
            <span>Liên hệ báo giá</span>
            <LiaTelegramPlane className='w-5 h-5' />
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown && item.dropdownItems ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileDropdownOpen(
                            mobileDropdownOpen === item.name ? null : item.name
                          )
                        }
                        className="w-full flex items-center justify-between text-gray-700 hover:text-[#00652E] transition-colors duration-200 py-2 px-4"
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileDropdownOpen === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {mobileDropdownOpen === item.name && (
                        <div className="pl-4 space-y-1 bg-gray-50">
                          {item.dropdownItems.map((dropdownItem, index) => (
                            dropdownItem.divider ? (
                              <div key={`divider-${index}`} className="border-t border-gray-200 my-1" />
                            ) : (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block py-2 px-4 text-sm text-gray-600 hover:text-[#00652E] transition-colors duration-200"
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  setMobileDropdownOpen(null)
                                }}
                              >
                                {dropdownItem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-[#00652E] transition-colors duration-200 py-2 px-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="#contact"
                className="inline-flex items-center justify-center space-x-2 bg-[#00652E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Liên hệ báo giá</span>
                <LiaTelegramPlane className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

