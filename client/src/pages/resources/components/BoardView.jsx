import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import client from '../../../client';
// import { StyledMdContainer } from '../index.styled';
import BoardColumn from './BoardColumn';
import CreateColumn from './CreateColumn';

const BoardView = () => {
  const [board, setBoard] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  console.log(board);
  const { boardId } = useParams();

  useEffect(() => {
    async function getBoard() {
      try {
        const res = await client.get(`/boards/${boardId}`);
        setBoard(res.data.board);
      } catch (err) {
        console.error(err);
      }
    }

    getBoard();
  }, [boardId]);

  async function onDragEnd(data) {
    const { destination, source, type } = data;

    if (!destination) return;

    const hasColumnChanged = destination.droppableId !== source.droppableId;
    const hasIndexChanged = destination.index !== source.index;
    const hasPositionChanged = hasColumnChanged || hasIndexChanged;

    if (!hasPositionChanged) return;

    if (type === 'column') {
      const newColumns = [...board.columns];

      const sourceColumn = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, ...sourceColumn);

      newColumns.forEach((column, i) => (column.position = i));

      try {
        setBoard(prev => ({ ...prev, columns: newColumns }));
        await client.patch('/board-columns', { columns: newColumns });
      } catch (err) {
        console.error(err);
      }
    }

    if (type === 'row') {
      const sourceColumn = board.columns.find(
        column => column.id === source.droppableId
      );
      const destinationColumn = board.columns.find(
        column => column.id === destination.droppableId
      );
      const sourceRow = sourceColumn.rows.splice(source.index, 1);
      sourceRow[0].boardColumnId = destinationColumn.id;
      destinationColumn.rows.splice(destination.index, 0, ...sourceRow);

      sourceColumn.rows.forEach((row, i) => (row.position = i));
      destinationColumn.rows.forEach((row, i) => (row.position = i));

      const rows = sourceColumn.rows.concat(destinationColumn.rows);

      await client.patch('/board-rows', { rows });
    }
  }

  async function handleEdit(e) {
    const { value } = e.target;

    try {
      await client.patch(`/boards/${board.id}`, { title: value });

      setBoard(prev => ({ ...prev, title: value }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (!board.id) return;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isEditing ? (
        <input
          className="mb-3 -ml-2 p-2 rounded-md text-4xl font-bold "
          type="text"
          name="title"
          onBlur={handleEdit}
          defaultValue={board.title}
          autoFocus
        />
      ) : (
        <h1
          className="mb-3 inline-block -ml-2 p-2 rounded-md text-4xl font-bold hover:bg-gray-200 "
          onClick={() => setIsEditing(true)}
        >
          {board.title}
        </h1>
      )}
      <div className="flex gap-5" style={{ maxHeight: 'calc(100% - 68px)' }}>
        <Droppable droppableId={board.id} direction="horizontal" type="column">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-5 "
            >
              {board?.columns?.map((column, i) => (
                <BoardColumn
                  key={column.id}
                  {...column}
                  index={i}
                  {...{ board, setBoard }}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CreateColumn {...{ board, setBoard }} />
      </div>
    </DragDropContext>
  );
};

export default BoardView;
