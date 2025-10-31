import React from "react";
import InputFields from "../Components/Reusable/InputFields.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../Components/Reusable/AuthSchema.js";
import toast from "react-hot-toast";
import { useAdmin } from "../Context/AdminContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useAdmin();

  const onSubmit = async (values, actions) => {
    try {
      actions.resetForm();
      login(values);
      toast.success("User Logind Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
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
      password: "",
      email: "",
    },
    validationSchema: LoginSchema,
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
          <div className="w-full flex justify-center items-center text-4xl font-semibold  my-5">
            Login
          </div>
          <InputFields
            label={"Email"}
            id={"email"}
            classStyle={errors.email && touched.email ? "border-red-500" : "border-gray-600"}
            value={values.email}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter your email here"}
            err={errors.email}
            onBlur={handleBlur}
          />
          <InputFields
            label={"Password"}
            id={"password"}
            classStyle={
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-600"
            }
            value={values.password}
            onChange={handleChange}
            err={errors.password}
            type={"password"}
            placeholder={"Enter your password here"}
            onBlur={handleBlur}
          />

          <button
            type="submit"
            className="w-full py-2 border mt-4 rounded-lg bg-purple-800 text-white text-xl font-semibold flex justify-center items-center"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
