import { Response } from 'express';

import model from '../models/conversations.model';
import { TRequestWithUser } from '../../../@types/auth';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const { user } = req.query;
  const conversations = await model.getAll(user && req.user?.id);

  res.status(200).json({ conversations });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;

  const conversation = await model.getById(id);

  res.status(200).json({ conversation });
};

export default { getAll, getById };
