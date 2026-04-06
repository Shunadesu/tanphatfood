import type { HandbookArticle } from '@/data/mockHandbook'

export function formatNewsDate(value: string | Date | undefined): string {
  if (value === undefined || value === null || value === '') return ''
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return String(value)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

/** Map backend News document (API response) to handbook detail shape */
export function mapNewsApiToHandbookArticle(news: Record<string, unknown>): HandbookArticle {
  const cat = news.category as { name?: string } | string | undefined
  const categoryName =
    typeof cat === 'object' && cat !== null && 'name' in cat && typeof cat.name === 'string'
      ? cat.name
      : undefined

  const idRaw = news.id ?? news._id
  const id =
    typeof idRaw === 'number'
      ? idRaw
      : typeof idRaw === 'string' && /^\d+$/.test(idRaw)
        ? parseInt(idRaw, 10)
        : 0

  const images = news.images as string[] | undefined

  return {
    id,
    title: String(news.title ?? ''),
    description: String(news.shortDescription ?? ''),
    image: String(news.featuredImage ?? images?.[0] ?? ''),
    date: formatNewsDate(news.publishedAt as string | Date | undefined) ||
      formatNewsDate(news.createdAt as string | Date | undefined),
    slug: String(news.slug ?? ''),
    content:
      typeof news.content === 'string' && news.content.trim()
        ? news.content
        : '<p>Nội dung đang được cập nhật.</p>',
    author: typeof news.author === 'string' ? news.author : undefined,
    category: categoryName,
  }
}
