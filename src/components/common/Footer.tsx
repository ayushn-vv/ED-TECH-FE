import { Stack, Typography, IconButton, Link } from '@mui/material';
import { Github, Linkedin, Twitter } from 'lucide-react'; // using lucide-react icons

const Footer = () => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      spacing={1.5}
      sx={{
        px: 2,
        py: 2,
        mt: 2,
        background: 'linear-gradient(90deg, #f5f7fa, #e4ebf1)',
        borderTop: '1px solid #ddd',
        borderRadius: { xs: '0', md: '0 0 8px 8px' },
      }}
    >
      {/* Left side text */}
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight={500}
        textAlign={{ xs: 'center', md: 'left' }}
      >
        All rights reserved &copy; 2025&nbsp;
      </Typography>

      {/* Right side social icons */}
      <Stack direction="row" spacing={1}>
        <Link href="https://github.com/" target="_blank" rel="noopener">
          <IconButton color="inherit" size="small">
            <Github size={18} />
          </IconButton>
        </Link>
        <Link href="https://linkedin.com/" target="_blank" rel="noopener">
          <IconButton color="inherit" size="small">
            <Linkedin size={18} />
          </IconButton>
        </Link>
        <Link href="https://twitter.com/" target="_blank" rel="noopener">
          <IconButton color="inherit" size="small">
            <Twitter size={18} />
          </IconButton>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Footer;
