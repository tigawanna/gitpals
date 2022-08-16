import React from "react";
import { SiGithub } from "react-icons/si";
import { TheIcon } from "../Shared/TheIcon";
import gql from "graphql-tag";
import { useGitGQLQuery } from "../people/utils/gql";
import { useTestGQLQuery } from "./gqlhook";
import { ROOTFOLLOWERS } from "./types";
import { useInfiniteQuery } from "react-query";
import { fetchRepositories } from "./query";

interface TestProps {
  token: string;
}
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const GET_COUNTRY = gql`
  query($code: ID!) {
    country(code: $code) {
      name
    }
  }
`;
const STATUS = gql`
  query {
    viewer {
      login
    }
  }
`;

export const TESTFOLLOW = gql`
  query getTest($name: String!, $limit: Int, $after: String) {
    user(login: $name) {
      followers(first: $limit, after: $after) {
        edges {
          node {
            login
            avatarUrl
            id
          }
        }
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const Test: React.FC<TestProps> = ({ token }) => {
  const [page, setPage] = React.useState(0);
  const query = useTestGQLQuery(["testing"], token, TESTFOLLOW, {
    name: "tigawanna",
    limit: 2,
    after: null,
  });

  const data = query.data as ROOTFOLLOWERS;
  const maindata = data?.pages[page]?.user?.followers;
  const followers = maindata?.edges;
  const nextcursor = maindata?.pageInfo?.endCursor;
  const pages = data?.pages

  console.log();
  console.log("test followers === ", data);
  // console.log("test end cursor == ", nextcursor);

  return (
    <div className="w-full h-full flex-col-center border border-white">
      <TheIcon Icon={SiGithub} size={"70"} color={"green"} />

        {
            pages.map((page)=>{
                return page.user.followers.edges.map((item)=>{
                    return (
                      <div
                        key={item.node.id}
                        className='="p-1 m-1 bg-slate-700 w-[50%] flex-center'>
                        {item.node.login}
                      </div>
                    );
                })
            })
        }


      <button
        onClick={() => {
          setPage((prev) => prev + 1);
          query.fetchNextPage();
        }}
      >
        --- more ---
      </button>
      <div>
        {query.isFetching && !query.isFetchingNextPage
          ? "Background Updating..."
          : null}
      </div>
    </div>
  );
};






interface TestProps {
  token: string;
}


export const TestTest: React.FC<TestProps> = ({ token }) => {
  // const [page, setPage] = React.useState(0)
  // const query  = useTestGQLQuery(["testing"],token ,TESTFOLLOW,
  // {name:"tigawanna",limit:2,after:null});

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    "repositories",
    ({ pageParam = 1 }) => fetchRepositories(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_count / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  // const data = query.data as ROOTFOLLOWERS
  // const maindata = data?.pages[page]?.user?.followers
  // const followers = maindata?.edges
  // const nextcursor = maindata?.pageInfo?.endCursor

  const followers = data?.pages;

  console.log("test followers === ", followers);
  // console.log("test end cursor == ", nextcursor);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start border border-white">
      <TheIcon Icon={SiGithub} size={"70"} color={"green"} />
      {/* @ts-ignore */}
      <ul className="h-[500px]  w-[70%] m-4">
        {data?.pages.map((page) =>
          page.items.map((repo: any) => (
            <li key={repo.id} className="p-1 m-1 bg-red-500 w-full">
              <p>
                <b>{repo.name}</b>
              </p>
              <p>{repo.description}</p>
            </li>
          ))
        )}
      </ul>
      <button
        className="h-[10%] fixed bottom-10 bg-slate-900 px-3 m-2"
        onClick={() => {
          fetchNextPage();
        }}
      >
        --- more ---
      </button>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
};
