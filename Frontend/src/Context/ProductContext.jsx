import React, { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/productService"
import toast from "react-hot-toast";

const ProductContext = createContext();

export const ProductApi = ({ children }) => {
  const [productData, setProductData] = useState();
      let [filteredData, setFilteredData] = useState(productData);
  

  const FetchProductsData = async () => {
    try {
      const data = await productService.getAllProducts();
      setProductData(data)
    } catch (err) {
      console.log(err);
    }
  };
  
   const AddReview = async (e) => {
    try {
      await productService.addReview(e);
      toast.success("Item added to cart!");
    } catch (err) {
      console.error( err);
      toast.error("something went wrong");
    }
  };

  const RemoveReview = async (e) => {
    try {
      await productService.removeReview(e);
      toast.success("Item removed from cart!");
    } catch (err) {
      console.error( err);
      toast.error("something went wrong");
    }
  };
  
 useEffect(()=>{FetchProductsData()},[])
  return (
    <ProductContext.Provider value={{AddReview, RemoveReview, FetchProductsData,filteredData, setFilteredData, productData, setProductData}}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
