export interface DriedProduct {
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

export const mockDriedProducts: DriedProduct[] = [
  {
    id: 1,
    title: 'Sầu riêng sấy',
    description: 'Sầu riêng sấy giữ nguyên hương vị đặc trưng, thơm béo',
    image: '/images/products/durian.png',
    slug: 'sau-rieng-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Giữ nguyên hương vị đặc trưng của sầu riêng tươi.',
      'Công nghệ sấy lạnh giữ trọn dinh dưỡng và hương thơm.',
      'Không chất bảo quản, 100% tự nhiên.',
      'Đóng gói chân không, bảo quản lâu dài.',
    ],
    exportInfo: {
      variety: 'Sầu riêng sấy giòn / Sầu riêng sấy dẻo',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
    companyIntro: 'Tấn Phát Food là doanh nghiệp chuyên sản xuất và xuất khẩu trái cây sấy đạt chuẩn GlobalG.A.P và HACCP. Sầu riêng sấy là một trong những sản phẩm chủ lực của chúng tôi, được chế biến từ sầu riêng tươi chất lượng cao, giữ trọn hương vị đặc trưng.',
    qualityDescription: 'Tấn Phát Food sử dụng công nghệ sấy lạnh hiện đại, giúp giữ trọn dinh dưỡng, màu sắc và hương thơm tự nhiên của sầu riêng. Quy trình chế biến khép kín, đảm bảo an toàn vệ sinh thực phẩm tuyệt đối.',
    certifications: {
      haccp: true,
      globalgap: true,
      vietgap: true,
      co: 'Đầy đủ các form D, E, RCEP',
    },
    markets: ['Trung Quốc', 'Hàn Quốc', 'Singapore', 'Nhật Bản', 'Các nước châu Á khác'],
    supplyCapacity: '50-80 tấn/tháng',
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Sầu riêng sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
    fullDescription: `
      <p>Tấn Phát Food mang đến những sản phẩm sầu riêng sấy chất lượng cao, được chế biến từ sầu riêng tươi đạt chuẩn GlobalG.A.P. Công nghệ sấy lạnh hiện đại giúp giữ trọn hương vị, màu sắc và giá trị dinh dưỡng của sầu riêng tươi.</p>
      <p>Với quy trình chế biến khép kín và đóng gói chân không, sản phẩm có thời hạn bảo quản lâu dài mà vẫn giữ được độ tươi ngon và hương thơm đặc trưng.</p>
    `,
  },
  {
    id: 2,
    title: 'Chuối sấy',
    description: 'Chuối sấy giòn, ngọt tự nhiên, giàu dinh dưỡng',
    image: '/images/products/banana.png',
    slug: 'chuoi-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/banana.png',
      '/images/products/banana.png',
      '/images/products/banana.png',
      '/images/products/banana.png',
    ],
    features: [
      'Chuối sấy giòn, vị ngọt tự nhiên.',
      'Giàu Kali, vitamin B6, tốt cho sức khỏe.',
      'Công nghệ sấy tiên tiến, giữ nguyên màu sắc.',
      'Không đường thêm, không chất bảo quản.',
    ],
    exportInfo: {
      variety: 'Chuối sấy dẻo / Chuối sấy giòn',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
  {
    id: 3,
    title: 'Xoài sấy',
    description: 'Xoài sấy dẻo, ngọt thanh, giữ nguyên hương vị',
    image: '/images/products/durian.png',
    slug: 'xoai-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Xoài sấy dẻo, vị ngọt thanh tự nhiên.',
      'Giữ nguyên màu vàng đẹp mắt.',
      'Giàu vitamin C và chất xơ.',
      'Không chất bảo quản, 100% tự nhiên.',
    ],
    exportInfo: {
      variety: 'Xoài sấy dẻo / Xoài sấy giòn',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
  {
    id: 4,
    title: 'Dứa sấy',
    description: 'Dứa sấy giòn, chua ngọt hài hòa, thơm đặc trưng',
    image: '/images/products/durian.png',
    slug: 'dua-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Dứa sấy giòn, vị chua ngọt hài hòa.',
      'Giữ nguyên hương thơm đặc trưng.',
      'Giàu vitamin C và enzyme tiêu hóa.',
      'Đóng gói chân không, giữ độ giòn lâu.',
    ],
    exportInfo: {
      variety: 'Dứa sấy giòn',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
  {
    id: 5,
    title: 'Khoai lang sấy',
    description: 'Khoai lang sấy giòn, ngọt tự nhiên, tốt cho sức khỏe',
    image: '/images/products/durian.png',
    slug: 'khoai-lang-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Khoai lang sấy giòn, vị ngọt tự nhiên.',
      'Giàu chất xơ, beta-carotene, tốt cho mắt.',
      'Không dầu mỡ, không chất bảo quản.',
      'Đóng gói chân không, bảo quản lâu dài.',
    ],
    exportInfo: {
      variety: 'Khoai lang sấy giòn',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
  {
    id: 6,
    title: 'Ổi sấy',
    description: 'Ổi sấy dẻo, giữ nguyên vị ngọt và thơm đặc trưng',
    image: '/images/products/guava.png',
    slug: 'oi-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/guava.png',
      '/images/products/guava.png',
      '/images/products/guava.png',
      '/images/products/guava.png',
    ],
    features: [
      'Ổi sấy dẻo, vị ngọt thanh tự nhiên.',
      'Giàu vitamin C, tốt cho sức đề kháng.',
      'Giữ nguyên màu sắc và hương thơm.',
      'Không chất bảo quản, 100% tự nhiên.',
    ],
    exportInfo: {
      variety: 'Ổi sấy dẻo',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
  {
    id: 7,
    title: 'Táo sấy',
    description: 'Táo sấy dẻo, ngọt tự nhiên, giàu chất xơ',
    image: '/images/products/durian.png',
    slug: 'tao-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Táo sấy dẻo, vị ngọt tự nhiên.',
      'Giàu chất xơ, tốt cho tiêu hóa.',
      'Giữ nguyên màu sắc và hương vị.',
      'Không chất bảo quản, an toàn cho sức khỏe.',
    ],
    exportInfo: {
      variety: 'Táo sấy dẻo',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
  {
    id: 8,
    title: 'Mít sấy',
    description: 'Mít sấy giòn, thơm đặc trưng, ngọt tự nhiên',
    image: '/images/products/durian.png',
    slug: 'mit-say',
    category: 'Trái cây sấy xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Mít sấy giòn, thơm đặc trưng.',
      'Vị ngọt tự nhiên, không đường thêm.',
      'Giữ nguyên hương vị và màu sắc.',
      'Đóng gói chân không, bảo quản lâu dài.',
    ],
    exportInfo: {
      variety: 'Mít sấy giòn',
      weight: '200g, 500g, 1kg/túi',
      packaging: 'Túi chân không, thùng carton',
      condition: 'Sấy khô, bảo quản ở nhiệt độ phòng',
    },
  },
]

export const getDriedProductBySlug = (slug: string): DriedProduct | undefined => {
  return mockDriedProducts.find((product) => product.slug === slug)
}

export const getAllDriedProducts = (): DriedProduct[] => {
  return mockDriedProducts
}

