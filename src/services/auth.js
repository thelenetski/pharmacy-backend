import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_WEEK } from '../constants/index.js';
import { generateTokens } from '../utils/token.js';

/*-------------------LOGIN--------------------*/
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'Incorrect email');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Incorrect password');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const { accessToken, refreshToken } = generateTokens(user);

  const sessionData = {
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_WEEK),
  };

  return await SessionsCollection.findOneAndUpdate(
    { userId: user._id },
    { $set: sessionData },
    { upsert: true, new: true },
  );
};

/*-------------------LOGOUT--------------------*/
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

/*-------------------USER INFO--------------------*/
export const userInfo = async (payload) => {
  return await UsersCollection.findById(payload);
};

/*-------------------SESSION--------------------*/
const createSession = (user) => {
  if (!user) {
    throw createHttpError(401, 'Unauthorized. Please log in.');
  }
  const token = generateTokens(user);

  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_WEEK),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const user = await UsersCollection.findOne({
    _id: session.userId,
  });

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSessionData = createSession(user);

  await SessionsCollection.updateOne(
    { _id: sessionId, refreshToken },
    { $set: newSessionData },
  );

  return {
    _id: session.userId,
    ...newSessionData,
  };
};
