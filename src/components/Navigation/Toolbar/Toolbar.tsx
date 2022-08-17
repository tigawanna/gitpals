import React from 'react'
import { GrHome } from "react-icons/gr";
import { IconContext } from "react-icons/lib";
import { Link} from "react-router-dom";
;import { Consent } from '../../Modal/Consent';
import { useState } from 'react';
import { MainAuthedUser } from './../../../types/UserTypes';
import { useUserSearch } from '../../../utils/hooks'



interface ToolbarProps {
user:MainAuthedUser|undefined
updateToken: (new_token: string | undefined) => void
token:string
}

export const Toolbar: React.FC<ToolbarProps> = ({user,updateToken,token}) => {
const [open, setOpen] = useState(false)
const [keyword, setKeyword] = useState({word:''})
const actionTs=()=>{updateToken(undefined)}
const action=()=>{
   console.log("test query === ",keyword)}

const results = useUserSearch(token,keyword.word)
//console.log('user results === ',results)
return (
  <div className="w-[100%] bg-slate-500 h-[60px] max-h-[50px] flex-center">
    <IconContext.Provider
      value={{ size: "25px", className: "table-edit-icons" }}
    >
      {open ? (
        <Consent setOpen={setOpen} message={"Sign Out?"} action={actionTs} />
      ) : null}

      <div className="flex items-center justify-between w-full text-lg font-bold">
        <div className="w-fit p-3 bg-slate-400 flex-center">
          <Link to="/">
            <GrHome />
          </Link>
        </div>

        {/* <div className='h-full w-[80%]  flex-col-center font-normal '>
   <SearchBox keyword={keyword} setKeyword={setKeyword} action={action} title={"email or username"}/>
   </div>
  {results?.total_count>0 || keyword.word!==""?
  <div className=' w-[70%]   fixed top-12 flex-center  z-60 '>
   <ResultsList results={results?.items}/>
   </div>:null} */}

        <div
          onClick={() => setOpen(true)}
          className="h-[45px]  hover:bg-slate-700 flex-center m-1">
          {/* <FaUserCircle /> */}
          <img
            className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
            src={user?.avatar_url}
            alt=""
          />
        </div>
      </div>
    </IconContext.Provider>
  </div>
);
}
