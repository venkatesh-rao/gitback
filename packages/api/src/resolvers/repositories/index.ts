import { Repository } from "../../generated/graphql";
import { GithubRepository, ContextWithDBModel } from "../../types";
import { app } from "../../utils/github";

const { request } = require("@octokit/request");

async function listRepositories(appInstallationAccessToken: string) {
  // https://developer.github.com/v3/repos/#list-repositories-for-the-authenticated-user
  const response = await request("GET /installation/repositories", {
    headers: {
      authorization: `token ${appInstallationAccessToken}`,
      accept: "application/vnd.github.machine-man-preview+json",
    },
  });

  return response.data.repositories;
}

export async function getAppRepositories(
  context: ContextWithDBModel
): Promise<Repository[]> {
  const user = await context.db.User.findById(context.req.userId);

  if (!user) {
    throw new Error("no user found");
  }

  if (!user.installationId) {
    throw new Error("Unauthorized request");
  }

  const appInstallationAccessToken = await app.getInstallationAccessToken({
    installationId: user.installationId,
  });

  const repos = await listRepositories(appInstallationAccessToken);

  return repos.map((repo: GithubRepository) => {
    const {
      id,
      node_id: nodeId,
      name,
      full_name: fullName,
      private: isPrivateRepo,
      description,
    } = repo;

    return {
      id,
      nodeId,
      name,
      fullName,
      private: isPrivateRepo,
      description,
    };
  });
}
