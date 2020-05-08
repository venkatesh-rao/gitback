import { Request, Response } from "express";
import { IFeedbackModel } from "./database/model/FeedbackModel";
import { IUserModel } from "./database/model/UserModel";
import { IUpvoteModel } from "./database/model/UpvoteModel";
import { IStatusModel } from "./database/model/StatusModel";
import { IProductModel } from "./database/model/ProductModel";

export interface AccessToken {
  githubUserAccessToken?: string;
  githubAppAccessToken?: string;
}

interface DB {
  Feedback: IFeedbackModel;
  User: IUserModel;
  Product: IProductModel;
  Status: IStatusModel;
  Upvote: IUpvoteModel;
}

interface RequestWithCookies extends Request {
  githubUserAccessToken: string;
  githubAppAccessToken: string;
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
