# Seed Scripts

Các script để seed dữ liệu mẫu vào database.

## Cài đặt

Đảm bảo đã cài đặt dependencies và cấu hình `.env` file:

```bash
npm install
```

## Sử dụng

### Seed sản phẩm (10 sản phẩm trái cây tươi xuất khẩu)

```bash
npm run seed:products
```

Script này sẽ:
- Xóa tất cả sản phẩm type `fresh` hiện có
- Tạo 10 sản phẩm trái cây tươi xuất khẩu mới
- Tự động tạo slug từ tên sản phẩm

### Seed tin tức (6 bài viết)

```bash
npm run seed:news
```

Script này sẽ:
- Xóa tất cả bài viết hiện có
- Tạo 6 bài viết mới
- Tự động tạo slug từ tiêu đề
- Tự động gán vào category mặc định (nếu có)

### Seed tất cả

```bash
npm run seed
```

Chạy cả 2 script trên (sản phẩm và tin tức).

## Lưu ý

- Scripts sẽ xóa dữ liệu cũ trước khi tạo mới
- Đảm bảo database đã được kết nối và `.env` file đã được cấu hình đúng
- Đối với tin tức, script sẽ tự động tìm category mặc định hoặc tạo bài viết không có category

## Dữ liệu được tạo

### Sản phẩm (10 sản phẩm)
1. Sầu riêng
2. Thanh Long
3. Chuối
4. Bưởi
5. Dừa tươi
6. Chanh không hạt
7. Cam
8. Ổi
9. Xoài
10. Nhãn

### Tin tức (6 bài viết)
1. Cơ hội xuất khẩu sầu riêng Việt sang thị trường Trung Quốc
2. Xu hướng trái cây sấy Việt Nam trong thị trường châu Á
3. GlobalG.A.P – Tiêu chuẩn vàng cho nông sản xuất khẩu
4. Bột trái cây – Giải pháp nguyên liệu tự nhiên cho ngành F&B
5. Quy trình đóng gói và bảo quản trái cây đạt chuẩn xuất khẩu
6. Thị trường xuất khẩu trái cây Việt 2025 - Những tín hiệu tích cực

