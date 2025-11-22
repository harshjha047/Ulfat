import React, { useState } from "react";
import InputField from "./InputField";
import { useAdmin } from "../../Context/AdminContext";
import { useLocation, useParams } from "react-router-dom";

function CreateOrEditProduct() {
  const { createProduct, updateProduct, productData } = useAdmin();
  const { PID } = useParams();
  const singleProductData = productData?.find((e) => e._id == PID);
  const location = useLocation();
  //   console.log(location.pathname);

  const initState = {
    name: singleProductData?.name || "",
    description: singleProductData?.description || "",
    new_price: singleProductData?.new_price || "",
    old_price: singleProductData?.old_price || "",
    category: singleProductData?.category || "",
    images: singleProductData?.images || [],
    variants: singleProductData?.variants || [],
    size: singleProductData?.size || [],
    removedImages: [],
  };
  const imagesInit = { url: "", alt: "", file: null };
  const [inputData, setInputData] = useState(initState);
  const [varData, setVarData] = useState({ ProductID: "" });
  const [sizeData, setSizeData] = useState({ Size: "" });
  const [removedImage, setRemovedImages] = useState([]);
  const [imgData, setImgData] = useState(imagesInit);
  const [tog, setTog] = useState(false);

  const {
    name,
    description,
    new_price,
    old_price,
    category,
    images,
    variants,
    size,
  } = inputData;
  const { ProductID } = varData;
  const { Size } = sizeData;
  const { url, alt, file } = imgData;


  const handleChange = (e) => {
    e.preventDefault()
    const { name, value, type, files } = e.target;
    if (name == "variants") {
      setVarData({ ...varData, ProductID: value });
    } else if (name == "size") {
      setSizeData({ ...sizeData, Size: value });
    } else if (type == "file") {
      const file = files[0];
      const previewURL = URL.createObjectURL(file);
      setImgData({ ...imgData, url: previewURL, file });
    } else if (name == "alt") {
      setImgData({ ...imgData, alt: value });
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const addVar = () => {
    setInputData({ ...inputData, variants: [...variants, varData] });
    setVarData({ ProductID: "" });
  };
  const addSize = () => {
    setInputData({ ...inputData, size: [...size, sizeData] });
    setSizeData({ Size: "" });
  };
  const removeSize = (e) => {
    const newArr = size.filter((i) => i.Size != e);
    setInputData({ ...inputData, size: newArr });
  };
    console.log(size);

  const removeVar = (e) => {
    console.log(variants);
    const newArr = variants.filter((i) => i.ProductID != e);
    setInputData({ ...inputData, variants: newArr });
  };

  const addImg = () => {
    setInputData({ ...inputData, images: [...images, imgData] });
    setImgData(imagesInit);
  };
  const removeImg = (alt) => {
    const removed = images.find((img) => img.url === alt);
    if (removed) {
      setRemovedImages([...removedImage, removed.url]);
    }
    const newArr = images.filter((i) => i.url !== alt);
    setInputData({ ...inputData, images: newArr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("new_price", inputData.new_price);
    formData.append("old_price", inputData.old_price);
    formData.append("category", inputData.category);

    // Append real files
    inputData.images.forEach((img) => {
      if (img.file) formData.append("images", img.file);
    });

    formData.append("variants", JSON.stringify(inputData.variants || []));
    formData.append("size", JSON.stringify(inputData.size || []));
    formData.append("removedImages", JSON.stringify(removedImage || []));
    if (location.pathname === "/dashboard/products/create") {
      createProduct(formData);
    } else {
      updateProduct(PID, formData);
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  console.log(removedImage);

  return (
    <div className="w-full customScrollBar p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex justify-between items-start"
      >
        <div className=" w-[49%] border grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 p-2">
          <div className="h-[25vh] border w-[90%] m-auto p-2 flex flex-col justify-between rounded-md">
            <label
              htmlFor="productImage"
              className="w-full bg-cover bg-center cursor-pointer h-[70%] border rounded-md flex justify-center items-center font-semibold bg-slate-100 text-[#202020] relative"
              style={{ backgroundImage: `url('${url}')` }}
            >
              Add Image
              <div
                onClick={() => addImg()}
                className=" absolute bg-white px-3 rounded-full top-[-1px] right-[-1px]"
              >
                +
              </div>
            </label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              id="productImage"
              className=" hidden "
            />
            <input
              type="text"
              onChange={handleChange}
              value={alt}
              name="alt"
              className="h-[25%] border p-2 rounded-md outline-none"
              placeholder="Alt name"
            />
          </div>
          {images.map((e, i) => (
            <div
              key={i}
              className="h-[25vh] border w-[90%] m-auto rounded-md relative"
            >
              <img
                src={e.url}
                className="h-full w-full object-cover object-center"
                alt={e.alt}
              />
              <div
                onClick={() => removeImg(e.url)}
                className="px-3 text-lg font-semibold bg-white rounded-full absolute top-0 right-0"
              >
                -
              </div>
            </div>
          ))}
        </div>
        <div className=" w-[49%] border flex p-2 gap-2 flex-col">
          <InputField
            onChangeValue={handleChange}
            name={"name"}
            value={name}
            range={"100%"}
            textInput={"Title"}
          />
          <textarea
            placeholder="Discription"
            onChange={handleChange}
            name={"description"}
            value={description}
            className="h-[15vh] rounded-md resize-none w-[100%] border p-2 outline-none"
          ></textarea>
          <div className="w-full border flex justify-between">
            <input
              type="text"
              name={"new_price"}
              onChange={handleChange}
              value={new_price}
              className={`w-[33%] p-2 outline-none border rounded-md `}
              placeholder={"Discounted Price"}
            />
            <input
              type="text"
              name={"old_price"}
              onChange={handleChange}
              value={old_price}
              className={`w-[33%] p-2 outline-none border rounded-md `}
              placeholder={"MRP"}
            />
            <input
              type="text"
              name={"category"}
              onChange={handleChange}
              value={category}
              className={`w-[33%] p-2 outline-none border rounded-md `}
              placeholder={"Category"}
            />
          </div>
          <div className="border w-full ">
            <div className=" relative">
              <InputField
                onChangeValue={handleChange}
                name={"size"}
                value={Size}
                range={"100%"}
                textInput={"Size"}
              />
              <div onClick={()=>{addSize()}} className=" absolute top-0 border h-full flex justify-center items-center px-4 right-0 text-xl">+</div>
            </div>
            <div className="flex p-2 flex-wrap gap-1">
              {size.map((e,i)=>
              <div className="border p-1 rounded flex gap-1 uppercase">
                {e?.Size}
                <span onClick={()=>removeSize(e?.Size)} className="bg-slate-400 px-1 flex rounded cursor-pointer justify-center items-center">
                  -
                </span>
              </div>)}
              
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div className="w-[10%] p-2 outline-none border rounded-md text-[#8d8d8d] flex justify-center items-center text-lg font-semibold">
              #
            </div>
            <InputField
              onChangeValue={handleChange}
              name={"variants"}
              value={ProductID}
              range={"79%"}
              textInput={"Product ID (Enter PID to add varients)"}
            />

            <div
              onClick={() => {
                addVar();
              }}
              className="w-[10%] p-2 outline-none border rounded-md text-[#8d8d8d] flex justify-center items-center text-lg font-semibold"
            >
              +
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-200 rounded-md font-semibold hover:bg-blue-700 text-[white]"
          >
            Save
          </button>
          <div className="w-full flex gap-2 flex-col ">
            {variants?.map((e, i) => {
              return (
                <div key={i} className="w-full flex justify-between ">
                  <div className="w-[10%] p-2 outline-none border rounded-md text-[#8d8d8d] flex justify-center items-center text-lg font-semibold">
                    #
                  </div>
                  <div className="w-[79%] p-2 outline-none border rounded-md text-[#8d8d8d]">
                    {e?.ProductID}
                  </div>
                  <div
                    onClick={() => {
                      removeVar(e?.ProductID);
                    }}
                    className="w-[10%] p-2 outline-none border rounded-md text-[#8d8d8d] flex justify-center items-center text-lg font-semibold"
                  >
                    -
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateOrEditProduct;
