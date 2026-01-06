/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT, authFailure } from './authRedux';
import apiConnect from './apiConnect';

// ----------------------
// Types
// ----------------------
interface LoginBody {
  email: string;
  password: string;
  // role: number;
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
  role: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: unknown;
  tokens?: {
    access?: { token: string };
    refresh?: { token: string };
  };
}

interface LogoutPayload {
  refreshToken: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();

  // -------------------------
  // SIGNIN
  // -------------------------
  const signin = useMutation<ApiResponse, AxiosError, LoginBody>({
    mutationFn: async (body) => {
      const res = await apiConnect.post<ApiResponse>('auth/login', body);
      return res.data;
    },

    onSuccess: (data) => {
      // 🔥 Store tokens in localStorage
      const accessToken = data?.tokens?.access?.token;
      const refreshToken = data?.tokens?.refresh?.token;

      if (accessToken) localStorage.setItem('access_token', accessToken);
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);

      dispatch(SIGN_IN_SUCCESS(data));
    },

    onError: (error) => {
      dispatch(authFailure(error.response?.data || 'Login failed'));
      console.log('LOGIN ERROR →', error.response?.data);
    },
  });

  // -------------------------
  // SIGNUP
  // -------------------------
  const signup = useMutation<ApiResponse, AxiosError, SignupBody>({
    mutationFn: async (body) => {
      const res = await apiConnect.post('/auth/register', body);
      return res.data;
    },

    onSuccess: (data) => {
      // 🔥 Store tokens after signup too (optional)
      const accessToken = data?.tokens?.access?.token;
      const refreshToken = data?.tokens?.refresh?.token;

      if (accessToken) localStorage.setItem('access_token', accessToken);
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);

      dispatch(SIGN_UP_SUCCESS(data));
    },

    onError: (error) => {
      dispatch(authFailure(error.response?.data || 'Signup failed'));
      console.log('SIGNUP ERROR →', error.response?.data);
    },
  });

  // -------------------------
  // SIGNOUT
  // -------------------------
  const signout = useMutation<ApiResponse, AxiosError, LogoutPayload>({
    mutationFn: async ({ refreshToken }) => {
      const res = await apiConnect.post<ApiResponse>('/auth/logout', { refreshToken });
      return res.data;
    },

    onSuccess: () => {
      // 🧹 Clear localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      dispatch(SIGN_OUT());
    },

    onError: (error) => {
      dispatch(authFailure(error.response?.data || 'Logout failed'));
      console.log('LOGOUT ERROR →', error.response?.data);
    },
  });

  return { signin, signup, signout };
};
