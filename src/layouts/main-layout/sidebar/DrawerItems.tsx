import sitemap from 'routes/sitemap';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CollapseListItem from './list-items/CollapseListItem';
import ListItem from './list-items/ListItem';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/Logo.png';
// import FooterImg from 'assets/images/helpCenter.png';

const DrawerItems = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #abb4b5ff 0%, #f1f5f5ff 50%, #85d6dbff 100%)',
        height: '100%',
      }}
    >
      <Stack
        position="sticky"
        top={0}
        pt={1.4}
        pb={2.1}
        alignItems="center"
        bgcolor="info.lighter"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          {/* <Image src={LogoImg} alt="logo" height={40} width={40} sx={{ mr: 1.25 }} /> */}
          <Typography variant="h2" color="text.primary" letterSpacing={1}>
            ED-TECH
          </Typography>
        </ButtonBase>
      </Stack>

      <List component="nav" sx={{ mt: 4, mb: 15, px: 0, marginLeft: 0, marginRight: 0 }}>
        {sitemap.map((route) =>
          route.items ? (
            <CollapseListItem key={route.id} {...route} />
          ) : (
            <ListItem key={route.id} {...route} path={route.path ?? ''} />
          ),
        )}
      </List>

      
    </div>
  );
};

export default DrawerItems;
