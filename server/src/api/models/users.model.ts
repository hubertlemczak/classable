import dbClient from '../../utils/dbClient';

const getAll = async () => {
  const data = await dbClient.user.findMany({
    select: {
      username: true,
      id: true,
    },
  });

  return data;
};

const getById = async (id: string) => {
  const data = await dbClient.user.findUnique({
    where: { id },
    select: {
      username: true,
      id: true,
      chatrooms: {
        include: { conversation: true },
      },
      following: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });

  return data;
};

const createFollow = async (userId: string, followId: string) => {
  const data = await dbClient.user.update({
    where: { id: userId },
    data: {
      following: {
        connect: {
          id: followId,
        },
      },
    },
    select: {
      following: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return data.following[0];
};

const deleteFollow = async (userId: string, followId: string) => {
  const data = await dbClient.user.update({
    where: { id: userId },
    data: {
      following: {
        disconnect: {
          id: followId,
        },
      },
    },
  });

  return data;
};

export default { getById, getAll, deleteFollow, createFollow };
