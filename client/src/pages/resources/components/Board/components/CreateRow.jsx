import { useState } from 'react';

import { ReactComponent as ADDSVG } from '../../../../../assets/plus.svg';

import client from '../../../../../client';

const CreateRow = ({ id, rows, setBoard }) => {
  const [isCreatingRow, setIsCreatingRow] = useState(false);

  async function handleCreateNewRow(e) {
    if (!e.target.value) return setIsCreatingRow(false);

    try {
      const createRowOptions = {
        title: e.target.value,
        position: rows.length,
        boardColumnId: id,
      };

      const res = await client.post('/board-rows', createRowOptions);

      rows.push(res.data.row);
      setBoard(prev => ({ ...prev }));
      setIsCreatingRow(false);
    } catch (err) {
      setIsCreatingRow(false);
      console.error(err);
    }
  }

  return isCreatingRow ? (
    <input
      className="p-2 rounded-md text-lg flex-shrink-0 w-full h-max"
      type="text"
      name="rowTitle"
      onBlur={handleCreateNewRow}
      autoFocus
    />
  ) : (
    <button
      className="flex items-center flex-shrink-0 gap-3 p-2 h-max max-w-xs bg-gray-300 w-full text-start rounded-md"
      onClick={() => setIsCreatingRow(true)}
    >
      <ADDSVG className="h-4 w-4" />
      <span>Add new row</span>
    </button>
  );
};

export default CreateRow;
