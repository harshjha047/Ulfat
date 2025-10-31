import React from 'react'

function InputFields(props) {
  return (
    <div className="flex flex-col w-full mt-4"> 
      <label htmlFor={props?.id} className="text-sm px-2 p-1">
        {props?.label}
      </label>
      <input
        id={props?.id}
        value={props?.value}
        onChange={props?.onChange}
        type={props?.type}
        placeholder={props?.placeholder}
        onBlur={props?.onBlur}
        name={props?.id}
        className={` outline-none border p-2 rounded-lg  ${props?.classStyle}`}
      />
      <div className=" ">{props?.err=="Required"?"":props?.err}</div>
    </div>
  );
}

export default InputFields