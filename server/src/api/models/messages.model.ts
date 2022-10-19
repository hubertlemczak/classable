import dbClient from '../../utils/dbClient';

const getAll = async () => {
  const data = await dbClient.message.findMany({
    include: {
      user: {
        select: {
          profile: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return data;
};

export default { getAll };
