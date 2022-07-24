import React from 'react'
import { MainAuthedUser } from '../../types/UserTypes';

interface UserCardProps {
user:MainAuthedUser|undefined
}

export const UserCard: React.FC<UserCardProps> = ({user}) => {
return (
 <div>
<div className='w-full  h-fit  flex p-2 '>
<div className='flex-center p-1  w-full '>
<img
 className='max-h-24 md:max-h-28 max-w-20 md:max-w-30 mx-2  rounded-[20%]'
 src={user?.avatar_url}
 alt=""
 />

<div className='text-[15px]  flex-col items-center shadow-black shadow p-3  m-2'>

<div className=' text-[15px] md:text-xl font-bold  w-fit'>{user?.name}</div>
<div className='text-[15px] md:text-lg w-fit'>@{user?.login}</div>
<div className='text-[12px]  font-bold font-sans capitalize w-fit '>{user?.bio}</div>

</div>

</div>

</div>
 </div>
);
}
