import React, { useEffect, useMemo,useState } from 'react'
import { useQuery } from 'react-query';
import { followUser,unfollowUser,getIsUserFollowingMe,getUserWithFollowerDetails } from '../../utils/githubapi';
import { UserCard } from '../Cards/UserCard';
import { MainAuthedUser } from './../../types/UserTypes';


interface HomeProps {
user:MainAuthedUser|undefined
token:string
}

export const Home: React.FC<HomeProps> = ({user,token}) => {

// const url ="https://api.github.com/users/tigawanna/followers"
// const username = user?.login as string

// const query = useQuery(["is", token], () => {
//     getIsUserFollowingMe(token,username,"sharonkorir")
// });


// // callasync().then((res)=>console.log("reults ==== ",res)).catch((e)=>console.log("error ==",e))


// if (query.isLoading) {
//     return <div className="h-full w-full  flex-center ">Loading....</div>;
// }

// console.log("feed dada === ",query.data)

return (
 <div className='h-full w-full  flex-col '>
<div className='w-full '>
<UserCard user={user}/>
</div>

<button onClick={()=>{getIsUserFollowingMe(token,"tigawanna","Harmon758")}}>follow</button>
</div>
);
}
 



