import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";

const PublicWrapper = () => {
  const { getProfileData ,loading} = useAdmin();
  if (loading) {
    return (
   console.log("Loading...")
    );
  }
  if (getProfileData) {
    return <Navigate to="/dashboard" replace />;
  }
  return (<>
  <Outlet />
    </>
  );
};

export default PublicWrapper;
