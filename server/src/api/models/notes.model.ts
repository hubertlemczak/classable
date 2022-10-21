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
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const data = await dbClient.note.create({
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

async function updateById({
  id,
  content,
  title,
}: {
  id: string;
  content: string;
  title: string;
}) {
  await dbClient.note.update({
    where: {
      id,
    },
    data: { content, title },
  });
}

export default { getAll, getById, create, updateById };
