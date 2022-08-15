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
  query getFollowers($name: String!) {
    user(login: $name) {
      followers(first: 10) {
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
  query getFollowers($name: String!) {
    user(login: $name) {
      following(first: 10) {
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