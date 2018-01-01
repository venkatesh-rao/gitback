import { ContextWithDBModel } from "../../types";
import { request } from "@octokit/request";

export async function getLoggedInUser(context: ContextWithDBModel) {
  const user = await context.db.User.findById(context.req.userId);

  if (!user) {
    return null;
  }

  const { username, avatarUrl, name, publicEmail, installationId } = user;

  return {
    username,
    avatarUrl,
    name,
    publicEmail,
    installationId,
  };
}

export async function getLoggedInUserFromGithub(githubUserAccessToken: string) {
  const userResponse = await request("GET /user", {
    headers: {
      authorization: `token ${githubUserAccessToken}`,
    },
  });

  const { data: user } = userResponse;

  if (!user) {
    return null;
  }

  const {
    login: username,
    avatar_url: avatarUrl,
    name,
    email: publicEmail,
  } = user;

  return {
    username,
    avatarUrl,
    name,
    publicEmail,
  };
}
