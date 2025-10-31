import React from 'react'
import { useAdmin } from '../../Context/AdminContext';
import { Link } from 'react-router-dom';

function SideBar() {
      const { getProfileData } = useAdmin();
    
  return (
    <div className='h-full w-full flex flex-col justify-between p-2'>
        <div className="w-full  h-[85%] flex flex-col">
            <Link className='w-full py-1 font-semibold border-b hover:text-lg' to={"/dashboard"}>Overview</Link>
            <Link className='w-full py-1 font-semibold border-b hover:text-lg' to={"/dashboard/users"}>Users</Link>
            <Link className='w-full py-1 font-semibold border-b hover:text-lg' to={"/dashboard/products"}>Products</Link>
            <Link className='w-full py-1 font-semibold border-b hover:text-lg' to={"/dashboard/orders"}>Orders</Link>
        </div>
        <div className="w-full border rounded-xl justify-between items-center flex p-1 px-2">
            <div className=" ">
                <div className="text-lg font-semibold">{getProfileData.name}</div>
                <div className="text-sm">{getProfileData.role}</div>
            </div>
            <div className="rounded-full h-[8vh] w-[8vh]  bg-cover bg-center"
            style={{backgroundImage:`url('${getProfileData.profilePhoto}')`}}
            ></div>
        </div>
    </div>
  )
}

export default SideBar