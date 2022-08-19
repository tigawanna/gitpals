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
import { concatPages } from './utils/helper';

dayjs.extend(relativeTime)
interface RepositoryProps {
username:string|undefined
token:string
}

export const Repository: React.FC<RepositoryProps> = ({username,token}) => {
const [keyword, setKeyword] = useState({word:''})


  const query = useInfiniteGQLQuery(
    ["repositories", username as string],
    token,
    REPOS,
    {
      name: username,
      first: 25,
      after: null,
    },
    {
    getPreviousPageParam: (firstPage: REPOPAGE) => {
        return firstPage?.user?.repositories?.pageInfo?.startCursor ?? null;
      },
      getNextPageParam: (lastPage: REPOPAGE) => {
        // console.log(" end cursor  === ",lastPage.user.repositories.pageInfo.endCursor)
        return lastPage?.user?.repositories?.pageInfo?.endCursor ?? null;
      },
      select: (data:ROOTREPO) => {
         return concatPages(data,keyword.word)
      }
    }
  );

const action = () => {
  //console.log("test query === ", keyword);
  setKeyword({ word: "" });
  // results.items = []
};


const results:any = {}
const data = query.data as ROOTREPO;
const totalRepsLoaded = data?.pages[0]?.user?.repositories?.edges?.length
// console.log("no of loadeds items ==== ",totalRepsLoaded)
// console.log("in pepos === ", query.data);

if (query.isLoading ) {
return <div className="h-full w-full  flex-center ">Loading....</div>;
}  
// const {repos,query} = useRepos(token,username as string,keyword.word)
const repos = data?.pages;
const extras = repos[repos.length - 1].user?.repositories;
const hasMore = extras?.pageInfo?.hasNextPage;

return (
  <div className="min-h-fit w-full flex flex-col justify-between">
    <div className="h-[10%] p-1 w-full flex-center my-5 sticky top-[50px] z-50 bg-white dark:bg-slate-800">
      <SearchBox
        keyword={keyword}
        setKeyword={setKeyword}
        action={action}
        title={"filter repo"}
        results={results}
        search_query={query}
      />
    </div>
    <div className="w-full flex-center sticky top-[12%] ">
      <div className="w-fit flex-center p-[2px] font-bold bg-white dark:bg-slate-900">
        {totalRepsLoaded}/{extras.totalCount}
      </div>
    </div>
    <div className="h-[80%] w-full flex-center flex-wrap  mb-1">
      {repos?.map((repo) => {
        return repo?.user?.repositories?.edges.map((item) => {
          return (
            <RepoCard repo={item.node} key={item.node?.id} token={token} />
          );
        });
      })}
    </div>

    {!query.isFetchingNextPage && hasMore ? (
      <button
        className="m-2 hover:text-purple-400 shadow-lg hover:shadow-purple"
        onClick={() => {
          query.fetchNextPage();
        }}
      >
        --- load more ---
      </button>
    ) : null}
    {query.isFetchingNextPage ? (
      <div className="w-full flex-center m-1 p-1">loading more...</div>
    ) : null}
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
    className=" min-h-fit h-52 m-2 w-[95%] md:w-[40%] lg:w-[30%] p-5 flex-col 
     ustify-between items-center shadow-sm shadow-slate-300 dark:shadow-black  
 border-black border-2 rounded-md"
  >
    <div
      onClick={() => {}}
      className=" flex-col items-center  justify-between  cursor-pointer h-[90%] w-full"
    >
      <div className="text-[20px] font-semibold md:text-xl md:font-bold  break-all ">
        {repo?.name}
      </div>
      <div className="flex flex-wrap text-color">
        {repo?.languages.edges.map((item) => {
          return (
            <div
              key={item.node.id}
              style={{
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: item.node.color,
                borderRadius: "10%",
              }}
              className="p-[1px] m-[1px] text-[10px] font-semibold md:text-[10px]   break-all"
            >
              {item.node.name}
            </div>
          );
        })}
      </div>
      <div className="text-[14px] md:text-[11px] break-word  max-h-[60%] overflow-y-clip ">
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
          <TheIcon Icon={SiVisualstudiocode} size={"18"} color={""} />
        </a>
        <a target="_blank" href={repo.url}>
          <TheIcon Icon={SiGithub} size={"18"} color={""} />
        </a>
      </div>
    </div>
  </div>
);
}
