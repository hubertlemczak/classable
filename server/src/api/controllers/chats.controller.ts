import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';

import model from '../models/chats.model';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const { user } = req.query;
  const chats = await model.getAll(user && req.user?.id);

  res.status(200).json({ chats });
};

const getById = async (req: TRequestWithUser, res: Response) => {
  const { id } = req.params;

  const chat = await model.getById(id);

  res.status(200).json({ chat });
};

export default { getAll, getById };
