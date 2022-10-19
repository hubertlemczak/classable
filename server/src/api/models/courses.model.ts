import dbClient from '../../utils/dbClient';

const getAll = async (userId: string | undefined) => {
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
};

const getById = async (id: string) => {
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
};

export default { getAll, getById };
