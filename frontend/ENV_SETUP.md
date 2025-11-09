# Environment Variables Setup

## Frontend (.env.local)

Tạo file `.env.local` trong folder `frontend/` với nội dung sau:

```env
# Backend URL (server-side only - used in Next.js API routes)
# This URL is hidden from client-side code
BACKEND_URL=http://localhost:5000/api
```

**Lưu ý:** Admin panel đã được tách riêng thành ứng dụng riêng trong folder `admin/`. Xem `admin/README.md` để biết thêm chi tiết.

### Cách tạo file .env.local

**Windows (PowerShell):**

```powershell
cd frontend
@"
# Backend URL (server-side only - used in Next.js API routes)
# This URL is hidden from client-side code
BACKEND_URL=http://localhost:5000/api
"@ | Out-File -FilePath .env.local -Encoding utf8
```

**Linux/Mac:**

```bash
cd frontend
cat > .env.local << 'EOF'
# Backend URL (server-side only - used in Next.js API routes)
# This URL is hidden from client-side code
BACKEND_URL=http://localhost:5000/api
EOF
```

**Hoặc tạo thủ công:**

1. Tạo file mới tên `.env.local` trong folder `frontend/`
2. Copy nội dung từ trên vào file
3. Lưu file

## Backend (.env)

Tạo file `.env` trong folder `backend/` với nội dung từ `env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tanphatfood
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Cách tạo file .env cho backend

**Windows (PowerShell):**

```powershell
cd backend
Copy-Item env.example .env
```

**Linux/Mac:**

```bash
cd backend
cp env.example .env
```

Sau đó chỉnh sửa file `.env` và cập nhật các giá trị thực tế (đặc biệt là Cloudinary credentials).

## Lưu ý

1. **File .env.local và .env đã được gitignore**, không commit lên git
2. **BACKEND_URL** chỉ được sử dụng server-side, không expose ra client
3. **Admin panel** đã được tách riêng thành ứng dụng React riêng trong folder `admin/`

## Security

- Không commit file `.env.local` hoặc `.env` lên git
- BACKEND_URL chỉ được sử dụng trong Next.js API routes (server-side)
- Admin panel có authentication riêng (xem `admin/README.md`)
