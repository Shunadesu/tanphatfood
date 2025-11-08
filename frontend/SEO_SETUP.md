# Hướng dẫn cấu hình SEO cho Tấn Phát Food

## Đã cấu hình

### 1. Metadata chính (Root Layout)
- ✅ Title và Description với template
- ✅ Keywords
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Robots meta tags
- ✅ Favicon từ logo.png
- ✅ Manifest.json cho PWA

### 2. Structured Data (JSON-LD)
- ✅ Organization Schema
- ✅ Website Schema với SearchAction
- ✅ Contact Information

### 3. Sitemap và Robots
- ✅ Sitemap.xml tự động (tại `/sitemap.xml`)
- ✅ Robots.txt (tại `/robots.txt`)

### 4. Metadata cho các trang
- ✅ Products page metadata
- ✅ About page metadata
- ✅ Layout riêng cho từng route

## Cấu hình cần thiết

### 1. Environment Variables
Tạo file `.env.local` và thêm:

```env
NEXT_PUBLIC_SITE_URL=https://tanphatfood.com
```

**Lưu ý:** Thay đổi URL này thành domain thực tế của website.

### 2. Google Search Console
1. Đăng ký website tại [Google Search Console](https://search.google.com/search-console)
2. Thêm verification code vào `layout.tsx`:

```typescript
verification: {
  google: 'your-verification-code-here',
},
```

### 3. Favicon
- Favicon đã được cấu hình sử dụng `/images/logo.png`
- Để tối ưu hơn, nên tạo các kích thước:
  - `favicon.ico` (16x16, 32x32)
  - `icon-192.png` (192x192)
  - `icon-512.png` (512x512)
  - `apple-icon.png` (180x180)

### 4. Open Graph Image
- Hiện tại đang sử dụng logo.png
- Nên tạo một ảnh Open Graph riêng (1200x630px) để hiển thị đẹp hơn trên social media

## Kiểm tra SEO

### 1. Google Rich Results Test
- Truy cập: https://search.google.com/test/rich-results
- Nhập URL website để kiểm tra structured data

### 2. Facebook Sharing Debugger
- Truy cập: https://developers.facebook.com/tools/debug/
- Kiểm tra Open Graph tags

### 3. Twitter Card Validator
- Truy cập: https://cards-dev.twitter.com/validator
- Kiểm tra Twitter Cards

### 4. Google PageSpeed Insights
- Truy cập: https://pagespeed.web.dev/
- Kiểm tra hiệu suất và SEO

## Cải thiện thêm (Tùy chọn)

### 1. Thêm metadata cho trang sản phẩm chi tiết
Có thể thêm metadata động cho từng sản phẩm trong `products/[slug]/page.tsx`

### 2. Thêm Breadcrumb Schema
Thêm BreadcrumbList schema cho các trang con

### 3. Thêm Review Schema
Nếu có đánh giá sản phẩm, thêm AggregateRating schema

### 4. Thêm FAQ Schema
Nếu có trang FAQ, thêm FAQPage schema

### 5. Analytics
- Google Analytics 4
- Google Tag Manager

## Lưu ý

1. **MetadataBase URL**: Đảm bảo cập nhật `NEXT_PUBLIC_SITE_URL` với domain thực tế
2. **Images**: Các ảnh Open Graph nên có kích thước tối thiểu 1200x630px
3. **Structured Data**: Kiểm tra định kỳ bằng Google Rich Results Test
4. **Sitemap**: Sitemap tự động cập nhật, nhưng nên submit thủ công vào Google Search Console

