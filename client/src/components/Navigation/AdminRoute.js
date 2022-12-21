// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const userLogin = useSelector((state) => state?.users?.userAuth);
  return userLogin?.isAdmin ? <Outlet /> : <Navigate to="/not-found" />;
};

export default AdminRoute;
