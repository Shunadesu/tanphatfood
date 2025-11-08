export interface HandbookArticle {
  id: number
  title: string
  description: string
  image: string
  date: string
  slug: string
  content: string
  author?: string
  category?: string
}

export const mockHandbook: HandbookArticle[] = [
  {
    id: 1,
    title: 'Hướng dẫn bảo quản trái cây tươi xuất khẩu',
    description:
      'Các phương pháp bảo quản trái cây tươi đúng cách để giữ nguyên độ tươi, hương vị và giá trị dinh dưỡng trong quá trình vận chuyển và xuất khẩu.',
    image: '/images/news/durian.jpg',
    date: '15.10.2025',
    slug: 'huong-dan-bao-quan-trai-cay-tuoi-xuat-khau',
    author: 'Tấn Phát Food',
    category: 'Bảo quản',
    content: `
      <h2>Bảo quản trái cây tươi - Yếu tố then chốt</h2>
      <p>Bảo quản trái cây tươi đúng cách là yếu tố then chốt quyết định chất lượng sản phẩm khi đến tay khách hàng. Tấn Phát Food chia sẻ các phương pháp bảo quản hiệu quả nhất.</p>
      
      <h3>1. Kiểm soát nhiệt độ</h3>
      <p>Nhiệt độ là yếu tố quan trọng nhất trong việc bảo quản trái cây tươi. Mỗi loại trái cây có yêu cầu nhiệt độ bảo quản khác nhau:</p>
      <ul>
        <li>Sầu riêng: 10-13°C</li>
        <li>Thanh long: 5-10°C</li>
        <li>Chuối: 13-15°C</li>
        <li>Bưởi: 8-10°C</li>
      </ul>
      
      <h3>2. Kiểm soát độ ẩm</h3>
      <p>Độ ẩm tương đối lý tưởng cho hầu hết trái cây là 85-95%. Độ ẩm quá cao có thể gây nấm mốc, quá thấp sẽ làm mất nước và héo.</p>
      
      <h3>3. Xử lý sau thu hoạch</h3>
      <p>Việc xử lý ngay sau thu hoạch rất quan trọng. Trái cây cần được làm mát nhanh chóng, loại bỏ những quả hỏng và đóng gói trong môi trường vô trùng.</p>
      
      <h3>4. Đóng gói chuyên nghiệp</h3>
      <p>Sử dụng bao bì phù hợp, có khả năng điều chỉnh khí quyển (MAP) để kéo dài thời hạn bảo quản. Đóng gói cần đảm bảo thông thoáng nhưng vẫn bảo vệ sản phẩm khỏi va đập.</p>
    `,
  },
  {
    id: 2,
    title: 'Cách chọn trái cây xuất khẩu đạt chuẩn chất lượng',
    description:
      'Tiêu chí lựa chọn trái cây xuất khẩu: kích thước, độ chín, hình dáng, màu sắc và các tiêu chuẩn chất lượng quốc tế.',
    image: '/images/news/dried-fruits.jpg',
    date: '14.10.2025',
    slug: 'cach-chon-trai-cay-xuat-khau-dat-chuan-chat-luong',
    author: 'Tấn Phát Food',
    category: 'Chọn lựa',
    content: `
      <h2>Tiêu chí chọn trái cây xuất khẩu</h2>
      <p>Lựa chọn trái cây đạt chuẩn xuất khẩu đòi hỏi kiến thức chuyên sâu và kinh nghiệm. Dưới đây là các tiêu chí quan trọng nhất.</p>
      
      <h3>1. Kích thước và trọng lượng</h3>
      <p>Mỗi loại trái cây có tiêu chuẩn kích thước riêng. Ví dụ: sầu riêng xuất khẩu thường từ 1.5-4.5kg, thanh long từ 300-600g. Trái cây cần có kích thước đồng đều trong cùng một lô hàng.</p>
      
      <h3>2. Độ chín</h3>
      <p>Trái cây cần được thu hoạch đúng độ chín. Quá chín sẽ nhanh hỏng, chưa chín sẽ không đạt chất lượng. Độ chín phù hợp giúp trái cây có thể chín hoàn toàn trong quá trình vận chuyển.</p>
      
      <h3>3. Hình dáng và màu sắc</h3>
      <p>Trái cây cần có hình dáng đẹp, đều đặn, không bị biến dạng. Màu sắc phải đặc trưng của loại trái cây, tươi sáng, không có vết thâm hay tổn thương.</p>
      
      <h3>4. Chứng nhận chất lượng</h3>
      <p>Các loại trái cây xuất khẩu cần có chứng nhận GlobalG.A.P, HACCP và các tiêu chuẩn quốc tế khác tùy theo yêu cầu của thị trường đích.</p>
    `,
  },
  {
    id: 3,
    title: 'Quy trình xuất khẩu trái cây từ A đến Z',
    description:
      'Hướng dẫn chi tiết quy trình xuất khẩu trái cây: từ thu hoạch, sơ chế, đóng gói, thủ tục hải quan đến vận chuyển quốc tế.',
    image: '/images/news/globalgap.jpg',
    date: '13.10.2025',
    slug: 'quy-trinh-xuat-khau-trai-cay-tu-a-den-z',
    author: 'Tấn Phát Food',
    category: 'Quy trình',
    content: `
      <h2>Quy trình xuất khẩu trái cây</h2>
      <p>Xuất khẩu trái cây là một quy trình phức tạp, đòi hỏi sự chuẩn bị kỹ lưỡng và tuân thủ nghiêm ngặt các quy định. Dưới đây là quy trình từ A đến Z.</p>
      
      <h3>Bước 1: Thu hoạch</h3>
      <p>Thu hoạch đúng thời điểm, đúng kỹ thuật để đảm bảo chất lượng tốt nhất. Nhân viên phải được đào tạo để nhận biết độ chín phù hợp.</p>
      
      <h3>Bước 2: Sơ chế và phân loại</h3>
      <p>Sau thu hoạch, trái cây được làm sạch, phân loại theo kích thước, độ chín và chất lượng. Những quả không đạt tiêu chuẩn sẽ được loại bỏ.</p>
      
      <h3>Bước 3: Xử lý và bảo quản</h3>
      <p>Trái cây được xử lý theo yêu cầu (rửa sạch, xử lý hơi nóng nếu cần), sau đó được bảo quản trong kho lạnh với nhiệt độ và độ ẩm phù hợp.</p>
      
      <h3>Bước 4: Đóng gói</h3>
      <p>Đóng gói theo tiêu chuẩn quốc tế, sử dụng bao bì phù hợp, có nhãn mác đầy đủ thông tin: tên sản phẩm, trọng lượng, ngày sản xuất, hạn sử dụng, mã QR truy xuất nguồn gốc.</p>
      
      <h3>Bước 5: Thủ tục hải quan</h3>
      <p>Chuẩn bị đầy đủ giấy tờ: giấy chứng nhận xuất xứ (C/O), giấy chứng nhận kiểm dịch thực vật, hóa đơn thương mại, phiếu đóng gói.</p>
      
      <h3>Bước 6: Vận chuyển</h3>
      <p>Vận chuyển bằng container lạnh, đảm bảo nhiệt độ ổn định trong suốt hành trình. Theo dõi nhiệt độ liên tục và có biện pháp xử lý khi có sự cố.</p>
    `,
  },
  {
    id: 4,
    title: 'Các chứng nhận cần thiết cho nông sản xuất khẩu',
    description:
      'Tổng quan về các chứng nhận quốc tế quan trọng: GlobalG.A.P, HACCP, ISO 22000, Organic và cách đạt được các chứng nhận này.',
    image: '/images/news/fruit-powder.jpg',
    date: '12.10.2025',
    slug: 'cac-chung-nhan-can-thiet-cho-nong-san-xuat-khau',
    author: 'Tấn Phát Food',
    category: 'Chứng nhận',
    content: `
      <h2>Chứng nhận quốc tế cho nông sản xuất khẩu</h2>
      <p>Để xuất khẩu nông sản thành công, các doanh nghiệp cần có các chứng nhận quốc tế phù hợp. Dưới đây là các chứng nhận quan trọng nhất.</p>
      
      <h3>1. GlobalG.A.P</h3>
      <p>GlobalG.A.P là tiêu chuẩn quốc tế về thực hành nông nghiệp tốt. Chứng nhận này đảm bảo an toàn thực phẩm, bảo vệ môi trường và trách nhiệm xã hội. Đây là yêu cầu bắt buộc cho nhiều thị trường như EU, Nhật Bản.</p>
      
      <h3>2. HACCP</h3>
      <p>HACCP (Hazard Analysis and Critical Control Points) là hệ thống quản lý an toàn thực phẩm. Chứng nhận này đảm bảo quy trình sản xuất và chế biến an toàn, không có mối nguy gây hại cho người tiêu dùng.</p>
      
      <h3>3. ISO 22000</h3>
      <p>ISO 22000 là tiêu chuẩn quốc tế về hệ thống quản lý an toàn thực phẩm. Chứng nhận này chứng minh doanh nghiệp có hệ thống quản lý chất lượng toàn diện.</p>
      
      <h3>4. Chứng nhận Organic</h3>
      <p>Chứng nhận hữu cơ (Organic) chứng minh sản phẩm được sản xuất không sử dụng hóa chất, thuốc trừ sâu và phân bón hóa học. Đây là xu hướng ngày càng được ưa chuộng.</p>
      
      <h3>5. Giấy chứng nhận xuất xứ (C/O)</h3>
      <p>C/O là giấy tờ cần thiết để được hưởng ưu đãi thuế quan theo các hiệp định thương mại tự do. Có nhiều form C/O khác nhau tùy theo thị trường đích.</p>
    `,
  },
  {
    id: 5,
    title: 'Cách đọc và hiểu thông tin trên nhãn sản phẩm xuất khẩu',
    description:
      'Hướng dẫn đọc nhãn sản phẩm: thông tin dinh dưỡng, ngày sản xuất, hạn sử dụng, mã QR truy xuất nguồn gốc và các ký hiệu quan trọng.',
    image: '/images/news/packaging.jpg',
    date: '11.10.2025',
    slug: 'cach-doc-va-hieu-thong-tin-tren-nhan-san-pham-xuat-khau',
    author: 'Tấn Phát Food',
    category: 'Hướng dẫn',
    content: `
      <h2>Đọc hiểu nhãn sản phẩm xuất khẩu</h2>
      <p>Nhãn sản phẩm chứa rất nhiều thông tin quan trọng. Việc hiểu đúng các thông tin này giúp đảm bảo an toàn và chất lượng sản phẩm.</p>
      
      <h3>1. Thông tin cơ bản</h3>
      <p>Nhãn sản phẩm phải có: tên sản phẩm, trọng lượng tịnh, ngày sản xuất, hạn sử dụng, nơi sản xuất, thông tin nhà sản xuất/đóng gói.</p>
      
      <h3>2. Mã QR truy xuất nguồn gốc</h3>
      <p>Mã QR trên nhãn cho phép truy xuất đầy đủ thông tin về nguồn gốc, quy trình sản xuất, ngày thu hoạch và các chứng nhận chất lượng. Quét mã QR để biết thêm chi tiết.</p>
      
      <h3>3. Ký hiệu và logo chứng nhận</h3>
      <p>Các logo như GlobalG.A.P, HACCP, Organic trên nhãn chứng minh sản phẩm đã được chứng nhận đạt các tiêu chuẩn quốc tế.</p>
      
      <h3>4. Hướng dẫn bảo quản</h3>
      <p>Nhãn thường có hướng dẫn bảo quản: nhiệt độ, độ ẩm, cách bảo quản để giữ chất lượng tốt nhất. Tuân thủ hướng dẫn này để sản phẩm luôn tươi ngon.</p>
      
      <h3>5. Thông tin dinh dưỡng</h3>
      <p>Một số sản phẩm có bảng thông tin dinh dưỡng, giúp người tiêu dùng hiểu rõ giá trị dinh dưỡng của sản phẩm.</p>
    `,
  },
  {
    id: 6,
    title: 'Xu hướng thị trường trái cây xuất khẩu 2025',
    description:
      'Phân tích xu hướng thị trường: loại trái cây được ưa chuộng, thị trường tiềm năng, yêu cầu chất lượng và cơ hội cho doanh nghiệp Việt Nam.',
    image: '/images/news/export-market.jpg',
    date: '10.10.2025',
    slug: 'xu-huong-thi-truong-trai-cay-xuat-khau-2025',
    author: 'Tấn Phát Food',
    category: 'Thị trường',
    content: `
      <h2>Xu hướng thị trường trái cây xuất khẩu 2025</h2>
      <p>Thị trường trái cây xuất khẩu năm 2025 có nhiều biến động và cơ hội mới. Dưới đây là phân tích chi tiết về xu hướng và cơ hội.</p>
      
      <h3>1. Trái cây được ưa chuộng</h3>
      <p>Các loại trái cây nhiệt đới như sầu riêng, thanh long, xoài, chuối vẫn là những mặt hàng được ưa chuộng nhất. Ngoài ra, trái cây hữu cơ và trái cây sấy cũng đang tăng trưởng mạnh.</p>
      
      <h3>2. Thị trường tiềm năng</h3>
      <p>Trung Quốc, Hàn Quốc, Nhật Bản, EU và các nước Đông Nam Á là những thị trường tiềm năng nhất. Mỗi thị trường có yêu cầu và sở thích riêng.</p>
      
      <h3>3. Yêu cầu chất lượng</h3>
      <p>Người tiêu dùng ngày càng quan tâm đến chất lượng, an toàn thực phẩm và tính bền vững. Sản phẩm cần có chứng nhận, truy xuất nguồn gốc rõ ràng.</p>
      
      <h3>4. Cơ hội cho doanh nghiệp Việt Nam</h3>
      <p>Với lợi thế về khí hậu, đất đai và kinh nghiệm sản xuất, các doanh nghiệp Việt Nam có nhiều cơ hội mở rộng xuất khẩu. Tuy nhiên, cần đầu tư vào công nghệ, nâng cao chất lượng và xây dựng thương hiệu.</p>
    `,
  },
]

export const getHandbookBySlug = (slug: string): HandbookArticle | undefined => {
  return mockHandbook.find((article) => article.slug === slug)
}

export const getAllHandbook = (): HandbookArticle[] => {
  return mockHandbook
}

