import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Product from '../Pages/Product'
import ProductPage from '../Pages/ProductPage'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import MyBag from '../Pages/MyBag.jsx'
import OTPvalidation from '../Components/Reusable/OTPvalidation'
import Settings from '../Pages/Settings.jsx'
import ProfileOverview from '../Components/Settings/ProfileOverview.jsx'
import Wishlist from '../Components/Settings/Wishlist.jsx'
import AddAddress from '../Components/Settings/AddAddress.jsx'
import Addresses from '../Components/Settings/Addresses.jsx'
import ContectUs from '../Pages/ContectUs.jsx'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />}></Route>
      <Route path="/product" element={<Product />}></Route>
      <Route path="product/Item/:ProductId" element={<ProductPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/cart" element={<MyBag />}></Route>
      <Route path="/settings" element={<Settings />}>
      <Route path="" element={<ProfileOverview />}></Route>
      <Route path="wishlist" element={<Wishlist />}></Route>
      <Route path="addresses" element={<Addresses />}></Route>
      </Route>
      <Route path="context" element={<ContectUs />}></Route>

      <Route path="/auth/account/validation" element={<OTPvalidation />}></Route>
    </Route>
    ))