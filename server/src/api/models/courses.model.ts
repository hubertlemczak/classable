import { Role } from '@prisma/client';
import dbClient from '../../utils/dbClient';

async function getAll(userId: string | undefined) {
  const data = await dbClient.course.findMany({
    where: {
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
    include: {
      chatrooms: {
        include: {
          user: {
            select: {
              id: true,
              profile: { select: { firstName: true, lastName: true } },
            },
          },
        },
      },
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

export default { getAll, getById, create };
