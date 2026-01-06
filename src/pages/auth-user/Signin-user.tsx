// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, ChangeEvent, FormEvent } from 'react';
// import {
//   Link,
//   Stack,
//   Button,
//   Divider,
//   InputAdornment,
//   FormControlLabel,
//   Typography,
//   IconButton,
//   TextField,
//   Checkbox,
//   MenuItem,
// } from '@mui/material';
// import IconifyIcon from 'components/base/IconifyIcon';
// import paths from 'routes/paths';
// import { useAuth } from 'redux/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { notification } from "antd";
// import { AxiosError } from 'axios';

// interface User {
//   email: string;
//   password: string;
//   role: number;
// }

// const Signin = () => {
//   const [user, setUser] = useState<User>({
//     email: '',
//     password: '',
//     role: 1, // ✅ Default USER
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const { signin } = useAuth();
//   const navigate = useNavigate();

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     signin.mutate(
//       {
//         email: user.email,
//         password: user.password,
//         role: user.role, // ✅ send role
//       },
//       {
//         onSuccess: () => {
//           notification.success({
//             message: "Login Successful",
//             description: "Welcome back!",
//           });
//           navigate(paths.dashboard);
//         },
//         onError: (err: AxiosError<any>) => {
//           notification.error({
//             message: "Login Failed",
//             description: err?.response?.data?.message || "Something went wrong",
//           });
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <Typography align="center" variant="h4" fontWeight={700}>
//         Sign In
//       </Typography>
//       <Typography mt={1.5} align="center" variant="body2">
//         Welcome back! Continue with
//       </Typography>

//       {/* Social Login */}
//       <Stack mt={3} spacing={1.75}>
//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<IconifyIcon icon="logos:google-icon" />}
//           sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.dark' } }}
//         >
//           Google
//         </Button>
//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<IconifyIcon icon="logos:apple" />}
//           sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.dark' } }}
//         >
//           Apple
//         </Button>
//       </Stack>

//       <Divider sx={{ my: 4 }}>or Sign in with</Divider>

//       {/* Form */}
//       <Stack component="form" onSubmit={handleSubmit} gap={2}>
//         {/* Role Selection */}
//         <TextField
//           select
//           label="Login as"
//           value={user.role}
//           onChange={(e) =>
//             setUser({ ...user, role: Number(e.target.value) })
//           }
//           variant="filled"
//           fullWidth
//         >
//           <MenuItem value={1}>User</MenuItem>
//           <MenuItem value={2}>Tutor</MenuItem>
//           <MenuItem value={0}>Admin</MenuItem>
//         </TextField>

//         {/* Email */}
//         <TextField
//           name="email"
//           type="email"
//           value={user.email}
//           onChange={handleInputChange}
//           variant="filled"
//           placeholder="Your Email"
//           fullWidth
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconifyIcon icon="hugeicons:mail-at-sign-02" />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Password */}
//         <TextField
//           name="password"
//           type={showPassword ? 'text' : 'password'}
//           value={user.password}
//           onChange={handleInputChange}
//           variant="filled"
//           placeholder="Your Password"
//           fullWidth
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconifyIcon icon="hugeicons:lock-key" />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)}>
//                   <IconifyIcon
//                     icon={showPassword ? 'fluent-mdl2:view' : 'fluent-mdl2:hide-3'}
//                   />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Remember */}
//         <Stack direction="row" justifyContent="space-between">
//           <FormControlLabel
//             control={<Checkbox size="small" />}
//             label="Remember me"
//           />
//           <Link href="#">Forgot password?</Link>
//         </Stack>

//         <Button type="submit" variant="contained" size="large" fullWidth>
//           Sign In
//         </Button>
//       </Stack>

//       <Typography mt={4} align="center" variant="body2">
//         Don&apos;t have an account?{' '}
//         <Link href={paths.authusersignup}>Signup</Link>
//       </Typography>
//     </div>
//   );
// };

// export default Signin;
