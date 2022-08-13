export interface MINIUSER {
  login: string;
  id: string;
  isFollowingViewer: boolean;
  bio: string;
  avatarUrl: string;
  isViewer: boolean;
  url: string;
}


export interface FOLLOWER {
  node: FOLLOWERNODE;
}

export interface FOLLOWERNODE {
  login: string;
  avatarUrl: string;
  id: string;
}
