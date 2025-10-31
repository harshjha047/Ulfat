import React, { useState } from 'react'
import { useProduct } from '../../Context/ProductContext'
import { useParams } from 'react-router-dom'

function ProductDetailsTabs() {
  const [tog, setTog] = useState(true)
    const {ProductId}=useParams()
  const {productData, setProductData}= useProduct()
  const product = productData?.find((e)=>e?._id===ProductId)

  return (
        <div className="mt-16">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button onClick={()=>{setTog(true)}}  className={`py-2 px-1 border-b-2 ${tog?"border-blue-500 text-blue-500 font-medium":"border-transparent text-gray-700"} `}>Description</button>
          <button onClick={()=>{setTog(false)}} className={`py-2 px-1 border-b-2 ${tog?"border-transparent text-gray-700":"border-blue-500 text-blue-500 font-medium"}`}>Reviews</button>
        </nav>
      </div>
      {tog?<div className="py-8">
        <div className="text-gray-600 space-y-4">
          <p>{product?.description}</p>
        </div>
      </div>: <div className="py-8">
        {/* <div className="text-gray-300 space-y-4">
          {getProfileData &&  <ReviewInput id={ProductId}/>  }
          {product?.reviews?.map((e,i)=>
          <ReviewOutput data={{e,i,ProductId}}/>

          )}
        </div> */}
      </div>}
      
     
      </div>
  )
}

export default ProductDetailsTabs