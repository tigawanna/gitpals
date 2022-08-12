import React, { useState, useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { RepoType } from "../types/repo";
import { SearchResult } from "../types/UserTypes";
import { getAuthedUserRepository, getUserByNameOrEmail } from "./githubapi";

export const useRepos = (token: string, username: string, keyword: string) => {
  const link = `https://api.github.com/users/${username}/repos`;
  const query = useQuery(
    ["user-repository", token, link, username],
    () => getAuthedUserRepository(token, link),
    {
      select: (repos) =>
        repos.filter((repo: RepoType) =>
          repo.name.toLowerCase().includes(keyword.toLowerCase())
        ),
    }
  );

  const repos = query.data as RepoType[];

  if (query.isFetched) {
    // sort by name in descending
    repos.sort(function (a, b) {
      const nameA = a.pushed_at.toUpperCase(); // ignore upper and lowercase
      const nameB = b.pushed_at.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }

  return { repos, query };
};




export const useUserSearch = (token: string, keyword: string) => {
const debouncedValue = useDebounce(keyword, 3);
const query = useQuery(
  ["user-searched", token, debouncedValue],
  () => getUserByNameOrEmail(debouncedValue ,token),
  {
    enabled:debouncedValue.length>2
    // select: (repos) =>
    //   repos.filter((repo: RepoType) =>
    //     repo.name.toLowerCase().includes(keyword.toLowerCase())
    //   ),
  }
);
const results = query.data as SearchResult
return {results,search_query:query}
};


export default function useDebounce(value: string, delay_in_seconds: number = 5) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay_in_seconds*1000);

    // Cancel the timeout if value changes (also on delay_in_seconds change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay_in_seconds]);

  return debouncedValue;
}
