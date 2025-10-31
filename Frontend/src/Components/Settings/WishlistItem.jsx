import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../Context/ProductContext";
import { GoHeartFill } from "react-icons/go";
import { useProfile } from "../../Context/ProfileContext";

function WishlistItem({wishId}) {
    const {productData}= useProduct()
        const {getProfileData, addWishlistData, removeWishlistData}=useProfile()
    
    const [data] = productData?.filter((e)=>e?._id===wishId)
  return (
    <div
      className="h-[49vh] border relative w-[18vw] rounded-md border-[#f7f7f7] flex flex-col items-center group mx-auto"
    >
        <button onClick={()=>{removeWishlistData(data?._id)}}
                    className="absolute top-3 right-3 bg-white text-red-500 p-3 rounded-full shadow-lg 
                                opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 
                                transition-all duration-300 hover:text-red-300"
                  >
                    <GoHeartFill />
                  </button>
      <div className="h-[40vh] rounded-2xl w-full border border-black"></div>
      <Link 
      to={`/product/item/${data._id}`}
      className="p-2 w-full">
        <div className="text-lg font-semibold">{data?.name}</div>
        <div className="text-sm text-gray-900 flex justify-between">
          <div className="">{data?.catagory}</div>
          <div className="">{data?.new_price}</div>
        </div>
      </Link>
    </div>
  );
}

export default WishlistItem;
