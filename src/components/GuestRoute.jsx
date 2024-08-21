import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const GuestRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can return a loading indicator here or just return null
    return <div>Loading...</div>;
  }

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
};

export default GuestRoute;
