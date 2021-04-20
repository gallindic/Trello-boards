import React, { useState, useEffect }from 'react';
import TasksBoard from './components/TasksBoard';
import NewBoard from './components/NewBoard';
import { DragDropContext } from 'react-beautiful-dnd'

export default function App(props) {
  
    const [initialData, setInitialData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
      fetch("http://localhost:5000/boards/get-data")
      .then(res => res.json())
      .then(response => { 
        setInitialData(response);
        setLoaded(true);
        setRerender(false);
      });
    }, [rerender]);

    const Container = elems => (
        <div className="h-screen bg-blue-500 w-full">
            <div className="p-6 flex flex-start items-start font-sans">
                {elems.children}
            </div>
        </div>
    );

    const parseDndId = id => parseInt(id.split("-")[1]);

    const onDragEnd = result => {
      document.body.style.color = 'inherit';
      document.body.style.backgroundColor = 'inherit';
    
      const {destination, source, draggableId } = result;
    
      if(!destination) {
        return;
      }
    
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
    
      const start = initialData.columns[parseDndId(source.droppableId)];
      const finish = initialData.columns[parseDndId(destination.droppableId)];
    
      if(start === finish) {
        const newTaskIds = Array.from(start.taskIds);

        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, parseDndId(draggableId));

        const newColumn = {
          ...finish,
          taskIds: newTaskIds,
        };

        const newState = {
          ...initialData,
          columns: [
            ...initialData.columns.map(column => column.id !== newColumn.id ? column : newColumn),
          ],
        };
      
        setInitialData(newState);

        return;  
      }
    
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, parseDndId(draggableId));
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    
    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setInitialData(newState);
  };

    const handleBoardAdd = (newBoard) => {
      let boardsData = initialData;
      boardsData.columns.push(newBoard);

      setInitialData(() => boardsData);
      setRerender(true);
    }

    const addNewTaskToBoard = data => {
      let boardsData = initialData;

      boardsData.tasks.push(data.task);
      boardsData.columns.find(column => column.id === data.id).taskIds.push(data.task.id);

      setInitialData(() => boardsData);
    }

    const handleBoardDelete = (boardId) => {
      fetch("http://localhost:5000/boards/delete-board", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: boardId})
      })
      .then(res => res.json())
      .then(response => { 
        console.log(response);
        setRerender(true);
      });
    }

    const handleTaskDelete = (taskId, boardId) => {
      fetch("http://localhost:5000/boards/delete-item", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: taskId})
      })
      .then(res => res.json())
      .then(response => { 
        let boardsData = initialData;

        boardsData.tasks = boardsData.tasks.filter(task => task.id !== taskId);

        const taskIds = boardsData.columns.find(column => column.id === boardId).taskIds.filter(taskID => taskID !== taskId);
        boardsData.columns.find(column => column.id === boardId).taskIds = taskIds;
        
        setRerender(true);
        
        setInitialData(() => boardsData);
      });


      
    }

    const displayBoards = () => {
      return initialData.columns.map(column => {
        const tasks = column.taskIds.map(taskId => initialData.tasks.find(task => task.id === taskId));

        return <TasksBoard key={column.id} column={column} tasks={tasks} deleteTask={ handleTaskDelete } deleteBoard= { handleBoardDelete } addNewTask={ addNewTaskToBoard } />
      });
    }

    if(loaded){
      return (
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Container>
            { displayBoards() }
          <NewBoard onBoardAdd={ handleBoardAdd }/>
          </Container>
        </DragDropContext>
      );
    } else {
      return <Container></Container>;
    }
}