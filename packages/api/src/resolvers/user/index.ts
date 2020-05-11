import { ContextWithDBModel } from "../../types";
import { get } from "../../utils/http-request";

export async function getLoggedInUser(context: ContextWithDBModel) {
  const user = await context.db.User.findById(context.req.userId);

  const { username, avatarUrl, name, publicEmail, installationId } = user!;

  return {
    username,
    avatarUrl,
    name,
    publicEmail,
    installationId,
  };
}

export async function getLoggedInUserFromGithub(githubUserAccessToken: string) {
  const user = await get("/user", githubUserAccessToken);

  const {
    login: username,
    avatar_url: avatarUrl,
    name,
    email: publicEmail,
  } = user!;

  return {
    username,
    avatarUrl,
    name,
    publicEmail,
  };
}
