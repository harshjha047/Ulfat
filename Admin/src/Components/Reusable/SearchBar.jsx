import React from 'react'
import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <div className='w-full relative flex items-center'>
        <input type="text" className='w-full h-full p-2 px-4 border outline-none rounded-full ' placeholder='Search'/>
        <div className=" absolute right-1 text-lg p-2 "><IoSearch/></div>
    </div>
  )
}

export default SearchBar