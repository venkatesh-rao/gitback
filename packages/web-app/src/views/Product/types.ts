import { IUser } from "../../components/EnhancedRoutes/types";

export interface IProduct {
  id: string | any;
  name: string;
  url: string;
  repositoryName: string;
  owner: IUser;
  developers: IUser[];
}

export interface ProductData {
  product: IProduct;
}

export interface ProductVars {
  productUrl: string;
}
