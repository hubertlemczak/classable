import { useState } from 'react';

import { ReactComponent as ADDSVG } from '../../../assets/plus.svg';

import client from '../../../client';

const CreateColumn = ({ board, setBoard }) => {
  const [isCreatingColumn, setIsCreatingColumn] = useState(false);

  async function handleCreateNewColumn(e) {
    if (!e.target.value) return setIsCreatingColumn(false);

    try {
      const createColumnOptions = {
        title: e.target.value,
        position: board.columns.length,
        boardId: board.id,
      };

      const res = await client.post('/board-columns', createColumnOptions);

      setBoard(prev => ({
        ...prev,
        columns: [...prev.columns, res.data.column],
      }));

      setIsCreatingColumn(false);
    } catch (err) {
      setIsCreatingColumn(false);
      console.error(err);
    }
  }

  return isCreatingColumn ? (
    <input
      className="p-2 rounded-md text-lg flex-shrink-0 w-xs h-max"
      type="text"
      name="columnTitle"
      onBlur={handleCreateNewColumn}
      autoFocus
    />
  ) : (
    <button
      className="flex items-center flex-shrink-0 gap-3 p-2 h-max max-w-xs bg-gray-300 w-full text-start rounded-md"
      onClick={() => setIsCreatingColumn(true)}
    >
      <ADDSVG className="h-4 w-4" />
      <span>Add new column</span>
    </button>
  );
};

export default CreateColumn;
