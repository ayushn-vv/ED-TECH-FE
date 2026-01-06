import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (refreshToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
