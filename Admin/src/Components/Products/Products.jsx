import React from "react";
import { useAdmin } from "../../Context/AdminContext";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function Products() {
  const { productData } = useAdmin();
  const navigate=useNavigate()
  console.log(productData);

  return (
    <div className="h-full w-full customScrollBar relative">
      <div className="border h-[10vh] w-[100%] sticky top-0 p-2">
        <div onClick={()=>navigate("create")} className="h-full w-full border cursor-pointer bg-blue-200 flex justify-center items-center font-semibold  text-white hover:bg-blue-700 rounded-md">
          Add New Product +
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        {productData?.map((e, i) => {
          return <ProductCard data={e} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Products;
