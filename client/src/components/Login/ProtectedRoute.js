import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, isLoggedIn }) => {
  return isLoggedIn ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
