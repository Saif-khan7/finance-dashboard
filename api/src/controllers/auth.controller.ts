// src/controllers/auth.controller.ts
import { RequestHandler } from 'express';
import { User } from '../models/user.model';
import { signToken } from '../utils/generateToken';

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;                     // <-- now the function returns void
  }

  res.json({
    token: signToken(user.id),
    user: { email: user.email, role: user.role },
  });
  // implicit void return
};
