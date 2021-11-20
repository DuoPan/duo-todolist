import React, { useState } from "react";
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Block';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    '& textarea': {
      cursor: ({isEditMode}) => isEditMode ? 'text' : 'default',
      color: ({completed}) => completed ? '#b5afaf' : 'inherit',
      borderBottom: ({isEditMode}) => isEditMode ? '1px solid #b5afaf' : 'none',
      paddingLeft: 4,
    },
    paddingLeft: 2,
    flexGrow: 1,
    flexWrap: 'wrap',
  }
});

const TodoListItem = ({ 
  data,
  updateTask,
  deleteTask,
}) => {
  const [text, setText] = useState(data.description);
  const [isEditMode, setIsEditMode] = useState(false);
  const classes = useStyles({isEditMode, completed: data.completed});

  const toggleTaskCompleted = () => {
    if (isEditMode) {
      return;
    }
    updateTask(data.id, {completed: !data.completed});
  };

  const handleDeleteCancelEdit = () => {
    if (isEditMode) {
      setText(data.description);
      setIsEditMode(false);
    } else {
      deleteTask(data.id)
    }
  };

  const handleEditSave = () => {
    if (isEditMode) {
      updateTask(data.id, {description: text});
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Fade in={true} >
      <Card variant="outlined"
        style={{
          width: '80%', marginBottom: 16, marginTop: 16, display: 'flex', padding: '16px 8px', borderLeftWidth: 4, borderLeftColor: data.completed ? '#2e7d32' : 'inherit',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 10%)'
        }}
      >
        <Tooltip title={data.completed ? 'Mard as Todo' : 'Mark as Done'}>
          <IconButton onClick={toggleTaskCompleted} style={{visibility: isEditMode ? 'hidden' : 'initial'}}>
            {data.completed ? (
              <TaskAltIcon color={'success'} />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>
        </Tooltip>
        <InputBase
          multiline={true}
          readOnly={!isEditMode}
          className={classes.input}
          onChange={(e) => handleOnChange(e)}
          value={text}
        />
        
        <div onClick={() => updateTask(data.id, {position: 0})}>{data.position}</div>
        
        <Tooltip title={isEditMode ? 'Save' : 'Edit'}>
          <IconButton color={'primary'} onClick={handleEditSave}>
            {isEditMode ? (<SaveIcon />) : (<EditIcon />)}
          </IconButton>
        </Tooltip>

        <Tooltip title={isEditMode ? 'Cancel Edit' : 'Delete'}>
          <IconButton color={'error'} onClick={handleDeleteCancelEdit}>
            {isEditMode ? (<CancelIcon />) : (<DeleteIcon />)}
          </IconButton>
        </Tooltip>
      </Card>
    </Fade>
  );
};

export default TodoListItem;