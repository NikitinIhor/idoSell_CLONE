import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';
import SessionCollection from '../models/Session.js';
import UserCollection from '../models/User.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const signup = async payload => {
  const { email, password } = payload;
  const userEmail = await UserCollection.findOne({ email });
  if (userEmail) {
    throw createHttpError(409, `Email already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete user._doc.password;

  return user._doc;
};

export const signin = async payload => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, `Email is invalid`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, `Password is invalid`);
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const userSession = await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });

  return userSession;
};

export const findSessionByAccessToken = accessToken =>
  SessionCollection.findOne({ accessToken });

export const findUser = filter => UserCollection.findOne(filter);

export const refresh = async ({ refreshToken, sessionId }) => {
  const session = await SessionCollection.findOne({
    refreshToken,
    _id: sessionId,
  });

  if (!session) {
    throw createHttpError(401, `Session not found`);
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, `Session token expired`);
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const newSession = createSession();

  const userSession = await SessionCollection.create({
    userId: session._id,
    ...newSession,
  });

  return userSession;
};

export const signout = async sessionId => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
