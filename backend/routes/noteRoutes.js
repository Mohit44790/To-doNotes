
import express from 'express';
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create',isAuthenticated, createNote); 
router.get('/get',isAuthenticated, getNotes); 
router.put('/:id', updateNote); 
router.delete('/:id', deleteNote); 

export default router;
