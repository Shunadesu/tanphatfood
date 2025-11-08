# Tấn Phát Food - Backend API

Backend API cho hệ thống quản lý sản phẩm Tấn Phát Food sử dụng MERN Stack.

## Cấu trúc dự án

```
backend/
├── config/
│   ├── database.js          # Cấu hình kết nối MongoDB
│   └── cloudinary.js        # Cấu hình Cloudinary
├── controllers/
│   ├── categoryController.js      # Logic xử lý Category
│   ├── productController.js       # Logic xử lý Product
│   ├── newsCategoryController.js  # Logic xử lý NewsCategory
│   ├── newsController.js          # Logic xử lý News
│   └── uploadController.js        # Logic xử lý Upload ảnh
├── models/
│   ├── Category.js          # Schema Category
│   ├── Product.js           # Schema Product
│   ├── NewsCategory.js      # Schema NewsCategory
│   └── News.js              # Schema News
├── routes/
│   ├── categoryRoutes.js    # Routes cho Category
│   ├── productRoutes.js     # Routes cho Product
│   ├── newsCategoryRoutes.js # Routes cho NewsCategory
│   ├── newsRoutes.js        # Routes cho News
│   └── uploadRoutes.js      # Routes cho Upload
├── .env.example             # File mẫu environment variables
├── .gitignore
├── package.json
├── server.js                # File khởi động server
└── README.md
```

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

3. Cập nhật các biến môi trường trong `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tanphatfood
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Đảm bảo MongoDB đã được cài đặt và chạy.

5. Lấy Cloudinary credentials:
   - Đăng ký tài khoản tại [Cloudinary](https://cloudinary.com)
   - Lấy Cloud Name, API Key, và API Secret từ Dashboard
   - Cập nhật vào file `.env`

6. Chạy server:
```bash
# Development mode (với nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Categories

- `GET /api/categories` - Lấy tất cả danh mục
  - Query params: `isActive` (true/false)
  
- `GET /api/categories/:id` - Lấy danh mục theo ID

- `POST /api/categories` - Tạo danh mục mới
  ```json
  {
    "name": "Trái cây tươi",
    "description": "Mô tả danh mục",
    "image": "url-image",
    "order": 1,
    "isActive": true
  }
  ```

- `PUT /api/categories/:id` - Cập nhật danh mục

- `DELETE /api/categories/:id` - Xóa danh mục

### Products

- `GET /api/products` - Lấy tất cả sản phẩm
  - Query params: 
    - `category` - ID danh mục
    - `isActive` - true/false
    - `isFeatured` - true/false
    - `search` - Tìm kiếm theo tên/mô tả
    - `page` - Số trang
    - `limit` - Số lượng mỗi trang

- `GET /api/products/:id` - Lấy sản phẩm theo ID

- `GET /api/products/slug/:slug` - Lấy sản phẩm theo slug

- `GET /api/products/category/:categoryId` - Lấy sản phẩm theo danh mục

- `POST /api/products` - Tạo sản phẩm mới
  ```json
  {
    "name": "Sầu riêng Ri6",
    "category": "category-id",
    "description": "Mô tả sản phẩm",
    "shortDescription": "Mô tả ngắn",
    "images": ["url1", "url2"],
    "price": 100000,
    "unit": "kg",
    "specifications": {
      "weight": "2-5kg",
      "origin": "Việt Nam"
    },
    "isActive": true,
    "isFeatured": false,
    "order": 0
  }
  ```

- `PUT /api/products/:id` - Cập nhật sản phẩm

- `DELETE /api/products/:id` - Xóa sản phẩm

### News Categories (Danh mục tin tức)

- `GET /api/news-categories` - Lấy tất cả danh mục tin tức
  - Query params: `isActive` (true/false)
  
- `GET /api/news-categories/:id` - Lấy danh mục tin tức theo ID

- `POST /api/news-categories` - Tạo danh mục tin tức mới
  ```json
  {
    "name": "Tin tức & Thị trường",
    "description": "Mô tả danh mục",
    "image": "url-image",
    "order": 1,
    "isActive": true
  }
  ```

- `PUT /api/news-categories/:id` - Cập nhật danh mục tin tức

- `DELETE /api/news-categories/:id` - Xóa danh mục tin tức

### News (Tin tức)

- `GET /api/news` - Lấy tất cả tin tức
  - Query params: 
    - `category` - ID danh mục tin tức
    - `isPublished` - true/false
    - `isFeatured` - true/false
    - `search` - Tìm kiếm theo tiêu đề/nội dung
    - `tag` - Lọc theo tag
    - `page` - Số trang
    - `limit` - Số lượng mỗi trang

- `GET /api/news/:id` - Lấy tin tức theo ID
  - Query params: `incrementView` (true/false) - Tăng lượt xem

- `GET /api/news/slug/:slug` - Lấy tin tức theo slug
  - Query params: `incrementView` (true/false)

- `GET /api/news/category/:categoryId` - Lấy tin tức theo danh mục

- `GET /api/news/featured` - Lấy tin tức nổi bật
  - Query params: `limit` (mặc định: 5)

- `GET /api/news/:id/related` - Lấy tin tức liên quan
  - Query params: `limit` (mặc định: 5)

- `POST /api/news` - Tạo tin tức mới
  ```json
  {
    "title": "Cơ hội xuất khẩu sầu riêng Việt sang thị trường Trung Quốc 2025",
    "category": "news-category-id",
    "shortDescription": "Mô tả ngắn về tin tức",
    "content": "Nội dung đầy đủ của tin tức...",
    "featuredImage": "url-image",
    "images": ["url1", "url2"],
    "author": "Tấn Phát Food",
    "tags": ["xuất khẩu", "sầu riêng", "Trung Quốc"],
    "publishedAt": "2025-10-15T00:00:00.000Z",
    "isPublished": true,
    "isFeatured": false,
    "order": 0
  }
  ```

- `PUT /api/news/:id` - Cập nhật tin tức

- `DELETE /api/news/:id` - Xóa tin tức

### Upload Images (Upload ảnh với Cloudinary)

- `POST /api/upload` - Upload một ảnh
  - Content-Type: `multipart/form-data`
  - Field name: `image`
  - Query params: `folder` (optional) - ví dụ: `categories`, `products`, `news`
  
  **Response:**
  ```json
  {
    "success": true,
    "message": "Upload ảnh thành công",
    "data": {
      "url": "https://res.cloudinary.com/...",
      "public_id": "tanphatfood/categories/1234567890-image",
      "secure_url": "https://res.cloudinary.com/...",
      "width": 1200,
      "height": 800,
      "format": "jpg",
      "bytes": 245678,
      "folder": "tanphatfood/categories"
    }
  }
  ```

- `POST /api/upload/multiple` - Upload nhiều ảnh
  - Content-Type: `multipart/form-data`
  - Field name: `images` (array)
  - Query params: `folder` (optional)
  - Tối đa 10 ảnh mỗi lần

- `POST /api/upload/base64` - Upload ảnh từ base64
  ```json
  {
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "folder": "products"
  }
  ```

- `DELETE /api/upload/:publicId` - Xóa ảnh từ Cloudinary
  - Ví dụ: `DELETE /api/upload/tanphatfood/products/1234567890-image`

**Lưu ý:**
- Kích thước file tối đa: 5MB
- Định dạng hỗ trợ: jpg, jpeg, png, gif, webp
- Ảnh sẽ được tự động resize tối đa 1200x1200px
- Ảnh được lưu trong các folder: `tanphatfood/categories`, `tanphatfood/products`, `tanphatfood/news`

## Models

### Category
- `name` (String, required, unique)
- `slug` (String, auto-generated)
- `description` (String)
- `image` (String)
- `order` (Number)
- `isActive` (Boolean)
- `createdAt`, `updatedAt` (auto)

### Product
- `name` (String, required)
- `slug` (String, auto-generated, unique)
- `category` (ObjectId, ref: Category, required)
- `description` (String)
- `shortDescription` (String)
- `images` (Array of String)
- `price` (Number)
- `unit` (String)
- `specifications` (Map)
- `isActive` (Boolean)
- `isFeatured` (Boolean)
- `order` (Number)
- `createdAt`, `updatedAt` (auto)

### NewsCategory
- `name` (String, required, unique)
- `slug` (String, auto-generated)
- `description` (String)
- `image` (String)
- `order` (Number)
- `isActive` (Boolean)
- `createdAt`, `updatedAt` (auto)

### News
- `title` (String, required)
- `slug` (String, auto-generated, unique)
- `category` (ObjectId, ref: NewsCategory, required)
- `shortDescription` (String)
- `content` (String, required)
- `featuredImage` (String)
- `images` (Array of String)
- `author` (String, default: 'Tấn Phát Food')
- `tags` (Array of String)
- `views` (Number, default: 0)
- `publishedAt` (Date)
- `isPublished` (Boolean, default: false)
- `isFeatured` (Boolean, default: false)
- `order` (Number)
- `createdAt`, `updatedAt` (auto)

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Thông báo",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi"
}
```

## Ví dụ sử dụng Upload API

### Upload ảnh với cURL:
```bash
curl -X POST http://localhost:5000/api/upload?folder=categories \
  -F "image=@/path/to/image.jpg"
```

### Upload nhiều ảnh với cURL:
```bash
curl -X POST http://localhost:5000/api/upload/multiple?folder=products \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

### Upload với JavaScript (FormData):
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

fetch('http://localhost:5000/api/upload?folder=products', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => {
  console.log('Uploaded:', data.data.secure_url);
});
```
