import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import toast from "react-hot-toast";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileApi = ({ children }) => {
  const [getProfileData, setGetProfileData] = useState(null);
  const [getWishlistData, setGetWishlistData] = useState();
  const [updateProfileData, setUpdateProfileData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchWishlistData = async () => {
    try {
      const data = await authService.getWishlist();
      setGetWishlistData(data);
    } catch (err) {
      console.log("Profile Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      const data = await authService.getProfile();
      setGetProfileData(data?.user);
      await fetchWishlistData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const EditProfileData = async (info) => {
    try {
      const data = await authService.editProfile(info);
      fetchProfileData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  //   const EditProfileData = async (formData) => {

  //   return res.data;
  // };

  const addWishlistData = async (info) => {
    try {
      const data = await authService.addToWishlist(info);
      await fetchProfileData();
    } catch (err) {
      console.log("Profile Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlistData = async (info) => {
    try {
      const data = await authService.removeFromWishlist(info);
      await fetchProfileData();
    } catch (err) {
      console.log("Profile Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        fetchWishlistData,
        fetchProfileData,
        addWishlistData,
        removeWishlistData,
        getProfileData,
        setGetProfileData,
        getWishlistData,
        setGetWishlistData,
        updateProfileData,
        setUpdateProfileData,
        loading,
        setLoading,
        EditProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
