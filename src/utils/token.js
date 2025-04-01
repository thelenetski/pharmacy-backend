import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env('JWT_SECRET'),
    { expiresIn: '15m' },
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    env('JWT_SECRET'),
    { expiresIn: '7d' },
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env('JWT_SECRET'));
  } catch {
    throw createHttpError(401, 'Token expired');
  }
};
