import { hashStr } from '../src/auth';
import dbClient from '../src/utils/dbClient';

async function main() {
  const password = await hashStr('123');

  const user1 = await dbClient.user.create({
    data: {
      email: 'user1@test.com',
      password,
      profile: {
        create: {
          firstName: 'user1',
          lastName: 'user1',
        },
      },
    },
  });

  const user2 = await dbClient.user.create({
    data: {
      email: 'user2@test.com',
      password,
      profile: {
        create: {
          firstName: 'user2',
          lastName: 'user2',
        },
      },
    },
  });

  const user3 = await dbClient.user.create({
    data: {
      email: 'user3@test.com',
      password,
      profile: {
        create: {
          firstName: 'user3',
          lastName: 'user3',
        },
      },
    },
  });

  const course1 = await dbClient.course.create({
    data: {
      name: 'Course 1',
      category: 'Testing',
      description: 'Seed generated course',
    },
  });

  await dbClient.enrolment.createMany({
    data: [
      { role: 'TEACHER', courseId: course1.id, userId: user1.id },
      { role: 'STUDENT', courseId: course1.id, userId: user2.id },
      { role: 'STUDENT', courseId: course1.id, userId: user3.id },
    ],
  });

  await dbClient.chat.create({
    data: {
      name: 'General',
      chatrooms: {
        createMany: {
          data: [
            { userId: user1.id, courseId: course1.id },
            { userId: user2.id, courseId: course1.id },
            { userId: user3.id, courseId: course1.id },
          ],
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

  await dbClient.chat.create({
    data: {
      name: 'Convo with user 1 & 2',
      chatrooms: {
        createMany: {
          data: [
            { userId: user1.id, courseId: course1.id },
            { userId: user2.id, courseId: course1.id },
          ],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'msg 1',
              userId: user1.id,
            },
            {
              content: 'msg 2',
              userId: user2.id,
            },
            {
              content: 'msg 3',
              userId: user1.id,
            },
            {
              content: 'msg 4',
              userId: user2.id,
            },
          ],
        },
      },
    },
  });

  const ticket1 = await dbClient.chat.create({
    data: {
      name: 'Ticket 1',
      chatrooms: {
        createMany: {
          data: [{ userId: user1.id, courseId: course1.id }],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'msg 1 pls help with this ticket',
              userId: user1.id,
            },
          ],
        },
      },
      status: 'UNCLAIMED',
    },
  });

  const board1 = await dbClient.board.create({
    data: {
      title: 'Board One',
      courseId: course1.id,
      userId: user1.id,
      columns: {
        create: {
          position: 0,
          title: 'Column One',
          rows: {
            createMany: {
              data: [
                {
                  content: 'Row One Content',
                  title: 'Row One Col 1',
                  position: 0,
                },
                {
                  content: 'Row Two Content',
                  title: 'Row Two Col 1',
                  position: 1,
                },
                {
                  content: 'Row Three Content',
                  title: 'Row Three Col 1',
                  position: 2,
                },
              ],
            },
          },
        },
      },
    },
  });

  const column2 = await dbClient.boardColumn.create({
    data: {
      position: 1,
      title: 'Column Two',
      boardId: board1.id,
      rows: {
        createMany: {
          data: [
            {
              content: 'Row One Content',
              title: 'Row One Col 2',
              position: 0,
            },
            {
              content: 'Row Two Content',
              title: 'Row Two Col 2',
              position: 1,
            },
            {
              content: 'Row Three Content',
              title: 'Row Three Col 2',
              position: 2,
            },
          ],
        },
      },
    },
  });

  const note1 = await dbClient.note.create({
    data: {
      content: 'Note 1',
      courseId: course1.id,
      userId: user1.id,
      title: 'Note One',
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
