import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('req.body',req.body)
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    console.log(req.body)
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('user',user)
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch',isMatch)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
console.log('JWT_SECRET',JWT_SECRET)
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('token',token)
    
    res.json({ token, user: { username: user.username, email: user.email, balance: user.balance } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};
