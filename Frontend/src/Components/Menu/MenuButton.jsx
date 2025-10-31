import React from 'react'
import { Link } from 'react-router-dom'
import { useHome } from '../../Context/HomeContext'

function MenuButton({path,name}) {
    const {menu,setMenu}=useHome()
  return (
            <Link to={path} onClick={()=>{setMenu(false)}} className="w-[100%] sm:w-[20vw] lg:w-[20vw] rounded-lg flex justify-center text-[#808080] hover:shadow-lg hover:scale-105 hover:text-[#555555] items-center text-xl font-semibold m-auto border border-[#929292] py-3 sm:h-[23vh]  lg:h-[23vh]"> {name}</Link>


  )
}

export default MenuButton