import { useQuery } from "react-query";
import { RepoType } from "../types/repo";
import { getAuthedUserRepository } from "./githubapi";


export const useRepos=(token:string,username:string)=>{
    const link = `https://api.github.com/users/${username}/repos`
    const query = useQuery(["user-repository", token, link,username], () =>
      getAuthedUserRepository(token,link)
    ); 
    const repos = query.data as RepoType[];
 if(query.isFetched){
   // sort by name in descending
   repos.sort(function(a, b) {
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

 
 return {repos,query}
}
