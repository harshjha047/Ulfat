import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

function OTPvalidation() {
  let naviagte = useNavigate();
  const {
    genratedOTP,
    preRegisterUserData,
    resetPasswordData,
    register,
  } = useAuth();

  const initState = { Box: "" };
  const [inputBox, setInputBox] = useState(initState);
  const { Box } = inputBox;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setInputBox({ ...initState, [name]: value });
  };
  console.log(genratedOTP);
  const resendOTP =()=>{
    console.log(genratedOTP);
    
  }
  console.log(preRegisterUserData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (genratedOTP == inputBox.Box) {
        if (location.pathname == "/auth/account/validation") {
          register(preRegisterUserData);
          toast.success("User Registered Successfully");
          naviagte("/");
        } else if (location.pathname == "/auth/account/reset/validation") {
          naviagte("/auth/account/reset/create");
          toast.success("OTP verified");
        } else {
          toast.error("Try again leter");
        }
      } else {
        console.log("f");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-[85vh] w-full flex justify-center items-center ">
      <article className="w-[90%] h-[60%] border rounded-lg bg-white shadow-2xl flex-col items-center flex sm:w-[50%] lg:w-[25%] ">
        <h1 className="h-[30%] text-2xl font-semibold w-full flex justify-center items-center">
          Enter OTP
        </h1>
        <p className="text-sm flex justify-center items-center flex-col text-zinc-700">
          Enter 4-digit code sent to
          <span>
            {preRegisterUserData?.email}
            {resetPasswordData?.email}
          </span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col items-center w-[70%] "
        >
          <input
            type="tel"
            name="Box"
            value={Box}
            maxLength={4}
            onChange={handleChange}
            className="border rounded-md outline-none w-full flex h-10 my-2 px-4 text-base"
            placeholder="Enter 4-digit code"
          />
          <button
            type="submit"
            className="h-10 flex justify-center items-center border w-full rounded-md bg-[#4675F4] text-white"
          >
            Varify
          </button>
        </form>
        <p className="text-xs mt-4">
          Didn't receive code ?{" "}
          <span className="text-[#4675F4]" onClick={resendOTP}>Resend OTP</span>
        </p>
      </article>
    </section>
  );
}

export default OTPvalidation;