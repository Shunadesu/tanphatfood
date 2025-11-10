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
  isFeatured?: boolean
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

interface ProductsByTypeCache {
  fresh: { products: Product[], lastFetchTime: number }
  dried: { products: Product[], lastFetchTime: number }
  powder: { products: Product[], lastFetchTime: number }
}

interface ProductsState {
  // Products organized by type (for quick access)
  productsByType: ProductsByType
  
  // Cached products by query key
  cachedProducts: ProductsCache
  
  // Single product cache (by slug)
  productBySlug: Record<string, Product>
  
  // Cache metadata for productsByType
  productsByTypeCache: ProductsByTypeCache
  
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
const CACHE_VERSION = '1.1.0' // Increment this to invalidate all caches (changed to clear old test-01 data)
const CACHE_VERSION_KEY = 'products-store-version'

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
      productsByTypeCache: state.productsByTypeCache,
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
  productsByTypeCache: {
    fresh: { products: [], lastFetchTime: 0 },
    dried: { products: [], lastFetchTime: 0 },
    powder: { products: [], lastFetchTime: 0 },
  },
  loading: false,
  loadedTypes: [],
  
  initializeFromStorage: () => {
    if (typeof window === 'undefined') return
    
    // Check cache version - if different or missing, clear all cache
    try {
      const storedVersion = localStorage.getItem(CACHE_VERSION_KEY)
      if (!storedVersion || storedVersion !== CACHE_VERSION) {
        // Cache version mismatch or missing (old cache), clear old cache
        localStorage.removeItem(STORAGE_KEY)
        localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION)
        return
      }
    } catch (error) {
      console.error('Error checking cache version:', error)
      // If error, clear cache to be safe
      try {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION)
      } catch (e) {
        // Ignore
      }
      return
    }
    
    const storedData = loadFromStorage()
    if (storedData) {
      const state = get()
      const now = Date.now()
      
      // Only load from cache if it's still valid (less than cache duration)
      // If cache metadata doesn't exist or is expired, don't load productsByType
      // This ensures we always fetch fresh data when needed
      let validProductsByType: ProductsByType = {
        fresh: [],
        dried: [],
        powder: [],
      }
      
      let validCache: ProductsByTypeCache = {
        fresh: { products: [], lastFetchTime: 0 },
        dried: { products: [], lastFetchTime: 0 },
        powder: { products: [], lastFetchTime: 0 },
      }
      
      if (storedData.productsByTypeCache) {
        const cache = storedData.productsByTypeCache as ProductsByTypeCache
        Object.keys(cache).forEach((type) => {
          const typeKey = type as keyof ProductsByTypeCache
          const cacheData = cache[typeKey]
          if (cacheData && cacheData.lastFetchTime > 0) {
            const cacheAge = now - cacheData.lastFetchTime
            // Check if cache contains old test data (test-01) - if so, invalidate it
            const hasOldTestData = cacheData.products.some(
              (p: Product) => p.slug === 'test-01' || p.title?.toLowerCase().includes('test-01')
            )
            
            if (!hasOldTestData && cacheAge < CACHE_DURATION && cacheData.products.length > 0) {
              // Cache is valid and doesn't contain old test data
              validProductsByType[typeKey] = cacheData.products
              validCache[typeKey] = {
                products: cacheData.products,
                lastFetchTime: cacheData.lastFetchTime,
              }
            }
          }
        })
      }
      
      // Also check productsByType directly for old test data (fallback for old cache format)
      if (storedData.productsByType) {
        const oldProducts = storedData.productsByType as ProductsByType
        const hasOldTestData = Object.values(oldProducts).some(products =>
          products.some((p: Product) => p.slug === 'test-01' || p.title?.toLowerCase().includes('test-01'))
        )
        if (hasOldTestData) {
          // Old cache contains test data, don't use it
          validProductsByType = {
            fresh: [],
            dried: [],
            powder: [],
          }
        }
      }
      // If no valid cache metadata, don't load productsByType (will fetch fresh from API)
      
      set({
        productsByType: validProductsByType,
        cachedProducts: storedData.cachedProducts || state.cachedProducts,
        productBySlug: storedData.productBySlug || state.productBySlug,
        loadedTypes: [], // Reset loadedTypes to force fresh fetch
        productsByTypeCache: validCache,
      })
    } else {
      // No stored data, set cache version
      try {
        localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION)
      } catch (error) {
        console.error('Error setting cache version:', error)
      }
    }
  },
  
  fetchProductsByType: async (type: 'fresh' | 'dried' | 'powder', options = {}) => {
    const { limit = 10, force = false } = options
    const state = get()
    const now = Date.now()
    
    // Check for old test data in cache - if found, always fetch fresh
    const currentProducts = state.productsByType[type]
    const hasOldTestData = currentProducts.some(
      (p: Product) => p.slug === 'test-01' || p.title?.toLowerCase().includes('test-01')
    )
    
    // If old test data is found, force fetch regardless of cache
    const shouldForce = force || hasOldTestData
    
    // Check cache - only use if not forced and cache is still valid and no old test data
    if (!shouldForce) {
      const cacheData = state.productsByTypeCache[type]
      if (cacheData && cacheData.lastFetchTime > 0) {
        const cacheHasOldTestData = cacheData.products.some(
          (p: Product) => p.slug === 'test-01' || p.title?.toLowerCase().includes('test-01')
        )
        
        if (!cacheHasOldTestData) {
          const cacheAge = now - cacheData.lastFetchTime
          if (cacheAge < CACHE_DURATION && cacheData.products.length > 0) {
            // Cache is valid and doesn't have old test data, use it
            set((prevState) => ({
              productsByType: {
                ...prevState.productsByType,
                [type]: cacheData.products,
              },
            }))
            return cacheData.products.slice(0, limit)
          }
        }
      }
      
      // Also check if already loaded (fallback) - but skip if has old test data
      if (!hasOldTestData && state.loadedTypes.includes(type)) {
        const cached = state.productsByType[type]
        if (cached.length > 0) {
          return cached.slice(0, limit)
        }
      }
    }
    
    // If forcing or has old test data, clear old data for this type to avoid showing stale data
    if (shouldForce) {
      set((prevState) => ({
        productsByType: {
          ...prevState.productsByType,
          [type]: [],
        },
      }))
    }
    
    // Check if already loading - if forcing, allow multiple concurrent fetches
    // Otherwise, return cached data if already loading
    if (!shouldForce && state.loading) {
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
      const fetchTime = Date.now()
      
      set((prevState) => ({
        productsByType: {
          ...prevState.productsByType,
          [type]: products,
        },
        productsByTypeCache: {
          ...prevState.productsByTypeCache,
          [type]: {
            products,
            lastFetchTime: fetchTime,
          },
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
        const productType = apiParams.type as 'fresh' | 'dried' | 'powder'
        const fetchTime = Date.now()
        set((prevState) => ({
          productsByType: {
            ...prevState.productsByType,
            [productType]: products,
          },
          productsByTypeCache: {
            ...prevState.productsByTypeCache,
            [productType]: {
              products,
              lastFetchTime: fetchTime,
            },
          },
          loadedTypes: prevState.loadedTypes.includes(productType)
            ? prevState.loadedTypes
            : [...prevState.loadedTypes, productType],
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
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION)
      } catch (error) {
        console.error('Error clearing cache:', error)
      }
    }
    
    set({
      cachedProducts: {},
      productBySlug: {},
      loadedTypes: [],
      productsByTypeCache: {
        fresh: { products: [], lastFetchTime: 0 },
        dried: { products: [], lastFetchTime: 0 },
        powder: { products: [], lastFetchTime: 0 },
      },
      productsByType: {
        fresh: [],
        dried: [],
        powder: [],
      },
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
      productsByTypeCache: state.productsByTypeCache,
    })
    
    // Chỉ lưu nếu state thực sự thay đổi
    if (currentState !== lastSavedState) {
      saveToStorage({
        productsByType: state.productsByType,
        cachedProducts: state.cachedProducts,
        productBySlug: state.productBySlug,
        loadedTypes: state.loadedTypes,
        productsByTypeCache: state.productsByTypeCache,
      })
      lastSavedState = currentState
    }
  })
}

