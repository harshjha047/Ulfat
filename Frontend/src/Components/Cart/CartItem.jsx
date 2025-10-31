import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../../Context/CartContext";
import { useProduct } from "../../Context/ProductContext";

function CartItrm({data}) {
  let { RemoveFromCart, AddToCart, DeleteCart } =useCart();
  const {productData}=useProduct()
  const e = data
  const imgData=productData.find((i)=>i?._id==e?.productId)

  

  return (
    <div className=" rounded-lg p-6 mb-6 border shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={imgData?.images?.[0]?.url}
          alt={imgData?.images?.[0]?.alt || e?.productName}
          className="w-full md:w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold  mb-2">{e?.productName}</h3>
          <p className="text-gray-700 mb-2">
            Size: {e?.size} 
          </p>
          <p className="text-lg font-semibold text-gray-600">₹{e?.subtotal}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={() => {
              DeleteCart(e);
            }}
            className="text-red-500 hover:text-red-400 mb-4"
          >
            <AiOutlineDelete />
          </button>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => {
                RemoveFromCart({ ...e, quantity: 1 });
              }}
              className="px-3 py-1 border hover:bg-slate-200  rounded-l-lg"
            >
              -
            </button>
            <span className="px-4 py-1 border">{e?.quantity}</span>
            <button
              onClick={() => {
                AddToCart({ ...e, quantity: 1 });
              }}
              className="px-3 py-1 border hover:bg-slate-200  rounded-r-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItrm;
