import { create } from 'zustand'
import { productsApi } from '@/services/api'

interface Product {
  id: string
  title: string
  slug: string
  type: 'fresh' | 'dried' | 'powder'
}

interface HeaderState {
  products: {
    fresh: Product[]
    dried: Product[]
    powder: Product[]
  }
  loading: boolean
  loaded: boolean
  lastFetchTime: number | null
  fetchProducts: (force?: boolean) => Promise<void>
  initializeFromStorage: () => void
}

// Cache duration: 5 minutes (300000 ms)
const CACHE_DURATION = 5 * 60 * 1000
const STORAGE_KEY = 'header-store'
const CACHE_VERSION = '1.1.0' // Increment this to invalidate all caches
const CACHE_VERSION_KEY = 'header-store-version'

// Helper functions để lưu/đọc từ localStorage
const loadFromStorage = (): Partial<HeaderState> | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
  }
  return null
}

const saveToStorage = (state: Partial<HeaderState>) => {
  if (typeof window === 'undefined') return
  
  try {
    const dataToSave = {
      products: state.products,
      loaded: state.loaded,
      lastFetchTime: state.lastFetchTime,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const useHeaderStore = create<HeaderState>((set, get) => ({
  products: {
    fresh: [],
    dried: [],
    powder: [],
  },
  loading: false,
  loaded: false,
  lastFetchTime: null,
  initializeFromStorage: () => {
    // Chỉ chạy ở client-side
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
      
      // Only load if cache is still valid
      const cacheValid = storedData.lastFetchTime && 
        (now - storedData.lastFetchTime) < CACHE_DURATION
      
      // Chỉ load nếu chưa có data hoặc data trong store rỗng, và cache còn valid
      if (cacheValid && (!state.loaded || (state.products.fresh.length === 0 && 
          state.products.dried.length === 0 && 
          state.products.powder.length === 0))) {
        set({
          products: storedData.products || state.products,
          loaded: storedData.loaded || false,
          lastFetchTime: storedData.lastFetchTime || null,
        })
      }
    } else {
      // No stored data, set cache version
      try {
        localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION)
      } catch (error) {
        console.error('Error setting cache version:', error)
      }
    }
  },
  fetchProducts: async (force = false) => {
    const state = get()
    
    // Kiểm tra nếu đã có data và chưa hết hạn cache
    const now = Date.now()
    const cacheValid = state.lastFetchTime && 
      (now - state.lastFetchTime) < CACHE_DURATION
    
    // Nếu đã load và cache còn hiệu lực, và không force refresh
    if (!force && state.loaded && cacheValid) {
      return
    }
    
    // Nếu đang loading, không fetch lại
    if (state.loading) {
      return
    }

    set({ loading: true })

    try {
      // Fetch products for each type
      const [freshRes, driedRes, powderRes] = await Promise.all([
        productsApi.getAll({ type: 'fresh', isActive: true, limit: 10 }),
        productsApi.getAll({ type: 'dried', isActive: true, limit: 10 }),
        productsApi.getAll({ type: 'powder', isActive: true, limit: 10 }),
      ])

      const freshData = freshRes.success
        ? (Array.isArray(freshRes.data)
            ? freshRes.data
            : (freshRes.data as any)?.data || [])
        : []

      const driedData = driedRes.success
        ? (Array.isArray(driedRes.data)
            ? driedRes.data
            : (driedRes.data as any)?.data || [])
        : []

      const powderData = powderRes.success
        ? (Array.isArray(powderRes.data)
            ? powderRes.data
            : (powderRes.data as any)?.data || [])
        : []

      set({
        products: {
          fresh: freshData,
          dried: driedData,
          powder: powderData,
        },
        loading: false,
        loaded: true,
        lastFetchTime: now,
      })
      // Lưu vào localStorage sẽ được xử lý bởi subscription
    } catch (error) {
      console.error('Error fetching products for header:', error)
      set({ loading: false })
    }
  },
}))

// Subscribe to store changes và lưu vào localStorage
// Chỉ lưu khi có thay đổi về products, loaded, hoặc lastFetchTime
if (typeof window !== 'undefined') {
  let lastSavedState: string | null = null
  
  useHeaderStore.subscribe((state) => {
    // Chỉ lưu khi đã load xong và có data, và state đã thay đổi
    if (state.loaded && state.lastFetchTime) {
      const currentState = JSON.stringify({
        products: state.products,
        loaded: state.loaded,
        lastFetchTime: state.lastFetchTime,
      })
      
      // Chỉ lưu nếu state thực sự thay đổi
      if (currentState !== lastSavedState) {
        saveToStorage({
          products: state.products,
          loaded: state.loaded,
          lastFetchTime: state.lastFetchTime,
        })
        lastSavedState = currentState
      }
    }
  })
}

