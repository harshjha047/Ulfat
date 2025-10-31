import React from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { SlHandbag } from "react-icons/sl";
import SearchBar from "../Products/SearchBar";
import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { useProfile } from "../../Context/ProfileContext";
import { useHome } from "../../Context/HomeContext";


function MainNavigationBar() {
  const {getProfileData}=useProfile()
  const {menu,setMenu}=useHome()
  

  return (
    <div className="w-full  h-[12vh] flex items-center justify-center fixed ">
      <div className=" w-[97%] flex justify-between items-center">
        <div className="flex gap-2 items-center rounded-full  py-1">
          <div className="text-2xl bg-white p-2 rounded-full" onClick={()=>{setMenu(true)}}><HiMiniBars3CenterLeft /></div>
          <Link to={"/"} className="text-sm font-medium text-gray-800 bg-white py-2 px-3 rounded-full">Home</Link>
          <Link to={"/product"} className="text-sm font-medium text-gray-800 bg-white py-2 px-3 rounded-full">Products</Link>
        </div>
        <div className="flex gap-3 items-center">
          {<SearchBar/>}
          <Link to={getProfileData?"/cart":"/login"} className=" border text-xl p-2 border-[#f1f1f1] rounded-full bg-white">
          {getProfileData?<PiHandbagSimpleLight  />:<LuLogIn/>}</Link></div>
      </div>
    </div>
  );
}

export default MainNavigationBar;
