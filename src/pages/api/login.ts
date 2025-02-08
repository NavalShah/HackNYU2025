// pages/api/login.ts
import { findUserByEmail } from '../../../models/User';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json({ message: 'Login successful', user });
    } catch (error: any) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}