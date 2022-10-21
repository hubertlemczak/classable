import dbClient from '../../utils/dbClient';

async function getById(id: string) {
  const data = await dbClient.board.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      columns: {
        include: {
          rows: true,
        },
      },
    },
  });

  return data;
}

async function create({
  title,
  position,
  boardId,
}: {
  boardId: string;
  position: number;
  title: string;
}) {
  const data = await dbClient.boardColumn.create({
    data: {
      title,
      position,
      boardId,
    },
    include: {
      rows: true,
    },
  });

  return data;
}

async function update({ id, position }: { id: string; position: number }) {
  await dbClient.boardColumn.update({
    where: {
      id,
    },
    data: {
      position,
    },
  });
}

async function updateById({ id, title }: { id: string; title: string }) {
  await dbClient.boardColumn.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
}

async function deleteColumn(id: string) {
  await dbClient.boardColumn.delete({
    where: {
      id,
    },
  });
}

export default { getById, create, update, deleteColumn, updateById };
