import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import { Mentor } from 'data/mentors';

interface MentorCardProps {
  data: Mentor;
}

const MentorCard = ({ data }: MentorCardProps) => {
  const isActive = data.followed;

  return (
    <Card
      sx={{
        userSelect: 'none',
        background: 'linear-gradient(to bottom, #d0d6d8 20%, #9edde2 80%)',
        borderRadius: 3,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        height:'125px',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Top Row */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={data.avatar}
          alt={data.name}
          sx={{
            height: 56,
            width: 56,
            border: '2px solid #fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        />

        <Stack flex={1}>
          <Typography
            component={Link}
            href="#!"
            variant="subtitle1"
            color="text.primary"
            fontWeight={700}
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.title}
          </Typography>
        </Stack>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={
            <IconifyIcon
              icon={isActive ? 'gridicons:minus-small' : 'gridicons:plus-small'}
              width={16}
              height={16}
            />
          }
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '20px',
            px: 1.5,
            py: 0.5,
            fontSize: '0.75rem',
            color: '#fff',
            backgroundColor: isActive ? '#2E7D32' : '#C62828',
            '&:hover': {
              backgroundColor: isActive ? '#388E3C' : '#E53935',
            },
          }}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Button>
        </div>
      </Stack>

      {/* Bottom Row (Stats) */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={1.252}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconifyIcon icon="hugeicons:note" color="info.main" />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data.task} Task
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconifyIcon
            icon="material-symbols:star-rate-rounded"
            color="warning.main"
          />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data.rating} ({data.review} Reviews)
          </Typography>
        </Stack>
      </Stack>
    </Card>
  
  );
};

export default MentorCard;
