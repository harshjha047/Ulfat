import React from "react";
import ProductCard from "../Products/ProductCard";
import ProductCardHome from "../Products/ProductCardHome";
import banner from "../../../media/newbanner.jpg"
import { useProduct } from "../../Context/ProductContext";

function Shop() {
  const {productData}=useProduct()
  const a = productData?.find((e)=>e._id == "6902fd9f0edc3f4030993dff")
  const b = productData?.find((e)=>e._id == "6903015b0edc3f4030993e4b")
  const c = productData?.find((e)=>e._id == "6903023b0edc3f4030993e8d")
  const d = productData?.find((e)=>e._id == "6903000b0edc3f4030993e32")
  
  return (
    <div className="h-[120vh] w-full flex flex-col justify-evenly items-center">
      <div className="w-[90%] flex justify-between items-center  text-xl font-semibold sego">
        Special features Ulfat
      </div>
      <div className="w-[97%] flex justify-evenly items-center h-[100vh]">
        <div className="h-full w-[33%]  border-black flex justify-between items-center flex-col">
          <ProductCardHome data={a} />
          <ProductCardHome data={b} />
        </div>
        <div className="h-full w-[33%]  border-black rounded-2xl flex justify-center items-center">
          <div className="h-[95%] w-[95%]  rounded-xl bg-slate-300 bg-center bg-cover border-black"
          style={{backgroundImage:`url("${banner}")`}}
          ></div>
        </div>
        <div className="h-full w-[33%]  border-black flex justify-between items-center flex-col">
          <ProductCardHome data={c} />
          <ProductCardHome data={d} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
