import React, { useState } from 'react'
import AddAddress from './AddAddress'
import { useHome } from '../../Context/HomeContext'

function Addresses() {
  const {AddField, setAddField} = useHome()

  return (
    <div className="h-full w-full customScroller border p-2 flex flex-col gap-2">
        <button className='w-full p-2 border bg-slate-200 border-slate-700 rounded-lg' onClick={()=>setAddField(true)}>Add new address</button>
        {AddField && <AddAddress/>}
    </div>
  )
}

export default Addresses