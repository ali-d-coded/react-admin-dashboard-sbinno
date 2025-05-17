import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../../stores/globalStore";


const PrivateRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
