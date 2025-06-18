import express from 'express';
import { getBalance, getTransactions } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/balance', verifyToken, getBalance);
router.get('/transactions', verifyToken, getTransactions);

export default router;
