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
import { FOLLOWER, FOLLOWERS, USER_FOLLOWING } from "./utils/types";

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
const [cursor, setCursor] = React.useState<string|null>(null); 
//   const following = query.data as Follower[];
const cursor_var = cursor?cursor:"null"
const query = useGitGQLQuery(
  ["following", cursor_var, user?.login as string],
  token,
  FOLLOWING,
  {
    name: user?.login,
    limit: 30,
    after: cursor,
  },
  { keepPreviousData:true}
);
  const response = query.data as USER_FOLLOWING

  const following = response?.user?.following?.edges
  const pageInfo = response?.user?.following?.pageInfo 
  
  console.log("following === ",following)
  // const last_item_id = following[following.length - 1].node.id;
  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }

 return (
    <div className="h-fit w-full flex-center  flex-wrap">
      {following &&
        following.map((dev, index) => {
          return <PersonCard key={index} dev={dev?.node} token={token} user={user}/>;
        })}
     {pageInfo?.hasNextPage?<button className="px-1 m-1 bg-slate-500"
      onClick={()=>setCursor(pageInfo.endCursor)}
      >load more</button>:null}
    </div>
  );
};



