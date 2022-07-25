import React, { useEffect,useState } from 'react'
import { getAuthedUserDetails } from '../../utils/githubapi';
import { UserCard } from '../Cards/UserCard';
import { Followers } from '../people/Followers';
import { Following } from '../people/Following';
import { Follower, MainAuthedUser } from './../../types/UserTypes';
import { useQuery } from 'react-query';
import { useLocation } from "react-router-dom";


interface TheirProfileProps {
token:string
ogUser:MainAuthedUser|undefined
}

export const TheirProfile: React.FC<TheirProfileProps> = ({token,ogUser}) => {
// const followers_url ="https://api.github.com/user/following"
const location = useLocation();


//@ts-ignore
const dev = location.state?.dev as Follower

const query = useQuery(['main-user',token,dev.url],()=>getAuthedUserDetails(token,dev.url));
const user = query.data as MainAuthedUser
const followers_url =`https://api.github.com/users/${user?.login}/following`

if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

return (
 <div className='h-full w-full  flex-col '>
<div className='w-full '>
<UserCard user={user}/>
</div>


<div className='w-full  h-fit  flex-col p-2 bg-slate-200 font-sans'>
<div className='text-lg font-bold'>Followers</div>
<Followers url={user?.followers_url} token={token} user={ogUser}/>
</div>

<div className='w-full  h-fit  flex-col p-2 bg-slate-200 font-sans'>
<div className='text-lg font-bold'>Followers</div>
<Following token={token} url={followers_url} user={ogUser}/>
</div>



 </div>
);
}
 



