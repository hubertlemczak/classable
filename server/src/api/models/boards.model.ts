import dbClient from '../../utils/dbClient';

const getAll = async (name: string) => {
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
    },
  });

  return data;
};

const getById = async (id: string) => {
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
    },
  });

  return data;
};

export default { getAll, getById };
