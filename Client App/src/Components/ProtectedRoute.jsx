import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UserContext from "../services/UserContext";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  const { location } = useLocation();

  if (user.authorized) return <Outlet />;
  else return <Navigate to="/Login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
