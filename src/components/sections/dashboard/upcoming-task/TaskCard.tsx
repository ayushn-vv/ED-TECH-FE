import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AvatarGroup from '@mui/material/AvatarGroup';
import IconifyIcon from 'components/base/IconifyIcon';
import { Task } from 'data/tasks';

interface TaskCardProps {
  data: Task;
}

const TaskCard = ({ data }: TaskCardProps) => {
  return (
    <Card
      sx={{
        userSelect: 'none',
        background: 'linear-gradient(to bottom, #f5f5f7, #ffffff)',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        width: 270, // fixed card width for precise slider alignment
        height: 270, // ensures visual balance
        display: 'flex',
        flexDirection: 'column',
        p:2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Thumbnail */}
      <CardMedia
        component="img"
        height="134"
        image={data.thumb}
        alt="task_today_image"
        sx={{
          objectFit: 'cover',
        }}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <Box>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600} noWrap>
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {data.category}
          </Typography>
        </Box>

        {/* Progress Section */}
        <Box mt={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={500} color="text.primary">
              Seat Filled
            </Typography>
            <Typography variant="body2" fontWeight={500} sx={{ color: '#7f8485' }}>
              {data.progress}%
            </Typography>
          </Stack>
          <Slider
            value={data.progress}
            style={{ color: '#90dadd' }}
            size="small"
            aria-label="Progress"
            valueLabelDisplay="auto"
            disabled
          />
        </Box>

        {/* Footer Section */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt="auto"
          pt={1.5}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="mynaui:clock-circle" color="text.secondary" fontSize="small" />
            <Typography variant="body2" fontWeight={500}>
              {data.daysLeft} Days Left
            </Typography>
          </Stack>

          <AvatarGroup max={4}>
            {data.avatars.map((avatar) => (
              <Avatar key={avatar} alt="member" src={avatar} sx={{ width: 28, height: 28 }} />
            ))}
          </AvatarGroup>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
