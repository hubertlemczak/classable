import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';

import model from '../models/messages.model';

async function getAll(req: TRequestWithUser, res: Response) {
  const messages = await model.getAll();

  res.status(200).json({ messages });
}

export default { getAll };
