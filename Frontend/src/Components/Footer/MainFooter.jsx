import React from "react";
import logo from "../../../media/Screenshot_2025-10-30_144332-removebg-preview.png";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";

// #F7E9CF

function MainFooter() {
  return (
    <footer className="h-[100vh] w-full relative flex justify-center items-center flex-col">
      <div className="h-[50vh] flex items-end  w-full ">
        {/* <div className="h-[5vh]  w-full bg-gradient-to-t from-[#111] to-[#00000000]"></div> */}
      </div>
      <div className=" absolute w-[45vw] h-[40vh]  z-20">
        <img src={logo} className="h-full m-auto " alt="" />
        <div className="bg-[#A88455] h-[7vh] w-[7vh] rounded-full absolute top-0 right-0"></div>
      </div>
      <div className="h-[50vh] w-full bg-[#111] relative z-10 flex justify-center items-center">
        <div className="  absolute bottom-5 z-50 w-[90vw]  ">
          <div className="w-full flex justify-center items-center text-white text-4xl">
            BY BANIYA BHAIYALOG
          </div>
          <div className="h-[20vh] border-t flex flex-col">
            <div className="w-full border-b flex justify-between text-white">
              <div className="flex gap-4">
                <Link className="py-3">Home</Link>
                <Link className="py-3">Products</Link>
                <Link className="py-3 flex items-center">Connect <span><LuArrowUpRight/></span></Link>
              </div>
              <div className="flex h-full items-center gap-4">
                <Link className="text-xl"><FaWhatsapp/></Link>
                <Link className="text-xl"><FaInstagram/></Link>
              </div>
            </div>
            <div className="flex justify-between w-full text-[#ffffffc2] text-sm">
              <div className="">
              {"</> Powerd by Team Div"}
              </div>
              <div className="">
                &copy; Copyrights.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
