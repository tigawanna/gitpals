import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Follower } from '../../types/UserTypes';
import { followUser,unfollowUser } from '../../utils/githubapi';
import { MainAuthedUser } from '../../types/UserTypes';
import { useGitGQLQuery } from './utils/gql';
import { MINIUSER, FOLLOWERNODE } from './utils/types';
import { MINI_USER } from './utils/queries';


interface PersonCardProps {
dev: FOLLOWERNODE;
token:string
user:MainAuthedUser|undefined
}
  
export const PersonCard: React.FC<PersonCardProps> = ({ dev,token,user }) => {

   
const query = useGitGQLQuery(['mini-user',dev.login],token,MINI_USER,{name:dev?.login})

const miniuser = query?.data?.user as MINIUSER

// console.log("mini user gql query ", miniuser);
const [yes, setYes] = useState<any>(miniuser?.isFollowingViewer)  
useEffect(()=>{
setYes(miniuser?.isFollowingViewer)
},[miniuser?.isFollowingViewer])
const navigate = useNavigate();
const showUserProfile = () => {
navigate(`/personprofile`, { state: { dev } });
};
 
const followThem=(their_name:string,token:string)=>{
  setYes(true)
  followUser(their_name,token)
 } 
 const unfollowThem=(their_name:string,token:string)=>{
  setYes(false)
  unfollowUser(their_name,token)
 } 
  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }
    return (
      <div
        className="h-32 w-[95%] md:w-[31%] lg:w-[20%] p-2 flex 
      justify-evenly items-center shadow shadow-black hover:shadow-md m-2 "
      >
        <div
          onClick={() => showUserProfile()}
          className=" flex items-center justify-between min-w-[60%] cursor-pointer w-full"
        >
          <img
            className="max-h-14  max-w-24  m-[2px] mr-2 rounded-[20%]"
            src={dev?.avatarUrl}
            loading="lazy"
            alt=""
          />
          <div className="flex flex-col  w-[80%]">
            <div className="text-[12px] font-bold md:text-[16px]  break-all w-100%]">
              @{dev?.login}
            </div>
            <div className="text-[12px] font-normal md:text-sm  break-word w-[100%]">
              {miniuser?.bio}
            </div>
          </div>
        </div>

        {yes ? (
          <button
            onClick={() => unfollowThem(dev.login, token)}
            className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit"
          >
            {"Unfollow"}
          </button>
        ) : (
          <button
            onClick={() => followThem(dev.login, token)}
            className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit "
          >
            {"Follow"}
          </button>
        )}
      </div>
    );
  };
  