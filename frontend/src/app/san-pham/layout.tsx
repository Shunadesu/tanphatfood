import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sản phẩm',
  description: 'Khám phá bộ sưu tập nông sản chất lượng cao từ Tấn Phát Food - Trái cây tươi xuất khẩu, trái cây sấy, bột trái cây đạt chuẩn quốc tế.',
  openGraph: {
    title: 'Sản phẩm | Tấn Phát Food',
    description: 'Khám phá bộ sưu tập nông sản chất lượng cao từ Tấn Phát Food.',
    url: '/products',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

