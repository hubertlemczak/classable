import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import { HttpException } from '../errors';

import model from '../models/stars.model';

async function create(req: TRequestWithUser, res: Response) {
  const { boardId, noteId } = req.body;

  if (!boardId && !noteId) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const userId = req.user?.id as string;

  const star = await model.create({ boardId, noteId, userId });

  res.status(201).json({ star });
}

async function deleteStar(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  await model.deleteStar(id);

  res.status(204);
}

export default { create, deleteStar };
