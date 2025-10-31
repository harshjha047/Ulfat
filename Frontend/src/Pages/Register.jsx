import React from "react";
import InputFields from "../Components/Reusable/InputFields";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { RegisterSchema } from "../Components/Reusable/AuthSchema";
import { useFormik } from "formik";
import toast from "react-hot-toast";

function Register() {
  let naviagte = useNavigate();
  const { genrateOtp, setGeneratedOtp, setPreRegisterUserData } = useAuth();

  const onSubmit = async (values, actions) => {
    actions.resetForm();
    let genOtp = genrateOtp();
    setGeneratedOtp(genOtp);
    toast.success(`Otp has sent to ${values.email}`);
    setPreRegisterUserData(values);
    naviagte("/auth/account/validation");
  };

  const {
    values,
    handleChange,
    touched,
    handleBlur,
    isSubmitting,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: RegisterSchema,
    onSubmit,
  });
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className=" w-[25%] rounded-xl shadow-2xl border border-[#fafafa]">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center items-center p-3"
        >
          <div className="w-full flex justify-center items-center text-4xl font-semibold  my-1">
            Register
          </div>
          <InputFields
            label={"Full Name"}
            id={"name"}
            type={"text"}
            placeholder={"Enter your full name"}
            err={errors.name}
            onBlur={handleBlur}
            value={values.name}
            classStyle={
              errors.name && touched.name ? "border-red-500" : "border-gray-600"
            }
            onChange={handleChange}
          />
          <InputFields
            label={"Email"}
            id={"email"}
            classStyle={
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-600"
            }
            value={values.email}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter your email here"}
            err={errors.email}
            onBlur={handleBlur}
          />

          <InputFields
            label={"Create Password"}
            id={"password"}
            value={values.password}
            onChange={handleChange}
            type={"password"}
            placeholder={"Create a strong password"}
            err={errors.password}
            onBlur={handleBlur}
            classStyle={
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-600"
            }
          />
          <InputFields
            label={"Conform Password"}
            id={"confirmPassword"}
            type={"password"}
            placeholder={"Conform your password"}
            err={errors.confirmPassword}
            onBlur={handleBlur}
            value={values.confirmPassword}
            classStyle={
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500"
                : "border-gray-600"
            }
            onChange={handleChange}
          />
          {/* <div className="flex justify-end w-full text-sm text-cyan-700 my-1"> <Link>Forget Password?</Link></div> */}
          <button
            type="submit"
            className="w-full py-2 border mt-4 rounded-lg bg-purple-800 text-white text-xl font-semibold flex justify-center items-center"
          >
            Register
          </button>
          <div className="flex justify-center w-full text-sm my-1 ">
            Already have a account ?{" "}
            <Link className="text-cyan-700">go to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
