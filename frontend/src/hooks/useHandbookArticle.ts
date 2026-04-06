'use client'

import { useEffect, useState } from 'react'
import type { HandbookArticle } from '@/data/mockHandbook'
import { getHandbookBySlug } from '@/data/mockHandbook'
import { newsApi } from '@/services/api'
import { mapNewsApiToHandbookArticle } from '@/lib/handbookFromApi'

export function useHandbookArticle(slug: string | undefined) {
  const [article, setArticle] = useState<HandbookArticle | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setArticle(undefined)
      setLoading(false)
      return
    }

    const mock = getHandbookBySlug(slug)
    if (mock) {
      setArticle(mock)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setArticle(undefined)

    ;(async () => {
      try {
        const res = await newsApi.getBySlug(slug)
        if (cancelled) return
        const raw = res.data as Record<string, unknown> | undefined
        if (res.success && raw && raw.isPublished === true) {
          setArticle(mapNewsApiToHandbookArticle(raw))
        } else {
          setArticle(undefined)
        }
      } catch {
        if (!cancelled) setArticle(undefined)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [slug])

  return { article, loading }
}
