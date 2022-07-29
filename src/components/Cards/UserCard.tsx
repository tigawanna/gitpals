import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import { MainAuthedUser } from '../../types/UserTypes';
import dayjs from 'dayjs'
import {IoLocationOutline} from 'react-icons/io5'
import {AiOutlineMail} from 'react-icons/ai'
import { followUser, unfollowUser } from '../../utils/githubapi';
interface UserCardProps {
user:MainAuthedUser|undefined
token:string
ogUser:MainAuthedUser|undefined
}

export const UserCard: React.FC<UserCardProps> = ({user,token,ogUser}) => {

const navigate = useNavigate(); 
const [yes, setYes] = useState<any>(user?.following_me)
const username = user?.login as string
const admin = ogUser?.login === user?.login
console.log("og user",admin)
const followThem=(their_name:string,token:string)=>{
    setYes(true)
    followUser(their_name,token)
   } 
   const unfollowThem=(their_name:string,token:string)=>{
    setYes(false)
    unfollowUser(their_name,token)
   }     
return (
 <div>
<div className='w-full  h-fit   p-2 flex-col-center'>
<div className='flex-center p-1  w-full '>
<img
 className='max-h-24 md:max-h-28 max-w-20 md:max-w-30 mx-2  rounded-[20%]'
 src={user?.avatar_url}
 alt=""
 />

<div className='text-[15px]  flex-col items-center shadow-black shadow p-3  m-2'>

<div className=' text-[15px] md:text-xl font-bold  w-fit'>{user?.name}</div>
<div className='text-[15px] md:text-lg w-fit'>@{user?.login}</div>
<div className='text-[12px]  font-bold font-sans capitalize w-fit '>{user?.bio}</div>

</div>
</div>
<div className='w-[70%] flex justify-between'>
<div 
onClick={()=>navigate('/profile',{ state: { dev:user } })}
className='text-[12px] md:text-lg w-fit h-fit hover:bg-slate-500 rounded.sm hover:text-white cursor-pointer p-[2px]'>
folllowers: {user?.followers}</div>
{!admin?<div>
{yes?<button 
onClick={()=>unfollowThem(username,token)}
className='bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[12px] rounded-md p-[4px] m-[3px] h-fit'>
{"Unfollow"}</button>:
<button 
onClick={()=>followThem(username,token)}
className='bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 text-[12px] rounded-md p-[4px] m-[3px] h-fit '>
{"Follow"}
</button>}
</div>:null}
<div 
onClick={()=>navigate('/profile',{ state: { dev:user }})}
className='text-[12px] md:text-lg w-fit h-fit rounded-sm hover:bg-slate-500 hover:text-white cursor-pointer p-[2px]'>
    folllowing: {user?.following}</div>
</div>

<div className='w-[90%] flex-center flex-wrap'>
<UserCardDetails user={user} />
</div>
</div>
</div>
);
}




interface UserCardDetailsProps {
user:MainAuthedUser|undefined
}

const fields = [["company","company: "],
["location",<IoLocationOutline/>],["email",<AiOutlineMail/>],["hireable: ","hireble"]]

export const UserCardDetails: React.FC<UserCardDetailsProps> = ({user}) => {
return (
<div className='flex'>
{
fields.map((dev,index)=>{
//@ts-ignore
if(user[dev[0]] && user[dev[0]] !== '')
return (

<div 
// @ts-ignore
key={index+dev[0]}
className='text-[15px] border border-slate-800 rounded-sm mr-[3px] px-1 flex-center'>
    {/* @ts-ignore */}
    {dev[1]}  {user[dev[0]]}
</div>
)
})
}

 </div>
);
}
