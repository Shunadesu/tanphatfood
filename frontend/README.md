# Tấn Phát Food - Frontend

Frontend website cho Tấn Phát Food được xây dựng với Next.js 14, TypeScript và Tailwind CSS.

## Cấu trúc dự án

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Trang chủ
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── Header.tsx          # Header component
│       ├── HeroSection.tsx     # Hero section
│       ├── FeatureBlocks.tsx   # Feature blocks
│       └── FloatingContactButtons.tsx # Floating buttons
├── public/                     # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Cài đặt

1. Cài đặt dependencies:
```bash
cd frontend
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm start` - Chạy production server
- `npm run lint` - Chạy ESLint

## Tính năng

- ✅ Responsive design
- ✅ Header với navigation menu
- ✅ Hero section với background image
- ✅ Feature blocks
- ✅ Floating contact buttons
- ✅ Smooth scrolling
- ✅ Mobile menu

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

