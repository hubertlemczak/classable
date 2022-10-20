import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';

import { HttpException } from '../errors';
import model from '../models/users.model';

async function getAll(req: TRequestWithUser, res: Response) {
  const users = await model.getAll();

  res.status(200).json({ users });
}

async function getById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;
  const user = await model.getById(id);

  if (!user) {
    throw new HttpException(404, 'User not found');
  }

  res.status(200).json({ user });
}

async function getFollows(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  const users = await model.getFollows(id);

  res.status(200).json({ users });
}

async function createFollow(req: TRequestWithUser, res: Response) {
  const { id, followId } = req.params;

  if (req.user?.id !== id) {
    throw new HttpException(403, 'Unauthorized');
  }

  const follow = await model.createFollow(id, followId);

  res.status(201).json({ follow });
}

async function deleteFollow(req: TRequestWithUser, res: Response) {
  const { id, followId } = req.params;

  if (req.user?.id !== id) {
    throw new HttpException(403, 'Unauthorized');
  }

  await model.deleteFollow(id, followId);

  res.sendStatus(204);
}

export default { getAll, getById, getFollows, deleteFollow, createFollow };
