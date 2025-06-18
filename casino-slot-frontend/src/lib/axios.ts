// src/lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://casino-slot-game.vercel.app',
  withCredentials: true, // if you're using cookies or sessions
});

export default instance;
