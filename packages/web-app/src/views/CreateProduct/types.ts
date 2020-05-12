import { IUser } from "../Home/types";

export interface IProduct {
  id: string | any;
  name: string;
  slug: string;
  repositoryName: string;
  owner: IUser;
  developers: IUser[];
}

export interface CreateProductData {
  createProduct: IProduct;
}

export interface CreateProductVars {
  productName: string;
  repositoryName: string;
}
