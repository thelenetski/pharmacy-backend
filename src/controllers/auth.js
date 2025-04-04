import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/index.js';
import { loginUser, logoutUser, userInfo } from '../services/auth.js';
import { verifyToken } from '../utils/token.js';

/*-------------------LOGIN--------------------*/
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

/*-------------------LOGOUT--------------------*/
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

/*-------------------USER INFO--------------------*/
export const userInfoController = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createHttpError(401, 'Unauthorized');
  }

  const decoded = verifyToken(token);
  const user = await userInfo(decoded.id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    name: user.name,
    email: user.email,
  });
};
