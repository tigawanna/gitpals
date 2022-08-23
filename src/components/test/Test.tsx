import React from 'react'
import { useInfiniteGQLQuery } from '../../utils/graphql/gqlInfiniteQuery';
import { REPOS } from '../repo/utils/query';
import { REPOPAGE } from '../repo/utils/type';

interface TestProps {
token:string
}

export const Test: React.FC<TestProps> = ({token}) => {  
 const username = 'tigawanna'
      const query = useInfiniteGQLQuery(
        ["repositories", username as string],
        token,
        REPOS,
        {
          name: username,
          first: 5,
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
        //   select: (data: ROOTREPO) => {
        //     return concatPages(data, keyword.word);
        //   },
        }
      );
console.log("test query data ====== ",query.data)
return (
 <div className='text-green-400 dark:text-red-600 text-xl flex-center
  dark:bg-black w-full h-full '>

HELLO
 </div>
);
}
