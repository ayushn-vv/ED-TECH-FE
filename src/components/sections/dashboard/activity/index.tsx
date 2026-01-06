import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Activity as ActivityIcon, ChevronDown, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import ActivityChart from './ActivityChart';

const chartData = {
  thisWeek: [1.7, 2, 1.4, 3, 1.8, 2.4, 1.9],
  lastWeek: [1.3, 2, 1, 3, 1, 2.6, 2.8],
  twoWeeksAgo: [2.9, 2.5, 3, 1, 2, 1, 2],
};

const Activity = () => {
  const [data, setData] = useState(chartData.thisWeek);
  const [week, setWeek] = useState('this-week');
  const [open, setOpen] = useState(false);

  // Calculate stats
  const average = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1);
  const maxValue = Math.max(...data).toFixed(1);
  const trend = data[data.length - 1] > data[0] ? 'up' : 'down';
  const trendPercentage = Math.abs(((data[data.length - 1] - data[0]) / data[0]) * 100).toFixed(0);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const week = event.target.value;
    setWeek(week);

    setTimeout(() => {
      if (week === 'this-week') {
        setData(chartData.thisWeek);
      } else if (week === 'last-week') {
        setData(chartData.lastWeek);
      } else {
        setData(chartData.twoWeeksAgo);
      }
    }, 100);
  };

  return (
    <Paper
      sx={{
        flex: 1,
        background: 'linear-gradient(to bottom, #d9e0e0ff 18%, #7ad3d9ff 80%)',
        p: 3,
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.35)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.45)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Header Section */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              backgroundColor: 'rgba(37, 34, 34, 0.2)',
              borderRadius: '10px',
              p: 0.8,
              display: 'flex',
              alignItems: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ActivityIcon size={20} color="#383535ff" />
          </Box>
          <Typography variant="h6" color="#383535ff" fontWeight={700} letterSpacing={0.5}>
            Activity
          </Typography>
        </Stack>

        <FormControl
          variant="standard"
          sx={{
            minWidth: 120,
            '& .MuiInput-root': {
              color: '#383535ff',
              '&:before': { borderBottom: '1px solid rgba(255,255,255,0.3)' },
              '&:hover:not(.Mui-disabled):before': { borderBottom: '2px solid rgba(255,255,255,0.5)' },
              '&:after': { borderBottom: '2px solid #fff' },
            },
            '& .MuiSelect-select': {
              paddingRight: '32px !important',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            },
          }}
        >
          <Select
            value={week}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={handleSelectChange}
            IconComponent={() => (
              <ChevronDown
                size={18}
                color="#383535ff"
                style={{
                  position: 'absolute',
                  right: 8,
                  pointerEvents: 'none',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            )}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  mt: 1,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                },
              },
            }}
          >
            <MenuItem value="this-week" sx={{ display: 'flex', gap: 1, fontWeight: 500 }}>
              <Calendar size={16} />
              This Week
            </MenuItem>
            <MenuItem value="last-week" sx={{ display: 'flex', gap: 1, fontWeight: 500 }}>
              <Calendar size={16} />
              Last Week
            </MenuItem>
            <MenuItem value="two-weeks-ago" sx={{ display: 'flex', gap: 1, fontWeight: 500 }}>
              <Calendar size={16} />
              Two Weeks Ago
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Stats Row */}
      <Stack direction="row" spacing={1.5} mb={2}>
        <Chip
          icon={<BarChart3 size={14} />}
          label={`Avg: ${average}`}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: '#383535ff',
            fontWeight: 600,
            fontSize: '0.75rem',
            '& .MuiChip-icon': { color: '#383535ff' },
          }}
        />
        <Chip
          icon={<TrendingUp size={14} />}
          label={`Peak: ${maxValue}`}
          size="small"
          sx={{
            backgroundColor: 'rgba(76, 175, 80, 0.8)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.75rem',
            '& .MuiChip-icon': { color: '#fff' },
          }}
        />
        <Chip
          label={`${trend === 'up' ? '↑' : '↓'} ${trendPercentage}%`}
          size="small"
          sx={{
            backgroundColor: trend === 'up' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Stack>

      {/* Chart Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          p: 2,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <ActivityChart data={data} sx={{ height: '130px !important' }} />
      </Box>

      {/* Footer Info */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="caption" color="#383535ff" fontWeight={500}>
          Last 7 days
        </Typography>
        <Typography variant="caption" color="#383535ff" fontWeight={500}>
          {data.reduce((a, b) => a + b, 0).toFixed(1)} total hours
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Activity;