import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfile } from "../../Context/ProfileContext";
import api from "../../services/api";
import { useHome } from "../../Context/HomeContext";

function AddAddress() {
  let naviagte = useNavigate();
    const {AddField, setAddField} = useHome()
  


  const { fetchProfileData, addWishlistData } = useProfile();
  const init = {
    label: "Home",
    street: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  };
  const [createAddress, setCreateAddress] = useState(init);
  const { label, street, country, city, state, zip } = createAddress;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateAddress({ ...createAddress, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await api.post("/users/address", createAddress);
      toast.success("Address Registered Successfully")
      await fetchProfileData()
      naviagte("")
    } catch (err) {
      console.log(err);
    }
  };
  console.log(createAddress);

  return (
    <div className="border fixed top-[12vh] bg-white border-gray-700 m-auto max-w-lg w-full rounded-lg p-4 mb-4">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-[#797979] font-medium w-full">
              {"label"}:
              <select
                name="label"
                id="label"
                onChange={handleChange}
                value={label}
                className="bg-[#ffffff9f] border px-2 py-1"
              >
                <option className="bg-black rounded-xl" value="Home">
                  Home
                </option>
                <option className="bg-black rounded-xl" value="Work">
                  Work
                </option>
                <option className="bg-black rounded-xl" value="Other">
                  Other
                </option>
              </select>
            </p>
            {/* <span className={`px-2 py-1  bg-green-600 text-white rounded text-xs`}>Default</span> */}
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="text-blue-400 hover:text-blue-300 text-sm" onClick={()=>{setAddField(false)}}>
              Add
            </button>
          </div>
        </div>
        <div className="text-gray-300 text-sm space-y-1">
          <p>
            <input
              onChange={handleChange}
              name="street"
              id="street"
              value={street}
              type="text"
              className="bg-[#ffffff34] border text-black px-3 py-2 my-3 mx-1 rounded"
              placeholder="street"
            />
            ,
            <input
              onChange={handleChange}
              name="country"
              id="country"
              value={country}
              type="text"
              className="bg-[#ffffff34] border text-black px-3 py-2 my-3 mx-1 rounded"
              placeholder="country"
            />
          </p>
          <p>
            <input
              onChange={handleChange}
              name="city"
              id="city"
              value={city}
              type="text"
              className="bg-[#ffffff34] border text-black px-3 w-[150px] my-3  py-2 mx-1 rounded"
              placeholder="city"
            />
            ,
            <input
              onChange={handleChange}
              name="state"
              id="state"
              value={state}
              type="text"
              className="bg-[#ffffff34] border text-black px-3 w-[150px] my-3  py-2 mx-1 rounded"
              placeholder="state"
            />
            <input
              onChange={handleChange}
              name="zip"
              id="zip"
              value={zip}
              type="text"
              className="bg-[#ffffff34] border text-black px-3 w-[150px] my-3  py-2 mx-1 rounded"
              placeholder="zip"
            />
          </p>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
