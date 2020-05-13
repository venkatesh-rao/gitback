import { IProduct } from "../CreateProduct/types";

export interface IFeedback {
  id: any;
  title: string;
  description: string | undefined;
  product: any;
  owner: any;
  status: any;
}

export interface GetProductData {
  getProduct: IProduct;
}

export interface GetProductVars {
  productSlug: string;
}

export interface GetProductFeedbacksVars {
  productId: string;
}

export interface GetProductFeedbacksData {
  getProductFeedbacks: IFeedback[];
}

interface FeedbackInput {
  title: string;
  description?: string;
}

export interface AddProductFeedbackVars {
  productId: string;
  feedback: FeedbackInput;
}

export interface AddProductFeedbackData {
  addProductFeedback: IFeedback;
}
