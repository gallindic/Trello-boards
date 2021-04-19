import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Task (props) {

  const TaskContainer = () => (
    <Draggable draggableId={"task-" + props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div className="bg-white p-2 rounded text-xs mt-1 border border-gray-300 cursor-pointer hover:bg-gray-200"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
          isDragging={snapshot.isDragging}
        >
          {props.task.name}
        </div>
      )}
    </Draggable>
  );

  return (
    <TaskContainer />

  );

}