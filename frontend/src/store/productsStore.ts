import { create } from 'zustand'
import { productsApi } from '@/services/api'

export interface Product {
  id: string
  title: string
  description?: string
  shortDescription?: string
  image: string
  slug: string
  type: 'fresh' | 'dried' | 'powder'
  category?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

interface ProductsByType {
  fresh: Product[]
  dried: Product[]
  powder: Product[]
}

interface ProductsCache {
  [key: string]: {
    products: Product[]
    lastFetchTime: number
    total?: number
    page?: number
    pages?: number
  }
}

interface ProductsState {
  // Products organized by type (for quick access)
  productsByType: ProductsByType
  
  // Cached products by query key
  cachedProducts: ProductsCache
  
  // Single product cache (by slug)
  productBySlug: Record<string, Product>
  
  loading: boolean
  loadedTypes: string[]
  
  // Actions
  fetchProductsByType: (type: 'fresh' | 'dried' | 'powder', options?: { limit?: number; force?: boolean }) => Promise<Product[]>
  fetchProducts: (params?: {
    page?: number
    limit?: number
    type?: string
    category?: string
    search?: string
    isActive?: boolean
    force?: boolean
  }) => Promise<Product[]>
  fetchProductBySlug: (slug: string, force?: boolean) => Promise<Product | null>
  searchProducts: (query: string, options?: { type?: string; limit?: number; force?: boolean }) => Promise<Product[]>
  getCachedProducts: (key: string) => Product[] | null
  clearCache: () => void
  initializeFromStorage: () => void
}

// Cache duration: 5 minutes (300000 ms)
const CACHE_DURATION = 5 * 60 * 1000
const STORAGE_KEY = 'products-store'

// Helper function to generate cache key
const getCacheKey = (params: {
  page?: number
  limit?: number
  type?: string
  category?: string
  search?: string
  isActive?: boolean
}): string => {
  const key = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join('|')
  return key || 'all'
}

// Helper functions để lưu/đọc từ localStorage
const loadFromStorage = (): Partial<ProductsState> | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading products from localStorage:', error)
  }
  return null
}

const saveToStorage = (state: Partial<ProductsState>) => {
  if (typeof window === 'undefined') return
  
  try {
    const dataToSave = {
      productsByType: state.productsByType,
      cachedProducts: state.cachedProducts,
      productBySlug: state.productBySlug,
      loadedTypes: state.loadedTypes || [],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  } catch (error) {
    console.error('Error saving products to localStorage:', error)
  }
}

// Parse products from API response
const parseProducts = (response: any): Product[] => {
  if (!response.success) return []
  
  if (Array.isArray(response.data)) {
    return response.data
  }
  
  if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    return Array.isArray((response.data as any).data) 
      ? (response.data as any).data 
      : []
  }
  
  return []
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  productsByType: {
    fresh: [],
    dried: [],
    powder: [],
  },
  cachedProducts: {},
  productBySlug: {},
  loading: false,
  loadedTypes: new Set<string>(),
  
  initializeFromStorage: () => {
    if (typeof window === 'undefined') return
    
    const storedData = loadFromStorage()
    if (storedData) {
      const state = get()
      set({
        productsByType: storedData.productsByType || state.productsByType,
        cachedProducts: storedData.cachedProducts || state.cachedProducts,
        productBySlug: storedData.productBySlug || state.productBySlug,
        loadedTypes: storedData.loadedTypes || [],
      })
    }
  },
  
  fetchProductsByType: async (type: 'fresh' | 'dried' | 'powder', options = {}) => {
    const { limit = 10, force = false } = options
    const state = get()
    
    // Check cache
    if (!force && state.loadedTypes.includes(type)) {
      const cached = state.productsByType[type]
      if (cached.length > 0) {
        return cached.slice(0, limit)
      }
    }
    
    // Check if already loading
    if (state.loading) {
      return state.productsByType[type].slice(0, limit)
    }
    
    set({ loading: true })
    
    try {
      const response = await productsApi.getAll({
        type,
        isActive: true,
        limit: limit * 2, // Fetch more for cache
      })
      
      const products = parseProducts(response)
      
      set((prevState) => ({
        productsByType: {
          ...prevState.productsByType,
          [type]: products,
        },
        loadedTypes: prevState.loadedTypes.includes(type) 
          ? prevState.loadedTypes 
          : [...prevState.loadedTypes, type],
        loading: false,
      }))
      
      return products.slice(0, limit)
    } catch (error) {
      console.error(`Error fetching ${type} products:`, error)
      set({ loading: false })
      return []
    }
  },
  
  fetchProducts: async (params = {}) => {
    const { force = false, ...apiParams } = params
    const state = get()
    const cacheKey = getCacheKey(apiParams)
    
    // Check cache
    if (!force && state.cachedProducts[cacheKey]) {
      const cached = state.cachedProducts[cacheKey]
      const now = Date.now()
      
      if ((now - cached.lastFetchTime) < CACHE_DURATION) {
        return cached.products
      }
    }
    
    // Check if already loading
    if (state.loading) {
      const cached = state.cachedProducts[cacheKey]
      return cached?.products || []
    }
    
    set({ loading: true })
    
    try {
      const response = await productsApi.getAll(apiParams)
      const products = parseProducts(response)
      
      set((prevState) => ({
        cachedProducts: {
          ...prevState.cachedProducts,
          [cacheKey]: {
            products,
            lastFetchTime: Date.now(),
            total: response.total,
            page: response.page,
            pages: response.pages,
          },
        },
        loading: false,
      }))
      
      // Also update productsByType if type is specified
      if (apiParams.type && ['fresh', 'dried', 'powder'].includes(apiParams.type)) {
        set((prevState) => ({
          productsByType: {
            ...prevState.productsByType,
            [apiParams.type]: products,
          },
          loadedTypes: prevState.loadedTypes.includes(apiParams.type)
            ? prevState.loadedTypes
            : [...prevState.loadedTypes, apiParams.type],
        }))
      }
      
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      set({ loading: false })
      return []
    }
  },
  
  fetchProductBySlug: async (slug: string, force = false) => {
    const state = get()
    
    // Check cache
    if (!force && state.productBySlug[slug]) {
      return state.productBySlug[slug]
    }
    
    try {
      const response = await productsApi.getBySlug(slug)
      
      if (response.success && response.data) {
        const product = response.data as Product
        
        set((prevState) => ({
          productBySlug: {
            ...prevState.productBySlug,
            [slug]: product,
          },
        }))
        
        return product
      }
      
      return null
    } catch (error) {
      console.error('Error fetching product by slug:', error)
      return null
    }
  },
  
  searchProducts: async (query: string, options = {}) => {
    const { type, limit = 20, force = false } = options
    const cacheKey = getCacheKey({ search: query, type, limit })
    const state = get()
    
    // Check cache
    if (!force && state.cachedProducts[cacheKey]) {
      const cached = state.cachedProducts[cacheKey]
      const now = Date.now()
      
      if ((now - cached.lastFetchTime) < CACHE_DURATION) {
        return cached.products
      }
    }
    
    try {
      const response = await productsApi.getAll({
        search: query,
        type,
        limit,
        isActive: true,
      })
      
      const products = parseProducts(response)
      
      set((prevState) => ({
        cachedProducts: {
          ...prevState.cachedProducts,
          [cacheKey]: {
            products,
            lastFetchTime: Date.now(),
          },
        },
      }))
      
      return products
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  },
  
  getCachedProducts: (key: string) => {
    const state = get()
    const cached = state.cachedProducts[key]
    
    if (!cached) return null
    
    const now = Date.now()
    if ((now - cached.lastFetchTime) >= CACHE_DURATION) {
      return null // Cache expired
    }
    
    return cached.products
  },
  
  clearCache: () => {
    set({
      cachedProducts: {},
      productBySlug: {},
      loadedTypes: [],
    })
  },
}))

// Subscribe to store changes và lưu vào localStorage
if (typeof window !== 'undefined') {
  let lastSavedState: string | null = null
  
  useProductsStore.subscribe((state) => {
    const currentState = JSON.stringify({
      productsByType: state.productsByType,
      cachedProducts: state.cachedProducts,
      productBySlug: state.productBySlug,
      loadedTypes: state.loadedTypes,
    })
    
    // Chỉ lưu nếu state thực sự thay đổi
    if (currentState !== lastSavedState) {
      saveToStorage({
        productsByType: state.productsByType,
        cachedProducts: state.cachedProducts,
        productBySlug: state.productBySlug,
        loadedTypes: state.loadedTypes,
      })
      lastSavedState = currentState
    }
  })
}

