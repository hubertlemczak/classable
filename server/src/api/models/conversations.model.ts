import dbClient from '../../utils/dbClient';

const getAll = async (userId: string | undefined) => {
  const data = await dbClient.conversation.findMany({
    where: {
      chatrooms: {
        some: {
          userId,
        },
      },
    },
  });

  return data;
};

const getById = async (id: string) => {
  const data = await dbClient.conversation.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      chatrooms: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      messages: {
        include: {
          user: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return data;
};

export default { getAll, getById };
