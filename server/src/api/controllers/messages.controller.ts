import { Response } from 'express';

import model from '../models/messages.model';
import { TRequestWithUser } from '../../../@types/auth';

const getAll = async (req: TRequestWithUser, res: Response) => {
  const messages = await model.getAll();

  res.status(200).json({ messages });
};

export default { getAll };
