import React from 'react'
import { useQuery } from 'react-query';
import { RepoType } from '../../types/repo';
import { getAuthedUserRepository } from './../../utils/githubapi';
import dayjs from 'dayjs';
import {BiGitRepoForked} from 'react-icons/bi'
import { useRepos } from './../../utils/hooks';

interface RepositoryProps {
username:string|undefined
token:string
}

export const Repository: React.FC<RepositoryProps> = ({username,token}) => {

const {repos,query} = useRepos(token,username as string)



  if (query.isLoading) {
    return <div className="h-full w-full  flex-center ">Loading....</div>;
  }  
return (
<div className="h-fit w-full flex-center flex-wrap">
    {repos.map((one,index)=>{
        return <RepoCard repo={one} key={index+one.id}/>
    })}
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
          <div className="text-[20px] font-semibold md:text-sm  break-all ">
            {repo?.language}
          </div>
          <div className="text-[14px] md:text-sm  break-all max-h-16 h-full overflow-y-clip">
            {repo?.description}
          </div>

   
        </div>
        <div className="w-full text-[15px] text-sm  flex justify-between ">
           <div className="text-[12px] font-medium">
            last update: {dayjs(repo?.updated_at).format('DD/MM/YYYY')}</div>
            <div className='flex-center'><BiGitRepoForked/> {repo?.forks_count}</div>
            <div className='flex-center'><BiGitRepoForked/> {repo?.visibility}</div>
          </div>

 </div>
);
}