import { useState } from 'react';

import { ReactComponent as DOTSSVG } from '../../../../../assets/bx-dots-horizontal.svg';

import client from '../../../../../client';

const BoardRowMenu = ({ id, board, setBoard, setIsRowOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDeleteRow() {
    try {
      await client.delete(`/board-rows/${id}`);

      const newColumns = board.columns.map(column => {
        column.rows = column.rows.filter(row => row.id !== id);
        return column;
      });

      setBoard(prev => ({ ...prev, columns: newColumns }));
      setIsRowOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative">
      <DOTSSVG
        className="fill-gray-600 cursor-pointer"
        onClick={() => setIsMenuOpen(prev => !prev)}
      />
      {isMenuOpen && (
        <div className="absolute right-0 bg-white shadow-md p-2 w-max text-sm cursor-pointer">
          <ul>
            <li onClick={handleDeleteRow}>Delete Row</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoardRowMenu;
