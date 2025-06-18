import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { spinSlot } from '../controllers/spinController';

const router = express.Router();

router.post('/', verifyToken, spinSlot);

export default router;
