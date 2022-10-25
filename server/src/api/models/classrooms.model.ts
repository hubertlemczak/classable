import dbClient from '../../utils/dbClient';

async function create({
  name,
  courseId,
  hashedPassword,
}: {
  name: string;
  courseId: string;
  hashedPassword: string | undefined;
}) {
  const data = await dbClient.classroom.create({
    data: {
      name,
      courseId,
      password: hashedPassword,
    },
  });

  return data;
}

async function getAll(name: string) {
  const data = await dbClient.classroom.findMany({
    where: {
      course: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    },
  });

  return data;
}

export default { create, getAll };
