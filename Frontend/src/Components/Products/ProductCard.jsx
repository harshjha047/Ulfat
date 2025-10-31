import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../Context/ProfileContext";
import { GoHeart, GoHeartFill } from "react-icons/go";

function ProductCard({ data }) {
  const { getProfileData, addWishlistData, removeWishlistData } = useProfile();
  const exist = getProfileData?.wishlist?.find((e) => e == data?._id);

  return (
    <div className="h-[49vh]  relative border w-[18vw] rounded-md border-[#f7f7f7] flex flex-col items-center group mx-auto">
      {exist ? (
        <button
          onClick={() => {
            removeWishlistData(data?._id);
          }}
          className="absolute top-3 right-3 bg-white text-red-500 p-3 rounded-full shadow-lg 
                        opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 
                        transition-all duration-300 hover:text-red-300"
        >
          <GoHeartFill />
        </button>
      ) : (
        <button
          onClick={() => {
            addWishlistData(data?._id);
          }}
          className="absolute top-3 right-3 bg-white text-red-500 p-3 rounded-full shadow-lg 
                        opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 
                        transition-all duration-300 hover:text-red-300 z-40"
        >
          <GoHeart />
        </button>
      )}
      <div className="h-[40vh] rounded-2xl w-full  overflow-hidden border-black">
        <img src={data?.images[0]?.url} className="w-full h-full object-cover object-center" alt="" />
      </div>
      <Link to={`/product/item/${data._id}`} className="p-2 w-full">
        <div className="text-lg font-semibold">{data?.name}</div>
        <div className="text-sm text-gray-900 flex justify-between">
          <div className="">{data?.category}</div>
          <div className="">{data?.new_price}</div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
