import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thư viện Nhà vườn',
  description: 'Khám phá những vườn cây trái chất lượng cao của Tấn Phát Food, nơi sản xuất nông sản đạt chuẩn GlobalG.A.P & HACCP. Xem hình ảnh các vườn chuối, sầu riêng, thanh long, bưởi, dừa và chanh.',
  openGraph: {
    title: 'Thư viện Nhà vườn | Tấn Phát Food',
    description: 'Khám phá những vườn cây trái chất lượng cao của Tấn Phát Food với tiêu chuẩn GlobalG.A.P & HACCP.',
    url: '/garden-library',
  },
}

export default function GardenLibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

