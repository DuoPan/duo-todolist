import React, { useEffect, useState } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { makeStyles } from '@material-ui/core/styles';
import { 
  loadList,
  loadTasksByList,
  updateTask,
  createTask,
  deleteTask,
} from '../api';
import TodoListItem from './TodoListItem';
import TopBar from './TopBar';
import { arrayMove } from '../utils';

const useStyles = makeStyles({
  root: {
    display: 'flex', 
    margin: 20, 
    alignItems: 'center', 
    flexDirection: 'column',
  },
  br: {
    marginTop: 20,
  },
  itemWrapper: {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
  }
});

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const updateSingleTask = (data) => {
    const results = tasks.map((item) => item.id === data.id ? data : item);
    setTasks(results);
  };

  const handleLoadTasks = (listId) => {
    loadTasksByList(listId)
      .then(data => {
        setTasks(data);
        setIsLoading(false);
      });
  };

  const handleUpdateTask = (taskId, content) => {
    updateTask(taskId, content)
      .then(data => {
        // sort and save description will not happen together in this application
        // prevent refresh the whole page after sort
        if (!('position' in content)) {
          updateSingleTask(data)
        }
      });
  };

  const handleCreateTask = (message) => {
    createTask(message)
      .then(data => {
        setTasks([...tasks, data])
      });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
      .then(res => {
        if (res.ok) {
          const results = tasks.filter((item) => item.id !== taskId);
          setTasks(results);
        }
      });
  };

  // assume there must be one list exists
  // doesn't implement list CRUD, because it is quite similar to the task CRUD
  useEffect(() => {
    setIsLoading(true);
    loadList().then(data => handleLoadTasks(data[0]['id']));
  }, []);

  const SortableItem = SortableElement(({value}) => 
    (<TodoListItem
      data={value}
      handleUpdateTask={handleUpdateTask}
      handleDeleteTask={handleDeleteTask}
    />)
  );

  const SortableList = SortableContainer(({items}) => {
    return (
      <div className={classes.itemWrapper}>
        {items.map((value, index) => (
          <SortableItem key={`item-${value.id}`} index={index} value={value} />
        ))}
      </div>
    );
  });

  const handleDrop =({oldIndex, newIndex}) => {
    if (oldIndex === newIndex) {
      return;
    }
    const taskToUpdate = tasks.find(item => item.position === oldIndex);
    if (taskToUpdate && taskToUpdate.id) {
      setTasks(arrayMove(tasks, oldIndex, newIndex));
      handleUpdateTask(taskToUpdate.id, {position: newIndex});
    }
  };

  return (
    <div className={classes.root}>
      <TopBar handleCreateTask={handleCreateTask} setTasks={setTasks}/>
      {tasks.length === 0 && !isLoading && (<div className={classes.br}>No tasks found</div>)}
      {tasks.length === 0 && isLoading && (<div className={classes.br}>Loading ...</div>)}
      <SortableList items={tasks} onSortEnd={handleDrop} distance={2}/>
    </div>
  );
};

export default TodoList;