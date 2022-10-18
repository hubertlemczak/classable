import { Request } from 'express';

export type TRegisterArgs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TDecodedUser = {
  id: string;
  email: string;
  iat: number;
};

export type TUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type TRequestWithUser = {
  user?: TUser;
} & Request;
