import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Tìm hiểu về Tấn Phát Food - Nhà cung cấp nông sản Việt Nam chất lượng cao với tiêu chuẩn Global GAP, chuyên xuất khẩu trái cây tươi, trái cây sấy và bột trái cây.',
  openGraph: {
    title: 'Giới thiệu | Tấn Phát Food',
    description: 'Tìm hiểu về Tấn Phát Food - Nhà cung cấp nông sản Việt Nam chất lượng cao.',
    url: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

