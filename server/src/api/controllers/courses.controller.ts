import { Role } from '@prisma/client';
import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import { HttpException } from '../errors';

import model from '../models/courses.model';

async function getAll(req: TRequestWithUser, res: Response) {
  const { user } = req.query;
  const courses = await model.getAll(user && req.user?.id);

  res.status(200).json({ courses });
}

async function getById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  const courses = await model.getById(id);

  res.status(200).json({ courses });
}

async function create(req: TRequestWithUser, res: Response) {
  const { name, category, description, users, image } = req.body;

  if (!name || !category || !description) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const userId = req.user?.id as string;

  const usersToInvite = users.map(
    ({ userId, role }: { userId: string; role: Role }) => ({ userId, role })
  );

  await model.create({
    name,
    category,
    description,
    userId,
    usersToInvite,
    image,
  });

  res.sendStatus(201);
}

export default { getAll, getById, create };
