import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProduct } from '../../Context/ProductContext'

function BreadCrump(props) {
  const {ProductId}=useParams()
  const {productData, setProductData}= useProduct()
  const product = productData?.find((e)=>e?._id===ProductId)
  return (
    <>
    {/* <!-- Breadcrumb --> */}
     <div className="container mx-auto px-4 py-4">
    <nav className="text-gray-400">
      <Link to={"/"} className="hover:text-[#2c2c2c]">Home</Link>
      <span className="mx-2">|</span>
      <Link to={"/product"} className="hover:text-[#2c2c2c]">Products</Link>
      <span className="mx-2">|</span>
      <span className="text-[#2c2c2c]">{product?.name}</span>
    </nav>
  </div>


    </>
  )
}

export default BreadCrump