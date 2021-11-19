import React, { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [description, setDescription] = useState('');
  const [list, setList] = useState([]);
  const [tasks, setTasks] = useState([]);

  const updateSingleTask = (data) => {
    const results = tasks.map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    setTasks(results);
  };

  const loadList = () => {
    fetch('http://localhost:8080/lists/', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => setList(data))
  };

  const loadTasksByList = (listId) => {
    fetch(`http://localhost:8080/lists/${listId}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => setTasks(data))
  };

  const updateTask = (taskId, data) => {
    fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      updateSingleTask(data)
    })
  };

  const createTask = (message) => {
    fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({description: message}),
    })
    .then(res => res.json())
    .then(data => {
      setTasks([...tasks, data])
    })
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (res.ok) {
        const results = tasks.filter((item) => item.id !== taskId);
        setTasks(results);
      }
    })
  };

  const handleAddTask = () => {
    if (!description) {
      return;
    }
    createTask(description);
    setDescription('');
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div style={{display: 'flex'}}>
      <div style={{width: '50%'}}>
        {list.map((item, index) => {
          return (
            <div key={`list_${index}_${item.id}`} onClick={() => loadTasksByList(item.id)}>{item.name}</div>
          )
        })}
        <button>Create List</button>
      </div>
      <div style={{width: '50%' }}>
        <div style={{display: 'flex'}}>
          <input value={description} onChange={(e) => { setDescription(e.target.value) }} />
          <button onClick={handleAddTask}>Add</button>
        </div>
        {tasks.map((item, index) => {
          return (
            <TodoListItem
              key={`task_${index}_${item.id}`}
              data={item}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )
        })}
      </div>
    </div>
  );
};

export default TodoList;