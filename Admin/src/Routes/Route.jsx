import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard";
import HomePage from "../Pages/HomePage";
import ProtectedWrapper from "./ProtectedWrapper";
import PublicWrapper from "./PublicWrapper";
import Login from "../Pages/Login";
import Users from "../Components/Users/Users";
import Products from "../Components/Products/Products";
import CreateOrEditProduct from "../Components/Products/CreateOrEditProduct";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route element={<ProtectedWrapper />}>
        <Route path="/dashboard" element={<Dashboard />} >
        <Route path="" element={<Users />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="products/create" element={<CreateOrEditProduct />}></Route>
        <Route path="products/:PID" element={<CreateOrEditProduct />}></Route>
        </Route>
      </Route>
      <Route element={<PublicWrapper/>}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Route>
  )
);
