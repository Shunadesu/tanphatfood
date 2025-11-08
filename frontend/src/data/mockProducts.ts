export interface Product {
  id: number
  title: string
  description: string
  image: string
  slug: string
  type: 'fresh' | 'dried' | 'powder' // Add type field
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
  qualityImage?: string // Image for quality section
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

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Sầu riêng',
    description: 'Sầu riêng tươi ngon, đạt chuẩn xuất khẩu',
    image: '/images/products/durian.png',
    slug: 'sau-rieng',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
      '/images/products/durian.png',
    ],
    features: [
      'Cơm vàng óng, dẻo và béo thơm đặc trưng.',
      'Sản phẩm được xử lý hơi nóng theo tiêu chuẩn quốc tế.',
      'Truy xuất nguồn gốc minh bạch qua mã QR và tem điện tử.',
      'Đóng gói linh hoạt: nguyên trái, tách múi hoặc cấp đông tùy theo yêu cầu từng thị trường.',
    ],
    exportInfo: {
      variety: 'Ri6 / Monthong',
      weight: '1.5-4.5kg/trái',
      packaging: 'Thùng carton 10-12kg',
      condition: 'Nguyên trái hoặc tách múi cấp đông',
    },
    companyIntro: 'Tấn Phát Food là doanh nghiệp chuyên cung cấp và xuất khẩu trái cây tươi đạt chuẩn GlobalG.A.P và HACCP. Sầu riêng Ri6 và Monthong là những sản phẩm chủ lực của chúng tôi, được biết đến với chất lượng, hương vị đặc trưng và thời hạn bảo quản lâu dài.',
    qualityDescription: 'Sầu riêng Tấn Phát được thu hoạch từ các khu vực nguyên liệu đạt chuẩn xuất khẩu, được giám sát nghiêm ngặt từ khâu canh tác, thu hoạch, phân loại đến đóng gói. Mỗi lô hàng đều được xử lý qua quy trình bảo quản lạnh hiện đại, đảm bảo giữ trọn độ dẻo, béo và hương thơm tự nhiên của sầu riêng trong suốt quá trình vận chuyển đến thị trường quốc tế.',
    qualityImage: '/images/products/durian.png',
    certifications: {
      haccp: true,
      globalgap: true,
      vietgap: true,
      co: 'Đầy đủ các form D, E, RCEP',
    },
    markets: ['Trung Quốc', 'Hàn Quốc', 'Singapore', 'Nhật Bản', 'Các nước châu Á khác'],
    supplyCapacity: '100-150 tấn/tháng',
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Sầu riêng hạt lép',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
    fullDescription: `
      <div class="space-y-6">
        <h3 class="text-2xl font-bold text-[#00652E] mb-4">Tổng quan về Sầu riêng Tấn Phát</h3>
        <p>Tấn Phát Food mang đến những sản phẩm sầu riêng chất lượng cao, được tuyển chọn từ những vùng trồng đạt chuẩn GlobalG.A.P tại các tỉnh miền Nam Việt Nam. Mỗi trái sầu riêng đều được kiểm tra kỹ lưỡng về chất lượng, độ chín, kích thước và an toàn vệ sinh thực phẩm trước khi xuất khẩu.</p>
        
        <h3 class="text-2xl font-bold text-[#00652E] mb-4">Quy trình sản xuất và xuất khẩu</h3>
        <p><strong>1. Thu hoạch:</strong> Sầu riêng được thu hoạch đúng độ chín, đảm bảo chất lượng tối ưu. Đội ngũ nhân viên được đào tạo chuyên nghiệp để nhận biết và phân loại trái đạt chuẩn.</p>
        <p><strong>2. Xử lý hơi nóng:</strong> Theo tiêu chuẩn quốc tế, sầu riêng được xử lý bằng hơi nóng để đảm bảo an toàn thực phẩm và tiêu diệt các mầm bệnh, đáp ứng yêu cầu của các thị trường khắt khe.</p>
        <p><strong>3. Phân loại và đóng gói:</strong> Trái được phân loại theo kích thước, độ chín và chất lượng. Đóng gói chuyên nghiệp với thùng carton cao cấp, đảm bảo sản phẩm không bị hư hại trong quá trình vận chuyển.</p>
        <p><strong>4. Bảo quản lạnh:</strong> Sử dụng kho lạnh hiện đại với nhiệt độ được kiểm soát chặt chẽ, giúp kéo dài thời hạn sử dụng và giữ nguyên chất lượng sản phẩm.</p>
        
        <h3 class="text-2xl font-bold text-[#00652E] mb-4">Truy xuất nguồn gốc</h3>
        <p>Mỗi lô hàng sầu riêng Tấn Phát đều được gắn mã QR code và tem điện tử, cho phép khách hàng truy xuất đầy đủ thông tin về nguồn gốc, quy trình sản xuất, ngày thu hoạch và các chứng nhận chất lượng. Điều này đảm bảo tính minh bạch và đáng tin cậy của sản phẩm.</p>
        
        <h3 class="text-2xl font-bold text-[#00652E] mb-4">Đóng gói linh hoạt</h3>
        <p>Tấn Phát Food cung cấp nhiều phương thức đóng gói để đáp ứng nhu cầu đa dạng của từng thị trường:</p>
        <ul class="list-disc list-inside space-y-2 ml-4">
          <li><strong>Nguyên trái:</strong> Phù hợp cho thị trường yêu thích trải nghiệm mở trái truyền thống</li>
          <li><strong>Tách múi:</strong> Tiện lợi cho người tiêu dùng, dễ dàng sử dụng</li>
          <li><strong>Cấp đông:</strong> Giữ nguyên chất lượng trong thời gian dài, phù hợp cho xuất khẩu xa</li>
        </ul>
        
        <h3 class="text-2xl font-bold text-[#00652E] mb-4">Cam kết chất lượng</h3>
        <p>Với quy trình bảo quản và vận chuyển chuyên nghiệp, Tấn Phát Food đảm bảo sản phẩm luôn giữ được độ tươi ngon, hương vị đặc trưng và giá trị dinh dưỡng khi đến tay khách hàng quốc tế. Chúng tôi cam kết mang đến những sản phẩm sầu riêng chất lượng cao nhất, đáp ứng mọi tiêu chuẩn khắt khe của thị trường xuất khẩu.</p>
      </div>
    `,
  },
  {
    id: 2,
    title: 'Thanh Long',
    description: 'Thanh long tươi, giữ nguyên hương vị tự nhiên',
    image: '/images/products/dragonfruit.png',
    slug: 'thanh-long',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/dragonfruit.png',
      '/images/products/dragonfruit.png',
      '/images/products/dragonfruit.png',
      '/images/products/dragonfruit.png',
    ],
    features: [
      'Quả to, đẹp, vỏ đỏ tươi, ruột trắng ngọt mát.',
      'Được trồng theo tiêu chuẩn GlobalG.A.P.',
      'Bảo quản lạnh, giữ độ tươi lâu.',
      'Đóng gói chuyên nghiệp, an toàn vệ sinh.',
    ],
    exportInfo: {
      variety: 'Thanh long ruột trắng / ruột đỏ',
      weight: '300-600g/trái',
      packaging: 'Thùng carton 5-7kg',
      condition: 'Nguyên trái tươi',
    },
  },
  {
    id: 3,
    title: 'Chuối',
    description: 'Chuối tươi, giàu dinh dưỡng',
    image: '/images/products/banana.png',
    slug: 'chuoi',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/banana.png',
      '/images/products/banana.png',
      '/images/products/banana.png',
      '/images/products/banana.png',
    ],
    features: [
      'Chuối già Nam Mỹ, vị ngọt đậm đà.',
      'Độ chín đồng đều, đảm bảo chất lượng.',
      'Bảo quản và vận chuyển chuyên nghiệp.',
      'Đạt tiêu chuẩn xuất khẩu quốc tế.',
    ],
    exportInfo: {
      variety: 'Chuối già Nam Mỹ',
      weight: '150-250g/trái',
      packaging: 'Thùng carton 13-15kg',
      condition: 'Nải nguyên hoặc rời',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Chuối',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
  },
  {
    id: 4,
    title: 'Bưởi',
    description: 'Bưởi da xanh, ngọt thanh',
    image: '/images/products/pomelo.png',
    slug: 'buoi',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/pomelo.png',
      '/images/products/pomelo.png',
      '/images/products/pomelo.png',
      '/images/products/pomelo.png',
    ],
    features: [
      'Bưởi da xanh, ruột hồng, vị ngọt thanh.',
      'Quả to, cùi dày, múi mọng nước.',
      'Trồng theo tiêu chuẩn sạch, an toàn.',
      'Đóng gói bảo vệ tốt, giữ độ tươi.',
    ],
    exportInfo: {
      variety: 'Bưởi da xanh',
      weight: '1.2-2.5kg/trái',
      packaging: 'Thùng carton 10-12kg',
      condition: 'Nguyên trái tươi',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bưởi',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
  },
  {
    id: 5,
    title: 'Dừa tươi',
    description: 'Dừa tươi nguyên chất, không chất bảo quản',
    image: '/images/products/coconut.png',
    slug: 'dua-tuoi',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/coconut.png',
      '/images/products/coconut.png',
      '/images/products/coconut.png',
      '/images/products/coconut.png',
    ],
    features: [
      'Dừa tươi, nước ngọt mát, cơm dày.',
      'Thu hoạch đúng độ chín, đảm bảo chất lượng.',
      'Bảo quản lạnh, giữ độ tươi lâu.',
      'Đóng gói chuyên nghiệp, an toàn.',
    ],
    exportInfo: {
      variety: 'Dừa xiêm / Dừa dứa',
      weight: '1.0-1.5kg/trái',
      packaging: 'Thùng carton 12-15kg',
      condition: 'Nguyên trái tươi',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Dừa tươi',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
  },
  {
    id: 6,
    title: 'Chanh không hạt',
    description: 'Chanh không hạt, vỏ mỏng, nhiều nước',
    image: '/images/products/lime.png',
    slug: 'chanh-khong-hat',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/lime.png',
      '/images/products/lime.png',
      '/images/products/lime.png',
      '/images/products/lime.png',
    ],
    features: [
      'Chanh không hạt, vỏ mỏng, nhiều nước.',
      'Vị chua thanh, thơm đặc trưng.',
      'Trồng theo tiêu chuẩn sạch, an toàn.',
      'Đóng gói chuyên nghiệp, bảo quản tốt.',
    ],
    exportInfo: {
      variety: 'Chanh không hạt',
      weight: '80-120g/trái',
      packaging: 'Thùng carton 10-12kg',
      condition: 'Nguyên trái tươi',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Chanh không hạt',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
  },
  {
    id: 7,
    title: 'Cam',
    description: 'Cam tươi, ngọt tự nhiên',
    image: '/images/products/orange.png',
    slug: 'cam',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/orange.png',
      '/images/products/orange.png',
      '/images/products/orange.png',
      '/images/products/orange.png',
    ],
    features: [
      'Cam sành, vỏ vàng, ruột đỏ ngọt.',
      'Nhiều nước, vị ngọt tự nhiên.',
      'Trồng theo tiêu chuẩn sạch.',
      'Đóng gói và bảo quản chuyên nghiệp.',
    ],
    exportInfo: {
      variety: 'Cam sành / Cam xoàn',
      weight: '200-350g/trái',
      packaging: 'Thùng carton 10-12kg',
      condition: 'Nguyên trái tươi',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Cam',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
  },
  {
    id: 8,
    title: 'Ổi',
    description: 'Ổi tươi, giòn ngọt',
    image: '/images/products/guava.png',
    slug: 'oi',
    type: 'fresh',
    category: 'Trái cây tươi xuất khẩu',
    images: [
      '/images/products/guava.png',
      '/images/products/guava.png',
      '/images/products/guava.png',
      '/images/products/guava.png',
    ],
    features: [
      'Ổi ruột trắng, giòn ngọt, thơm đặc trưng.',
      'Quả to, đều, đẹp mắt.',
      'Trồng theo tiêu chuẩn sạch, an toàn.',
      'Bảo quản và đóng gói chuyên nghiệp.',
    ],
    exportInfo: {
      variety: 'Ổi ruột trắng',
      weight: '200-400g/trái',
      packaging: 'Thùng carton 10-12kg',
      condition: 'Nguyên trái tươi',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Ổi',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
  },
  // Dried Products
  {
    id: 9,
    title: 'Sầu riêng sấy',
    description: 'Sầu riêng sấy giữ nguyên hương vị đặc trưng, thơm béo',
    image: '/images/products/durian.png',
    slug: 'sau-rieng-say',
    type: 'dried',
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
    qualityImage: '/images/products/durian.png',
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
    id: 10,
    title: 'Chuối sấy',
    description: 'Chuối sấy giòn, ngọt tự nhiên, giàu dinh dưỡng',
    image: '/images/products/banana.png',
    slug: 'chuoi-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Chuối sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  {
    id: 11,
    title: 'Xoài sấy',
    description: 'Xoài sấy dẻo, ngọt thanh, giữ nguyên hương vị',
    image: '/images/products/durian.png',
    slug: 'xoai-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Xoài sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  {
    id: 12,
    title: 'Dứa sấy',
    description: 'Dứa sấy giòn, chua ngọt hài hòa, thơm đặc trưng',
    image: '/images/products/durian.png',
    slug: 'dua-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Dứa sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  {
    id: 13,
    title: 'Khoai lang sấy',
    description: 'Khoai lang sấy giòn, ngọt tự nhiên, tốt cho sức khỏe',
    image: '/images/products/durian.png',
    slug: 'khoai-lang-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Khoai lang sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  {
    id: 14,
    title: 'Ổi sấy',
    description: 'Ổi sấy dẻo, giữ nguyên vị ngọt và thơm đặc trưng',
    image: '/images/products/guava.png',
    slug: 'oi-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Ổi sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  {
    id: 15,
    title: 'Táo sấy',
    description: 'Táo sấy dẻo, ngọt tự nhiên, giàu chất xơ',
    image: '/images/products/durian.png',
    slug: 'tao-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Táo sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  {
    id: 16,
    title: 'Mít sấy',
    description: 'Mít sấy giòn, thơm đặc trưng, ngọt tự nhiên',
    image: '/images/products/durian.png',
    slug: 'mit-say',
    type: 'dried',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Mít sấy',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng',
    },
  },
  // Powder Products
  {
    id: 17,
    title: 'Bột chuối',
    description: 'Bột chuối tự nhiên, giàu dinh dưỡng, dùng cho thực phẩm và đồ uống',
    image: '/images/products/banana.png',
    slug: 'bot-chuoi',
    type: 'powder',
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
    qualityImage: '/images/products/banana.png',
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
    id: 18,
    title: 'Bột thanh long',
    description: 'Bột thanh long tự nhiên, màu sắc đẹp, giàu vitamin C',
    image: '/images/products/dragonfruit.png',
    slug: 'bot-thanh-long',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột thanh long tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 19,
    title: 'Bột sầu riêng',
    description: 'Bột sầu riêng thơm béo, giữ nguyên hương vị đặc trưng',
    image: '/images/products/durian.png',
    slug: 'bot-sau-rieng',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột sầu riêng tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 20,
    title: 'Bột xoài',
    description: 'Bột xoài tự nhiên, vị ngọt thanh, màu vàng đẹp mắt',
    image: '/images/products/durian.png',
    slug: 'bot-xoai',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột xoài tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 21,
    title: 'Bột dứa',
    description: 'Bột dứa tự nhiên, vị chua ngọt, thơm đặc trưng',
    image: '/images/products/durian.png',
    slug: 'bot-dua',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột dứa tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 22,
    title: 'Bột cam',
    description: 'Bột cam tự nhiên, giàu vitamin C, vị chua ngọt',
    image: '/images/products/orange.png',
    slug: 'bot-cam',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột cam tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 23,
    title: 'Bột ổi',
    description: 'Bột ổi tự nhiên, giàu vitamin C, vị ngọt thanh',
    image: '/images/products/guava.png',
    slug: 'bot-oi',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột ổi tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
  {
    id: 24,
    title: 'Bột chanh dây',
    description: 'Bột chanh dây tự nhiên, vị chua đặc trưng, thơm mát',
    image: '/images/products/lime.png',
    slug: 'bot-chanh-day',
    type: 'powder',
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
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Bột chanh dây tự nhiên',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng, nhiệt độ phòng, tránh ẩm',
    },
  },
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return mockProducts.find((product) => product.slug === slug)
}

export const getAllProducts = (): Product[] => {
  return mockProducts
}

export const getProductsByType = (type: 'fresh' | 'dried' | 'powder'): Product[] => {
  return mockProducts.filter((product) => product.type === type)
}

export const getAllFreshProducts = (): Product[] => {
  return getProductsByType('fresh')
}

export const getAllDriedProducts = (): Product[] => {
  return getProductsByType('dried')
}

export const getAllPowderProducts = (): Product[] => {
  return getProductsByType('powder')
}

