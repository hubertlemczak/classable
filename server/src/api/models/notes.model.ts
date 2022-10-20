import dbClient from '../../utils/dbClient';

async function getAll(name: string) {
  const data = await dbClient.note.findMany({
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
  const data = await dbClient.note.findUniqueOrThrow({
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
    },
  });

  return data;
}

async function create({
  content,
  courseId,
  userId,
}: {
  content: string;
  courseId: string;
  userId: string;
}) {
  const data = await dbClient.note.create({
    data: {
      content,
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

export default { getAll, getById, create };
