// app/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from '../../login/authApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  const { email, password } = req.body;

  try {
    await signUp(email, password);
    res.status(200).json({ message: 'Check your email to continue the sign in process.' });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}
