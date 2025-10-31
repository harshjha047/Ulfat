import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../Context/AdminContext'

function ProductCard({data}) {
  const {deleteProduct}=useAdmin()
  const navigate=useNavigate()
  return (
    <div className='w-full border h-[25vh] px-2 flex flex-col justify-between rounded-lg shadow'>
      <div className="flex justify-between ">
        <div className="text-xs font-medium text-zinc-500">#{data?._id}</div>
        <div className=""></div>
      </div>
      <div className="flex gap-2">
        <div className="h-full w-[6vw] border">
          <img src={data?.images[0]?.url} className='h-full w-full object-cover object-center' alt={data?.images[0]?.alt} />
        </div>
        <div className="">
          <h2>{data.name}</h2>
          <p className="text-xs font-medium text-zinc-700">New Price: {data?.new_price} | Old Price: {data?.old_price}</p>
          <p className="text-xs font-medium text-zinc-700">Images: {data?.images?.length} | Varieties: {data?.variants?.length} | Reviews: {data?.reviews?.length} | Catagory: {data?.category} </p>
          <div className="py-2">
            <button className='border text-sm px-3 py-1 font-medium bg-green-400 hover:bg-green-600 text-white' onClick={()=>{navigate(`/dashboard/products/${data?._id}`)}}>Edit</button> 
            <button className='border text-sm px-3 py-1 font-medium hover:bg-red-600 bg-red-400 text-white' onClick={()=>deleteProduct(data?._id)}>Delete</button></div>
        </div>
      </div>
      <div className="text-xs font-medium text-zinc-500"> CreatedAt: <span>{data?.createdAt}</span> | UpdatedAt: <span>{data?.updatedAt}</span></div>
    </div>
  )
}

export default ProductCard