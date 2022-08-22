import gql from "graphql-tag";


export const REPOSWITHOUTRECENTCOMMIT = gql`
         query getRepos($name: String!, $first: Int, $after: String) {
           user(login: $name) {
             login
             repositories(
               after: $after
               first: $first
               orderBy: { field: PUSHED_AT, direction: DESC }
             ) {
               edges {
                 node {
                   id
                   name
                   description
                   pushedAt
                   diskUsage
                   url
                   visibility
                   forkCount

                   languages(first: $first) {
                     edges {
                       node {
                         id
                         color
                         name
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
       `;


const RECENTREPOCOMMIT = gql`
  query getRepoRecentCommit {
    repository(owner: "tigawanna", name: "gitpals") {
      defaultBranchRef {
        name
        target {
          ... on Commit {
            history(first: 1) {
              edges {
                node {
                  committedDate
                  author {
                    name
                  }
                  message
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const REPOS = gql`
         query getRepos($name: String!, $first: Int, $after: String) {
           user(login: $name) {
             login
             repositories(
               after: $after
               first: $first
               orderBy: { field: PUSHED_AT, direction: DESC }
             ) {
               edges {
                 node {
                   id
                   name
                   description
                   pushedAt
                   diskUsage

                   url
                   visibility
                   forkCount
                   refs(
                     refPrefix: "refs/heads/"
                     orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
                     first: 2
                   ) {
                     edges {
                       node {
                         name
                         id
                         target {
                           ... on Commit {
                             history(first: 1) {
                               edges {
                                 node {
                                   committedDate
                                   author {
                                     name
                                   }
                                   message
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }

                   languages(first: $first) {
                     edges {
                       node {
                         id
                         color
                         name
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
       `;
