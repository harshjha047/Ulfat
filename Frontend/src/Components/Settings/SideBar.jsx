import React from 'react'
import { Link } from 'react-router-dom'
import { IoHeartOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { PiHandbagLight } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { useAuth } from '../../Context/AuthContext';

function SideBar() {
  const {logout}=useAuth()
  return (
    <div className=' h-full w-full flex flex-col p-2 gap-1'>
        <Link to={"/settings/"} className='border w-full flex items-center p-3 justify-between font-semibold rounded-md hover:shadow'><span>Profile Overview</span><span className=' p-1 text-xl'><FiUser/></span></Link>
        <Link to={"/settings/wishlist"} className='border w-full flex items-center p-3 justify-between font-semibold rounded-md hover:shadow'><span>Wishlist</span><span className=' p-1 text-xl'><IoHeartOutline/></span></Link>
        <Link to={"/settings/addresses"} className='border w-full flex items-center p-3 justify-between font-semibold rounded-md hover:shadow'><span>Addresses</span><span className=' p-1 text-xl'><IoLocationOutline/></span></Link>
        <Link to={"/settings/orders"} className='border w-full flex items-center p-3 justify-between font-semibold rounded-md hover:shadow'><span>Orders</span><span className=' p-1 text-xl'><PiHandbagLight/></span></Link>
        <button onClick={()=>{logout()}} className='border w-full flex items-center p-3 font-semibold bg-[#ff4d4d69] text-white hover:bg-[#ff0000] justify-between rounded-md hover:shadow'><span>Logout</span><span className=' p-1 text-xl'><FiLogOut/></span></button>
    </div>
  )
}

export default SideBar