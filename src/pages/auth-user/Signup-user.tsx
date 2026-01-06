// import { useState, ChangeEvent, FormEvent } from 'react';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';

// import IconifyIcon from 'components/base/IconifyIcon';
// import paths from 'routes/paths';
// import { useAuth } from 'redux/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { notification } from 'antd';
// import { AxiosError } from 'axios';

// /* ---------------- TYPES ---------------- */

// interface User {
//   name: string;
//   email: string;
//   password: string;
//   role: number; // 0=Admin, 1=User, 2=Tutor
// }

// /* ---------------- COMPONENT ---------------- */

// const Signup = () => {
//   const [user, setUser] = useState<User>({
//     name: '',
//     email: '',
//     password: '',
//     role: 1, // 👈 Default USER
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   /* ---------------- HANDLERS ---------------- */

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     signup.mutate(
//       {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         role: user.role,
//       },
//       {
//         onSuccess: () => {
//           notification.success({
//             message: 'Signup Successful',
//             description: 'Your account has been created!',
//           });
//           navigate(paths.signin);
//         },
//         onError: (err: AxiosError<any>) => {
//           notification.error({
//             message: 'Signup Failed',
//             description: err?.response?.data?.message || 'Something went wrong',
//           });
//         },
//       }
//     );
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <>
//       <Typography align="center" variant="h4">
//         Sign Up
//       </Typography>

//       <Typography mt={1.5} align="center" variant="body2">
//         Let's join us! Create your account
//       </Typography>

//       <Stack mt={3} spacing={1.75} width={1}>
//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<IconifyIcon icon="logos:google-icon" />}
//           sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.main' } }}
//         >
//           Google
//         </Button>

//         <Button
//           variant="contained"
//           fullWidth
//           startIcon={<IconifyIcon icon="logos:apple" sx={{ mb: 0.5 }} />}
//           sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.main' } }}
//         >
//           Apple
//         </Button>
//       </Stack>

//       <Divider sx={{ my: 4 }}>or Signup with</Divider>

//       <Stack component="form" onSubmit={handleSubmit} gap={2}>
//         {/* NAME */}
//         <TextField
//           name="name"
//           value={user.name}
//           onChange={handleInputChange}
//           variant="filled"
//           placeholder="Your Name"
//           fullWidth
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconifyIcon icon="hugeicons:user-circle-02" />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* EMAIL */}
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

//         {/* ROLE */}
//         <TextField
//           select
//           name="role"
//           value={user.role}
//           onChange={(e) =>
//             setUser({ ...user, role: Number(e.target.value) })
//           }
//           variant="filled"
//           fullWidth
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconifyIcon icon="hugeicons:user-switch" />
//               </InputAdornment>
//             ),
//           }}
//         >
//           <MenuItem value={1}>User</MenuItem>
//           <MenuItem value={2}>Tutor</MenuItem>
//           <MenuItem value={0}>Admin</MenuItem>
//         </TextField>

//         {/* PASSWORD */}
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
//                 <IconButton
//                   onClick={() => setShowPassword(!showPassword)}
//                   edge="end"
//                 >
//                   <IconifyIcon
//                     icon={showPassword ? 'fluent-mdl2:view' : 'fluent-mdl2:hide-3'}
//                   />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 1.5 }}>
//           Sign Up
//         </Button>
//       </Stack>

//       <Typography mt={5} variant="body2" align="center">
//         Already have an account?{' '}
//         <Link href={paths.authusersignin}>Signin</Link>
//       </Typography>
//     </>
//   );
// };

// export default Signup;
