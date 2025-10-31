import React from 'react'
import CartItrm from '../Components/Cart/CartItem'
import CartSummary from '../Components/Cart/CartSummary'
import { useCart } from '../Context/CartContext';

function MyBag() {
    let { cartData } =useCart();
  
  return (
    <div className='w-full  flex flex-col'>
        <div className="h-[12vh] w-full  "></div>
        <div className="w-full flex justify-center items-center text-2xl sego font-semibold">My Bag</div>
        <div className=" mt-4 flex mx-auto border-black  w-[97%] ">
            <div className="flex-[2] p-2 px-7">
              <div className="">({cartData.length}) Items</div>
              <div className=" mt-4 ">
                <div className="lg:w-full">
              {cartData?.map((e,i) => <CartItrm data={e} key={i}/>)}
              </div>
              </div>
              </div>
            <div className=" flex-1 p-3"><CartSummary/></div>
        </div>
    </div>
  )
}

export default MyBag