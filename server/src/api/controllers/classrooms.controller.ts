import { Response } from 'express';
import { RtcTokenBuilder } from 'agora-access-token';

import { TRequestWithUser } from '../../../@types/auth';
import dbClient from '../../utils/dbClient';
import { HttpException } from '../errors';

import model from '../models/classrooms.model';
import { compareStringToHash, hashStr } from '../../auth';

function getRtcToken(name: string, uid: string) {
  const APP_ID = process.env.AGORA_APP_ID;
  const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

  if (!APP_ID || !APP_CERTIFICATE) {
    throw new HttpException(500, 'Live video application error');
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + 3600;

  return RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uid,
    1,
    privilegeExpireTime
  );
}

async function create(req: TRequestWithUser, res: Response) {
  const { courseName, name, password } = req.body;

  if (!courseName || !name) {
    throw new HttpException(400, 'Missing fields in request body');
  }

  const course = await dbClient.course.findFirstOrThrow({
    where: {
      name: {
        equals: courseName,
        mode: 'insensitive',
      },
    },
  });

  const userId = req.user?.id as string;

  const token = getRtcToken(name, userId);

  let hashedPassword;

  if (password) {
    hashedPassword = await hashStr(password);
  }

  const classroom = await model.create({
    name,
    hashedPassword,
    courseId: course.id,
  });

  res.status(201).json({ classroom, token });
}

async function createToken(req: TRequestWithUser, res: Response) {
  const { password } = req.body;
  const { id } = req.params;

  const course = await dbClient.classroom.findFirstOrThrow({
    where: { id },
    select: {
      password: true,
      name: true,
    },
  });
  console.log(password, course);

  if (course.password) {
    const isValid = await compareStringToHash(password, course.password);
    if (!isValid) {
      throw new HttpException(403, 'Invalid credentials');
    }
  }

  const userId = req.user?.id as string;

  const token = getRtcToken(course.name, userId);

  res.status(201).json({ token });
}

async function getAll(req: TRequestWithUser, res: Response) {
  const courseName = req.query.courseName as string;

  const classrooms = await model.getAll(courseName);

  res.status(200).json({ classrooms });
}

export default { create, createToken, getAll };
