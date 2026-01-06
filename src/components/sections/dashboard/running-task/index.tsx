import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import { PlayCircle, Clock, TrendingUp } from 'lucide-react';

const RunningTask = () => {
  const completionRate = 65;
  const totalTasks = 100;

  return (
    <Stack
      component={Paper}
      spacing={2}
      width="100%"
      sx={{
        background: 'linear-gradient(145deg, #d8e8e8 0%, #aee0db 100%)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
        borderRadius: '18px',
        p: 3,
        height: '180px',
        position: 'relative',
        overflow: 'hidden',
        transition: '0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',

        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.22)',
        },

        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          filter: 'blur(40px)',
        },
      }}
    >

      {/* ---------------- HEADER ---------------- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.25)',
              borderRadius: '12px',
              p: 1,
              display: 'flex',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 3px 8px rgba(0,0,0,0.1)'
            }}
          >
            <PlayCircle size={22} color="#333" />
          </Box>
          <Typography variant="h6" fontWeight={700} color="#2e2e2e">
            Seat Filling Updates
          </Typography>
        </Stack>

        <Chip
          icon={<TrendingUp size={20} />}
          label="Active"
          sx={{
            background: 'linear-gradient(135deg, #ffffffd9, #d0ddd0)',
            color: '#2e2e2e',
            fontWeight: 600,
            px: 1.5,
            height: 34,
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            '& .MuiChip-icon': {
              color: '#2e2e2e',
            },
          }}
        />
      </Stack>

      {/* ---------------- MAIN ROW ---------------- */}
      <Stack direction="row" alignItems="center" spacing={3} width="100%">

        {/* Stats Left */}
        <Box>
          <Typography variant="body2" color="#3d3d3d" fontWeight={600} mb={0.3}>
            Seat's Filled
          </Typography>

          <Stack direction="row" alignItems="baseline" spacing={0.6}>
            <Typography variant="h3" fontWeight={700} color="#2e2e2e">
              {completionRate}
            </Typography>
            <Typography variant="h6" color="#4d4d4d" fontWeight={500}>
              / {totalTasks}
            </Typography>
          </Stack>
        </Box>

        {/* Progress Right */}
        <Box flex={1}>
          <LinearProgress
            variant="determinate"
            value={completionRate}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.25)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
                boxShadow: '0 2px 6px rgba(76, 175, 80, 0.4)',
              },
            }}
          />
          <Typography
            variant="caption"
            fontWeight={600}
            color="#444"
            mt={0.5}
            display="block"
          >
            {completionRate}% Seat's Filled
          </Typography>
        </Box>
      </Stack>

      {/* ---------------- FOOTER ---------------- */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Clock size={15} color="#313131" />
        <Typography variant="caption" fontWeight={500} color="#313131">
          Updated moments ago
        </Typography>
      </Stack>
    </Stack>
  );
};

export default RunningTask;
