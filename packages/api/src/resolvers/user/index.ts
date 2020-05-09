import { ContextWithDBModel } from "../../types";

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
