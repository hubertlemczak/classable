import dbClient from '../../utils/dbClient';

const getAll = async (name: string) => {
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
    },
  });

  return data;
};

const getById = async (id: string) => {
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
};

const create = async ({
  content,
  courseId,
  userId,
}: {
  content: string;
  courseId: string;
  userId: string;
}) => {
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
};

export default { getAll, getById, create };
