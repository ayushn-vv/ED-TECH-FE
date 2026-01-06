import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import TaskOverviewTable from './TaskOverviewTable';
import Box from '@mui/material/Box';

const TaskOverview = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: 1,
        height: 500, // Fixed height for the box
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header Section (Fixed) */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 1,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: 'rgba(255,255,255,0.95)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Task Overview
        </Typography>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search Task"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon={'mynaui:search'} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Scrollable Table Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          mt: 1,
          pr: 1,
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b0b0b0',
            borderRadius: 8,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#8a8a8a',
          },
        }}
      >
        <TaskOverviewTable searchText={searchText} />
      </Box>
    </Paper>
  );
};

export default TaskOverview;
