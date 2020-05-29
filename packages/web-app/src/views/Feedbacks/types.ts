import { IProduct } from "../Product/types";

export interface IFeedback {
  id: string;
  title: string;
  description?: string;
  product: IProduct;
  user: IGithubUser;
  state: string;
  createdAt: number;
  updatedAt: number;
}

export interface IGithubUser {
  username: string;
  avatarUrl: string;
}

export interface FeedbacksVars {
  productId: string;
  limit?: number;
  offset: number;
}

export interface FeedbacksData {
  feedbacks: IFeedback[];
}

interface FeedbackInput {
  title: string;
  description?: string;
}

export interface CreateFeedbackVars {
  productId: string;
  feedback: FeedbackInput;
}

export interface CreateFeedbackData {
  createFeedback: IFeedback;
}
