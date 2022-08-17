export interface ROOTREPO {
  pages: Page[];
  pageParams: any[];
}

export interface Page {
  user: User;
}

export interface User {
  login: string;
  repositories: Repositories;
}

export interface Repositories {
  edges: REPOEDGE[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface REPOEDGE {
  node: Node;
  cursor: string;
}

export interface REPONODE {
  id: string;
  name: string;
  description?: string;
  pushedAt: string;
  diskUsage: number;
  url: string;
  visibility: string;
  forkCount: number;
  languages: Languages;
}

export interface Languages {
  edges: LANGUAGEEDGE[];
}

export interface LANGUAGEEDGE {
  node: LANGUAGENODE;
}

export interface LANGUAGENODE {
  id: string;
  color: string;
  name: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
