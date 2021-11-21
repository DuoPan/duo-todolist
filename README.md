# duo-todolist

### How to run:
- Put '.env' file in the root folder
- Run ```npm install```
- Start server ```docker run -it -p 8080:8080 cflemming/todo-server:2```
- Run ```npm start```

### Project Structure
- .env: Store sensitive information which shouldn't be put into the version control.
- src/Basic: Reusable component that can be shared among components.
- src/TodoList: The TodoList component, which includes two child components, top bar and list item.
- api.js: The API calls that match the backend RESTful API interface.
- utils.js: Some useful js functions.

### Features
- A user can view the tasks from a list. Assume this user already has at least one list, and he/she can see all the tasks from this list by default. Do not implement list CRUD for now.
- A user can add a new task. The user can input a new task description from the input area, and click the add button, then the task will be saved and displayed on the page.
- A user can edit a task. After clicking the edit button, the user can modify the text of the task description. Some UI will change, cannot mark as done when editing, cannot save the empty text. Also, provide a cancel edit button.
- A user can delete a task.
- A user can sort the tasks. The user can drag and drop a task to the target position.
- A user can search tasks. Input a keyword in the input area, then click the search button. During the loading time, the search icon will become a spinner. 
- Display placeholder text when no tasks exist.
- Clear search: search empty value (can be imporved by adding a new button).

### Core Libs
- Material UI
- Drag and Drop (react-sortable-hoc)
