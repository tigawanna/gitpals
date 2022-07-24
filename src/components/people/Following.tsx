import React from "react";
import { useQuery } from "react-query";
import { Follower, MainAuthedUser } from "../../types/UserTypes";
import {
getAuthedUserFollowers,
} from "./../../utils/githubapi";
import { useNavigate } from "react-router-dom";
import { PersonCard } from "./personCard";

interface FollowingProps {
  token: string;
  url: string;
  user:MainAuthedUser|undefined
}

export const Following: React.FC<FollowingProps> = ({ token, url,user }) => {
 const query = useQuery(["main-user-following", token, url], () =>
    getAuthedUserFollowers(token, url)
  );
  const followers = query.data as Follower[];

  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

 return (
    <div className="h-fit w-full flex  flex-wrap">
      {followers &&
        followers.map((dev, index) => {
          return <PersonCard key={index} dev={dev} token={token} user={user}/>;
        })}
    </div>
  );
};



