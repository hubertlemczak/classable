import { useState } from 'react';
import { ReactComponent as DOTSSVG } from '../../../../../assets/bx-dots-horizontal.svg';
import client from '../../../../../client';

const BoardColumnMenu = ({ id, board, setBoard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    try {
      await client.delete(`/board-columns/${id}`);

      const newColumns = board.columns.filter(column => column.id !== id);

      setBoard(prev => ({ ...prev, columns: newColumns }));
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
            <li onClick={handleDelete}>Delete Column</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoardColumnMenu;
