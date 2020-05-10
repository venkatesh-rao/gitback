import { IUser } from "../Home/Home";

interface Product {
  id: string | any;
  name: string;
  slug: string;
  repositoryName: string;
  owner: IUser;
  developers: IUser[];
}

export interface CreateProductData {
  createProduct: Product;
}

export interface CreateProductVars {
  productName: string;
  repositoryName: string;
}
