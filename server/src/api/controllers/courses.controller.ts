import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';

import model from '../models/courses.model';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const { user } = req.query;
  const courses = await model.getAll(user && req.user?.id);

  res.status(200).json({ courses });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;

  const courses = await model.getById(id);

  res.status(200).json({ courses });
};

export default { getAll, getById };
