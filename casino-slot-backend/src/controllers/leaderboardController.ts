import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import User from '../models/User';
import redis from '../config/redisClient';

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const cacheKey = `leaderboard_${days}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    const result = await Transaction.aggregate([
      { $match: { createdAt: { $gte: sinceDate } } },
      {
        $group: {
          _id: '$user',
          netWin: { $sum: { $subtract: ['$win', '$amount'] } },
        },
      },
      { $sort: { netWin: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          username: '$user.username',
          netWin: 1,
        },
      },
    ]);

    await redis.set(cacheKey, JSON.stringify(result), 'EX', 120); // cache for 2 minutes

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};
