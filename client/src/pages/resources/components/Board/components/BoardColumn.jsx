import { Droppable, Draggable } from '@hello-pangea/dnd';
import BoardColumnHeader from './BoardColumnHeader';

import BoardRow from './BoardRow';
import CreateRow from './CreateRow';

const BoardColumn = ({ id, title, rows, index, board, setBoard }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="p-4 h-max max-h-full bg-gray-200 w-80 rounded-md flex-shrink-0 overflow-y-scroll no-scrollbar"
        >
          <BoardColumnHeader {...{ provided, title, id, board, setBoard }} />

          <Droppable droppableId={id} type="row">
            {provided => (
              <div
                style={{ minHeight: '20px' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {rows?.map((row, i) => (
                  <BoardRow
                    key={row.id}
                    {...row}
                    {...{ board, setBoard }}
                    index={i}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CreateRow {...{ id, rows, setBoard }} />
        </div>
      )}
    </Draggable>
  );
};

export default BoardColumn;
