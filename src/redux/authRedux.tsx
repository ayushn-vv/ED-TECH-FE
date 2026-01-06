import { createSlice } from '@reduxjs/toolkit';

// Utility functions for Local Storage
const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Check if token is expired
const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

// Get token from localStorage
const getStoredToken = () => {
  const token = localStorage.getItem('token');
  return token && !isTokenExpired(token) ? token : null;
};

// Get stored user and ensure token consistency
const getStoredUser = () => {
  const user = loadFromLocalStorage('user');
  const token = getStoredToken();

  if (user && token) {
    return { ...user, token };
  }
  return null;
};

const initialState = {
  user: getStoredUser(),
  isAuthenticated: !!getStoredToken(),
  role: localStorage.getItem('role'),
  token: getStoredToken(),
  error: null,
  mfaToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SIGN_IN_SUCCESS: (state, action) => {
      const { user, token } = action.payload;

      // Store token separately and in user object
      localStorage.setItem('token', token);
      // localStorage.setItem('role', user.role || '');

      const userWithToken = { ...user, token };
      saveToLocalStorage('user', userWithToken);

      state.user = userWithToken;
      state.token = token;
      state.isAuthenticated = true;
      // state.role = user.role || null;
      state.error = null;
    },

    SIGN_UP_SUCCESS: (state, action) => {
      const { user, token } = action.payload;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role || '');

        const userWithToken = { ...user, token };
        saveToLocalStorage('user', userWithToken);

        state.user = userWithToken;
        state.token = token;
        // state.role = user.role || null;
        console.log('---:', user);
        console.log('Login payload:', action.payload);
        console.log('User object:', action.payload.user);
        // console.log('User role:', action.payload.user?.role);
      } else {
        state.user = user;
      }

      state.isAuthenticated = true;
      state.error = null;
    },

    SIGN_OUT: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.error = null;
      state.mfaToken = null;

      // Clear localStorage
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
      removeFromLocalStorage('role');
    },

    UPDATE_USER: (state, action) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...action.payload };
        saveToLocalStorage('user', updatedUser);
        state.user = updatedUser;

        // Update role if it changed
        if (action.payload.role) {
          localStorage.setItem('role', action.payload.role);
          state.role = action.payload.role;
        }
      } else {
        console.error('User not found in state. Cannot update.');
      }
    },

    authFailure: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.mfaToken = null;

      // Clear localStorage on auth failure
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
      removeFromLocalStorage('role');
    },

    // Clear error action (useful for UI)
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_OUT, UPDATE_USER, authFailure, clearError } = authSlice.actions;

export default authSlice.reducer;
