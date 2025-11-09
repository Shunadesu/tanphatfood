import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cẩm nang',
  description: 'Kiến thức và kinh nghiệm về nông sản xuất khẩu, quy trình sản xuất, bảo quản và các tiêu chuẩn chất lượng từ Tấn Phát Food.',
  openGraph: {
    title: 'Cẩm nang | Tấn Phát Food',
    description: 'Kiến thức và kinh nghiệm về nông sản xuất khẩu, quy trình sản xuất, bảo quản và các tiêu chuẩn chất lượng.',
    url: '/handbook',
  },
}

export default function HandbookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

