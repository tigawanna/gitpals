import React from 'react'
import { GrHome } from "react-icons/gr";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { Link} from "react-router-dom";
;import { Consent } from '../../Modal/Consent';
import { useState } from 'react';
import { MainAuthedUser } from './../../../types/UserTypes';
import { useUserSearch } from '../../../utils/hooks'
import { TheIcon } from '../../Shared/TheIcon';
import { useTheme } from './../../../utils/themeHook';



interface ToolbarProps {
user:MainAuthedUser|undefined
updateToken: (new_token: string | undefined) => void
token:string
}

export const Toolbar: React.FC<ToolbarProps> = ({user,updateToken,token}) => {
const [open, setOpen] = useState(false)
const [keyword, setKeyword] = useState({word:''})
const actionTs=()=>{updateToken(undefined)}
const action=()=>{console.log("test query === ",keyword)}
const {colorTheme,setTheme} = useTheme()

const results = useUserSearch(token,keyword.word)
const mode = colorTheme === "light" ? BsSunFill : BsFillMoonFill;
const toggle = () =>{setTheme(colorTheme)}
//console.log('user results === ',results)
return (
  <div className="w-[100%] bg-slate-200 dark:bg-slate-700 h-[60px] max-h-[50px] flex-center">
    {open ? (
      <Consent setOpen={setOpen} message={"Sign Out?"} action={actionTs} />
    ) : null}

    <div className="flex items-center justify-between w-full text-lg font-bold ">
      <div className="w-fit p-1  flex-center bg-white">
        <Link to="/">
          <TheIcon Icon={GrHome} size={"25"} color={""} />
        </Link>
      </div>

      <div className="w-fit p-1  flex-center">
        <TheIcon Icon={mode} size={"25"} color={""} iconAction={toggle}/>
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
        className="h-[45px]  hover:bg-slate-700 flex-center m-1"
      >
        {/* <FaUserCircle /> */}
        <img
          className="h-[80%] w-fit rounded-[50%] m-1 border border-white"
          src={user?.avatar_url}
          alt=""
        />
      </div>
    </div>
  </div>
);
}
