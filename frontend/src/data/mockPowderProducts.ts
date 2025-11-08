export interface PowderProduct {
  id: number
  title: string
  description: string
  image: string
  slug: string
  category: string
  images: string[]
  features: string[]
  exportInfo: {
    variety?: string
    weight?: string
    packaging?: string
    condition?: string
  }
  // New fields from image analysis
  companyIntro?: string
  qualityDescription?: string
  certifications?: {
    haccp?: boolean
    globalgap?: boolean
    vietgap?: boolean
    co?: string // Certificate of Origin forms
  }
  markets?: string[]
  supplyCapacity?: string
  detailedInfo?: {
    brand?: string
    origin?: string
    fruitType?: string
    storageInstructions?: string
  }
  fullDescription?: string // Full HTML content for detailed sections
}

export const mockPowderProducts: PowderProduct[] = [
  {
    id: 1,
    title: 'Bột chuối',
    description: 'Bột chuối tự nhiên, giàu dinh dưỡng, dùng cho thực phẩm và đồ uống',
    image: '/images/products/banana.png',
    slug: 'bot-chuoi',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/banana.png',
      '/images/products/banana.png',
      '/images/products/banana.png',
      '/images/products/banana.png',
    ],
    features: [
      'Bột chuối tự nhiên, không chất bảo quản.',
      'Giàu Kali, vitamin B6, tốt cho sức khỏe.',
      'Hương vị thơm ngon, dễ hòa tan.',
      'Phù hợp cho ngành F&B, làm bánh, đồ uống.',
    ],
    exportInfo: {
      variety: 'Bột chuối nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
    companyIntro: 'Tấn Phát Food là doanh nghiệp chuyên sản xuất và xuất khẩu bột trái cây tự nhiên đạt chuẩn GlobalG.A.P và HACCP. Bột chuối là một trong những sản phẩm chủ lực của chúng tôi, được chế biến từ chuối tươi chất lượng cao, giữ trọn hương vị và giá trị dinh dưỡng.',
    qualityDescription: 'Tấn Phát Food sử dụng công nghệ chế biến hiện đại, giúp giữ trọn hương vị, màu sắc và giá trị dinh dưỡng của chuối tươi. Quy trình sản xuất khép kín, đảm bảo an toàn vệ sinh thực phẩm tuyệt đối, không chất bảo quản, 100% tự nhiên.',
    certifications: {
      haccp: true,
      globalgap: true,
      vietgap: true,
      co: 'Đầy đủ các form D, E, RCEP',
    },
    markets: ['Trung Quốc', 'Hàn Quốc', 'Singapore', 'Nhật Bản', 'EU', 'Mỹ'],
    supplyCapacity: '30-50 tấn/tháng',
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột chuối tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
    fullDescription: `
      <p>Tấn Phát Food mang đến những sản phẩm bột chuối chất lượng cao, được chế biến từ chuối tươi đạt chuẩn GlobalG.A.P. Công nghệ chế biến hiện đại giúp giữ trọn hương vị, màu sắc và giá trị dinh dưỡng của chuối tươi.</p>
      <p>Bột chuối của Tấn Phát Food phù hợp cho ngành F&B, làm bánh, đồ uống, sữa chua và nhiều ứng dụng khác. Sản phẩm dễ hòa tan, hương vị thơm ngon tự nhiên, không chất bảo quản.</p>
    `,
  },
  {
    id: 2,
    title: 'Bột thanh long',
    description: 'Bột thanh long tự nhiên, màu sắc đẹp, giàu vitamin C',
    image: '/images/products/dragonfruit.png',
    slug: 'bot-thanh-long',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/dragonfruit.png',
      '/images/products/dragonfruit.png',
      '/images/products/dragonfruit.png',
      '/images/products/dragonfruit.png',
    ],
    features: [
      'Bột thanh long tự nhiên, màu hồng đẹp mắt.',
      'Giàu vitamin C và chất chống oxy hóa.',
      'Hương vị thơm nhẹ, vị ngọt thanh.',
      'Dùng cho đồ uống, làm bánh, sữa chua.',
    ],
    exportInfo: {
      variety: 'Bột thanh long nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 3,
    title: 'Bột sầu riêng',
    description: 'Bột sầu riêng thơm béo, giữ nguyên hương vị đặc trưng',
    image: '/images/products/durian.png',
    slug: 'bot-sau-rieng',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Bột sầu riêng thơm béo đặc trưng.',
      'Giữ nguyên hương vị tự nhiên của sầu riêng.',
      'Giàu chất xơ và vitamin nhóm B.',
      'Phù hợp cho làm bánh, kem, đồ uống.',
    ],
    exportInfo: {
      variety: 'Bột sầu riêng nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 4,
    title: 'Bột xoài',
    description: 'Bột xoài tự nhiên, vị ngọt thanh, màu vàng đẹp mắt',
    image: '/images/products/durian.png',
    slug: 'bot-xoai',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Bột xoài tự nhiên, màu vàng đẹp mắt.',
      'Vị ngọt thanh, hương thơm đặc trưng.',
      'Giàu vitamin C, A và chất xơ.',
      'Dùng cho đồ uống, làm bánh, kem.',
    ],
    exportInfo: {
      variety: 'Bột xoài nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 5,
    title: 'Bột dứa',
    description: 'Bột dứa tự nhiên, vị chua ngọt, thơm đặc trưng',
    image: '/images/products/durian.png',
    slug: 'bot-dua',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Bột dứa tự nhiên, vị chua ngọt hài hòa.',
      'Giàu vitamin C và enzyme tiêu hóa.',
      'Hương thơm đặc trưng của dứa.',
      'Phù hợp cho đồ uống, làm bánh, nước sốt.',
    ],
    exportInfo: {
      variety: 'Bột dứa nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 6,
    title: 'Bột cam',
    description: 'Bột cam tự nhiên, giàu vitamin C, vị chua ngọt',
    image: '/images/products/orange.png',
    slug: 'bot-cam',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/orange.png',
      '/images/products/orange.png',
      '/images/products/orange.png',
      '/images/products/orange.png',
    ],
    features: [
      'Bột cam tự nhiên, màu cam đẹp mắt.',
      'Giàu vitamin C, tăng cường sức đề kháng.',
      'Vị chua ngọt tự nhiên, thơm mát.',
      'Dùng cho đồ uống, làm bánh, sữa chua.',
    ],
    exportInfo: {
      variety: 'Bột cam nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 7,
    title: 'Bột ổi',
    description: 'Bột ổi tự nhiên, giàu vitamin C, vị ngọt thanh',
    image: '/images/products/guava.png',
    slug: 'bot-oi',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/guava.png',
      '/images/products/guava.png',
      '/images/products/guava.png',
      '/images/products/guava.png',
    ],
    features: [
      'Bột ổi tự nhiên, màu hồng nhạt đẹp mắt.',
      'Giàu vitamin C, tốt cho sức đề kháng.',
      'Vị ngọt thanh, hương thơm nhẹ.',
      'Phù hợp cho đồ uống, làm bánh, sữa chua.',
    ],
    exportInfo: {
      variety: 'Bột ổi nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 8,
    title: 'Bột chanh dây',
    description: 'Bột chanh dây tự nhiên, vị chua đặc trưng, thơm mát',
    image: '/images/products/lime.png',
    slug: 'bot-chanh-day',
    category: 'Bột trái cây xuất khẩu',
    images: [
      '/images/products/lime.png',
      '/images/products/lime.png',
      '/images/products/lime.png',
      '/images/products/lime.png',
    ],
    features: [
      'Bột chanh dây tự nhiên, vị chua đặc trưng.',
      'Giàu vitamin C và chất chống oxy hóa.',
      'Hương thơm mát, giải khát tốt.',
      'Dùng cho đồ uống, làm bánh, nước sốt.',
    ],
    exportInfo: {
      variety: 'Bột chanh dây nguyên chất',
      weight: '500g, 1kg, 5kg, 10kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Bảo quản ở nhiệt độ phòng, tránh ẩm',
    },
  },
]

export const getPowderProductBySlug = (slug: string): PowderProduct | undefined => {
  return mockPowderProducts.find((product) => product.slug === slug)
}

export const getAllPowderProducts = (): PowderProduct[] => {
  return mockPowderProducts
}

