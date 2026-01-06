// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
// import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
// import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/Logo.png';
// import LanguageSelect from './LanguageSelect';
import ProfileMenu from './ProfileMenu';

interface TopbarProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ xs: 2, sm: 3.5 }}
      height={72}
      bgcolor="background.paper"
      borderBottom="1px solid rgba(0,0,0,0.08)"
      position="sticky"
      top={0}
      zIndex={1200}
      sx={{
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* === Left Section: Logo + Drawer Toggle + Search === */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 1.5, sm: 2.5 }}
        flexGrow={1}
      >
        {/* 🪟 Mobile Menu Button */}
        <IconButton
          onClick={handleDrawerToggle}
          color="inherit"
          sx={{ display: { xs: 'flex', lg: 'none' } }}
        >
          <IconifyIcon icon="clarity:menu-line" width={22} />
        </IconButton>

        {/* 🔷 Logo */}
        {/* <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ lineHeight: 0 }}
        >
          <Image src={LogoImg} alt="logo" height={48} width={48} />
        </ButtonBase> */}

        {/* 🔍 Search Bar (visible on md+) */}
        <TextField
          variant="outlined"
          placeholder="Search tasks..."
          size="small"
          sx={{
            width: { xs: 0, sm: 240, md: 320 },
            display: { xs: 'none', sm: 'flex' },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'background.default',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon="mynaui:search" width={20} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* === Right Section: Language, Notifications, Profile === */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 1, sm: 2 }}
      >
        {/* <LanguageSelect /> */}

        {/* 🔔 Notification Icon */}
        <IconButton size="large" color="inherit">
          <Badge color="error" variant="dot" overlap="circular">
            <IconifyIcon icon="solar:bell-outline" width={22} />
          </Badge>
        </IconButton>

        {/* 👤 Profile Dropdown */}
        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;
