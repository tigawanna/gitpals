

export interface USER_FOLLOWING {
  user: UserFollowing;
}
export interface USER_FOLLOWERS {
  user: UserFollowers;
}
export interface UserFollowers {
  followers: FollowType;
}
export interface UserFollowing {
  following: FollowType;
}

export interface FollowType {
  edges: Edge[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface Edge {
  node: FOLLOWNODE;
}
export interface FOLLOWERS {
  edges: Edge[];
  totalCount: number;
  pageInfo: PageInfo;
}
export interface FOLLOWNODE {
  login: string;
  avatarUrl: string;
  id: string;
}


export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}



export interface MINIUSER {
  login: string;
  id: string;
  isFollowingViewer: boolean;
  viewerIsFollowing:boolean;
  bio: string;
  avatarUrl: string;
  isViewer: boolean;
  url: string;
}

export interface FOLLOWER {
  node: FOLLOWNODE;
}







