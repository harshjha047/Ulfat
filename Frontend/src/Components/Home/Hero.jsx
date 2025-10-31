import React from "react";
// import banner from "../../../media/BannerDesign.jpeg"
import banner from "../../../media/banner.jpg"
import { GoArrowUpRight } from "react-icons/go";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";




function Hero() {
  return (
    <div className=" w-full  flex flex-col justify-between">
      <div className="h-[12vh]"></div>
      <div className="h-[87vh]  w-full  px-4">
        <div className={` overflow-hidden w-full h-full bg-slate-400 bg-top bg-no-repeat bg-cover rounded-2xl relative justify-center items-center flex`}
        style={{backgroundImage:`url("${banner}")`}}>
          <Link to={"/product"} className="flex gap-1 absolute bottom-[15%] z-10"><span className="bg-white p-4 px-10 text-sm rounded-full font-semibold text-black">Start Shopping</span><span className="bg-white text-2xl flex justify-center items-center px-[15px] rounded-full font-semibold"><LuArrowUpRight/></span></Link>
          <div className="text-white">
            

          </div>
          <div className=" uppercase text-[#ffffff00] text-[13rem] w-[100vw] text-center font-medium bottom-0 absolute leading-none bg-gradient-to-t from-[#00000000] to-[#ffffff67] bg-clip-text ">Ethnic wear</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
