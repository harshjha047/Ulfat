import React from 'react'
import { useProduct } from '../../Context/ProductContext';
import { Link } from 'react-router-dom';

function ProductVariants({data}) {
  const {productData}=useProduct()
  const vg = productData.find((e)=>e?._id==data?.ProductID)
  
  
  return (
    <Link to={`/product/item/${vg._id}`} className='h-[10vh] w-[10vh]  rounded-lg overflow-hidden hover:scale-105 hover:border border-black hover:p-1'>
      <img src={vg?.images[0]?.url} alt="" className='h-full w-full object-cover object-center rounded-md' />
    </Link>
  )
}

export default ProductVariants