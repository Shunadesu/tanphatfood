import express from 'express';
import {
  getAllNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  getNewsByCategory,
  getFeaturedNews,
  getRelatedNews,
} from '../controllers/newsController.js';

const router = express.Router();

router.route('/').get(getAllNews).post(createNews);
router.route('/featured').get(getFeaturedNews);
router.route('/slug/:slug').get(getNewsBySlug);
router.route('/category/:categoryId').get(getNewsByCategory);
router.route('/:id').get(getNewsById).put(updateNews).delete(deleteNews);
router.route('/:id/related').get(getRelatedNews);

export default router;

