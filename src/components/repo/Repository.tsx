import React, { useState } from 'react'
import { RepoType } from '../../types/repo';
import dayjs from 'dayjs';
import {BiGitRepoForked} from 'react-icons/bi'
import {FiActivity} from 'react-icons/fi'
import { useRepos } from './../../utils/hooks';
import relativeTime from 'dayjs/plugin/relativeTime'
import { SearchBox } from '../Shared/SearchBox';
dayjs.extend(relativeTime)
interface RepositoryProps {
username:string|undefined
token:string
}

export const Repository: React.FC<RepositoryProps> = ({username,token}) => {
const [keyword, setKeyword] = useState({word:''})
const {repos,query} = useRepos(token,username as string,keyword.word)
const action = () => {
  console.log("test query === ", keyword);
  setKeyword({ word: "" });
  // results.items = []
};

console.log("in pepos === ",repos)
const results:any = {}





if (query.isLoading && !repos) {
return <div className="h-full w-full  flex-center ">Loading....</div>;
}  

return (
<div className="h-full w-full flex-col-center ">
<div className='h-[10%] w-full flex-center'>
<SearchBox keyword={keyword} setKeyword={setKeyword} action={action} title={"search repo"}
results={results} search_query={query}
/>
</div>
<div className="h-[80%] w-full flex-center flex-wrap">
    {repos.map((one,index)=>{
        return <RepoCard repo={one} key={index+one.id}/>
    })}
</div>
</div>
);
}



interface RepoCardProps {
repo:RepoType
}

export const RepoCard: React.FC<RepoCardProps> = ({repo}) => {
return (
    <div className="h-52 w-[95%] md:w-[40%] lg:w-[30%] p-5 flex-col 
    ustify-between items-center shadow-lg shadow-slate-300  m-2 border-black border-2 rounded-md">
        <div 
        onClick={() => {}}
        className=" flex-col items-center  justify-between  cursor-pointer h-[90%] w-full">
     
           <div className="text-[25px] font-semibold md:text-xl md:font-bold  break-all ">
            {repo?.name}
          </div>
          <div className="text-[15px] font-semibold md:text-sm  text-purple-700 break-all ">
            {repo?.language}
          </div>
          <div className="text-[14px] md:text-sm  break-all max-h-16 h-full overflow-y-clip">
            {repo?.description}
          </div>

   
        </div>
        <div className="w-full text-[15px] text-sm  flex justify-between ">
           <div className="text-[12px] font-bold flex-center">
           <FiActivity/>{" "}{dayjs(repo?.pushed_at).fromNow()}
           </div>
            <div className='flex-center'><BiGitRepoForked/> {repo?.forks_count}</div>
            <div className='flex-center'>{repo?.visibility}</div>
            <div className='flex-center'>{repo?.size} kbs</div>
          </div>

 </div>
);
}
