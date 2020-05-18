export interface IComment {
  id: number;
  body: string;
  user: string;
  createdAt: number;
  updatedAt: number;
}

export interface CommentsData {
  comments: IComment[];
}

export interface CommentsVars {
  productId: string;
  issueNumber: number;
}
