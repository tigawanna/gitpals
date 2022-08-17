import gql from "graphql-tag";


export const REPOS = gql`
query getRepos($name: String!, $limit:Int,$after: String) {
    user(login: $name) {
    login
    repositories(after :$after, first:$limit){
      edges{
        node{
            id      
            name
            description
            pushedAt
            diskUsage
            url
            visibility
            forkCount
            languages {
              edges {
                node {
                  id
                }
              }
            }
        }
        cursor
      
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
`
