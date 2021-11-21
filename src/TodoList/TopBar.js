import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { searchTask } from '../api';

const TopBar = ({
  handleCreateTask,
  setTasks,
}) => {
  const [description, setDescription] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleAddTask = () => {
    if (!description) {
      return;
    }
    handleCreateTask(description);
    setDescription('');
  };

  const handleSearchTask = () => {
    setIsSearching(true);
    searchTask(description)
      .then(data => {
        setTasks(data);
        // force display the loading animation, otherwise the icon would looks like flashing
        setTimeout(() => { setIsSearching(false); }, 300);
      })
  };

  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Enter new task or keyword'
        value={description}
        onChange={(e) => { setDescription(e.target.value) }}
      />

      <Tooltip title={'Add Task'}>
        <IconButton sx={{ p: '10px' }} aria-label='search' color='primary' onClick={handleAddTask} >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />

      <Tooltip title={'Search Task'}>
        <LoadingButton color='primary' sx={{ p: '10px' }} aria-label='directions' onClick={handleSearchTask} loading={isSearching}>
          <SearchIcon />
        </LoadingButton>
      </Tooltip>

    </Paper>
  );

};

export default TopBar;