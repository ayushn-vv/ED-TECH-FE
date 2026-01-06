/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { API_URL, REQUEST_METHOD } from '../../api/constants';
import LoadingButton from '../../components/CustomButton/loadingButton';
// import Typography from 'src/components/Typography';
import CustomForm from '../../components/form';
import { requiredField } from '../../lib/constants';

import { UI_ROUTES, navigateTo } from '../../lib/constants.jsx';
import { triggerEvents, verticalScale } from '../../lib/utils';
// import {
//   assistantRoutes,
//   clinicAdminRoutes,
//   patientRoutes,
//   practitionerRoutes,
//   superAdminRoutes,
// } from 'src/routes';
import { loggedInUserRoutes } from '../../routes';
import { USER_LOGIN } from '../../store/types';
import palette from '../../theme/palette.ts';
import useCRUD from '../../../hooks/useCRUD';

export const loginFormGroups = [
  {
    inputType: 'text',
    type: 'email',
    name: 'email',
    textLabel: 'E-Mail',
    required: requiredField,
    gridProps: { md: 12 },
    containerStyle: { marginBottom: '1.875rem' },
  },
  {
    inputType: 'text',
    type: 'password',
    name: 'password',
    textLabel: 'Password',
    required: requiredField,
    pattern: {
      value: '',
      message: '',
    },
    gridProps: { md: 12 },
    containerStyle: { marginBottom: '1.875rem' },
  },
];

// const handleResponseModification = (data) => {
//   const accessToken = get(data, 'tokens.access.token', '');
//   const refreshToken = get(data, 'tokens.refresh.token', '');
//   localStorage.setItem('token', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);
// };

// let selectedRole;
const LoginForm = () => {
  // const {selectedRole:selectedRoleFromContianer}=props||{}
  const navigate = useNavigate();
  const location = useLocation();
  // const [selectRole, setSelectRole] = useState(false);
  // console.log("🚀 ~ LoginForm ~ selectRole:", selectRole)
  // const [userRoles, setUserRoles] = useState([]);

  const [response, , loading, callLoginAPI] = useCRUD({
    id: USER_LOGIN,
    url: API_URL.login,
  });

  const [, , , callRoleAPI] = useCRUD({
    id: `${USER_LOGIN}`,
    url: API_URL.users,
    type: REQUEST_METHOD.get,
  });

  useEffect(() => {
    if (response) {
      callRoleAPI({}, `/${response?.user?.id}?role=${response?.user?.roles?.code}`);
    }
  }, [response, callRoleAPI]);

  // const getAllowedRoute = (role, path) => {
  //   const tempPath = path.split('/');
  //   let allowedRoute = false;
  //   if (role === roleTypes.superAdmin) {
  //     allowedRoute = superAdminRoutes.includes(`/${tempPath?.[1]}`);
  //   } else if (role === roleTypes.patient) {
  //     allowedRoute = patientRoutes.includes(`/${tempPath?.[1]}`);
  //   } else if (role === roleTypes.clinicAdmin) {
  //     allowedRoute = clinicAdminRoutes.includes(`/${tempPath?.[1]}`);
  //   } else if (role === roleTypes.practitioner) {
  //     allowedRoute = practitionerRoutes.includes(`/${tempPath?.[1]}`);
  //   } else {
  //     allowedRoute = assistantRoutes.includes(`/${tempPath?.[1]}`);
  //   }

  //   return allowedRoute;
  // };
  const getAllowedRoute = (path) => {
    const tempPath = path.split('/');
    let allowedRoute = loggedInUserRoutes.includes(`/${tempPath?.[1]}`);
    return allowedRoute;
  };

  const handleNavigation = () => {
    let route = UI_ROUTES.dashboard;
    const searchParams = new URLSearchParams(location.search);
    const redirectionURL = searchParams.get('redirectionURL');
    if (redirectionURL) {
      const allowedRoute = getAllowedRoute(redirectionURL);
      if (allowedRoute) route = redirectionURL;
    }
    navigate(route);
  };

  const form = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (response) {
      if (response.error) {
        triggerEvents('showSnackbar', {
          message: response?.message,
          severity: 'error',
        });
        return;
      }
      // const user = response?.user;
      handleNavigation();
    }
  }, [response]);

  const { handleSubmit } = form;

  const handleLogin = useCallback(
    (data) => {
      console.log('🚀 ~  ~ data:', data);
      const userCred = {
        email: data.email,
        password: data.password,
        // role:selectedRoleFromContianer
      };
      const { email, password } = userCred;

      if (email && password) {
        callLoginAPI({
          data: userCred,
        });
      }
    },
    [callLoginAPI],
  );

  const handleEnterKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      document.getElementById('submit-button')?.click();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', handleEnterKeyPress);
    return () => {
      window.removeEventListener('keypress', handleEnterKeyPress);
    };
  }, []);

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomForm
              formGroups={loginFormGroups}
              columnsPerRow={1}
              form={form}
              gridGap={verticalScale(3)}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                mb: verticalScale(5),
                fontSize: '.875rem',
                mt: verticalScale(0.7),
              }}
            >
              <Link
                style={{
                  color: palette.grey[500],
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                to={navigateTo(UI_ROUTES.forgotpassword)}
              >
                Forgot password?
              </Link>
            </Box>
            <LoadingButton
              id="submit-button"
              fullWidth
              size="medium"
              type="submit"
              loading={loading}
              onClick={handleSubmit(handleLogin)}
              label="Sign in"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginForm;
