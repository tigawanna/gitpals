import React from "react";
import { useQuery } from "react-query";
import { Follower } from "../../types/UserTypes";
import { UserCard } from "../Cards/UserCard";
import { getAuthedUserDetails, getAuthedUserFollowers } from "./../../utils/githubapi";

interface FollowingProps {

}

export const Following: React.FC<FollowingProps> = ({ }) => {
 
  const token = "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";
  const following_url ="https://api.github.com/user/following"
  // const authed_user = "https://api.github.com/user"

  console.log("url relation === ",following_url)
  const query = useQuery(["main-user-following", token, following_url], () =>
  getAuthedUserFollowers(token, following_url)
  );
  console.log("user's folowers url link=== ", following_url);
  console.log("user's folowers === ", query.data);
  const followers = query.data as Follower[];
 
  return (
  <div className="h-fit w-full flex  flex-wrap">

    {
    followers&&followers.map((dev,index)=>{
    return( <FollowingCard key={index} dev={dev}/>)
    })
    }
  </div>
  );
};


interface FollowingCardProps {
dev:Follower
}

export const FollowingCard: React.FC<FollowingCardProps> = ({dev}) => {
return (
 <div className="h-fit w-[45%] md:w-[31%] lg:w-[15%] p-2 shadow shadow-black m-2 ">
<div className=" flex items-center">
<img
 className='max-h-10  max-w-12  m-[2px] mr-2 rounded-[20%]'
 src={dev?.avatar_url}
 alt=""
 />  
 <div className='text-[12px] font-semibold md:text-sm  break-all '>@{dev?.login}</div>

</div>
 </div>
);
}
