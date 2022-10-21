import { Visibility } from '@prisma/client';
import dbClient from '../../utils/dbClient';

async function getAll(name: string) {
  const data = await dbClient.board.findMany({
    where: {
      course: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      stars: {
        include: {
          user: {
            select: {
              id: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

async function getById(id: string) {
  const data = await dbClient.board.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      columns: {
        orderBy: {
          position: 'asc',
        },
        include: {
          rows: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      },
    },
  });

  return data;
}

async function create({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const data = await dbClient.board.create({
    data: {
      courseId,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return data;
}

async function update({
  id,
  title,
  visibility,
}: {
  id: string;
  title: string;
  visibility: Visibility;
}) {
  const data = await dbClient.board.update({
    where: {
      id,
    },
    data: {
      title,
      visibility,
    },
  });

  return data;
}

export default { getAll, getById, create, update };
