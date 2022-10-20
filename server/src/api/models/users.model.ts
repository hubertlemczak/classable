import dbClient from '../../utils/dbClient';

async function getAll() {
  const data = await dbClient.user.findMany({
    select: {
      id: true,
      profile: { select: { firstName: true, lastName: true } },
    },
  });

  return data;
}

async function getById(id: string) {
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
}

async function getFollows(id: string) {
  const data = await dbClient.user.findUnique({
    where: { id },
    select: {
      followers: true,
      following: true,
    },
  });

  return data;
}
async function createFollow(userId: string, followId: string) {
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
}

async function deleteFollow(userId: string, followId: string) {
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
}

export default { getById, getAll, getFollows, deleteFollow, createFollow };
