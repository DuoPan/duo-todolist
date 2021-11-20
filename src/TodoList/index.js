import React, { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

const TodoList = () => {
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateSingleTask = (data) => {
    const results = tasks.map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    setTasks(results);
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
      .then(data => {
        setTasks(data);
        setIsLoading(false);
      })
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
      body: JSON.stringify({ description: message }),
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

  const searchTask = () => {
    setIsSearching(true);
    fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks?filter=${description}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        // force display the loading animation, otherwise the icon would looks like flashing
        setTimeout(() => {setIsSearching(false);}, 300);
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
    setIsLoading(true);
    // assume there must be 1 list exist
    // doesn't implement list CRUD, because it is quite similar to the task CRUD
    const loadList = () => {
      fetch('http://localhost:8080/lists/', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + Buffer.from('').toString('base64'),
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => loadTasksByList(data[0]['id']));
    };
    loadList();
  }, []);

  return (
    <div style={{ display: 'flex', margin: 20, alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Please enter new task or search keywords"
            value={description} onChange={(e) => { setDescription(e.target.value) }}
          />
          <Tooltip title={'Add Task'}>
            <IconButton sx={{ p: '10px' }} aria-label="search" color="primary" onClick={handleAddTask} >
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Tooltip title={'Search Task'}>
            <LoadingButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={searchTask} loading={isSearching}>
              <SearchIcon />
            </LoadingButton>
          </Tooltip>

        </Paper>
      </div>
      {tasks.length === 0 && !isLoading && (<div style={{marginTop: 20}}>No tasks found</div>)}
      {tasks.length === 0 && isLoading && (<div style={{marginTop: 20}}>Loading ...</div>)}
      {tasks.map((item, index) => {
        return (
          <div draggable
          key={`task_${index}_${item.id}`}
          >
            <TodoListItem
              data={item}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        )
      })}

    </div>
  );
};

export default TodoList;