# Debug Upload Issues

## Kiểm tra cấu hình

### 1. Kiểm tra Backend đang chạy
```bash
cd backend
npm run dev
```

Backend phải chạy trên `http://localhost:5000`

### 2. Kiểm tra Cloudinary Config

File `backend/.env` phải có:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Test Backend Upload trực tiếp

Test với curl hoặc Postman:
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@/path/to/your/image.jpg" \
  -F "folder=products"
```

### 4. Kiểm tra logs

Khi upload, kiểm tra logs trong backend console để xem:
- Request có đến backend không?
- File có được nhận không?
- Cloudinary config có đúng không?
- Lỗi cụ thể là gì?

## Common Issues

### Issue 1: "No file in request"
- Nguyên nhân: Multer không nhận được file từ Next.js proxy
- Giải pháp: Kiểm tra FormData được forward đúng cách

### Issue 2: "Cloudinary credentials not configured"
- Nguyên nhân: Thiếu config Cloudinary trong .env
- Giải pháp: Thêm đầy đủ CLOUDINARY_* variables vào .env

### Issue 3: "Lỗi khi upload ảnh" từ Cloudinary
- Nguyên nhân: Cloudinary API key/secret không đúng hoặc hết quota
- Giải pháp: Kiểm tra lại credentials trên Cloudinary dashboard

## Testing Steps

1. Start backend server
2. Kiểm tra backend logs khi upload
3. Test upload trực tiếp đến backend (bypass Next.js proxy)
4. Nếu backend hoạt động, kiểm tra Next.js proxy
5. Kiểm tra error message chi tiết trong browser console và backend logs

