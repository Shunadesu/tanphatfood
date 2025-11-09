import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';

// Load environment variables
dotenv.config();

// Mock data for fresh fruits (trái cây tươi xuất khẩu)
const freshProducts = [
  {
    name: 'Sầu riêng',
    description: 'Sầu riêng tươi ngon, đạt chuẩn xuất khẩu',
    type: 'fresh',
    shortDescription: 'Sầu riêng tươi ngon, đạt chuẩn xuất khẩu',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
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
    qualityImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
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
    fullDescription: '<div class="space-y-6"><h3 class="text-2xl font-bold text-[#00652E] mb-4">Tổng quan về Sầu riêng Tấn Phát</h3><p>Tấn Phát Food mang đến những sản phẩm sầu riêng chất lượng cao, được tuyển chọn từ những vùng trồng đạt chuẩn GlobalG.A.P tại các tỉnh miền Nam Việt Nam. Mỗi trái sầu riêng đều được kiểm tra kỹ lưỡng về chất lượng, độ chín, kích thước và an toàn vệ sinh thực phẩm trước khi xuất khẩu.</p><h3 class="text-2xl font-bold text-[#00652E] mb-4">Quy trình sản xuất và xuất khẩu</h3><p><strong>1. Thu hoạch:</strong> Sầu riêng được thu hoạch đúng độ chín, đảm bảo chất lượng tối ưu. Đội ngũ nhân viên được đào tạo chuyên nghiệp để nhận biết và phân loại trái đạt chuẩn.</p><p><strong>2. Xử lý hơi nóng:</strong> Theo tiêu chuẩn quốc tế, sầu riêng được xử lý bằng hơi nóng để đảm bảo an toàn thực phẩm và tiêu diệt các mầm bệnh, đáp ứng yêu cầu của các thị trường khắt khe.</p><p><strong>3. Phân loại và đóng gói:</strong> Trái được phân loại theo kích thước, độ chín và chất lượng. Đóng gói chuyên nghiệp với thùng carton cao cấp, đảm bảo sản phẩm không bị hư hại trong quá trình vận chuyển.</p><p><strong>4. Bảo quản lạnh:</strong> Sử dụng kho lạnh hiện đại với nhiệt độ được kiểm soát chặt chẽ, giúp kéo dài thời hạn sử dụng và giữ nguyên chất lượng sản phẩm.</p></div>',
    isActive: true,
    isFeatured: true,
    order: 0,
  },
  {
    name: 'Thanh Long',
    description: 'Thanh long tươi, giữ nguyên hương vị tự nhiên',
    type: 'fresh',
    shortDescription: 'Thanh long tươi, giữ nguyên hương vị tự nhiên',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/dragonfruit.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/dragonfruit.png',
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
    isActive: true,
    isFeatured: false,
    order: 1,
  },
  {
    name: 'Chuối',
    description: 'Chuối tươi, giàu dinh dưỡng',
    type: 'fresh',
    shortDescription: 'Chuối tươi, giàu dinh dưỡng',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/banana.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/banana.png',
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
    isActive: true,
    isFeatured: false,
    order: 2,
  },
  {
    name: 'Bưởi',
    description: 'Bưởi da xanh, ngọt thanh',
    type: 'fresh',
    shortDescription: 'Bưởi da xanh, ngọt thanh',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/pomelo.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/pomelo.png',
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
    isActive: true,
    isFeatured: false,
    order: 3,
  },
  {
    name: 'Dừa tươi',
    description: 'Dừa tươi nguyên chất, không chất bảo quản',
    type: 'fresh',
    shortDescription: 'Dừa tươi nguyên chất, không chất bảo quản',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/coconut.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/coconut.png',
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
    isActive: true,
    isFeatured: false,
    order: 4,
  },
  {
    name: 'Chanh không hạt',
    description: 'Chanh không hạt, vỏ mỏng, nhiều nước',
    type: 'fresh',
    shortDescription: 'Chanh không hạt, vỏ mỏng, nhiều nước',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/lime.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/lime.png',
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
    isActive: true,
    isFeatured: false,
    order: 5,
  },
  {
    name: 'Cam',
    description: 'Cam tươi, ngọt tự nhiên',
    type: 'fresh',
    shortDescription: 'Cam tươi, ngọt tự nhiên',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/orange.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/orange.png',
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
    isActive: true,
    isFeatured: false,
    order: 6,
  },
  {
    name: 'Ổi',
    description: 'Ổi tươi, giòn ngọt',
    type: 'fresh',
    shortDescription: 'Ổi tươi, giòn ngọt',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/guava.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/guava.png',
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
    isActive: true,
    isFeatured: false,
    order: 7,
  },
  {
    name: 'Xoài',
    description: 'Xoài tươi, thơm ngọt, giàu vitamin',
    type: 'fresh',
    shortDescription: 'Xoài tươi, thơm ngọt, giàu vitamin',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    ],
    features: [
      'Xoài cát Hòa Lộc, thơm ngọt đậm đà.',
      'Quả to, thịt dày, hạt mỏng.',
      'Trồng theo tiêu chuẩn GlobalG.A.P.',
      'Đóng gói và bảo quản chuyên nghiệp.',
    ],
    exportInfo: {
      variety: 'Xoài cát Hòa Lộc / Xoài tứ quý',
      weight: '300-600g/trái',
      packaging: 'Thùng carton 10-12kg',
      condition: 'Nguyên trái tươi',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Xoài',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
    isActive: true,
    isFeatured: false,
    order: 8,
  },
  {
    name: 'Nhãn',
    description: 'Nhãn tươi, ngọt thanh, giòn mát',
    type: 'fresh',
    shortDescription: 'Nhãn tươi, ngọt thanh, giòn mát',
    image: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    images: [
      'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    ],
    features: [
      'Nhãn lồng Hưng Yên, ngọt thanh đặc trưng.',
      'Cùi dày, hạt nhỏ, giòn mát.',
      'Trồng theo tiêu chuẩn sạch, an toàn.',
      'Bảo quản lạnh, giữ độ tươi lâu.',
    ],
    exportInfo: {
      variety: 'Nhãn lồng Hưng Yên',
      weight: '10-15g/trái',
      packaging: 'Thùng carton 5-7kg',
      condition: 'Chùm nguyên hoặc rời',
    },
    detailedInfo: {
      brand: 'Tấn Phát Food',
      origin: 'Việt Nam',
      fruitType: 'Nhãn',
      storageInstructions: 'Bảo quản nơi khô ráo, tránh ánh nắng',
    },
    isActive: true,
    isFeatured: false,
    order: 9,
  },
];

// Seed products
const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing fresh products
    await Product.deleteMany({ type: 'fresh' });
    console.log('Cleared existing fresh products');

    // Insert products
    const createdProducts = await Product.insertMany(freshProducts);
    console.log(`✅ Successfully seeded ${createdProducts.length} fresh products`);

    // Display created products
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.slug}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

// Run seed
seedProducts();

