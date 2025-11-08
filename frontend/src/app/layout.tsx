import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tanphatfood.com'),
  title: {
    default: 'Tấn Phát Food - Nông sản Việt Nam chất lượng cao',
    template: '%s | Tấn Phát Food'
  },
  description: 'Tấn Phát Food mang đến những loại trái cây tươi ngon, đạt chuẩn quốc tế – được tuyển chọn từ những vùng trồng tốt nhất Việt Nam. Chuyên cung cấp trái cây tươi xuất khẩu, trái cây sấy, bột trái cây chất lượng cao.',
  keywords: [
    'nông sản Việt Nam',
    'trái cây tươi xuất khẩu',
    'trái cây sấy',
    'bột trái cây',
    'sầu riêng',
    'thanh long',
    'chuối',
    'bưởi',
    'Tấn Phát Food',
    'xuất khẩu nông sản',
    'trái cây organic',
    'Global GAP',
  ],
  authors: [{ name: 'Tấn Phát Food' }],
  creator: 'Tấn Phát Food',
  publisher: 'Tấn Phát Food',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: 'Tấn Phát Food',
    title: 'Tấn Phát Food - Nông sản Việt Nam chất lượng cao',
    description: 'Tấn Phát Food mang đến những loại trái cây tươi ngon, đạt chuẩn quốc tế – được tuyển chọn từ những vùng trồng tốt nhất Việt Nam.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Tấn Phát Food Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tấn Phát Food - Nông sản Việt Nam chất lượng cao',
    description: 'Tấn Phát Food mang đến những loại trái cây tươi ngon, đạt chuẩn quốc tế.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
  verification: {
    // Thêm Google Search Console verification code nếu có
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tanphatfood.com'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tấn Phát Food',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Tấn Phát Food - Nhà cung cấp nông sản Việt Nam chất lượng cao, chuyên xuất khẩu trái cây tươi, trái cây sấy và bột trái cây đạt chuẩn quốc tế.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-913-224-378',
      contactType: 'Customer Service',
      areaServed: 'VN',
      availableLanguage: ['Vietnamese', 'English'],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tấn Phát Food',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="vi">
      <body>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  )
}

