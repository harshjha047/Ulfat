import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useHome } from "../../Context/HomeContext";
import { useProfile } from "../../Context/ProfileContext";
import toast from "react-hot-toast";

function EditProfile() {
  const { editProfileToast, setEditProfileToast } = useHome();

  const { getProfileData, EditProfileData } = useProfile();
  const initState = {
    email: getProfileData?.email || "",
    phone: getProfileData?.phone || "",
    name: getProfileData?.name || "",
    profile: getProfileData?.profilePhoto || "",
    file: null,
  };
  const [inputBox, setInputBox] = useState(initState);
  const { name, email, phone, profile } = inputBox;

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      const file = files[0];
      const previewURL = URL.createObjectURL(file);
      setInputBox({ ...inputBox, profile: previewURL, file });
    } else {
      setInputBox({ ...inputBox, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", inputBox.name);
      formData.append("phone", inputBox.phone);
      if (inputBox.file) {
        formData.append("profile", inputBox.file); // file from input
      }
      await EditProfileData(formData);
      toast.success("Peofile Edited");
      setEditProfileToast(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed h-[100vh] z-50 w-[100vw] top-0 flex justify-center items-center border border-black bg-[#0000001f]">
      <div className="h-[80vh] w-[30vw]  border bg-white rounded-xl ">
        <form
          onSubmit={handleSubmit}
          className="h-full w-full flex flex-col relative justify-center items-center p-4 gap-3"
        >
          <div
            className=" absolute top-5 right-5 text-2xl cursor-pointer"
            onClick={() => {
              setEditProfileToast(false);
            }}
          >
            <RxCross2 />
          </div>

          <label
            htmlFor="profile"
            className={`h-[20vh] w-[20vh] border rounded-full bg-slate-300 bg-cover bg-center flex justify-center items-center relative`}
            style={{ backgroundImage: `url(${profile})` }}
          >
            <div className="bg-[#0000007a] flex justify-center items-center text-xl rounded-full text-[#ffffff] bottom-1 right-1 absolute border h-[5vh] w-[5vh]">
              <CiEdit />
            </div>
          </label>
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={handleChange}
            className=" hidden"
          />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            className="rounded-lg bg-[#00000013] w-full p-2 py-3 outline-none "
            placeholder="Edit full name"
          />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            className="rounded-lg bg-[#00000013] w-full p-2 py-3 outline-none "
            disabled
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={handleChange}
            className="rounded-lg bg-[#00000013] w-full p-2 py-3 outline-none "
            placeholder="Add Phone Number"
          />
          <button
            type="submit"
            className="bg-[#6464ff] rounded-lg text-white w-full py-3 text-lg font-semibold "
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
