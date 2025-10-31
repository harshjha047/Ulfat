import React from 'react'
import ProductDetailsTabs from './ProductDetailsTabs'
import ProductDetailsInformation from './ProductDetailsInformation'

function ProductDetail() {
  return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailsInformation/>

    {/* <!-- Product Details Tabs --> */}
            <ProductDetailsTabs/>
    </div>
  )
}

export default ProductDetail