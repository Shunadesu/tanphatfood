import { useNavigate } from 'react-router-dom'
import { HiMenu, HiBell, HiUser, HiLogout } from 'react-icons/hi'
import { useState } from 'react'
import { authApi } from '../services/api'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    if (!confirm('Bạn có chắc chắn muốn đăng xuất?')) return

    try {
      setLoading(true)
      await authApi.logout()
      navigate('/login')
      window.location.reload()
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
      >
        <HiMenu className="w-6 h-6 text-gray-600" />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <HiBell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 bg-[#00652E] rounded-full flex items-center justify-center">
              <HiUser className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-700 font-medium hidden md:block">Admin</span>
          </button>
          
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 disabled:opacity-50"
            title="Đăng xuất"
          >
            <HiLogout className="w-5 h-5" />
            <span className="hidden md:block text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  )
}

