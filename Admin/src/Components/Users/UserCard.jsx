

function UserCard({data}) {
  return (
    <div className='h-[20vh] border flex flex-col justify-between'>
      <div className="w-full  px-2 text-xs font-medium text-zinc-500">#{data?._id}</div>
      <div className="flex items-center px-3 gap-3">
        <div className="border h-[12vh] w-[12vh] rounded-full bg-cover bg-center"
  style={{backgroundImage:`url("${data.profilePhoto}")`}}
        ></div>
        <div className="flex flex-col ">
          <div className="text-sm">{data.name}</div>
          <div className="text-[10px]">{data.email}</div>
          <div className="text-[10px]">{data.phone}</div>
          <div className="text-[10px]">{data.role}</div>
        </div>
        <div className="">
          <div className="text-xs">Address: {data?.addresses?.length}</div>
          <div className="text-xs">Wishlist: {data?.wishlist?.length}</div>
          <div className="text-xs">Orders: {data?.orders?.length}</div>

        </div>
      </div>
      <div className="px-2 text-xs font-medium text-zinc-500">CreatedAt: {data.createdAt} | UpdatedAt: {data.updatedAt} </div>
    </div>
  )
}

export default UserCard