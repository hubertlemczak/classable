import { Draggable } from '@hello-pangea/dnd';

const BoardRow = ({ id, content, title, index }) => {
  console.log(content);
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex items-center flex-shrink-0 gap-3 p-2 mb-3 h-max max-w-xs bg-gray-300 w-full text-start rounded-md"
        >
          <span>{title}</span>
        </div>
      )}
    </Draggable>
  );
};

export default BoardRow;
