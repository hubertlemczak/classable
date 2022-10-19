import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import dbClient from '../../utils/dbClient';
import { HttpException } from '../errors';

import model from '../models/notes.model';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const courseName = req.query.courseName as string;

  const notes = await model.getAll(courseName);

  res.status(200).json({ notes });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;

  const note = await model.getById(id);

  res.status(200).json({ note });
};

const create = async (req: TRequestWithUser, res: Response) => {
  const { content, name } = req.body;

  if (!content || !name) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const userId = req.user?.id as string;

  const course = await dbClient.course.findFirstOrThrow({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });

  console.log(course);

  const courseId = course.id;

  const note = await model.create({ content, courseId, userId });

  res.status(201).json({ note });
};

export default { getAll, getById, create };
