import { useState, PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Sidebar from 'layouts/main-layout/sidebar';
import Topbar from 'layouts/main-layout/topbar';
// import Footer from 'components/common/Footer';
// import { Box } from '@mui/material';

const MainLayout = ({ children }: PropsWithChildren) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  return (
    <Stack direction="row" width="100%" minHeight="100vh">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setIsClosing={setIsClosing} />

      {/* Main Content */}
      <Stack
        component="main"
        direction="column"
        flexGrow={1}
        width={{ xs: '100%', lg: 'calc(100% - 260px)' }}
        minHeight="100vh"
        sx={{
          backgroundColor: '#f8f9fb',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Topbar isClosing={isClosing} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Stack flexGrow={1} p={0} pl={1.65}>
          {children}
        </Stack>
      </Stack>
      {/* <Box display={{ xs: 'block', md: 'none' }}>
        <Footer />
      </Box> */}
    </Stack>
  );
};

export default MainLayout;
