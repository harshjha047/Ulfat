import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";

const ProtectedWrapper = () => {
  const { getProfileData ,loading} = useAdmin();
  if (loading) {
    return (
   console.log("Loading...")
    );
  }
  if (!getProfileData) {
    return <Navigate to="/login" replace />;
  }
  return (<>
  <Outlet />
    </>
  );
};

export default ProtectedWrapper;
