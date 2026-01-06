import { Navigate } from "react-router-dom";
import paths from "./paths";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: number[]; // 0 = admin, 1 = user
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const refreshToken = localStorage.getItem("refresh_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 🔐 Not logged in
  if (!refreshToken) {
    return <Navigate to={paths.signin} replace />;
  }
  console.log("User Role:", user?.role);
  // 🛑 Role-based restriction
 if (
  allowedRoles &&
  (!user || !allowedRoles.includes(user.role))
) {
  return <Navigate to={user.role === 0 ? "/" : "/user"} replace />;
}


  return children;
};

export default ProtectedRoute;
