import express from 'express';
import {
  getAllContacts,
  getContactById,
  getActiveContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/').get(getAllContacts).post(createContact);
router.route('/active').get(getActiveContacts);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

export default router;

