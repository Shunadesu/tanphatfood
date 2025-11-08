'use client'

import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export default function SEO({
  title,
  description,
  image = '/images/logo.png',
  url,
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('name', name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    const updatePropertyTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    if (description) {
      updateMetaTag('description', description)
      updatePropertyTag('og:description', description)
    }

    if (title) {
      updatePropertyTag('og:title', title)
      updatePropertyTag('twitter:title', title)
    }

    if (image) {
      updatePropertyTag('og:image', image)
      updatePropertyTag('twitter:image', image)
    }

    if (url) {
      updatePropertyTag('og:url', url)
    }

    if (type) {
      updatePropertyTag('og:type', type)
    }
  }, [title, description, image, url, type])

  return null
}

