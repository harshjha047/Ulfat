import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import productService from "../services/productService";
import toast from "react-hot-toast";
import orderService from "../services/orderService";

const AdminContext = createContext();

export const AdminApi = ({ children }) => {
  const [getProfileData, setGetProfileData] = useState();
  const [productData, setProductData] = useState();
  const [getUsersData, setGetUsersData] = useState();
  const [getOrdersData, setGetOrdersData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchProfileData = async () => {
    try {
      const data = await authService.getProfile();
      setGetProfileData(data?.user);
      setLoading(true)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (info) => {
    try {
      const data = await authService.login(info);
      setGetProfileData(data);
    } catch (err) {}
  };


  const FetchProductsData = async () => {
    try {
      const data = await productService.getAllProducts();
      setProductData(data);
    } catch (err) {
      console.log(err);
    }
  };
  let createProduct = async (resourceData) => {
    try {
      let { data } = await authService.createProduct(resourceData);
      toast.success("Product Created Successfully");
      await FetchProductsData();
    } catch (error) {
      toast.error("Server error try again later");
      console.log(error.message);
    }
  };
  let updateProduct = async (PID, formData) => {
    try {
      let { data } = await authService.updateProduct(PID, formData);
      toast.success("Updated Successfully");
      await FetchProductsData();
    } catch (error) {
      toast.error("Server error try again later");
      console.log(error.message);
    }
  };

  let deleteProduct = async (resourceData) => {
    try {
      let { data } = await authService.deleteProduct(resourceData);
      toast.success("Deleted Successfully");
      await FetchProductsData();
    } catch (error) {
      toast.error("Server error try again later");
      console.log(error.message);
    }
  };

  const FetchUsersData = async () => {
    try {
      const data = await authService.getAllUsers();
      setGetUsersData(data);
    } catch (err) {
      console.log(err);
    }
  };

    const FetchOrdersData = async () => {
    try {
      const data = await orderService.getAllOrders();
      setGetOrdersData(data);
    } catch (err) {
      console.log(err);
    }
  };
      const FetchOrdersStatus = async (a,e) => {
    try {
      const data = await orderService.updateOrderStatus(a,e);
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(()=>{
    FetchUsersData()
    FetchProductsData()
    fetchProfileData()
    FetchOrdersData()
  },[])

  return (
    <AdminContext.Provider 
      value={{
        getUsersData,
        setGetUsersData,
        getProfileData,
        setGetProfileData,
        fetchProfileData,
        FetchUsersData,
        FetchProductsData,
        productData, 
        setProductData,
        login,
        loading, 
        setLoading,
        createProduct,
        updateProduct,
        deleteProduct,
        getOrdersData, 
        setGetOrdersData,
        FetchOrdersData,
        FetchOrdersStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
