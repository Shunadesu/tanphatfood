import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import newsCategoryRoutes from './routes/newsCategoryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/news-categories', newsCategoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Tấn Phát Food API Server',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      products: '/api/products',
      newsCategories: '/api/news-categories',
      news: '/api/news',
      upload: '/api/upload',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy route',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Xử lý lỗi multer (file upload)
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File quá lớn. Kích thước tối đa là 5MB',
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Lỗi upload file',
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Lỗi server',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log(`Môi trường: ${process.env.NODE_ENV || 'development'}`);
});

