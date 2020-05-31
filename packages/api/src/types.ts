import { Request, Response } from "express";
import { IFeedbackModel } from "./database/model/FeedbackModel";
import { IProductModel } from "./database/model/ProductModel";
import { IUpvoteModel } from "./database/model/UpvoteModel";
import { IUserModel } from "./database/model/UserModel";

export interface AccessToken {
  userId: string;
  username: string;
  githubUserAccessToken?: string;
}

interface DB {
  Feedback: IFeedbackModel;
  User: IUserModel;
  Product: IProductModel;
  Upvote: IUpvoteModel;
}

interface RequestWithCookies extends Request {
  userId: string;
  username: string;
  githubUserAccessToken?: string;
}

export interface ContextWithDBModel {
  req: RequestWithCookies;
  res: Response<any>;
  db: DB;
}

export interface GithubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  description?: string;
}
