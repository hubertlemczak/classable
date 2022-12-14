import dbClient from '../../utils/dbClient';

async function getAll(userId: string | undefined) {
  const data = await dbClient.chat.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
  });

  return data;
}

async function getById(id: string) {
  const data = await dbClient.chat.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      participants: {
        include: {
          user: {
            select: {
              id: true,
              profile: { select: { firstName: true, lastName: true } },
            },
          },
        },
      },
      messages: {
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
}

export default { getAll, getById };
