import { verifyToken } from '../utils/token.js';
import { userInfo } from '../services/auth.js';

export const checkRole = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  const decoded = verifyToken(token);

  if (decoded.error) {
    return res.status(403).json({ error: decoded.error });
  }

  const user = await userInfo(decoded.id);

  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  next();
};
