import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';
import Transaction from '../models/Transaction';
import { spinReels, calculatePayout } from '../utils/spinLogic';
import { getIO } from '../socket';
export const spinSlot = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { wager } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Track total spins
    user.spinCount = (user.spinCount || 0) + 1;

    // Determine if this is a free spin
    const isFreeSpin = user.spinCount % 10 === 0;
    const effectiveWager = isFreeSpin ? 0 : wager;

    console.log('isFreeSpin', isFreeSpin)
    if (!isFreeSpin && user.balance < wager) {
      res.status(400).json({ message: 'Insufficient balance' });
      return;
    }

    const result = spinReels();
    const winAmount = calculatePayout(result, wager);

    // Update balance only if not a free spin
    user.balance = user.balance - effectiveWager + winAmount;
    await user.save();

    const transaction = await Transaction.create({
      user: user._id,
      amount: effectiveWager,
      win: winAmount,
      symbols: result,
    }).catch(err => {
      console.error('Transaction creation error:', err);
    });

    const io = getIO();
    io.emit('new-spin', {
      username: user.username,
      result,
      wager: effectiveWager,
      winAmount,
    });

    res.json({
      result,
      winAmount,
      newBalance: user.balance,
      isFreeSpin,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error while spinning the slot' });
  }
};
