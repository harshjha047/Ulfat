import React from 'react'

function InputField({range,textInput,onChangeValue,name,value}) {
  return (
    <input type="text" name={name} onChange={onChangeValue} value={value} className={`w-[${range}] flex-1 p-2 outline-none border rounded-md `} placeholder={textInput} />

  )
}

export default InputField