import { createContext, useContext, useEffect, useState } from "react";
import CartService from "../services/cartService"
import { toast } from "react-hot-toast";
import api from "../services/api";

const CartContext = createContext();

export const CartApi = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();


  const FetchCartsData = async () => {
    try {
      const data = await CartService.getCart();
      setCartData(data.items)
      setTotalPrice(data?.totalAmount);
    } catch (err) {
      console.log(err);
    }
  };

  const AddToCart = async (cartItem) => {
    try {
      await CartService.addToCart(cartItem);
      FetchCartsData()
      toast.success("Item added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item to cart.");
    }
  };

  const RemoveFromCart = async (cartItem) => {
    try {
      await CartService.removeItem(cartItem);
      FetchCartsData()
      toast.success("Item removed from cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item from cart.");
    }
  };
    const DeleteCart = async (cartItem) => {
    try {
      const { data: res } = await api.post("/cart/delete", cartItem);
      FetchCartsData()
      toast.success("deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item in cart.");
    }
  };
  
 useEffect(()=>{FetchCartsData()},[])
  return (
    <CartContext.Provider value={{cartData, setCartData, RemoveFromCart, AddToCart, DeleteCart,totalPrice}}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
