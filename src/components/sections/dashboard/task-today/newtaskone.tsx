import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import AvatarGroup from '@mui/material/AvatarGroup';
import IconifyIcon from 'components/base/IconifyIcon';
import { Thumb5 } from 'data/images';

interface TaskDetail {
  id: number;
  details: string;
}

const taskDetails: TaskDetail[] = [
  { id: 1, details: 'Understanding the tools in Figma' },
  { id: 2, details: 'Understand the basics of making designs' },
  { id: 3, details: 'Design a mobile application with Figma' },
];

// ✅ Countdown Timer Component
const CountdownTimer = ({ initialSeconds = 3600 }: { initialSeconds?: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconifyIcon
        icon="mynaui:clock-circle"
        color={timeLeft > 0 ? 'text.secondary' : 'error.main'}
        fontSize="h5.fontSize"
      />
      <Typography
        variant="body1"
        fontWeight={600}
        color={timeLeft > 0 ? 'text.primary' : 'error.main'}
      >
        {timeLeft > 0 ? `${formatTime(timeLeft)} remaining` : 'Time Out'}
      </Typography>
    </Stack>
  );
};

const TaskToday = () => {
  return (
    <Card
      sx={{
        width: 1,
        borderRadius: 3,
        background: 'linear-gradient(180deg, #f0f0f0ff 18%, #d6dddeff 82%)',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <IconifyIcon
              icon="lets-icons:meatballs-menu"
              color="#4c4c4cff"
              fontSize="h4.fontSize"
            />
          </IconButton>
        }
        title={
          <Typography sx={{ fontSize: '1.1rem', color: '#414141ff', fontWeight: 700 }}>
            Upcoming Course
          </Typography>
        }
      />

      <CardMedia
        component="img"
        height="160"
        image={Thumb5}
        alt="task_today_image"
        sx={{
          borderRadius: '0 0 12px 12px',
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ px: 3, pt: 3, pb: 1 }}>
        <Box mb={2}>
          <Typography variant="subtitle1" color="text.primary" fontWeight={700}>
            Creating Awesome Mobile Apps
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            UI / UX Designer
          </Typography>
        </Box>

        {/* Progress Section */}
        {/* <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.primary" fontWeight={600}>
              Total Seat filled
            </Typography>
            <Typography variant="body1" color="#4caf50" fontWeight={600}>
              90%
            </Typography>
          </Stack>
          <Slider
            defaultValue={90}
            sx={{
              color: '#4caf50',
              height: 6,
              '& .MuiSlider-thumb': { display: 'none' },
              '& .MuiSlider-track': { border: 'none' },
            }}
            disabled
          />
        </Stack> */}

        {/* Avatars + Countdown Timer */}
        <Stack
          mt={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <CountdownTimer initialSeconds={3600} /> {/* 👈 Live Timer */}
          {/* <AvatarGroup max={5}>
            {[Avatar1, Avatar2, Avatar3, Avatar4, Avatar5].map((avatar, index) => (
              <Avatar key={index} alt={`avatar-${index + 1}`} src={avatar} />
            ))}
          </AvatarGroup> */}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Detail Task Section */}
        <Box textAlign="center" mb={2}>
          <Typography variant="subtitle1" color="primary.dark" fontWeight={700}>
            Detail Explaination
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            UI / UX Designer
          </Typography>
        </Box>

        {/* Detail List */}
        <Stack direction="column" spacing={2}>
          {taskDetails.map((task) => (
            <Stack
              key={task.id}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 2,
                p: 1.2,
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <Box
                height={36}
                width={36}
                borderRadius={2.5}
                bgcolor="#90dadd"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body2" fontWeight={700} color="#333">
                  {task.id}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600} color="#414141ff">
                {task.details}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="contained"
          size="medium"
          fullWidth
          sx={{
            background: 'linear-gradient(90deg, #54dce1ff 0%, #90dadd 100%)',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '10px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              background: 'linear-gradient(90deg, #4fcdd0 0%, #7fd0d3 100%)',
            },
          }}
        >
          Go To Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskToday;
