import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import spinRoutes from './routes/spinRoutes';
import balanceRoutes from './routes/balanceRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import { initSocket } from './socket';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/spin', spinRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/stats', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSocket(server);
console.log('process.env.MONGO_URI!',process.env.MONGO_URI!)
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });
