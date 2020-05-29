import { Request, Response, NextFunction } from "express";
import { AccessToken } from "../types";
import { verify } from "jsonwebtoken";
import createToken from "./create-token";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessTokenCookie = req.cookies["gitback-at"];

  // if not access token present, skip this step
  if (!accessTokenCookie) {
    return next();
  }
  // parse the access token
  try {
    const data: AccessToken = verify(
      accessTokenCookie,
      process.env.ACCESS_TOKEN_SECRET || ""
    ) as AccessToken;

    if (!data || (!data.githubUserAccessToken && !data.installationId)) {
      throw new Error("Unauthorized user!");
    }

    (req as any).githubUserAccessToken = data.githubUserAccessToken;
    (req as any).userId = data.userId;
    (req as any).username = data.username;
    (req as any).installationId = data.installationId;

    const token = createToken(data);

    let cookieAttributes = {};

    res.cookie("gitback-at", token, {
      ...cookieAttributes,
      maxAge: 3456000000,
    });
  } catch (err) {
    return next();
  }

  return next();
}
