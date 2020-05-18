import { request } from "@octokit/request";
import Axios from "axios";

export interface IssueParams {
  owner: string;
  repo: string;
  title: string;
  body: string;
  labels: string[];
}

export async function get(reqPath: string, accessToken: string) {
  const response = await Axios.get(`https://api.github.com${reqPath}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const { data } = response;

  return data;
}

export async function createIssue(
  accessToken: string,
  { owner, repo, ...createIssueParams }: IssueParams
) {
  // https://developer.github.com/v3/issues/#create-an-issue
  const issueResponse = await request("POST /repos/:owner/:repo/issues", {
    owner,
    repo,
    headers: {
      authorization: `token ${accessToken}`,
      accept: "application/vnd.github.machine-man-preview+json",
    },
    ...createIssueParams,
  });

  return issueResponse.data;
}
