import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import dbClient from '../../utils/dbClient';
import { HttpException } from '../errors';

import model from '../models/notes.model';

async function getAll(req: TRequestWithUser, res: Response) {
  const courseName = req.query.courseName as string;

  const notes = await model.getAll(courseName);

  res.status(200).json({ notes });
}

async function getById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  const note = await model.getById(id);

  res.status(200).json({ note });
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

  const note = await model.create({ courseId, userId });

  res.status(201).json({ note });
}

async function updateById(req: TRequestWithUser, res: Response) {
  const { title, content } = req.body;

  if (!title && !content) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const { id } = req.params;

  await model.updateById({ title, content, id });

  res.sendStatus(200);
}

export default { getAll, getById, create, updateById };
