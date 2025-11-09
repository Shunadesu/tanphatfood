'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { LiaTelegramPlane } from "react-icons/lia";
import { productsApi } from '@/services/api'

interface DropdownItem {
  name: string
  href: string
  divider?: boolean
}

interface MenuItem {
  name: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: DropdownItem[]
  productType?: 'fresh' | 'dried' | 'powder'
}

interface Product {
  id: string
  title: string
  slug: string
  type: 'fresh' | 'dried' | 'powder'
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const [products, setProducts] = useState<{
    fresh: Product[]
    dried: Product[]
    powder: Product[]
  }>({
    fresh: [],
    dried: [],
    powder: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch products for dropdown menus
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Fetch products for each type
        const [freshRes, driedRes, powderRes] = await Promise.all([
          productsApi.getAll({ type: 'fresh', isActive: true, limit: 10 }),
          productsApi.getAll({ type: 'dried', isActive: true, limit: 10 }),
          productsApi.getAll({ type: 'powder', isActive: true, limit: 10 }),
        ])

        if (freshRes.success) {
          const freshData = Array.isArray(freshRes.data) 
            ? freshRes.data 
            : (freshRes.data as any)?.data || []
          setProducts(prev => ({ ...prev, fresh: freshData }))
        }

        if (driedRes.success) {
          const driedData = Array.isArray(driedRes.data) 
            ? driedRes.data 
            : (driedRes.data as any)?.data || []
          setProducts(prev => ({ ...prev, dried: driedData }))
        }

        if (powderRes.success) {
          const powderData = Array.isArray(powderRes.data) 
            ? powderRes.data 
            : (powderRes.data as any)?.data || []
          setProducts(prev => ({ ...prev, powder: powderData }))
        }
      } catch (error) {
        console.error('Error fetching products for header:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Build menu items with dynamic dropdown items from API
  const menuItems: MenuItem[] = useMemo(() => [
    { name: 'Trang chủ', href: '/' },
    { name: 'Giới thiệu', href: '/about' },
    {
      name: 'Trái cây tươi',
      href: '/products/fresh',
      hasDropdown: true,
      productType: 'fresh',
      dropdownItems: products.fresh.map((product) => ({
        name: product.title,
        href: `/products/${product.slug}`,
      })),
    },
    {
      name: 'Trái cây sấy',
      href: '/products/dried',
      hasDropdown: true,
      productType: 'dried',
      dropdownItems: products.dried.map((product) => ({
        name: product.title,
        href: `/products/${product.slug}`,
      })),
    },
    {
      name: 'Bột trái cây',
      href: '/products/powder',
      hasDropdown: true,
      productType: 'powder',
      dropdownItems: products.powder.map((product) => ({
        name: product.title,
        href: `/products/${product.slug}`,
      })),
    },
    {
      name: 'Cẩm nang',
      href: '/handbook',
      hasDropdown: false,
    },
    { name: 'Liên hệ', href: '/contact' },
  ], [products])

  return (
    <>
      {/* Mobile Menu Overlay - Outside header for proper z-index */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-[fadeIn_0.2s_ease-in-out]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-white shadow-md lg:bg-transparent lg:shadow-none'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo - Mobile & Desktop */}
            <Link href="/" className="flex items-center space-x-3 z-10">
              <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 bg-white rounded-lg px-4 py-2 ml-4">
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
                  {item.hasDropdown && isDropdownOpen === item.name && (
                    <div 
                      className="absolute top-full left-0 pt-2 w-56 z-50"
                      onMouseEnter={() => setIsDropdownOpen(item.name)}
                      onMouseLeave={() => setIsDropdownOpen(null)}
                    >
                      {/* Invisible bridge to prevent gap */}
                      <div className="absolute top-0 left-0 right-0 h-2" />
                      
                      {/* Dropdown content */}
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 animate-[fadeIn_0.2s_ease-in-out_forwards] overflow-hidden">
                        {/* Arrow pointer */}
                        <div className="absolute -top-2 left-4 w-3 h-3 bg-white border-l border-t border-gray-100 transform rotate-45" />
                        
                        {loading ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            Đang tải...
                          </div>
                        ) : item.dropdownItems && item.dropdownItems.length > 0 ? (
                          <div className="py-1">
                            {item.dropdownItems.map((dropdownItem, index) => (
                              dropdownItem.divider ? (
                                <div key={`divider-${index}`} className="border-t border-gray-200 my-1" />
                              ) : (
                                <Link
                                  key={`${dropdownItem.href}-${index}`}
                                  href={dropdownItem.href}
                                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#00652E] hover:text-white transition-colors duration-200 whitespace-nowrap"
                                >
                                  {dropdownItem.name}
                                </Link>
                              )
                            ))}
                          </div>
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            Chưa có sản phẩm
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <Link href="/contact" className='hidden button-primary lg:flex items-center gap-2'>
                <span>Liên hệ báo giá</span>
                <LiaTelegramPlane className='w-5 h-5' />
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 z-50 relative"
                aria-label="Toggle menu"
              >
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${
                  isScrolled || isMenuOpen ? 'text-gray-700' : 'text-white'
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
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white relative z-50 animate-[slideDown_0.3s_ease-out]">
              <nav className="flex flex-col">
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
                          className="w-full flex items-center justify-between text-gray-700 hover:text-[#00652E] hover:bg-gray-50 transition-colors duration-200 py-3 px-6 text-base font-medium"
                        >
                          <span>{item.name}</span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
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
                          <div className="bg-gray-50 border-t border-gray-100">
                            {loading ? (
                              <div className="py-3 px-8 text-sm text-gray-500">
                                Đang tải...
                              </div>
                            ) : item.dropdownItems && item.dropdownItems.length > 0 ? (
                              item.dropdownItems.map((dropdownItem, index) => (
                                dropdownItem.divider ? (
                                  <div key={`divider-${index}`} className="border-t border-gray-200 my-1" />
                                ) : (
                                  <Link
                                    key={`${dropdownItem.href}-${index}`}
                                    href={dropdownItem.href}
                                    className="block py-2.5 px-8 text-sm text-gray-600 hover:text-[#00652E] hover:bg-white transition-colors duration-200"
                                    onClick={() => {
                                      setIsMenuOpen(false)
                                      setMobileDropdownOpen(null)
                                    }}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                )
                              ))
                            ) : (
                              <div className="py-3 px-8 text-sm text-gray-500">
                                Chưa có sản phẩm
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-gray-700 hover:text-[#00652E] hover:bg-gray-50 transition-colors duration-200 py-3 px-6 text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-6 pt-4 pb-2 border-t border-gray-200 mt-2 flex justify-center">
                  <Link
                    href="/contact"
                    className="button-primary w-full flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Liên hệ báo giá</span>
                    <LiaTelegramPlane className="w-5 h-5" />
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header

