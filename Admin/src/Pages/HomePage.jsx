import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate=useNavigate()
  return (
    <div className='h-screen w-full bg-[#111] flex justify-center flex-col items-center gap-1'>
        <div className="  flex justify-center items-center text-[#ffefb9] sego text-[15rem] "> ulfat</div>
        <div className=" text-sm text-zinc-300 font-semibold">Powered by: {"<Div/>"}</div>
        <button onClick={()=>{navigate("/dashboard")}} className='w-[20vw] p-3 rounded-lg bg-[#2e6fd1] mt-3 font-semibold  text-white'>Go to dashboard</button>
    </div>
  )
}

export default HomePage