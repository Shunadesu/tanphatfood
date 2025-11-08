import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/category/:categoryId').get(getProductsByCategory);
router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;

