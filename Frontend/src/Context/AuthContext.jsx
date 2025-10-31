import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import toast from "react-hot-toast";
import { useProfile } from "./ProfileContext";

const AuthContext = createContext();

export const AuthApi = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [genratedOTP, setGeneratedOtp] = useState(0);
  const [userEnteredOtp, setUserEnterOtp] = useState(0);
  const [preRegisterUserData, setPreRegisterUserData] = useState(null);
  const {getProfileData, setGetProfileData}=useProfile()

  let genrateOtp = () => {
    return Math.floor(Math.random() * 8999) + 1000;
  };

  const login = async (info) => {
    try {
      const data = await authService.login(info);
      setAuthData(data);
      setGetProfileData(data)
    } catch (err) {}
  };

  const register = async (info) => {
    try {
      const data = await authService.register(info);
      setAuthData(data);
      setGetProfileData(data)
    } catch (err) {}
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAuthData(null);
    } catch (err) {}
  };

  useEffect(() => {}, []);
  return (
    <AuthContext.Provider value={{ authData, setAuthData, login, logout, register, genrateOtp, genratedOTP, setGeneratedOtp, userEnteredOtp, setUserEnterOtp, preRegisterUserData, setPreRegisterUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
