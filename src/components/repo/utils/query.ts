import gql from "graphql-tag";


export const REPOS = gql`
         query getRepos($name: String!, $first: Int, $after: String) {
           user(login: $name) {
             login
             repositories(after: $after, first: $first) {
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
