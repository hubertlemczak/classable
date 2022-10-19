import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';

import { HttpException } from '../errors';
import model from '../models/users.model';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const users = await model.getAll();

  res.status(200).json({ users });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;
  const user = await model.getById(id);

  if (!user) {
    throw new HttpException(404, 'User not found');
  }

  res.status(200).json({ user });
};

const getFollows = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;

  const users = await model.getFollows(id);

  res.status(200).json({ users });
};

const createFollow = async (req: TRequestWithUser, res: Response) => {
  const { id, followId } = req.params;

  if (req.user?.id !== id) {
    throw new HttpException(403, 'Unauthorized');
  }

  const follow = await model.createFollow(id, followId);

  res.status(201).json({ follow });
};

const deleteFollow = async (req: TRequestWithUser, res: Response) => {
  const { id, followId } = req.params;

  if (req.user?.id !== id) {
    throw new HttpException(403, 'Unauthorized');
  }

  await model.deleteFollow(id, followId);

  res.sendStatus(204);
};

export default { getAll, getById, getFollows, deleteFollow, createFollow };
