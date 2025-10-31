import React from 'react'
import UserCard from './UserCard'
import { useAdmin } from '../../Context/AdminContext';

function Users() {
  const {getUsersData}=useAdmin()
  

  return (
    <div className='h-full w-full customScrollBar '>
      <div className="flex flex-col gap-2">
        {getUsersData?.map((e,i)=>{
          return <UserCard data={e} key={i}/>
        })}
      </div>

    </div>
  )
}

export default Users