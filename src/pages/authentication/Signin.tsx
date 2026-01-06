import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import { useAuth } from 'redux/useAuth';
import { AxiosError } from 'axios';

// ----------------------
// TYPES
// ----------------------

interface UserForm {
  email: string;
  password: string;
  role?: number; // 0=Admin, 1=User, 2=Tutor
}
interface ApiErrorResponse {
  message?: string;
}
const Signin = () => {
  const [user, setUser] = useState<UserForm>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signin.mutate(
      { email: user.email, password: user.password },
      {
        onSuccess: () => {
          notification.success({
            message: 'Login Successful',
            description: 'Welcome back!',
          });

          // 🔐 ROLE-BASED REDIRECT (FROM DB)
          if (user.role === 0) {
            navigate(paths.dashboard); // admin
          } else if (user.role === 1) {
            navigate(paths.userDashboard); // user
          } else {
            navigate('/');
          }
        },

       onError: (err: AxiosError<unknown>) => {
        const apiError = err.response?.data as ApiErrorResponse | undefined;
      
        notification.error({
          message: 'Signup Failed',
          description: apiError?.message || 'Something went wrong',
        });
      },
      }
    );
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Sign In
      </Typography>
         <Stack mt={3} spacing={1.75} width={1}>
               <Button
                 variant="contained"
                 fullWidth
                 startIcon={<IconifyIcon icon="logos:google-icon" />}
                 sx={{ bgcolor: 'info.main',color: '#141212ff', '&:hover': { bgcolor: 'info.main', color: '#116969ff' } }}
               >
                 Google
               </Button>
       
               <Button
                 variant="contained"
                 fullWidth
                 startIcon={<IconifyIcon icon="logos:apple" sx={{ mb: 0.5 }} />}
                   sx={{ bgcolor: 'info.main',color: '#141212ff', '&:hover': { bgcolor: 'info.main', color: '#116969ff' } }}
               >
                 Apple
               </Button>
             </Stack>
      <Divider sx={{ my: 4 }}>or Sign in with</Divider>

      <Stack component="form" onSubmit={handleSubmit} gap={2}>
        <TextField
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          variant="filled"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:mail-at-sign-02" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          placeholder="Your Password"
          variant="filled"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:lock-key" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  <IconifyIcon
                    icon={
                      showPassword
                        ? 'fluent-mdl2:view'
                        : 'fluent-mdl2:hide-3'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Remember me"
        />

        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </Stack>

      <Typography mt={3} align="center">
        Don&apos;t have an account?{' '}
        <Link href={paths.signup}>Signup</Link>
      </Typography>
    </>
  );
};

export default Signin;
