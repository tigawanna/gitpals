import React from "react";
import { useQuery } from "react-query";
import { Follower } from "../../types/UserTypes";
import { UserCard } from "../Cards/UserCard";
import { getAuthedUserDetails } from "./../../utils/githubapi";

interface FollowersProps {
  url?: string;
  relation:string
}

export const Followers: React.FC<FollowersProps> = ({ url,relation }) => {
  const link = url as string;
  const token = "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";
  // const authed_user = "https://api.github.com/user"

  console.log("url relation === ",relation,url)
  const query = useQuery(["main-user-followers", token, link,relation], () =>
  getAuthedUserDetails(token, link)
  );
  console.log("user's folowers url link=== ", link);
  console.log("user's folowers === ", query.data);
  const followers = query.data as Follower[];
 
  return (
  <div className="h-fit w-full flex  flex-wrap">

    {
    followers&&followers.map((dev,index)=>{
    return( <FollowerCard key={index} dev={dev}/>)
    })
    }
  </div>
  );
};


interface FollowerCardProps {
dev:Follower
}

export const FollowerCard: React.FC<FollowerCardProps> = ({dev}) => {
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
