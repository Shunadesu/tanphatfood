import { Metadata } from 'next'

// Since this is a dynamic route, we'll generate metadata in the page component
// This layout file is here for future use if needed
export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

