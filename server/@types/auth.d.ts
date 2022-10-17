import { Request } from 'express';

export type TRegisterArgs = {
  username: string;
  email: string;
  password: string;
};

export type TDecodedUser = {
  id: string;
  username: string;
  email: string;
  iat: number;
};

export type TUser = {
  id: string;
  username: string;
  email: string;
};

export type TRequestWithUser = {
  user?: TUser;
} & Request;
