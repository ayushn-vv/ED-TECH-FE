import { useLocation, Link as RouterLink } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';

interface MenuItem {
  subheader: string;
  icon?: string;
  path: string;
}

const ListItem = ({ subheader, icon, path }: MenuItem) => {
  const location = useLocation();

  // Detect if current URL path matches this menu item's path
  const isActive = location.pathname === path;

  return (
    <ListItemButton
      component={RouterLink}
      to={path}
      sx={{
        mb: 1.5,
        borderRadius: 2,
        mx: 1.5,
        py: 0.55,
        backgroundColor: isActive ? '#1d1f20a8' : 'transparent', // Highlight selected
        color: isActive ? '#fff' : 'text.primary',
        boxShadow: isActive ? '0 2px 8px rgba(25,118,210,0.3)' : 'none',
        transition: 'all 0.1s ease',
        '&:hover': {
          backgroundColor: isActive ? '#46b0beff' : 'rgba(25,118,210,0.08)',
          color: '#fff',
        },
      }}
    >
      {icon && (
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive ? '#fff' : 'text.secondary',
          }}
        >
          <IconifyIcon icon={icon} fontSize="h5.fontSize" />
        </ListItemIcon>
      )}

      <ListItemText
        primary={subheader}
        sx={{
          '& .MuiListItemText-primary': {
            color: isActive ? '#fff' : 'text.primary',
            fontWeight: isActive ? 600 : 400,
            letterSpacing: 0.3,
          },
        }}
      />
    </ListItemButton>
  );
};

export default ListItem;
