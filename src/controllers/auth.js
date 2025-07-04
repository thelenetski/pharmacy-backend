import createHttpError from 'http-errors';
import { ONE_WEEK } from '../constants/index.js';
import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  userInfo,
} from '../services/auth.js';
import { verifyToken } from '../utils/token.js';

/*-------------------LOGIN--------------------*/
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_WEEK),
    sameSite: 'None',
    secure: true,
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_WEEK),
    sameSite: 'None',
    secure: true,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      email: req.body.email,
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

/*-------------------SESSION--------------------*/
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_WEEK),
    sameSite: 'None',
    secure: true,
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_WEEK),
    sameSite: 'None',
    secure: true,
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  const decoded = verifyToken(session.accessToken);
  const user = await userInfo(decoded.id);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      email: user.email,
    },
  });
};
