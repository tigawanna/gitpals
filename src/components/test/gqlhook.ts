import { useQuery,useInfiniteQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";
import { DocumentNode } from "graphql";
import { FOLLOWERSPAGE } from "./types";

export const useTestGQLQuery = (
  key: string[],
  token: string,
  query: DocumentNode,
  variables: {},
  config = {}
) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);
 interface FetchFn {
  queryKey: string[];
  signal: {};
  meta?:any
  pageParam?:string
}
  const fetchData = async (deps:any) => {
   console.log("fetch function deps === ",deps);
    const nextPageParam = deps?.pageParam?deps.pageParam:null
    //@ts-ignore
    variables.after=nextPageParam
        console.log("variables in function === ", variables);
    return await graphQLClient.request(query, variables);
  };

  // const fetchData = async () => await request(endpoint, query, variables);

  return useInfiniteQuery(key, fetchData, {
    getPreviousPageParam: (firstPage) => {
        return firstPage?.user?.followers?.pageInfo?.startCursor ?? null;
    },
    getNextPageParam: (lastPage:FOLLOWERSPAGE) => {
        return lastPage?.user?.followers?.pageInfo?.endCursor ?? null
    },
  });
};
