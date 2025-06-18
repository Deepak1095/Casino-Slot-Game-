import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { getTransactions, getBalance } from '../controllers/balanceController';

const router = express.Router();

router.get('/', verifyToken, getBalance);
router.get('/transactions', verifyToken, getTransactions);

export default router;
