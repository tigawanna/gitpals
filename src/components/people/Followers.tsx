import React from "react";
import {MainAuthedUser } from "../../types/UserTypes";
import { PersonCard } from "./personCard";
import { useGitGQLQuery } from './utils/gql';
import { FOLLOWERS } from "./utils/queries";
import { FOLLOWER, USER_FOLLOWERS } from "./utils/types";


interface FollowersProps {
  url?: string;
  token: string;
  user:MainAuthedUser|undefined
  ogUser:MainAuthedUser|undefined
}

export const Followers: React.FC<FollowersProps> = ({ url, token,user,ogUser }) => {
  const link = url as string;
  const username = ogUser?.login  as string

  // const query = useQuery(["followers", token, link,username], () =>
  //   getUserWithFollowerDetails(token,link,username)
  // );
const [cursor, setCursor] = React.useState<string|null>(null); 
//   const following = query.data as Follower[];
const cursor_var = cursor?cursor:"null"
const query = useGitGQLQuery(
  ["followers", cursor_var, user?.login as string],
  token,
  FOLLOWERS,
  {
    name: user?.login,
    limit: 30,
    after: cursor,
  },
  { keepPreviousData:true}
);
  const response = query.data as USER_FOLLOWERS

  const followers = response?.user?.followers?.edges
  const pageInfo = response?.user?.followers?.pageInfo 
  
   
//  console.log("followers === ",followers)

  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

  return (
    <div className="h-fit w-full flex-center  flex-wrap">
      {followers &&
        followers.map((dev, index:number) => {
          return <PersonCard key={index} dev={dev?.node} token={token} user={user}/>;
        })}
    </div>
  );
};


