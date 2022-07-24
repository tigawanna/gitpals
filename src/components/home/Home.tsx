import React, { useEffect, useMemo,useState } from 'react'
import { followUser,unfollowUser,getIsUserFollowingMe } from '../../utils/githubapi';
import { UserCard } from '../Cards/UserCard';
import { MainAuthedUser } from './../../types/UserTypes';


interface HomeProps {
user:MainAuthedUser|undefined
token:string
}

export const Home: React.FC<HomeProps> = ({user,token}) => {

return (
 <div className='h-full w-full  flex-col '>
<div className='w-full '>
<UserCard user={user}/>
</div>

<button onClick={()=>{getIsUserFollowingMe(token,"tigawanna","Harmon758")}}>follow</button>
</div>
);
}
 



