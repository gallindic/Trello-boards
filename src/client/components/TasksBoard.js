import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { CardContainer, Title, InputContainer } from './Board';

export default function TasksBoard (props) {

  const [showInput, setShowInput] = useState(false);
  const [tasks, setTasks] = useState(props.tasks);
  
  const TasksContainer = () => (
    <Droppable droppableId={"column-" + props.column.id}>
      {(provided, snapshot) => (
        <div className="text-sm mt-2 h-full"
          ref={provided.innerRef}
          {...provided.droppableProps} 
          isDraggingOver={snapshot.isDraggingOver}
        >
          { displayTasks() }  
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  );

  const AddNewBtn = () => (
    <p className="mt-3 text-gray-dark text-xs cursor-pointer" onClick={ () => setShowInput(true) }>Add a card...</p>
  );

  const displayTasks = () => {
    return tasks.map((task, index) => {
      return <Task key={task.id} task={task} index={index} />
    });
  }

  const insertItemToDB = (item) => {
    fetch("http://localhost:5000/boards/add-item", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: item, boardID: props.column.id})
    })
    .then(response => response.json())
    .then(data => {
      let newTask = {
        id: data.id,
        name: data.name
      };

      setTasks(() => [...tasks, newTask]);

      props.addNewTask({id: props.column.id, task: newTask});
      setShowInput(false);
    })
    .catch(err => console.log(err));
  }

  return (
    <CardContainer>
      <Title title={props.column.name}/>
      <TasksContainer />
      <InputContainer showInput={showInput} placeholder={"Board item"} handleSubmit={(name) => { insertItemToDB(name); }} />
      <AddNewBtn/>
    </CardContainer>
  );
}