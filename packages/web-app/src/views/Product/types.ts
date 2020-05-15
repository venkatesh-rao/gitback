import { IProduct } from "../CreateProduct/types";

export interface IFeedback {
  id: string;
  title: string;
  description: string;
  product: string;
  user: string;
  state: string;
  createdAt: number;
  updatedAt: number;
}

export interface ProductData {
  product: IProduct;
}

export interface ProductVars {
  productSlug: string;
}

export interface FeedbacksVars {
  productId: string;
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
