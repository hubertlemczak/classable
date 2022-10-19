import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';

import model from '../models/boards.model';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const courseName = req.query.courseName as string;

  const boards = await model.getAll(courseName);

  res.status(200).json({ boards });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;

  const boards = await model.getById(id);

  res.status(200).json({ boards });
};

export default { getAll, getById };
