import { Link, useLocation } from 'react-router-dom'
import { HiHome, HiCube, HiFolder, HiNewspaper, HiMail, HiPhotograph, HiPhone, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: HiHome,
  },
  {
    name: 'Sản phẩm',
    href: '/products',
    icon: HiCube,
  },
  {
    name: 'Tin tức',
    href: '/news',
    icon: HiNewspaper,
  },
  {
    name: 'Yêu cầu báo giá',
    href: '/quotes',
    icon: HiMail,
  },
  {
    name: 'Banner',
    href: '/banners',
    icon: HiPhotograph,
  },
  {
    name: 'Liên hệ',
    href: '/contacts',
    icon: HiPhone,
  },
]

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-[#00652E] text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          {isOpen && (
            <h1 className="text-xl font-bold">Tấn Phát Food</h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <HiChevronLeft className="w-5 h-5" />
            ) : (
              <HiChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href || location.pathname?.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                title={!isOpen ? item.name : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-white/10 text-sm text-white/60">
            <p>Admin Panel v1.0</p>
          </div>
        )}
      </div>
    </aside>
  )
}

