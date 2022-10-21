import { useState } from 'react';
import client from '../../../../../client';

import BoardColumnMenu from './BoardColumnMenu';

const BoardColumnHeader = ({ provided, title, id, board, setBoard }) => {
  const [isEditingColumn, setIsEditingColumn] = useState(false);

  async function handleEditColumn(e) {
    if (e.target.value === title || !e.target.value) {
      return setIsEditingColumn(false);
    }

    try {
      const editColumnOptions = {
        title: e.target.value,
      };

      await client.patch(`/board-columns/${id}`, editColumnOptions);

      const newColumns = board.columns.map(column => {
        if (column.id === id) {
          return { ...column, title: e.target.value };
        }
        return column;
      });

      setBoard(prev => ({ ...prev, columns: newColumns }));

      setIsEditingColumn(false);
    } catch (err) {
      setIsEditingColumn(false);
      console.error(err);
    }
  }

  return isEditingColumn ? (
    <input
      className="mb-5 rounded-md text-lg flex-shrink-0 w-xs h-fit"
      type="text"
      name="columnTitle"
      onBlur={handleEditColumn}
      defaultValue={title}
      autoFocus
    />
  ) : (
    <div {...provided.dragHandleProps} className="flex justify-between pb-5">
      <h2 className="text-lg" onClick={() => setIsEditingColumn(true)}>
        {title}
      </h2>
      <BoardColumnMenu {...{ id, board, setBoard }} />
    </div>
  );
};

export default BoardColumnHeader;
