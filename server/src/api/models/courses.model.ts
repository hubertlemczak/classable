import { Role } from '@prisma/client';
import dbClient from '../../utils/dbClient';

async function getAll({
  userId,
  courseName,
}: {
  userId: string | undefined;
  courseName: string | undefined;
}) {
  const data = await dbClient.course.findMany({
    where: {
      name: {
        equals: courseName,
        mode: 'insensitive',
      },
      enrolment: {
        some: {
          userId,
        },
      },
    },
  });

  return data;
}

async function getById(id: string) {
  const data = await dbClient.course.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return data;
}

async function create({
  name,
  category,
  description,
  userId,
  usersToInvite,
  image,
}: {
  name: string;
  category: string;
  description: string;
  userId: string;
  usersToInvite: { userId: string; role: Role }[];
  image: string;
}) {
  const data = await dbClient.course.create({
    data: {
      name,
      category,
      description,
      image,
      enrolment: {
        createMany: {
          data: [
            {
              userId,
              role: 'COURSEADMIN',
            },
            ...usersToInvite,
          ],
        },
      },
    },
  });

  return data;
}

async function invite({
  usersToInvite,
}: {
  usersToInvite: { courseId: string; userId: string; role: Role }[];
}) {
  await dbClient.enrolment.createMany({
    data: [...usersToInvite],
  });
}

export default { getAll, getById, create, invite };
