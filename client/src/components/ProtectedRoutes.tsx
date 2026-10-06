import authStore from "../store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = authStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
