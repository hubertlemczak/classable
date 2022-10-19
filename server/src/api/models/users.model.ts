import dbClient from '../../utils/dbClient';

const getAll = async () => {
  const data = await dbClient.user.findMany({
    select: {
      id: true,
      profile: { select: { firstName: true, lastName: true } },
    },
  });

  return data;
};

const getById = async (id: string) => {
  const data = await dbClient.user.findUnique({
    where: { id },
    select: {
      id: true,
      profile: true,
      chatrooms: {
        include: { chat: true },
      },
      following: {
        select: {
          id: true,
          profile: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return data;
};

const getFollows = async (id: string) => {
  const data = await dbClient.user.findUnique({
    where: { id },
    select: {
      followers: true,
      following: true,
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
          profile: { select: { firstName: true, lastName: true } },
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

export default { getById, getAll, getFollows, deleteFollow, createFollow };
