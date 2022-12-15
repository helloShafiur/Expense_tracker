import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const userLogin = useSelector((state) => state?.users?.userAuth);
  return (
    userLogin ? <Outlet/> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
