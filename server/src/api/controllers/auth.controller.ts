import { Request, Response } from 'express';

import dbClient from '../../utils/dbClient';
import { compareStringToHash, hashStr, signToken } from '../../auth';
import model from '../models/auth.model';
import { HttpException } from '../errors';
import { TRegisterArgs } from '../../../@types/auth';

type validateCredentialsArgs = {
  email: string;
  password: string;
};

async function login(req: Request, res: Response) {
  console.log(req.body);
  const user = await validateCredentials(req.body);
  const token = signToken(user);

  res.status(201).json({ token });
}

async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName }: TRegisterArgs = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const hashedPassword = await hashStr(password);
  const userDetails = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
  };

  const user = await model.register(userDetails);

  const token = signToken({
    id: user.id,
    email: user.email,
  });

  res.status(201).json({ token });
}

async function validateCredentials({
  email,
  password,
}: validateCredentialsArgs) {
  if (!email || !password) {
    throw new HttpException(400, 'Missing fields in request body');
  }
  console.log(email);

  const user = await dbClient.user.findUnique({
    where: { email },
  });

  const isValid = await compareStringToHash(password, user?.password);
  if (!isValid) {
    throw new HttpException(403, 'Invalid credentials');
  }

  return { id: user?.id, email: user?.email };
}

export default { login, register };
