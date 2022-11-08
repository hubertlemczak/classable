import dbClient from '../../utils/dbClient';

async function getAll(email: string | undefined, id: string) {
  const data = await dbClient.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: email,
          },
        },
      ],
    },
    select: {
      id: true,
      email: true,
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
      courses: {
        select: {
          role: true,
          course: {
            select: {
              name: true,
            },
          },
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
