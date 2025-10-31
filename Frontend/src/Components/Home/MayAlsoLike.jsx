import React, { useEffect, useState } from 'react'
import ProductCardHome from '../Products/ProductCardHome'
import { useProduct } from '../../Context/ProductContext'

function MayAlsoLike() {
  const {productData,FetchProductsData}=useProduct()

  return (
    <div className=' w-full border-black flex justify-between items-center flex-col'>
              <div className="w-[97%] text-2xl font-semibold mb-12 sego"><h1>You May Also Like</h1></div>
        <div className="w-[97%] border-black grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {productData?.slice(-4)?.map((e,i)=> <ProductCardHome key={i} data={e} />)}
        </div>
        
    </div>
  )
}

export default MayAlsoLike