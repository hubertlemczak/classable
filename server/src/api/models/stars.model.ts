import dbClient from '../../utils/dbClient';

async function create({
  boardId,
  noteId,
  userId,
}: {
  boardId: string | undefined;
  noteId: string | undefined;
  userId: string;
}) {
  const data = await dbClient.starredResource.create({
    data: {
      boardId,
      noteId,
      userId,
    },
  });

  return data;
}

async function deleteStar(id: string) {
  await dbClient.starredResource.delete({
    where: {
      id,
    },
  });
}

export default { create, deleteStar };
