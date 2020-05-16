import { IUser } from "../Home/types";

export interface IProduct {
  id: string | any;
  name: string;
  slug: string;
  repositoryName: string;
  owner: IUser;
  developers: IUser[];
}

export interface ProductData {
  product: IProduct;
}

export interface ProductVars {
  productSlug: string;
}
