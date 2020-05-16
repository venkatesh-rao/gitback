import { IProduct } from "../Product/types";

export interface CreateProductData {
  createProduct: IProduct;
}

export interface CreateProductVars {
  productName: string;
  repositoryName: string;
}
