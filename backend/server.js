import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import newsCategoryRoutes from './routes/newsCategoryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
// CORS configuration - allow all origins
// Dynamic origin handler to support credentials if needed in the future
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    const allowedOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',')
      : ['*'];
    
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false, // Set to true if you need cookies/auth headers
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parsing middleware
// express.json() and express.urlencoded() only parse specific content types
// They won't interfere with multipart/form-data which multer handles
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/news-categories', newsCategoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/contacts', contactRoutes);
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
        quotes: '/api/quotes',
        banners: '/api/banners',
        contacts: '/api/contacts',
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
  console.error('❌ Error:', err.name);
  console.error('Error message:', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error('Error stack:', err.stack);
  }
  
  // Xử lý lỗi multer (file upload)
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File quá lớn. Kích thước tối đa là 5MB',
        error: err.message,
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Field name không đúng. Vui lòng sử dụng field name "image"',
        error: err.message,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Lỗi upload file',
      error: err.message,
      code: err.code,
    });
  }

  // Xử lý lỗi Cloudinary
  if (err.message && err.message.includes('Cloudinary')) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi upload lên Cloudinary',
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Lỗi server',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log(`Môi trường: ${process.env.NODE_ENV || 'development'}`);
});

