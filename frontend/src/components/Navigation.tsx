'use client'

import { useState } from 'react'
import Link from 'next/link'

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null)

  const menuItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Giới thiệu', href: '/about' },
    {
      name: 'Trái cây tươi',
      href: '/products/fresh',
      hasDropdown: true,
    },
    {
      name: 'Trái cây sấy',
      href: '/products/dried',
      hasDropdown: true,
    },
    {
      name: 'Bột trái cây',
      href: '/products/powder',
      hasDropdown: true,
    },
    {
      name: 'Cẩm nang',
      href: '/handbook',
      hasDropdown: false,
    },
    { name: 'Liên hệ', href: '/contact' },
  ]

  return (
    <nav className="fixed top-20 left-0 right-0 z-40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-4 bg-white rounded-lg p-2">
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
                  className="text-gray-700 hover:text-primary-500 transition-colors duration-200 flex items-center space-x-1 font-medium"
                >
                  <span className='text-md font-medium'>{item.name}</span>
                  {item.hasDropdown && (
                    <svg
                      className="w-4 h-4"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation




