import express from 'express';
import {
  getAllNewsCategories,
  getNewsCategoryById,
  createNewsCategory,
  updateNewsCategory,
  deleteNewsCategory,
} from '../controllers/newsCategoryController.js';

const router = express.Router();

router.route('/').get(getAllNewsCategories).post(createNewsCategory);
router
  .route('/:id')
  .get(getNewsCategoryById)
  .put(updateNewsCategory)
  .delete(deleteNewsCategory);

export default router;

