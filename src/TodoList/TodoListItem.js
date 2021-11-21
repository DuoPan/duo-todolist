import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import MoveIcon from '@mui/icons-material/PanTool';
import EditIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Block';
import TwoIconsButton from '../Basic/TwoIconsButton';

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
  },
  card: {
    width: '80%', 
    marginBottom: 16, 
    marginTop: 16, 
    display: 'flex', 
    padding: '16px 8px', 
    borderLeftWidth: 4, 
    borderLeftColor: ({completed}) => completed ? '#2e7d32' : 'inherit',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 10%)',
  },
  moveIcon: {
    color: 'grey', 
    cursor: 'move',
  },
});

const TodoListItem = ({ 
  data,
  handleUpdateTask,
  handleDeleteTask,
}) => {
  const [text, setText] = useState(data.description);
  const [isEditMode, setIsEditMode] = useState(false);
  const classes = useStyles({isEditMode, completed: data.completed});

  const toggleTaskCompleted = () => {
    if (isEditMode) {
      return;
    }
    handleUpdateTask(data.id, {completed: !data.completed});
  };

  const handleDelete = () => {
    handleDeleteTask(data.id);
  };

  const handleCancelEdit = () => {
    setText(data.description);
    setIsEditMode(false);
  };

  const handleSave = () => {
    // do not allow save emtpy description
    if (text === '') {
      return;
    }
    if (text !== data.description) {
      handleUpdateTask(data.id, {description: text});
    }
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Fade in={true} >
      <Card variant='outlined' className={classes.card}>

        <TwoIconsButton
          isFirstIcon={data.completed}
          firstIcon={<TaskAltIcon color='success' />}
          secondIcon={<RadioButtonUncheckedIcon />}
          firstIconTooltip={'Mard as Todo'}
          secondIconTooltip={'Mark as Done'}
          onClickFirstIcon={toggleTaskCompleted}
          onClickSecondIcon={toggleTaskCompleted}
          buttonStyle={{visibility: isEditMode ? 'hidden' : 'initial'}}
        />

        <InputBase
          multiline={true}
          readOnly={!isEditMode}
          className={classes.input}
          onChange={(e) => handleOnChange(e)}
          value={text}
        />
        
        <TwoIconsButton
          isFirstIcon={isEditMode}
          firstIcon={<SaveIcon color={'primary'} />}
          secondIcon={<EditIcon color={'primary'} />}
          firstIconTooltip={'Save'}
          secondIconTooltip={'Edit'}
          onClickFirstIcon={handleSave}
          onClickSecondIcon={handleEdit}
        />

        <TwoIconsButton
          isFirstIcon={isEditMode}
          firstIcon={<CancelIcon color={'error'} />}
          secondIcon={<DeleteIcon color={'error'} />}
          firstIconTooltip={'Cancel Edit'}
          secondIconTooltip={'Delete'}
          onClickFirstIcon={handleCancelEdit}
          onClickSecondIcon={handleDelete}
        />

        <Tooltip title={'Drag to Move'}>
          <IconButton disableRipple={true} >
            <MoveIcon className={classes.moveIcon}/>
          </IconButton>
        </Tooltip>

      </Card>
    </Fade>
  );
};

export default TodoListItem;