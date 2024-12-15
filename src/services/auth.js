import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';
import SessionCollection from '../models/Session.js';
import UserCollection from '../models/User.js';

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

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  const userSession = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};

export const findSessionByAccessToken = accessToken =>
  SessionCollection.findOne({ accessToken });

export const findUser = filter => UserCollection.findOne(filter);
