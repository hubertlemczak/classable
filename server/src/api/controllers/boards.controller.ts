import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import dbClient from '../../utils/dbClient';
import { HttpException } from '../errors';

import model from '../models/boards.model';

async function getAll(req: TRequestWithUser, res: Response) {
  const courseName = req.query.courseName as string;

  const boards = await model.getAll(courseName);

  res.status(200).json({ boards });
}

async function getById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  const board = await model.getById(id);

  res.status(200).json({ board });
}

async function create(req: TRequestWithUser, res: Response) {
  const { courseName } = req.body;

  if (!courseName) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const userId = req.user?.id as string;

  const course = await dbClient.course.findFirstOrThrow({
    where: {
      name: {
        equals: courseName,
        mode: 'insensitive',
      },
    },
  });

  const courseId = course.id;

  const board = await model.create({ courseId, userId });

  res.status(201).json({ board });
}

async function update(req: TRequestWithUser, res: Response) {
  const { title, visibility } = req.body;

  if (!title && !visibility) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const { id } = req.params;

  await model.update({ id, title, visibility });

  res.sendStatus(200);
}

export default { getAll, getById, create, update };
