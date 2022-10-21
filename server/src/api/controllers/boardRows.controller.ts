import { Response } from 'express';

import { TRequestWithUser } from '../../../@types/auth';
import { TRow } from '../../../@types/boards';
import { HttpException } from '../errors';

import model from '../models/boardRows.model';

async function getById(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  const board = await model.getById(id);

  res.status(200).json({ board });
}

async function create(req: TRequestWithUser, res: Response) {
  const { title, boardColumnId, position } = req.body;

  if (!title || !boardColumnId || position == null) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const row = await model.create({ title, boardColumnId, position });

  res.status(201).json({ row });
}

async function update(req: TRequestWithUser, res: Response) {
  const { rows } = req.body;

  rows.forEach(async (row: TRow) => {
    await model.update(row);
  });

  res.sendStatus(200);
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

async function deleteRow(req: TRequestWithUser, res: Response) {
  const { id } = req.params;

  await model.deleteRow(id);

  res.sendStatus(204);
}

export default { getById, create, update, updateById, deleteRow };
