import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import RowView from './RowView';

const BoardRow = ({ id, title, index, content, board, setBoard }) => {
  const [isRowOpen, setIsRowOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="flex items-center flex-shrink-0 gap-3 p-2 mb-3 h-max max-w-xs bg-gray-300 w-full text-start rounded-md"
            onClick={() => setIsRowOpen(true)}
          >
            <span>{title}</span>
          </div>
        )}
      </Draggable>
      {isRowOpen && (
        <RowView {...{ content, title, id, setIsRowOpen, board, setBoard }} />
      )}
    </>
  );
};

export default BoardRow;
