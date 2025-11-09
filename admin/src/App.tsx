import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductNew from './pages/Products/New'
import ProductEdit from './pages/Products/Edit'
import Categories from './pages/Categories'
import News from './pages/News'
import NewsNew from './pages/News/New'
import NewsEdit from './pages/News/Edit'
import Quotes from './pages/Quotes'
import Banners from './pages/Banners'
import BannerNew from './pages/Banners/New'
import BannerEdit from './pages/Banners/Edit'
import Contacts from './pages/Contacts'
import ContactNew from './pages/Contacts/New'
import ContactEdit from './pages/Contacts/Edit'
import AdminLayout from './components/AdminLayout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token')
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Products />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/products/new"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <ProductNew />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <ProductEdit />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/categories"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Categories />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/news"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <News />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/news/new"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <NewsNew />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/news/:id/edit"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <NewsEdit />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/quotes"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Quotes />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/banners"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Banners />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/banners/new"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <BannerNew />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/banners/:id/edit"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <BannerEdit />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/contacts"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <Contacts />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/contacts/new"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <ContactNew />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/contacts/:id/edit"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <ContactEdit />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

