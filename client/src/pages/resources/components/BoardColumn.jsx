import { Droppable, Draggable } from '@hello-pangea/dnd';

import { ReactComponent as DOTSSVG } from '../../../assets/bx-dots-horizontal.svg';

import BoardRow from './BoardRow';
import CreateRow from './CreateRow';

const BoardColumn = ({ id, title, rows, index, setBoard }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="p-4 h-max max-h-full bg-gray-200 w-80 rounded-md flex-shrink-0 overflow-y-scroll"
        >
          <div
            {...provided.dragHandleProps}
            className="flex justify-between pb-5"
          >
            <h2 className="text-lg">{title}</h2>
            <DOTSSVG className="fill-gray-600" />
          </div>

          <Droppable droppableId={id} type="row">
            {provided => (
              <div
                style={{ minHeight: '20px' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {rows?.map((row, i) => (
                  <BoardRow key={row.id} {...row} index={i} />
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
