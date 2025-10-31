import React from "react";
import ProductCardHome from "../Products/ProductCardHome";
import { useProfile } from "../../Context/ProfileContext";
import WishlistItem from "./WishlistItem";

function Wishlist() {
  const {getProfileData, addWishlistData, removeWishlistData}=useProfile()
  return (
    <div className="border h-full pt-3 customScroller w-full grid gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 border-black">
      {/* <!-- Wishlist Item  --> */}
      {getProfileData?.wishlist?.map((e, i) => (
        <WishlistItem key={i} wishId={e} />
      ))}
    </div>
  );
}

export default Wishlist;
