import express from 'express';
import {
  getAllBanners,
  getBannerById,
  getBannerByPage,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/bannerController.js';

const router = express.Router();

router.route('/').get(getAllBanners).post(createBanner);
router.route('/page/:page').get(getBannerByPage);
router.route('/:id').get(getBannerById).put(updateBanner).delete(deleteBanner);

export default router;

