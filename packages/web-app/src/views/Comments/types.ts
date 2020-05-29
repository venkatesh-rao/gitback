import { IGithubUser, IFeedback } from "../Feedbacks/types";

export interface IComment {
  id: number;
  body: string;
  user: IGithubUser;
  createdAt: number;
  updatedAt: number;
}

export interface CommentsData {
  comments: IComment[];
}

export interface CommentsVars {
  productUrl: string;
  issueNumber: number;
  limit?: number;
  offset: number;
}

export interface FeedbackData {
  feedback: IFeedback;
}
export interface FeedbackVars {
  productUrl: string;
  issueNumber: number;
}
