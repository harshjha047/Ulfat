import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const HomeContext = createContext();

export const HomeApi = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const [AddField, setAddField] = useState(false);
  const [editProfileToast,setEditProfileToast] =useState(false)


  return (
    <HomeContext.Provider value={{ menu, setMenu, AddField, setAddField,editProfileToast,setEditProfileToast }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
