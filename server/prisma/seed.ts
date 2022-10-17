import { hashStr } from '../src/auth';
import dbClient from '../src/utils/dbClient';

async function main() {
  const password = await hashStr('123');

  const user1 = await dbClient.user.create({
    data: {
      username: 'User 1',
      email: 'user1@gmail.com',
      password,
    },
  });

  const user2 = await dbClient.user.create({
    data: {
      username: 'User 2',
      email: 'user2@gmail.com',
      password,
      following: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  const user3 = await dbClient.user.create({
    data: {
      username: 'User 3',
      email: 'user3@gmail.com',
      password,
      following: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  await dbClient.conversation.create({
    data: {
      name: 'Convo 1',
      chatrooms: {
        createMany: {
          data: [{ userId: user1.id }, { userId: user2.id }],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'Huss 1',
              userId: user1.id,
            },
            {
              content: 'Huss 2',
              userId: user2.id,
            },
          ],
        },
      },
    },
  });

  await dbClient.conversation.create({
    data: {
      name: 'Convo 2',
      chatrooms: {
        createMany: {
          data: [{ userId: user1.id }, { userId: user3.id }],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'Huss 1',
              userId: user1.id,
            },
            {
              content: 'Huss 2',
              userId: user3.id,
            },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await dbClient.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await dbClient.$disconnect();
    process.exit(1);
  });
