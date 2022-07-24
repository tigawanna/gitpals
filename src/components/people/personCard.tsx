import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Follower } from '../../types/UserTypes';
import UserContext from '../../utils/context';
import { followUser, getIsUserFollowingMe, unfollowUser } from '../../utils/githubapi';
import { MainAuthedUser } from './../../types/UserTypes';


interface PersonCardProps {
dev: Follower;
token:string
user:MainAuthedUser|undefined
}
  
  export const PersonCard: React.FC<PersonCardProps> = ({ dev,token,user }) => {
    const data = true
    // const me = user?.login as string
    // const them = dev?.login
    //  const query = useQuery(["follow-status", token,me,them], () =>
    //  getIsUserFollowingMe(token,me,them)
    // );
    
    // console.log("me in the bag and dev ", me,them)
    // const data = query.data
    // console.log("me in the bag and dev ", me,them,data)

    const navigate = useNavigate();
    const showUserProfile = () => {
     navigate(`/profile/${dev.login}`, { state: { dev } });
    };

    // if (query.isLoading) {
    //     return <div className="h-full w-full  flex-center ">Loading....</div>;
    // }

    return (
      <div
        onClick={() => showUserProfile()}
        className="h-fit w-[45%] md:w-[31%] lg:w-[15%] p-2 shadow shadow-black m-2 cursor-pointer"
      >
        <div className=" flex items-center justify-evenly">
          <img
            className="max-h-10  max-w-12  m-[2px] mr-2 rounded-[20%]"
            src={dev?.avatar_url}
            alt=""
          />
           <div className="text-[12px] font-semibold md:text-sm  break-all ">
            @{dev?.login}
          </div>
          
         {data?<button 
           onClick={()=>unfollowUser(dev.login,token)}
           className='bg-slate-600 text-white text-[13px] rounded-sm p-1'>
            {"Unfollow"}
          </button>:
          <button 
          onClick={()=>followUser(dev.login,token)}
           className='bg-slate-600 text-white text-[13px] rounded-sm p-1'>
            {"Follow"}
            </button>}
        </div>
      </div>
    );
  };
  