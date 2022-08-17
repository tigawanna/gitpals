import React, { useState } from 'react'
import { RepoType } from '../../types/repo';
import dayjs from 'dayjs';
import { BiGitRepoForked} from "react-icons/bi";
import {FiActivity} from 'react-icons/fi'
import { SiVisualstudiocode, SiGithub } from "react-icons/si";
import { useRepos } from './../../utils/hooks';
import relativeTime from 'dayjs/plugin/relativeTime'
import { SearchBox } from '../Shared/SearchBox';
import { TheIcon } from '../Shared/TheIcon';
import { useInfiniteGQLQuery } from './../../utils/graphql/gqlInfiniteQuery';
import { REPOS } from './utils/query';
import { REPONODE, REPOPAGE, ROOTREPO } from './utils/type';

dayjs.extend(relativeTime)
interface RepositoryProps {
username:string|undefined
token:string
}

export const Repository: React.FC<RepositoryProps> = ({username,token}) => {
const [keyword, setKeyword] = useState({word:''})


  const query = useInfiniteGQLQuery(
    ["test", username as string],
    token,
    REPOS,
    {
      name: username,
      first: 25,
      after: null,
    },
    {
      select:(repos:ROOTREPO)=>{ 

   const deepFiltered = repos.pages.map((repo)=>
       repo?.user?.repositories?.edges?.filter((rep) =>
           rep.node.name.toLowerCase().includes(keyword.word.toLowerCase())
          ))
  const filtered =deepFiltered[0]

        // const filtered = repos.pages[0].user.repositories.edges.filter((repo) =>
        //    repo.node.name.toLowerCase().includes(keyword.word.toLowerCase())
        // );

      
         console.log("deep filter =======  ", filtered);
        // console.log("filtered === ",filtered)
        // console.log(" repos ===== ",repos)
        const pageParams = repos?.pageParams
        const rep = repos.pages[0].user.repositories
        const user = {
          login:repos.pages[0].user.login,
          repositories:{edges:filtered,
          totalCount:rep.totalCount,
          pageInfo:rep.pageInfo
        }
      }
     const  newRepos = {pageParams,pages:[{user:user}]}
    //  console.log("new repod ====  ", newRepos)
     return newRepos

       },
      getPreviousPageParam: (firstPage: REPOPAGE) => {
        return firstPage?.user?.repositories?.pageInfo?.startCursor ?? null;
      },
      getNextPageParam: (lastPage: REPOPAGE) => {
        return lastPage?.user?.repositories?.pageInfo?.endCursor ?? null;
      },


    }
  );

const action = () => {
  //console.log("test query === ", keyword);
  setKeyword({ word: "" });
  // results.items = []
};


const results:any = {}
const data = query.data as ROOTREPO;

// console.log("in pepos === ", query);
if (query.isLoading ) {
return <div className="h-full w-full  flex-center ">Loading....</div>;
}  
// const {repos,query} = useRepos(token,username as string,keyword.word)
const repos = data?.pages;


return (
<div className="min-h-fit w-full flex flex-col justify-between">
<div className='h-[10%] w-full flex-center my-5'>
<SearchBox keyword={keyword} setKeyword={setKeyword} action={action} title={"search repo"}
results={results} search_query={query}
/>
</div>
<div className="h-[80%] w-full flex-center flex-wrap  mb-1">
    {repos?.map((repo)=>{
       return repo?.user?.repositories?.edges.map((item)=>{
        return <RepoCard repo={item.node} key={item.node?.id} token={token} />;
       })
    })}


</div>
</div>
);
}






interface RepoCardProps {
repo:REPONODE
token:string
}

export const RepoCard: React.FC<RepoCardProps> = ({repo,token}) => {
// console.log(repo.html_url)
// const repo_link = authedurl(repo.html_url,token)
const vslink = `https://vscode.dev/${repo.url}`;

return (
  <div
    className="h-52 w-[95%] md:w-[40%] lg:w-[30%] p-5 flex-col 
     ustify-between items-center shadow-lg shadow-slate-300  m-2 border-black border-2 rounded-md"
  >
    <div
      onClick={() => {}}
      className=" flex-col items-center  justify-between  cursor-pointer h-[90%] w-full"
    >
      <div className="text-[25px] font-semibold md:text-xl md:font-bold  break-all ">
        {repo?.name}
      </div>
      <div className="flex flex-wrap text-color">
        {repo?.languages.edges.map((item)=>{
          return (
            <div
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: item.node.color,
                borderRadius:"20%"
              }}
              className="p-1 m-[1px] text-[12px] font-semibold md:text-[18px]   break-all"
            >
              {item.node.name}
            </div>
          );
        })}
      </div>
      <div className="text-[14px] md:text-sm  break-all max-h-16 h-full overflow-y-clip">
        {repo?.description}
      </div>
    </div>

    <div className="w-full text-[15px] text-sm  flex justify-between ">
      <div className="text-[12px] font-bold flex-center">
        <FiActivity /> {dayjs(repo?.pushedAt).fromNow()}
      </div>
      <div className="flex-center">
        <BiGitRepoForked /> {repo?.forkCount}
      </div>
      <div className="flex-center">{repo?.visibility}</div>
      <div className="flex-center">{repo?.diskUsage} kbs</div>
      <div className="flex-center">
        <a target="_blank" href={vslink}>
          <TheIcon Icon={SiVisualstudiocode} size={"18"} color={"black"} />
        </a>
        <a target="_blank" href={repo.url}>
          <TheIcon Icon={SiGithub} size={"18"} color={"black"} />
        </a>
      </div>
    </div>
  </div>
);
}
