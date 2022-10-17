import { Response } from 'express';
import { HttpException } from '../errors';

import model from '../models/users.model';
import { TRequestWithUser } from '../../../@types/auth';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const users = await model.getAll();

  res.status(200).json({ users });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const id = req.params.id;
  const user = await model.getById(id);

  if (!user) {
    throw new HttpException(404, 'User not found');
  }

  res.status(200).json({ user });
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

export default { getAll, getById, deleteFollow, createFollow };
