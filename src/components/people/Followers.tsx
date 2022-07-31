import React from "react";
import { useQuery } from "react-query";
import { Follower, MainAuthedUser } from "../../types/UserTypes";
import { getUserWithFollowerDetails } from "./../../utils/githubapi";
import { PersonCard } from "./personCard";


interface FollowersProps {
  url?: string;
  token: string;
  user:MainAuthedUser|undefined
  ogUser:MainAuthedUser|undefined
}

export const Followers: React.FC<FollowersProps> = ({ url, token,user,ogUser }) => {
  const link = url as string;
  const username = ogUser?.login  as string

  const query = useQuery(["followers", token, link,username], () =>
    getUserWithFollowerDetails(token,link,username)
  );

  const followers = query.data as Follower[];

//  console.log("followers === ",followers)

  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

  return (
    <div className="h-fit w-full flex-center  flex-wrap">
      {followers &&
        followers.map((dev, index) => {
          return <PersonCard key={index} dev={dev} token={token} user={user}/>;
        })}
    </div>
  );
};


