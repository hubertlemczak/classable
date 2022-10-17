import { Request, Response } from 'express';

import dbClient from '../../utils/dbClient';
import { compareStringToHash, hashStr, signToken } from '../../auth';
import model from '../models/auth.model';
import { HttpException } from '../errors';
import { TRegisterArgs } from '../../../@types/auth';

type validateCredentialsArgs = {
  usernameOrEmail: string;
  password: string;
};

const login = async (req: Request, res: Response) => {
  const user = await validateCredentials(req.body);
  const token = signToken(user);

  res.status(201).json({ token });
};

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as TRegisterArgs;

  if (!username || !email || !password) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const hashedPassword = await hashStr(password);
  const userDetails = { username, email, password: hashedPassword };

  const user = await model.register(userDetails);

  const token = signToken({
    id: user?.id,
    username: user?.username,
    email: user?.email,
  });

  res.status(201).json({ token });
};

const validateCredentials = async ({
  usernameOrEmail,
  password,
}: validateCredentialsArgs) => {
  if (!usernameOrEmail || !password) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const username = usernameOrEmail.includes('@') ? undefined : usernameOrEmail;
  const email = usernameOrEmail.includes('@') ? usernameOrEmail : undefined;

  const user = await dbClient.user.findUnique({
    where: { username, email },
  });

  const isValid = await compareStringToHash(password, user?.password);
  if (!isValid) {
    throw new HttpException(403, 'Invalid credentials');
  }

  return { id: user?.id, username: user?.username, email: user?.email };
};

export default { login, register };
