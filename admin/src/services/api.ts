// API service - calls backend directly
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  // Pagination info (may be at top level or nested in data)
  count?: number
  total?: number
  page?: number
  pages?: number
}

// Helper function to handle API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Don't use credentials for now - backend allows all origins
      // credentials: 'include', // Only use if backend requires specific origin
    })

    const data = await response.json()
    return data
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error',
    }
  }
}

// Products API
export const productsApi = {
  getAll: (params?: { page?: number; limit?: number; type?: string; search?: string }) => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.type) queryParams.append('type', params.type)
    if (params?.search) queryParams.append('search', params.search)
    
    const query = queryParams.toString()
    return apiCall(`/products${query ? `?${query}` : ''}`)
  },
  
  getById: (id: string) => apiCall(`/products/${id}`),
  
  create: (data: any) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: any) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: string) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
}

// Categories API
export const categoriesApi = {
  getAll: () => apiCall('/categories'),
  
  getById: (id: string) => apiCall(`/categories/${id}`),
  
  create: (data: any) => apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: any) => apiCall(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: string) => apiCall(`/categories/${id}`, {
    method: 'DELETE',
  }),
}

// Quotes API
export const quotesApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    status?: string
    isRead?: boolean
    search?: string
  }): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.isRead !== undefined) queryParams.append('isRead', params.isRead.toString())
    if (params?.search) queryParams.append('search', params.search)

    const response = await fetch(`${API_URL}/quotes?${queryParams.toString()}`)
    return response.json()
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/quotes/${id}`)
    return response.json()
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/quotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_URL}/quotes/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },

  markAsRead: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/quotes/${id}/read`, {
      method: 'PATCH',
    })
    return response.json()
  },

  getStats: async (): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/quotes/stats`)
    return response.json()
  },
}

// Upload API
export const uploadApi = {
  uploadImage: async (file: File, folder?: string): Promise<ApiResponse> => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const url = folder 
        ? `${API_URL}/upload?folder=${folder}`
        : `${API_URL}/upload`
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Don't use credentials for now
        // credentials: 'include',
      })
      
      return await response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Upload error',
      }
    }
  },
  
  uploadMultipleImages: async (files: File[], folder?: string): Promise<ApiResponse> => {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('images', file)
      })
      
      const url = folder 
        ? `${API_URL}/upload/multiple?folder=${folder}`
        : `${API_URL}/upload/multiple`
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Don't use credentials for now
        // credentials: 'include',
      })
      
      return await response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Upload error',
      }
    }
  },
}

// News Categories API
export const newsCategoriesApi = {
  getAll: () => apiCall('/news-categories'),
  
  getById: (id: string) => apiCall(`/news-categories/${id}`),
  
  create: (data: any) => apiCall('/news-categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: any) => apiCall(`/news-categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: string) => apiCall(`/news-categories/${id}`, {
    method: 'DELETE',
  }),
}

// News API
export const newsApi = {
  getAll: (params?: {
    page?: number
    limit?: number
    category?: string
    isPublished?: boolean
    isFeatured?: boolean
    search?: string
    tag?: string
  }) => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.category) queryParams.append('category', params.category)
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString())
    if (params?.isFeatured !== undefined) queryParams.append('isFeatured', params.isFeatured.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.tag) queryParams.append('tag', params.tag)
    
    const query = queryParams.toString()
    return apiCall(`/news${query ? `?${query}` : ''}`)
  },
  
  getById: (id: string) => apiCall(`/news/${id}`),
  
  getBySlug: (slug: string) => apiCall(`/news/slug/${slug}`),
  
  create: (data: any) => apiCall('/news', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: any) => apiCall(`/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id: string) => apiCall(`/news/${id}`, {
    method: 'DELETE',
  }),
}

// Contacts API
export const contactsApi = {
  getAll: async (params?: {
    type?: string
    isActive?: boolean
  }): Promise<ApiResponse<any[]>> => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.type) queryParams.append('type', params.type)
      if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())

      const url = `${API_URL}/contacts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  getActive: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_URL}/contacts/active`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorText = await response.text()
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorText = await response.text()
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },
}

// Banners API
export const bannersApi = {
  getAll: async (params?: {
    page?: string
    isActive?: boolean
  }): Promise<ApiResponse<any[]>> => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.page) queryParams.append('page', params.page)
      if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())

      const url = `${API_URL}/banners${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      console.log('Fetching banners from:', url)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        console.error('Banners API error:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error response:', errorText)
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText,
        }
      }

      const data = await response.json()
      console.log('Banners API response:', data)
      return data
    } catch (error: any) {
      console.error('Banners API fetch error:', error)
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/banners/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  getByPage: async (page: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/banners/page/${page}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/banners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorText = await response.text()
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_URL}/banners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorText = await response.text()
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_URL}/banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        }
      }
      return response.json()
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      }
    }
  },
}

// Auth API (if backend has auth endpoints)
export const authApi = {
  login: (_username: string, _password: string) => {
    // For now, we'll use localStorage for auth
    // You can implement backend auth later
    return Promise.resolve({
      success: true,
      data: { token: 'mock-token' },
    })
  },
  
  logout: () => {
    localStorage.removeItem('admin_token')
    return Promise.resolve({ success: true })
  },
  
  checkAuth: () => {
    const token = localStorage.getItem('admin_token')
    return Promise.resolve({
      success: !!token,
    })
  },
}

