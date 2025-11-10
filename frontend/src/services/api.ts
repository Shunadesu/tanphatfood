// Use Next.js API routes as proxy (client-side calls go through Next.js)
// Backend URL is hidden from client-side code
const API_URL = '/api'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  count?: number
  total?: number
  page?: number
  pages?: number
}

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    type?: string
    category?: string
    search?: string
    isActive?: boolean
    isFeatured?: boolean
  }): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.type) queryParams.append('type', params.type)
    if (params?.category) queryParams.append('category', params.category)
    if (params?.search) queryParams.append('search', params.search)
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())
    if (params?.isFeatured !== undefined) queryParams.append('isFeatured', params.isFeatured.toString())

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`)
    return response.json()
  },

  getFeatured: async (limit?: number): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    queryParams.append('isFeatured', 'true')
    queryParams.append('isActive', 'true')
    if (limit) queryParams.append('limit', limit.toString())

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`)
    return response.json()
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/products/${id}`)
    return response.json()
  },

  getBySlug: async (slug: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/products/slug/${slug}`)
    return response.json()
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Categories API
export const categoriesApi = {
  getAll: async (params?: { isActive?: boolean }): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())

    const response = await fetch(`${API_URL}/categories?${queryParams.toString()}`)
    return response.json()
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/categories/${id}`)
    return response.json()
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// News API
export const newsApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    category?: string
    isPublished?: boolean
    isFeatured?: boolean
    search?: string
    tag?: string
  }): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.category) queryParams.append('category', params.category)
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString())
    if (params?.isFeatured !== undefined) queryParams.append('isFeatured', params.isFeatured.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.tag) queryParams.append('tag', params.tag)

    const response = await fetch(`${API_URL}/news?${queryParams.toString()}`)
    return response.json()
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/news/${id}`)
    return response.json()
  },

  getBySlug: async (slug: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/news/slug/${slug}`)
    return response.json()
  },

  getFeatured: async (limit?: number): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (limit) queryParams.append('limit', limit.toString())
    const response = await fetch(`${API_URL}/news/featured?${queryParams.toString()}`)
    return response.json()
  },
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

// Contacts API
export const contactsApi = {
  getAll: async (params?: {
    type?: string
    isActive?: boolean
  }): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.append('type', params.type)
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())

    const response = await fetch(`${API_URL}/contacts?${queryParams.toString()}`)
    return response.json()
  },

  getActive: async (): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_URL}/contacts/active`)
    return response.json()
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/contacts/${id}`)
    return response.json()
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Banners API
export const bannersApi = {
  getAll: async (params?: {
    page?: string
    isActive?: boolean
  }): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page)
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())

    const response = await fetch(`${API_URL}/banners?${queryParams.toString()}`)
    return response.json()
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/banners/${id}`)
    return response.json()
  },

  getByPage: async (page: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/banners/page/${page}`)
    return response.json()
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/banners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_URL}/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${API_URL}/banners/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Upload API
export const uploadApi = {
  uploadImage: async (file: File, folder?: string): Promise<ApiResponse<any>> => {
    const formData = new FormData()
    formData.append('image', file)
    
    const url = folder 
      ? `${API_URL}/upload?folder=${folder}`
      : `${API_URL}/upload`
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    return response.json()
  },

  uploadMultiple: async (files: File[], folder?: string): Promise<ApiResponse<any[]>> => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })
    
    const url = folder 
      ? `${API_URL}/upload/multiple?folder=${folder}`
      : `${API_URL}/upload/multiple`
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    return response.json()
  },
}

