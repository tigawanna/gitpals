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
    limit: 5,
    after: null,
  });

  const data = query.data as ROOTFOLLOWERS;
  const pages = data?.pages


  console.log();
  console.log("test followers === ", data);
  console.log("has next page == ", query.hasNextPage);

  return (
    <div className="w-full h-full flex-col-center border border-white">
      <TheIcon Icon={SiGithub} size={"70"} color={"green"} />

        {
            pages?.map((page)=>{
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


      {query.hasNextPage?<button
        onClick={() => {
          setPage((prev) => prev + 1);
          query.fetchNextPage();
        }}
      >
        --- more ---
      </button>:null }
      <div>
        {query.isFetching && !query.isFetchingNextPage
          ? "Background Updating..."
          : null}
      </div>
    </div>
  );
};
