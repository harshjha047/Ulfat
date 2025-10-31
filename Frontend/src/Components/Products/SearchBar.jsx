import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useProduct } from '../../Context/ProductContext';

function SearchBar() {
  const [searchBar,setSearchBar]=useState({search:""})
  const {productData,filteredData, setFilteredData}=useProduct()
  const {search}=searchBar
  const handleChange=(e)=>{
    const {name, value}=e.target
    setSearchBar({[name]:value})
  }

  useEffect(()=>setFilteredData(productData),[productData])
   useEffect(()=>{
          setFilteredData(
      productData?.filter((e) => {
        return (
          e?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          e?.description?.toLowerCase()?.includes(search?.toLowerCase()) ||
          e?.category?.toLowerCase()?.includes(search?.toLowerCase()) 
        )
      })
    );
  },[search])
  useEffect(()=>setFilteredData(productData),[])
  return (
    <div className='flex justify-center items-center'>
        <form action="" className=' border-black gap-1 p-[2px] flex justify-evenly rounded-full bg-[white]'>
            <input type="text" name='search' value={search} onChange={handleChange} className=' border text-sm p-[6px] px-3 rounded-full outline-none' placeholder='Search'/>
            <button type='submit' className=' border p-1 px-2 rounded-full  bg-white text-base'><IoSearch/></button>
        </form>
    </div>
  )
}

export default SearchBar