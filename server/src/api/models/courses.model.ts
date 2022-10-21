import dbClient from '../../utils/dbClient';

async function getAll(userId: string | undefined) {
  const data = await dbClient.course.findMany({
    where: {
      enrolment: {
        some: {
          userId,
        },
      },
    },
  });

  return data;
}

async function getById(id: string) {
  const data = await dbClient.course.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      chatrooms: {
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

async function create({
  name,
  category,
  description,
  userId,
}: {
  name: string;
  category: string;
  description: string;
  userId: string;
}) {
  const data = await dbClient.course.create({
    data: {
      name,
      category,
      description,
      enrolment: {
        create: {
          userId,
          role: 'COURSEADMIN',
        },
      },
    },
  });

  return data;
}

export default { getAll, getById, create };
