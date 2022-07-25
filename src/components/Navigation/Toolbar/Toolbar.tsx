import React from 'react'
import { GrHome } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { Link} from "react-router-dom";
;import { Consent } from '../../Modal/Consent';
import { useState } from 'react';
import { MainAuthedUser } from './../../../types/UserTypes';

interface ToolbarProps {
user:MainAuthedUser|undefined
updateToken: (new_token: string | undefined) => void
}

export const Toolbar: React.FC<ToolbarProps> = ({user,updateToken}) => {
const [open, setOpen] = useState(false)
const actionTs=()=>{updateToken(undefined)}

return (
 <div className='w-[100%] bg-slate-500 h-[60px] max-h-[50px] flex-center'>
<IconContext.Provider value={{ size: "25px", className: "table-edit-icons" }} >

{open?<Consent setOpen={setOpen} message={"Sign Out?"} action={actionTs}/>:null}

 <div className='flex flex-grow flex-3 text-lg font-bold'>
     <div className='w-full p-3 bg-slate-400 flex-center'>
     <Link to="/"><GrHome /></Link>
     </div>
     {/* <div className='m-1 w-full p-3 bg-slate-300 flex-center'>
     <Link to="/profile">Profile</Link>
     </div>  
      <div className='m-1 w-full p-3 bg-slate-300 flex-center'>
     <Link to="/user">User</Link>
     </div> */}
  <div 
      onClick={()=>setOpen(true)}
     className='h-[45px]  hover:bg-slate-700 flex-center m-1'>
    {/* <FaUserCircle /> */}
    <img
     className='h-[100%] w-fit rounded-md m-1'
     src={user?.avatar_url}
     alt=""
    />
     </div>

</div>   
</IconContext.Provider>
 </div>
);
}
