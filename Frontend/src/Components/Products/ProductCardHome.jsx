import React from "react";
import { Link } from "react-router-dom";

function ProductCardHome({data}) {

  return (
    <Link to={`/product/item/${data?._id}`} className="h-[49vh]  w-[18vw] rounded-md border-[#f7f7f7] flex flex-col items-center group mx-auto ">
      <div className="h-[40vh] rounded-2xl w-full  border-black overflow-hidden">
        <img src={data?.images[0]?.url} className="w-full h-full object-cover object-center" alt="" />
      </div>
      <div className="p-2 w-full">
        <div className="text-lg font-semibold">{data?.name}</div>
        <div className="text-sm text-gray-900 flex justify-between"><div className="">{data?.category}</div><div className="">₹{data?.new_price}</div></div>
      </div>
    </Link>
  );
}

export default ProductCardHome;
