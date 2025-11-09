# Upload Image Troubleshooting

## Kiểm tra Cloudinary Config

1. **Kiểm tra file `.env` có đầy đủ:**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Kiểm tra backend console khi start:**
   - Nếu thấy "✅ Cloudinary config loaded" → Config đúng
   - Nếu thấy "⚠️ WARNING: Cloudinary config is missing!" → Cần cập nhật .env

## Kiểm tra Upload Request

### 1. Test với curl:
```bash
curl -X POST http://localhost:5000/api/upload?folder=products \
  -F "image=@/path/to/image.jpg"
```

### 2. Kiểm tra backend logs:
Khi upload, backend sẽ log:
- "Upload request received"
- "Multer processed file: Yes/No"
- "File details: {...}"
- "Uploading to Cloudinary folder: ..."
- "Upload successful: ..." hoặc error message

## Common Issues

### Issue 1: "No file in request"
**Nguyên nhân:** Multer không parse được file
**Giải pháp:**
- Kiểm tra field name phải là "image"
- Kiểm tra Content-Type header là multipart/form-data
- Kiểm tra file size không quá 5MB

### Issue 2: "Cloudinary config missing"
**Nguyên nhân:** Thiếu config trong .env
**Giải pháp:**
- Kiểm tra file `.env` trong folder `backend/`
- Đảm bảo có đầy đủ 3 biến: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- Restart backend server sau khi cập nhật .env

### Issue 3: "Buffer is empty"
**Nguyên nhân:** File không được đọc đúng
**Giải pháp:**
- Kiểm tra multer có parse file không (xem logs)
- Kiểm tra req.file.buffer có data không

### Issue 4: Cloudinary upload error
**Nguyên nhân:** Lỗi từ Cloudinary API
**Giải pháp:**
- Kiểm tra Cloudinary credentials đúng chưa
- Kiểm tra API key có quyền upload không
- Kiểm tra quota/limit của Cloudinary account

## Debug Steps

1. **Kiểm tra backend đang chạy:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Kiểm tra logs khi upload:**
   - Xem backend console output
   - Tìm các log messages từ uploadController
   - Kiểm tra error messages

3. **Test trực tiếp backend:**
   ```bash
   curl -X POST http://localhost:5000/api/upload?folder=products \
     -F "image=@test-image.jpg"
   ```

4. **Kiểm tra Cloudinary dashboard:**
   - Đăng nhập vào Cloudinary
   - Kiểm tra Media Library xem có ảnh được upload không
   - Kiểm tra Settings > Security để đảm bảo API key có quyền upload

## Notes

- Upload sử dụng Cloudinary, không lưu file trên server
- Files được upload trực tiếp từ buffer lên Cloudinary
- Folder trong Cloudinary chỉ là organization, không ảnh hưởng đến storage
- Tất cả ảnh được lưu trên Cloudinary CDN

