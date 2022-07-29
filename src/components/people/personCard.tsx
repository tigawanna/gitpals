import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Follower } from '../../types/UserTypes';
import { followUser,unfollowUser } from '../../utils/githubapi';
import { MainAuthedUser } from '../../types/UserTypes';


interface PersonCardProps {
dev: Follower;
token:string
user:MainAuthedUser|undefined
}
  
  export const PersonCard: React.FC<PersonCardProps> = ({ dev,token,user }) => {
  
  const [yes, setYes] = useState<any>(dev?.following_me)  

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

    return (
      <div className="h-fit w-[45%] md:w-[31%] lg:w-[15%] p-2 flex 
      ustify-between items-center shadow shadow-black hover:shadow-md m-2 ">
        <div 
        onClick={() => showUserProfile()}
        className=" flex items-center justify-evenly min-w-[60%] cursor-pointer w-full">
          <img
            className="max-h-10  max-w-12  m-[2px] mr-2 rounded-[20%]"
            src={dev?.avatar_url}
            loading="lazy"
            alt=""
          />
           <div className="text-[12px] font-semibold md:text-sm  break-all ">
            @{dev?.login}
          </div>
          

        </div>

        {yes?<button 
           onClick={()=>unfollowThem(dev.login,token)}
           className='bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit'>
            {"Unfollow"}
          </button>:
          <button 
          onClick={()=>followThem(dev.login,token)}
           className='bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[10px] rounded-md p-[4px] m-[3px] h-fit '>
            {"Follow"}
            </button>}
      </div>
    );
  };
  