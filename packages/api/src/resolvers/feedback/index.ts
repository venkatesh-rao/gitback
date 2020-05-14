import { request } from "@octokit/request";
import {
  MutationCreateFeedbackArgs,
  QueryFeedbacksArgs,
} from "../../generated/graphql";
import { ContextWithDBModel } from "../../types";
import { app } from "../../utils/github";
import { createIssue } from "../../utils/http-request";

export async function addNewFeedback(
  args: MutationCreateFeedbackArgs,
  context: ContextWithDBModel
) {
  const {
    productId,
    feedback: { title, description },
  } = args;

  const { githubUserAccessToken } = context.req;

  const product = await context.db.Product.findById(productId)
    .populate("owner")
    .lean();

  if (!product) {
    throw new Error("invalid product");
  }

  const { owner, repositoryName } = product;

  let accessToken = githubUserAccessToken;

  if (!accessToken) {
    accessToken = await app.getInstallationAccessToken({
      installationId: owner.installationId,
    });
  }

  const [repoOwner, repoName] = repositoryName.split("/");

  const issue = await createIssue(accessToken, {
    title,
    body: description || "",
    repo: repoName,
    owner: repoOwner,
  });

  await new context.db.Feedback({
    product: productId,
    issueNumber: issue.number,
  }).save();

  return {
    id: `${issue.number}`,
    title: issue.title,
    description: issue.body,
    product: productId,
    user: issue.user.login,
    state: issue.state,
    createdAt: new Date(issue.created_at).getTime(),
    updatedAt: new Date(issue.updated_at).getTime(),
  };
}

export async function getProductFeedbacks(
  args: QueryFeedbacksArgs,
  context: ContextWithDBModel
) {
  const { productId } = args;

  const product = await context.db.Product.findById(productId)
    .populate("owner")
    .lean();

  if (!product) {
    throw new Error("invalid product");
  }

  const { owner, repositoryName } = product;

  const appInstallationAccessToken = await app.getInstallationAccessToken({
    installationId: owner.installationId,
  });

  const [repoOwner, repoName] = repositoryName.split("/");

  const response = await request("GET /repos/:owner/:repo/issues", {
    owner: repoOwner,
    repo: repoName,
    sort: "created",
    direction: "desc",
    state: "all",
    labels: "public",
    headers: {
      authorization: `token ${appInstallationAccessToken}`,
    },
  });

  const githubIssues = response.data;

  const sanitizedFeedbacks = githubIssues.map((issue) => {
    return {
      id: `${issue.number}`,
      title: issue.title,
      description: issue.body,
      product: productId,
      user: issue.user.login,
      state: issue.state,
      createdAt: new Date(issue.created_at).getTime(),
      updatedAt: new Date(issue.updated_at).getTime(),
    };
  });

  return sanitizedFeedbacks;
}
