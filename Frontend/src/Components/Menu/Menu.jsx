import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";
import { useHome } from "../../Context/HomeContext";
import { RxCross1 } from "react-icons/rx";
import { useProfile } from "../../Context/ProfileContext";

function Menu() {
  const { menu, setMenu } = useHome();
  const { getProfileData } = useProfile();
  // console.log(getProfileData);

  return (
    <div
      className={`h-[100vh] w-[100%] fixed ${
        menu ? "left-0" : "left-[-100%]"
      } z-50 bottom-0 bg-slate-50 p-3`}
    >
      <div className=" w-[90%] mx-auto h-[35vh] flex items-center relative">
        <div className="h-[35vh] w-[35vh]  flex justify-center items-center">
          <div
            className=" h-[80%] w-[80%] rounded-full bg-slate-500 bg-cover bg-center"
            style={{ backgroundImage: `url(${getProfileData?.profilePhoto})` }}
          ></div>
        </div>
        <div className=" flex-col flex justify-between">
          <div className="">
            <h2 className="text-3xl font-semibold">
              Hi, {getProfileData?.name}
            </h2>
            <p className="text-zinc-800">{getProfileData?.email}</p>
            <p>{getProfileData?.phone}</p>
          </div>
        </div>
        <div
          className=" absolute top-3 right-3 text-2xl cursor-pointer"
          onClick={() => {
            setMenu(false);
          }}
        >
          <RxCross1 />
        </div>
      </div>
      <div className=" w-[90%] mx-auto grid gap-1 customScrollerMini h-[60vh]  sm:gap-5 grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 mt-2">
        <MenuButton path={"/"} name={"Home"} />
        <MenuButton path={"/product"} name={"Products"} />
        {getProfileData && (
          <>
            <MenuButton path={"/cart"} name={"My Bag"} />
            <MenuButton path={"/settings/orders"} name={"Orders"} />
            <MenuButton path={"/settings/wishlist"} name={"Wishlist"} />
            <MenuButton path={"/settings/addresses"} name={"Addresses"} />
            <MenuButton path={"/settings"} name={"Settings"} />
          </>
        )}
        {!getProfileData && (
          <>
            <MenuButton path={"/login"} name={"Login"} />
            <MenuButton path={"/register"} name={"Register"} />
          </>
        )}

        <MenuButton path={"/contectus"} name={"Contect Us"} />
      </div>
    </div>
  );
}

export default Menu;
