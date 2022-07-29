import React from "react";
import { useQuery } from "react-query";
import { Follower, MainAuthedUser } from "../../types/UserTypes";
import {
getUserWithFollowerDetails,
} from "./../../utils/githubapi";
import { useNavigate } from "react-router-dom";
import { PersonCard } from "./personCard";

interface FollowingProps {
  token: string;
  url: string;
  user:MainAuthedUser|undefined
}

export const Following: React.FC<FollowingProps> = ({ token, url,user }) => {
  const username = user?.login  as string

 const query = useQuery(["following", token, url], () =>
    getUserWithFollowerDetails(token, url,username)
  );

  const followers = query.data as Follower[];

// console.log("followers === ",followers)
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



