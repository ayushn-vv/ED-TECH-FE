import { useState } from 'react';
import { Avatar3 } from 'data/images';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import { useDispatch } from 'react-redux';
import { SIGN_OUT } from 'redux/authRedux';
import { useAuth } from '../../../redux/useAuth'; // <-- your logout mutation/hook
import { useNavigate } from 'react-router-dom';
import paths, { rootPaths } from 'routes/paths';
import { notification } from 'antd';
// import { AxiosError } from 'axios';
interface MenuItems {
  id: number;
  title: string;
  icon: string;
}

const menuItems: MenuItems[] = [
  { id: 1, title: 'View Profile', icon: 'hugeicons:user-circle-02' },
  { id: 2, title: 'Account Settings', icon: 'hugeicons:account-setting-02' },
  { id: 3, title: 'Notifications', icon: 'solar:bell-outline' },
  { id: 4, title: 'Switch Account', icon: 'hugeicons:user-switch' },
  { id: 5, title: 'Help Center', icon: 'carbon:help' },
  { id: 6, title: 'Logout', icon: 'hugeicons:logout-03' },
];

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signout } = useAuth();
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // 🔥 Logout Handler
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      console.log('Refresh Token:', refreshToken);
      if (!refreshToken) {
        console.warn('No refresh token found, forcing logout');
        dispatch(SIGN_OUT());

        return;
      }

      await signout.mutateAsync(
        { refreshToken },
        {
          onSuccess: () => {
            notification.success({
              message: 'Signout Successful',
              description: 'Your account  log out !',
            });

            navigate(`${rootPaths.authRoot}/${paths.signin}`);
          },
          onError: () => {
            notification.error({
              message: 'Signup Failed',
              description: 'Something went wrong',
            });
          },
        },
      );

      // localStorage.removeItem("refreshToken");
      // navigate(paths.signin);
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

  return (
    <>
      <ButtonBase
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <Avatar
          src={Avatar3}
          sx={{
            height: 48,
            width: 48,
            bgcolor: 'primary.main',
          }}
        />
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': { p: 0, width: 230 },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.light' } }}>
            <Avatar src={Avatar3} sx={{ mr: 1, height: 42, width: 42 }} />
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                Alex Stanton
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400}>
                alex@example.com
              </Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box p={1}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                handleProfileMenuClose();

                if (item.title === 'Logout') {
                  handleLogout(); // 🔥 Trigger logout
                }
              }}
              sx={{ py: 1 }}
            >
              <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {item.title}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
