const headers = {
  'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_USERNAME_PASSWORD).toString('base64'),
  'Content-Type': 'application/json',
};

export const loadList = () => {
  return fetch('http://localhost:8080/lists/', {
    method: 'GET',
    headers,
  })
    .then(res => res.json());
};

export const loadTasksByList = (listId) => {
  return fetch(`http://localhost:8080/lists/${listId}/tasks`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json());
};

export const createTask = (message) => {
  return fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ description: message }),
  })
    .then(res => res.json());
};

export const updateTask = (taskId, content) => {
  return fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks/${taskId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(content),
  })
    .then(res => res.json());
};

export const deleteTask = (taskId) => {
  return fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks/${taskId}`, {
    method: 'DELETE',
    headers,
  });
};

export const searchTask = (description) => {
  return fetch(`http://localhost:8080/lists/89851872-3689-41b0-b350-a449cf4e3419/tasks?filter=${description}`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json());
};