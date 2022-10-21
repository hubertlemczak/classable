import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import { TColumn } from '../../../@types/boards';

import { HttpException } from '../errors';

import model from '../models/boardColumns.model';

async function getById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  const board = await model.getById(id);

  res.status(200).json({ board });
}

async function create(req: TRequestWithUser, res: Response) {
  const { title, boardId, position } = req.body;

  if (!title || !boardId || position == null) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const column = await model.create({ title, boardId, position });

  res.status(201).json({ column });
}

async function update(req: TRequestWithUser, res: Response) {
  const { columns } = req.body;

  columns.forEach(async (column: TColumn) => {
    await model.update(column);
  });

  res.sendStatus(200);
}

async function updateById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;
  const { title } = req.body;

  await model.updateById({ id, title });

  res.sendStatus(200);
}

async function deleteColumn(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  await model.deleteColumn(id);

  res.sendStatus(204);
}

export default { getById, create, update, deleteColumn, updateById };
