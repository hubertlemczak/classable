import { TCreateMessage } from '../../../@types/messages';
import dbClient from '../../utils/dbClient';

const getAll = async () => await dbClient.message.findMany({});

const getById = async (id: string) => {
  const data = await dbClient.message.findUnique({
    where: { id },
  });

  return data;
};

const createMessage = async ({
  content,
  userId,
  conversationId,
}: TCreateMessage) => {
  const data = await dbClient.message.create({
    data: {
      content,
      conversationId,
      userId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return data;
};

export default { getById, getAll, createMessage };
