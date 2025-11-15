import React, { useState } from 'react'
import { useAdmin } from '../../Context/AdminContext'
import toast from 'react-hot-toast'

function OrderCard({data}) {
    const init = {
        orderStatus:data?.orderStatus,
    }
    const [change,setChange]=useState(init)

 const {productData,FetchOrdersStatus}=useAdmin()
     const handleChange =(e)=>{
        const {value,name}=e.target
        try{
        FetchOrdersStatus(data._id,{[name]:value})
toast.success("status updated")
        }catch(err){
            console.log(err);
            
        }
        
        
        
    }
    const imagez= productData?.find((e)=> e?._id==data?.items[0]?.productId)
    
  return (
    <div className="border border-[#8f8f8f] shadow rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-400">Order #{data?.paymentInfo?.transactionId}</p>
                <p className="text-[#111] font-medium">Placed on {data?.createdAt.split("T")[0]}</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                <span className="px-3 py-1 bg-red-600 text-[#FFF] rounded-full text-sm">Delete</span>
                <span className="px-3 py-1 bg-green-600 text-[#FFF] rounded-full text-sm">{data?.paymentInfo?.status}</span>
                
                <span className="px-3 py-1 bg-green-600 text-[#FFF] rounded-full text-sm">
                    <select name="orderStatus" id="" onChange={handleChange} className='bg-transparent outline-none border-none'>
                        <option className='text-black' value={data?.orderStatus}>{data?.orderStatus}</option>
                        <option className='text-black' value="Processing">Processing</option>
                        <option className='text-black' value="Shipped">Shipped</option>
                        <option className='text-black' value="Delivered">Delivered</option>
                        <option className='text-black' value="Cancelled">Cancelled</option>
                    </select>
                </span>
                <p className="text-[#111] font-bold">₹{data?.totalAmount}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <img src={imagez?.images[0]?.url} alt={imagez?.images[0]?.alt} className="w-16 h-16 object-cover rounded-lg"/>
              <div className="flex-1">
                <p className="text-[#111] font-medium">{data?.items[0]?.productName}</p>
                <p className="text-gray-400 text-sm">{data?.items?.length > 1 && `+ ${data?.items?.length-1} more item`}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-[#fff] rounded-lg hover:bg-blue-700 text-sm">View Details</button>
              </div>
            </div>
          </div>
  )
}

export default OrderCard