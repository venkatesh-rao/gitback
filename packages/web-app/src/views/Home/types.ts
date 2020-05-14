import { IProduct } from "../CreateProduct/types";

export interface IUser {
  name?: string;
  username: string;
  avatarUrl?: string;
  publicEmail?: string;
  userType: string;
}

export interface ProductsData {
  products: IProduct[];
}
