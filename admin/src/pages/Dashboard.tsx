import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiCube, HiCollection, HiFolder, HiNewspaper } from 'react-icons/hi'
import { productsApi, categoriesApi } from '../services/api'

interface Stats {
  totalProducts: number
  totalCategories: number
  totalNews: number
  activeProducts: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    totalNews: 0,
    activeProducts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsApi.getAll({ limit: 1 }),
        categoriesApi.getAll(),
      ])

      const productsData = productsRes.data as any
      const categoriesData = categoriesRes.data as any
      setStats({
        totalProducts: productsData?.total || productsRes.total || 0,
        totalCategories: categoriesData?.count || (Array.isArray(categoriesData) ? categoriesData.length : 0) || categoriesRes.count || 0,
        totalNews: 0,
        activeProducts: productsData?.total || productsRes.total || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      title: 'Tổng sản phẩm',
      value: stats.totalProducts,
      icon: HiCube,
      color: 'bg-blue-500',
      href: '/products',
    },
    {
      title: 'Danh mục',
      value: stats.totalCategories,
      icon: HiFolder,
      color: 'bg-green-500',
      href: '/categories',
    },
    {
      title: 'Sản phẩm hoạt động',
      value: stats.activeProducts,
      icon: HiCollection,
      color: 'bg-purple-500',
      href: '/products',
    },
    {
      title: 'Tin tức',
      value: stats.totalNews,
      icon: HiNewspaper,
      color: 'bg-orange-500',
      href: '/news',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              to={card.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/products/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#00652E] hover:bg-[#00652E]/5 transition-colors text-center"
          >
            <HiCube className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-semibold text-gray-700">Thêm sản phẩm mới</p>
          </Link>
          <Link
            to="/news/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#00652E] hover:bg-[#00652E]/5 transition-colors text-center"
          >
            <HiNewspaper className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-semibold text-gray-700">Thêm tin tức mới</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

