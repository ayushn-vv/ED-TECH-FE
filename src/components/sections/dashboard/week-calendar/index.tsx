import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(localizedFormat);
dayjs.extend(isoWeek);

const daysOfWeekLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startOfCurrentWeek = dayjs(selectedDate).startOf('week');

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfCurrentWeek.add(i, 'day')
  );

  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newDate.toDate());
  };

  const handleNextMonth = () => {
    const newDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newDate.toDate());
  };

  return (
    <Stack
      component={Paper}
      spacing={3}
      sx={{
        p: 2.5,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: 'linear-gradient(to bottom right, #f9fafb, #eef3f8)',
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <IconButton
          size="medium"
          onClick={handlePrevMonth}
          sx={{
            bgcolor: 'transparent !important',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <IconifyIcon icon="oui:arrow-left" />
        </IconButton>

        <Typography variant="h6" fontWeight={600}>
          {dayjs(selectedDate).format('MMMM YYYY')}
        </Typography>

        <IconButton
          size="medium"
          onClick={handleNextMonth}
          sx={{
            bgcolor: 'transparent !important',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <IconifyIcon icon="oui:arrow-right" />
        </IconButton>
      </Stack>

      {/* Days Row */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        spacing={1}
      >
        {daysOfWeek.map((day, index) => {
          const isToday = day.isSame(dayjs(), 'day');
          const isSelected = day.isSame(selectedDate, 'day');

          return (
            <Stack
              key={day.format('YYYY-MM-DD')}
              direction="column"
              alignItems="center"
              spacing={1}
              sx={{
                cursor: 'pointer',
                width: 48,
                transition: 'all 0.3s ease',
                borderRadius: 2,
                p: 0.5,
                background:
                  isSelected
                    ? 'linear-gradient(135deg, #6d6666ff, #0f0f0fff)'
                    : 'transparent',
                color: isSelected ? 'white' : 'text.primary',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => setSelectedDate(day.toDate())}
            >
              <Typography variant="body2" fontWeight={600}>
                {daysOfWeekLetters[index]}
              </Typography>

              <Stack
                height={36}
                width={36}
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                bgcolor={
                  isToday
                    ? '#99b9bbff'
                    : isSelected
                    ? '#b5babbff'
                    : 'background.paper'
                }
                boxShadow={isToday ? '0 0 0 2px #b2cfbfff' : 'none'}
              >
                <Typography variant="body2" fontWeight={600}>
                  {day.format('D')}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default WeekCalendar;
