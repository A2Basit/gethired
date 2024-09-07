import { useAuth } from "../context/AuthProvider";
import { useNavigate,Navigate,Outlet,useLocation } from "react-router-dom";

const ProtectedEmployerRoute = () => {
    const {user,userRole,loading} = useAuth();
    const location = useLocation();
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!user || userRole != 'employer') {
        return <Navigate to="/login" state={{from:location.pathname}} />
    }
    return <Outlet />;
};
export default ProtectedEmployerRoute;