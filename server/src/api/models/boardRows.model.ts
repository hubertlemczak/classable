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
  boardColumnId,
}: {
  boardColumnId: string;
  position: number;
  title: string;
}) {
  const data = await dbClient.boardColumnRow.create({
    data: {
      title,
      position,
      boardColumnId,
    },
  });

  return data;
}

async function update({
  id,
  position,
  boardColumnId,
}: {
  id: string;
  position: number;
  boardColumnId: string;
}) {
  await dbClient.boardColumnRow.update({
    where: {
      id,
    },
    data: { boardColumnId, position },
  });
}

async function updateById({
  id,
  content,
  title,
}: {
  id: string;
  content: string;
  title: string;
}) {
  await dbClient.boardColumnRow.update({
    where: {
      id,
    },
    data: { content, title },
  });
}

async function deleteRow(id: string) {
  await dbClient.boardColumnRow.delete({
    where: {
      id,
    },
  });
}

export default { getById, create, update, updateById, deleteRow };
