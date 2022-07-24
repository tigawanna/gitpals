import React, { useEffect, useMemo,useState } from 'react'
import { UserCard } from '../Cards/UserCard';
import { Followers } from '../people/Followers';
import { Following } from '../people/Following';
import { MainAuthedUser } from './../../types/UserTypes';


interface ProfileProps {
user:MainAuthedUser|undefined
token:string
}

export const Profile: React.FC<ProfileProps> = ({user,token}) => {
// const followers_url ="https://api.github.com/user/following"
const followers_url =`https://api.github.com/users/${user?.login}/following`



return (
 <div className='h-full w-full  flex-col '>
<div className='w-full '>
<UserCard user={user}/>
</div>


<div className='w-full  h-fit  flex-col p-2 bg-slate-200 font-sans'>
<div className='text-lg font-bold'>Followers</div>
<Followers url={user?.followers_url} token={token} user={user}/>
</div>

<div className='w-full  h-fit  flex-col p-2 bg-slate-200 font-sans'>
<div className='text-lg font-bold'>Followers</div>
<Following token={token} url={followers_url} user={user}/>
</div>



 </div>
);
}
 



