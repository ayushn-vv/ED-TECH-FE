import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Activity from 'components/sections/dashboard/activity';
import TaskToday from 'components/sections/dashboard/task-today';
import Newtaskone from 'components/sections/dashboard/task-today/newtaskone';
import RunningTask from 'components/sections/dashboard/running-task';
import UpcomingTask from 'components/sections/dashboard/upcoming-task';
import WeekCalendar from 'components/sections/dashboard/week-calendar';
import TaskOverview from 'components/sections/dashboard/task-overview';
import MonthlyMentors from 'components/sections/dashboard/monthly-mentors';
// import Footer from 'components/common/Footer';

const Dashboard = () => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 90px)', // accounts for topbar height
        bgcolor: 'background.default',
        gap: 0, // ✅ ensure no gap between left and right
      }}
    >
      {/* === Left Main Section === */}
      <Stack
        flexGrow={1}
        p={{ xs: 2.15, sm: 1.75 }}
        spacing={3.15}
        direction="column"
        sx={{
          width: { xs: '100%', md: 'calc(100% - 41%)' }, // ✅ match right box width
          overflow: 'hidden',
        }}
      >
        {/* ⏱ Running Task + Activity Section */}
        <Stack
          width="100%"
          // height="200px"
          spacing={3.15}
          direction={{ xs: 'column', sm: 'row', md: 'column', xl: 'row' }}
        >
          <RunningTask />
        </Stack>

        <Activity />
        {/* 👩‍🏫 Mentors & Overview */}
        <MonthlyMentors />
        <UpcomingTask />
        <TaskOverview />

        {/* 🦶 Footer (Desktop only) */}
        {/* <Box display={{ xs: 'none', md: 'block' }} mt="auto">
          <Footer />
        </Box> */}
      </Stack>

      {/* === Right Sidebar Section === */}
      <Box
        width={{ xs: '100%', md: '40%' }}
        height={{ xs: 'auto', md: 'calc(100vh - 90px)' }}
        // bgcolor="info"
        position={{ md: 'sticky' }}
        top={90}
        sx={{
          backgroundColor:'#d3dadaff',
          overflowY: 'auto',
          borderLeft: { md: '1px solid rgba(0,0,0,0.08)' },
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(37, 31, 31, 0.25)',
            borderRadius: 3,
            visibility: 'hidden',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            visibility: 'visible',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Stack p={1.6} spacing={2.65} width="100%" style={{ backgroundColor: '#d2d7da' }}>
          <WeekCalendar />
          <TaskToday />
          <Newtaskone />
        </Stack>

        {/* 🦶 Footer (Mobile only) */}
        {/* <Box display={{ xs: 'block', md: 'none' }}>
          <Footer />
        </Box> */}
      </Box>
    </Stack>
  );
};

export default Dashboard;
