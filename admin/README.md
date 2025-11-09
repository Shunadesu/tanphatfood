# Admin Panel - Tấn Phát Food

Admin panel riêng biệt được xây dựng với React + Vite + Tailwind CSS.

## Tính năng

- ✅ Quản lý sản phẩm
- ✅ Quản lý danh mục
- ✅ Quản lý tin tức
- ✅ Upload ảnh trực tiếp đến backend
- ✅ Authentication đơn giản
- ✅ Responsive design

## Cài đặt

```bash
cd admin
npm install
```

## Cấu hình

Tạo file `.env` từ `env.example`:

**Windows (PowerShell):**
```powershell
cd admin
Copy-Item env.example .env
```

**Linux/Mac:**
```bash
cd admin
cp env.example .env
```

**Hoặc tạo thủ công:**
1. Tạo file mới tên `.env` trong folder `admin/`
2. Copy nội dung từ `env.example` vào file
3. Lưu file

Cập nhật các biến môi trường trong `.env` nếu cần:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
```

**Lưu ý:**
- Đảm bảo backend đang chạy trên port 5000 (hoặc cập nhật `VITE_API_URL` tương ứng)
- Thay đổi `VITE_ADMIN_USERNAME` và `VITE_ADMIN_PASSWORD` trong production
- Các biến có prefix `VITE_` sẽ được expose ra client-side, không đặt thông tin nhạy cảm

## Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:3001`

## Build cho production

```bash
npm run build
```

Files sẽ được build vào folder `dist/`

## Cấu trúc thư mục

```
admin/
├── src/
│   ├── components/     # Components dùng chung
│   ├── pages/          # Các trang
│   ├── services/       # API services
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static files
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration
```

## API Integration

Admin panel gọi trực tiếp đến backend API tại `http://localhost:5000/api` (có thể cấu hình qua `.env`).

### Endpoints được sử dụng:

- `GET /api/products` - Lấy danh sách sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm
- `POST /api/upload` - Upload ảnh
- `POST /api/upload/multiple` - Upload nhiều ảnh
- `GET /api/categories` - Lấy danh sách danh mục

## Authentication

Hiện tại sử dụng authentication đơn giản với localStorage. Có thể nâng cấp để sử dụng JWT tokens từ backend sau.

## Upload ảnh

Upload ảnh được xử lý trực tiếp từ client đến backend, không qua proxy. Điều này giải quyết vấn đề upload ảnh gặp phải khi sử dụng Next.js proxy.

## Lưu ý

- Đảm bảo backend đang chạy trên port 5000
- Cấu hình CORS trên backend để cho phép requests từ `http://localhost:3001`
- Cấu hình Cloudinary trong backend `.env` để upload ảnh hoạt động

