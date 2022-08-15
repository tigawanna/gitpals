import React from "react";
import { useQuery } from "react-query";
import { Follower, MainAuthedUser } from "../../types/UserTypes";
import {
getUserWithFollowerDetails,
} from "./../../utils/githubapi";
import { useNavigate } from "react-router-dom";
import { PersonCard } from "./personCard";
import { useGitGQLQuery } from "./utils/gql";
import { FOLLOWING } from "./utils/queries";
import { FOLLOWER } from "./utils/types";

interface FollowingProps {
  token: string;
  url: string;
  user:MainAuthedUser|undefined
  ogUser:MainAuthedUser|undefined
}

export const Following: React.FC<FollowingProps> = ({ token, url,user,ogUser }) => {
  
const username = ogUser?.login  as string
// const query = useQuery(["following", token, url], () =>
//     getUserWithFollowerDetails(token, url,username)
//   );

//   const followers = query.data as Follower[];
const query = useGitGQLQuery(["following", user?.login as string], token, FOLLOWING, {
    name: user?.login,
  });
  const followers = query?.data?.user?.following?.edges as FOLLOWER[];

// //console.log("followers === ",followers)
  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

 return (
    <div className="h-fit w-full flex-center  flex-wrap">
      {followers &&
        followers.map((dev, index) => {
          return <PersonCard key={index} dev={dev?.node} token={token} user={user}/>;
        })}
    </div>
  );
};



