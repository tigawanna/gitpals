import gql from "graphql-tag";

export const MINI_USER = gql`
  query getMiniUser($name: String!) {
    user(login: $name) {
      login
      id
      isFollowingViewer
      bio
      avatarUrl
      isViewer
      url
    }
  }
`;
export const FOLLOWERS = gql`
  query getFollowers($name: String!, $limit:Int) {
    user(login: $name) {
      followers(first: $limit) {
        edges {
          node {
            login
            avatarUrl
            id
          }
        }
        totalCount
      }
    }
  }
`;
export const FOLLOWING = gql`
         query getFollowers($name: String!, $limit: Int, $after: String) {
           user(login: $name) {
             following(first: $limit, after: $after) {
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

const SIMPLE_USER_QUERY = gql`
  query LOGGEDIN_USER {
    viewer {
      login
      followers(first: 2) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          hasPreviousPage
          endCursor
        }
      }
    }
  }
`;
