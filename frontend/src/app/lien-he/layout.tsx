import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liên hệ - Tấn Phát Food',
  description: 'Liên hệ với Tấn Phát Food để được tư vấn và nhận báo giá tốt nhất cho sản phẩm nông sản xuất khẩu. Hotline: +84 913 224 378',
  keywords: [
    'liên hệ Tấn Phát Food',
    'tư vấn nông sản xuất khẩu',
    'báo giá trái cây xuất khẩu',
    'Tấn Phát Food contact',
    'export fruits Vietnam',
  ].join(', '),
  openGraph: {
    title: 'Liên hệ - Tấn Phát Food',
    description: 'Liên hệ với Tấn Phát Food để được tư vấn và nhận báo giá tốt nhất cho sản phẩm nông sản xuất khẩu.',
    url: 'https://tanphatfood.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liên hệ - Tấn Phát Food',
    description: 'Liên hệ với Tấn Phát Food để được tư vấn và nhận báo giá tốt nhất cho sản phẩm nông sản xuất khẩu.',
  },
  alternates: {
    canonical: 'https://tanphatfood.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

