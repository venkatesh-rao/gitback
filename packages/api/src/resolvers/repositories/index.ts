import { Repository } from "../../generated/graphql";
import { GithubRepository } from "../../types";

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
  appInstallationAccessToken: string
): Promise<Repository[]> {
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
