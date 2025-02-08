// pages/api/signup.ts
import { createUser } from '../../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await createUser({ email, password });
      res.status(201).json({ message: 'User created', user });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}