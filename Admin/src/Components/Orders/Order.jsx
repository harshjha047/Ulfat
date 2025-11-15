import React from "react";
import { useAdmin } from "../../Context/AdminContext.jsx";
import OrderCard from "./OrderCard.jsx";

function Order() {
  const { getOrdersData, setGetOrdersData, FetchOrdersData } = useAdmin();
  console.log(getOrdersData);
  
  return (
    <div className="p-3  h-full border-black customScrollBar">
      <div className="flex flex-col gap-3 h-full w-full">
        {getOrdersData?.map((e, i) => {
          return <OrderCard data={e} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Order;
