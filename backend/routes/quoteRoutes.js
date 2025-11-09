import express from 'express';
import {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
  markAsRead,
} from '../controllers/quoteController.js';
import Quote from '../models/Quote.js';

const router = express.Router();

router.route('/').get(getAllQuotes).post(createQuote);
router.route('/stats').get(async (req, res) => {
  try {
    const total = await Quote.countDocuments();
    const pending = await Quote.countDocuments({ status: 'pending' });
    const contacted = await Quote.countDocuments({ status: 'contacted' });
    const quoted = await Quote.countDocuments({ status: 'quoted' });
    const unread = await Quote.countDocuments({ isRead: false });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        contacted,
        quoted,
        unread,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê',
      error: error.message,
    });
  }
});
router.route('/:id').get(getQuoteById).put(updateQuote).delete(deleteQuote);
router.route('/:id/read').patch(markAsRead);

export default router;
