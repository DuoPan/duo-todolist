import React from "react";

const TodoListItem = ({ 
  data,
  updateTask,
  deleteTask,
}) => {

  // todo add throttle
  const toggleTaskCompleted = (e) => {
    updateTask(data.id, {completed: e.target.checked});
  };

  return (
    <div style={{display: 'flex'}}>
      <div>{data.description}</div>
      <input type="checkbox" checked={data.completed} id="vehicle1" name="vehicle1" value="Bike" onChange={toggleTaskCompleted} />
      <button onClick={() => deleteTask(data.id)}>Delete</button>
    </div>
  );
};

export default TodoListItem;
