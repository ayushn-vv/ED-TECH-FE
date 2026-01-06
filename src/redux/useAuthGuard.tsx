import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    // If no token -> redirect to signin
    if (!token || !isAuthenticated) {
      navigate('/signin', { state: { from: location.pathname } });
    }
  }, [token, isAuthenticated, navigate, location]);
};
