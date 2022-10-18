import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

import { TDecodedUser, TRequestWithUser } from '../../@types/auth';

import { HttpException } from '../api/errors';
import dbClient from '../utils/dbClient';

const JWT_SECRET = process.env.JWT_SECRET || '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signToken = (data: any) => jwt.sign(data, JWT_SECRET);

export const decodeToken = (token: string) => jwt.decode(token);

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export const hashStr = async (str: string) => await bcrypt.hash(str, 10);

export const compareStringToHash = async (
  str: string,
  hash: string | undefined
) => {
  try {
    if (!hash) return false;

    return await bcrypt.compare(str, hash);
  } catch (err) {
    console.error('[COMPAREHASH]', err);
    return false;
  }
};

export const authenticateUser = async (
  req: TRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.trim().split(' ')[1];
  if (!token) {
    throw new HttpException(403, 'Unauthorized');
  }

  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new HttpException(403, 'Unauthorized');
  }

  const { id } = decodedUser as TDecodedUser;

  const user = await dbClient.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      profile: {
        select: { firstName: true, lastName: true },
      },
    },
  });

  req.user = {
    id: user.id,
    email: user.email,
    firstName: user.profile?.firstName,
    lastName: user.profile?.lastName,
  };

  next();
};
