import React from "react";
import { useAdmin } from "../Context/AdminContext";
import Unauthorized from "../Components/Users/Unauthorized";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Reusable/SideBar";
import SearchBar from "../Components/Reusable/SearchBar";

function Dashboard() {
  const { getProfileData } = useAdmin();
  return (
    <>
      {getProfileData.role != "admin" ? (
        <Unauthorized />
      ) : (
        <>
          <div className="flex justify-center items-center gap-2">
            <div className="flex-[1] border h-screen">
              <SideBar />
            </div>
            <div className="flex-[3] border h-screen flex flex-col">
          
              <div className="border w-full h-[10vh] flex justify-center items-center p-2">
                <SearchBar />
              </div>
              <div className="border w-full h-[90%] p-2">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
