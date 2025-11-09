import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import News from '../models/News.js';
import NewsCategory from '../models/NewsCategory.js';

// Load environment variables
dotenv.config();

// Mock data for news articles
const newsArticles = [
  {
    title: 'Cơ hội xuất khẩu sầu riêng Việt sang thị trường Trung Quốc',
    shortDescription: 'Trung Quốc mở rộng hạn ngạch nhập khẩu sầu riêng Việt Nam, mở ra cơ hội tăng trưởng mạnh mẽ cho ngành trái cây xuất khẩu năm 2025.',
    content: `
      <h2>Cơ hội vàng cho sầu riêng Việt Nam</h2>
      <p>Trung Quốc vừa công bố mở rộng hạn ngạch nhập khẩu sầu riêng từ Việt Nam, đánh dấu một bước tiến quan trọng trong hợp tác thương mại giữa hai quốc gia. Quyết định này được kỳ vọng sẽ mở ra nhiều cơ hội tăng trưởng mạnh mẽ cho ngành trái cây xuất khẩu Việt Nam trong năm 2025.</p>
      
      <h3>Tác động tích cực đến ngành nông nghiệp</h3>
      <p>Việc mở rộng hạn ngạch nhập khẩu sầu riêng không chỉ mang lại lợi ích kinh tế trực tiếp cho các doanh nghiệp xuất khẩu, mà còn tạo động lực phát triển cho toàn bộ chuỗi cung ứng nông sản. Các nhà vườn, nhà máy chế biến và đóng gói sẽ có cơ hội mở rộng sản xuất và nâng cao chất lượng sản phẩm.</p>
      
      <p>Tấn Phát Food, với hơn 10 năm kinh nghiệm trong lĩnh vực xuất khẩu nông sản, đã sẵn sàng đón nhận cơ hội này. Chúng tôi đã đầu tư vào hệ thống nhà vườn đạt chuẩn GlobalG.A.P và HACCP, đảm bảo chất lượng sản phẩm đáp ứng các tiêu chuẩn khắt khe của thị trường Trung Quốc.</p>
      
      <h3>Chiến lược phát triển bền vững</h3>
      <p>Để tận dụng tối đa cơ hội này, các doanh nghiệp cần tập trung vào việc nâng cao chất lượng sản phẩm, tuân thủ các tiêu chuẩn quốc tế và xây dựng thương hiệu uy tín. Tấn Phát Food cam kết đồng hành cùng các đối tác trong việc phát triển chuỗi cung ứng bền vững và chất lượng cao.</p>
    `,
    featuredImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    author: 'Tấn Phát Food',
    tags: ['xuất khẩu', 'sầu riêng', 'Trung Quốc', 'thị trường'],
    publishedAt: new Date('2025-10-15'),
    isPublished: true,
    isFeatured: true,
    order: 0,
  },
  {
    title: 'Xu hướng trái cây sấy Việt Nam trong thị trường châu Á',
    shortDescription: 'Sản phẩm trái cây sấy tự nhiên đang được ưa chuộng tại Hàn Quốc, Nhật Bản, Singapore - cơ hội lớn cho doanh nghiệp Việt Nam mở rộng xuất khẩu.',
    content: `
      <h2>Trái cây sấy tự nhiên - Xu hướng tiêu dùng mới</h2>
      <p>Sản phẩm trái cây sấy tự nhiên đang trở thành xu hướng tiêu dùng mới tại các thị trường châu Á như Hàn Quốc, Nhật Bản và Singapore. Người tiêu dùng ngày càng quan tâm đến sức khỏe và lựa chọn các sản phẩm tự nhiên, không chất bảo quản.</p>
      
      <h3>Thị trường tiềm năng</h3>
      <p>Với dân số đông và thu nhập ngày càng cao, các thị trường châu Á đang trở thành điểm đến lý tưởng cho các sản phẩm trái cây sấy chất lượng cao từ Việt Nam. Đặc biệt, thị trường Hàn Quốc và Nhật Bản có nhu cầu rất lớn về các sản phẩm trái cây sấy tự nhiên, giữ nguyên hương vị và giá trị dinh dưỡng.</p>
      
      <p>Tấn Phát Food đã đầu tư vào công nghệ sấy khô tiên tiến, giúp giữ nguyên màu sắc, hương vị và giá trị dinh dưỡng của trái cây. Sản phẩm của chúng tôi đã được chứng nhận đạt chuẩn quốc tế và được đánh giá cao tại các thị trường này.</p>
      
      <h3>Cơ hội phát triển</h3>
      <p>Đây là cơ hội lớn cho các doanh nghiệp Việt Nam mở rộng xuất khẩu và xây dựng thương hiệu trên thị trường quốc tế. Tấn Phát Food sẵn sàng hợp tác với các đối tác trong và ngoài nước để phát triển và mở rộng thị trường xuất khẩu trái cây sấy Việt Nam.</p>
    `,
    featuredImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    author: 'Tấn Phát Food',
    tags: ['trái cây sấy', 'xuất khẩu', 'châu Á', 'Hàn Quốc', 'Nhật Bản'],
    publishedAt: new Date('2025-10-15'),
    isPublished: true,
    isFeatured: false,
    order: 1,
  },
  {
    title: 'GlobalG.A.P – Tiêu chuẩn vàng cho nông sản xuất khẩu',
    shortDescription: 'Tìm hiểu vì sao tiêu chuẩn GlobalG.A.P trở thành "chìa khóa" giúp nông sản Việt chinh phục các thị trường khó tính như EU và Nhật Bản.',
    content: `
      <h2>GlobalG.A.P - Chìa khóa thành công</h2>
      <p>Tiêu chuẩn GlobalG.A.P (Global Good Agricultural Practice) đã trở thành "chìa khóa vàng" giúp nông sản Việt Nam chinh phục các thị trường khó tính như EU và Nhật Bản. Đây là bộ tiêu chuẩn quốc tế về thực hành nông nghiệp tốt, đảm bảo an toàn thực phẩm và bền vững môi trường.</p>
      
      <h3>Tại sao GlobalG.A.P quan trọng?</h3>
      <p>GlobalG.A.P không chỉ đảm bảo chất lượng sản phẩm mà còn chứng minh cam kết của doanh nghiệp về an toàn thực phẩm, bảo vệ môi trường và trách nhiệm xã hội. Các thị trường khó tính như EU và Nhật Bản yêu cầu các sản phẩm nhập khẩu phải đạt chứng nhận GlobalG.A.P như một điều kiện bắt buộc.</p>
      
      <p>Tấn Phát Food đã đầu tư mạnh mẽ vào việc xây dựng hệ thống nhà vườn đạt chuẩn GlobalG.A.P. Tất cả các sản phẩm của chúng tôi đều được sản xuất theo quy trình nghiêm ngặt, từ khâu chọn giống, canh tác đến thu hoạch và đóng gói.</p>
      
      <h3>Lợi ích của chứng nhận GlobalG.A.P</h3>
      <p>Việc đạt chứng nhận GlobalG.A.P mang lại nhiều lợi ích cho doanh nghiệp: nâng cao uy tín thương hiệu, mở rộng thị trường xuất khẩu, tăng giá trị sản phẩm và đảm bảo tính bền vững lâu dài. Tấn Phát Food tự hào là một trong những doanh nghiệp tiên phong trong việc áp dụng và tuân thủ các tiêu chuẩn quốc tế này.</p>
    `,
    featuredImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    author: 'Tấn Phát Food',
    tags: ['GlobalG.A.P', 'tiêu chuẩn', 'xuất khẩu', 'chất lượng'],
    publishedAt: new Date('2025-10-15'),
    isPublished: true,
    isFeatured: false,
    order: 2,
  },
  {
    title: 'Bột trái cây – Giải pháp nguyên liệu tự nhiên cho ngành F&B',
    shortDescription: 'Bột trái cây từ nông sản Việt đang được nhiều doanh nghiệp F&B lựa chọn nhờ hương vị tự nhiên, giá cạnh tranh và nguồn cung ứng ổn định từ Tấn Phát Food.',
    content: `
      <h2>Bột trái cây - Nguyên liệu tự nhiên cho ngành F&B</h2>
      <p>Bột trái cây từ nông sản Việt Nam đang trở thành lựa chọn hàng đầu của nhiều doanh nghiệp trong ngành F&B (Food & Beverage) nhờ hương vị tự nhiên, giá cả cạnh tranh và nguồn cung ứng ổn định. Đây là xu hướng mới trong việc sử dụng nguyên liệu tự nhiên, thay thế cho các chất tạo hương vị nhân tạo.</p>
      
      <h3>Ứng dụng đa dạng</h3>
      <p>Bột trái cây có thể được sử dụng trong nhiều ứng dụng khác nhau: đồ uống, bánh kẹo, kem, sữa chua, và các sản phẩm thực phẩm chế biến khác. Sản phẩm giữ nguyên hương vị tự nhiên của trái cây, đồng thời dễ dàng bảo quản và vận chuyển.</p>
      
      <p>Tấn Phát Food cung cấp đa dạng các loại bột trái cây từ nguồn nguyên liệu chất lượng cao: bột xoài, bột dứa, bột dâu tây, bột cam và nhiều loại khác. Tất cả đều được sản xuất theo quy trình hiện đại, đảm bảo giữ nguyên giá trị dinh dưỡng và hương vị tự nhiên.</p>
      
      <h3>Lợi ích cho doanh nghiệp F&B</h3>
      <p>Việc sử dụng bột trái cây tự nhiên giúp các doanh nghiệp F&B tạo ra các sản phẩm có hương vị tự nhiên, hấp dẫn người tiêu dùng, đồng thời đáp ứng xu hướng tiêu dùng xanh và lành mạnh. Tấn Phát Food cam kết cung cấp sản phẩm chất lượng cao với giá cả cạnh tranh và nguồn cung ứng ổn định.</p>
    `,
    featuredImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    author: 'Tấn Phát Food',
    tags: ['bột trái cây', 'F&B', 'nguyên liệu', 'tự nhiên'],
    publishedAt: new Date('2025-10-15'),
    isPublished: true,
    isFeatured: false,
    order: 3,
  },
  {
    title: 'Quy trình đóng gói và bảo quản trái cây đạt chuẩn xuất khẩu',
    shortDescription: 'Tấn Phát Food áp dụng công nghệ đóng gói tiên tiến, giúp giữ trọn độ tươi và hương vị tự nhiên trong suốt hành trình vận chuyển quốc tế.',
    content: `
      <h2>Quy trình đóng gói tiên tiến</h2>
      <p>Tấn Phát Food áp dụng công nghệ đóng gói tiên tiến, giúp giữ trọn độ tươi và hương vị tự nhiên của trái cây trong suốt hành trình vận chuyển quốc tế. Quy trình này đảm bảo sản phẩm đến tay khách hàng với chất lượng tốt nhất.</p>
      
      <h3>Công nghệ bảo quản hiện đại</h3>
      <p>Chúng tôi sử dụng các công nghệ bảo quản hiện đại như điều chỉnh khí quyển (Modified Atmosphere Packaging - MAP), kiểm soát nhiệt độ và độ ẩm chính xác. Các công nghệ này giúp làm chậm quá trình chín của trái cây, giữ nguyên độ tươi và hương vị tự nhiên.</p>
      
      <p>Toàn bộ quy trình đóng gói được thực hiện trong môi trường vô trùng, tuân thủ nghiêm ngặt các tiêu chuẩn HACCP và ISO 22000. Mỗi sản phẩm đều được kiểm tra chất lượng trước khi đóng gói và xuất khẩu.</p>
      
      <h3>Đảm bảo chất lượng trong vận chuyển</h3>
      <p>Hệ thống vận chuyển của Tấn Phát Food được trang bị công nghệ làm lạnh và kiểm soát nhiệt độ chuyên nghiệp, đảm bảo sản phẩm được bảo quản ở điều kiện tốt nhất trong suốt hành trình từ nhà máy đến tay khách hàng. Chúng tôi hợp tác với các đối tác vận chuyển uy tín, có kinh nghiệm trong việc vận chuyển thực phẩm quốc tế.</p>
    `,
    featuredImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    author: 'Tấn Phát Food',
    tags: ['đóng gói', 'bảo quản', 'xuất khẩu', 'công nghệ'],
    publishedAt: new Date('2025-10-15'),
    isPublished: true,
    isFeatured: false,
    order: 4,
  },
  {
    title: 'Thị trường xuất khẩu trái cây Việt 2025 - Những tín hiệu tích cực',
    shortDescription: 'Kim ngạch xuất khẩu nông sản 2025 dự kiến tăng trưởng mạnh nhờ nhu cầu tiêu dùng xanh, an toàn và sản phẩm có chứng nhận nguồn gốc rõ ràng.',
    content: `
      <h2>Triển vọng tăng trưởng năm 2025</h2>
      <p>Thị trường xuất khẩu trái cây Việt Nam năm 2025 đang có những tín hiệu rất tích cực. Kim ngạch xuất khẩu nông sản dự kiến sẽ tăng trưởng mạnh mẽ nhờ nhu cầu ngày càng cao về các sản phẩm xanh, an toàn và có chứng nhận nguồn gốc rõ ràng.</p>
      
      <h3>Xu hướng tiêu dùng mới</h3>
      <p>Người tiêu dùng quốc tế ngày càng quan tâm đến sức khỏe và môi trường. Họ ưu tiên lựa chọn các sản phẩm tự nhiên, không chất bảo quản, có chứng nhận hữu cơ hoặc đạt các tiêu chuẩn quốc tế như GlobalG.A.P, HACCP. Đây là cơ hội lớn cho các doanh nghiệp Việt Nam đã đầu tư vào việc nâng cao chất lượng và tuân thủ các tiêu chuẩn quốc tế.</p>
      
      <p>Tấn Phát Food đã sớm nhận ra xu hướng này và đầu tư mạnh mẽ vào việc xây dựng hệ thống sản xuất bền vững, đạt các tiêu chuẩn quốc tế. Chúng tôi tự hào là một trong những doanh nghiệp dẫn đầu trong việc xuất khẩu nông sản chất lượng cao ra thị trường quốc tế.</p>
      
      <h3>Cơ hội mở rộng thị trường</h3>
      <p>Với các hiệp định thương mại tự do đã được ký kết, Việt Nam có nhiều cơ hội mở rộng thị trường xuất khẩu sang các quốc gia như EU, Nhật Bản, Hàn Quốc, Trung Quốc và các thị trường khác. Tấn Phát Food sẵn sàng tận dụng những cơ hội này để phát triển và mở rộng hoạt động xuất khẩu, đóng góp vào sự phát triển của ngành nông nghiệp Việt Nam.</p>
    `,
    featuredImage: 'https://res.cloudinary.com/dph9wlfzd/image/upload/v1762645376/tanphatfood/products/durian.png',
    author: 'Tấn Phát Food',
    tags: ['xuất khẩu', 'thị trường', '2025', 'tăng trưởng'],
    publishedAt: new Date('2025-10-15'),
    isPublished: true,
    isFeatured: false,
    order: 5,
  },
];

// Seed news articles
const seedNews = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Get or create a default news category
    let defaultCategory = await NewsCategory.findOne({ name: 'Tin tức & Thị trường' });
    if (!defaultCategory) {
      // Try to find any category
      defaultCategory = await NewsCategory.findOne();
      if (!defaultCategory) {
        console.log('⚠️  No news category found. Creating articles without category...');
      }
    }

    // Clear existing news
    await News.deleteMany({});
    console.log('Cleared existing news articles');

    // Insert news articles
    const newsToInsert = newsArticles.map(article => ({
      ...article,
      category: defaultCategory ? defaultCategory._id : undefined,
    }));

    const createdNews = await News.insertMany(newsToInsert);
    console.log(`✅ Successfully seeded ${createdNews.length} news articles`);

    // Display created news
    createdNews.forEach((news, index) => {
      console.log(`${index + 1}. ${news.title} - ${news.slug}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  }
};

// Run seed
seedNews();

