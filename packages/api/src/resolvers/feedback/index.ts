import { request } from "@octokit/request";
import {
  MutationCreateFeedbackArgs,
  QueryFeedbacksArgs,
  QueryFeedbackArgs,
} from "../../generated/graphql";
import { ContextWithDBModel } from "../../types";
import { app } from "../../utils/github";

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

  const { _id, owner, repositoryName, ...restProductData } = product;

  let accessToken = githubUserAccessToken;

  if (!accessToken) {
    accessToken = await app.getInstallationAccessToken({
      installationId: owner.installationId,
    });
  }

  const [repoOwner, repoName] = repositoryName.split("/");

  const issueResponse = await request("POST /repos/:owner/:repo/issues", {
    title,
    body: description || "",
    repo: repoName,
    owner: repoOwner,
    labels: ["public"],
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  const { data: issue } = issueResponse;

  await new context.db.Feedback({
    product: productId,
    issueNumber: issue.number,
  }).save();

  return {
    id: `${issue.number}`,
    title: issue.title,
    description: issue.body,
    product: {
      id: productId,
      owner,
      repositoryName,
      ...restProductData,
    },
    user: { username: issue.user.login, avatarUrl: issue.user.avatar_url },
    state: issue.state,
    createdAt: new Date(issue.created_at).getTime(),
    updatedAt: new Date(issue.updated_at).getTime(),
  };
}

export async function getProductFeedbacks(
  args: QueryFeedbacksArgs,
  context: ContextWithDBModel
) {
  const { productId, limit = 10, offset } = args;

  const product = await context.db.Product.findById(productId)
    .populate("owner")
    .lean();

  if (!product) {
    throw new Error("invalid product");
  }

  const { _id, owner, repositoryName, ...restProductData } = product;

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
    per_page: limit as number,
    page: offset,
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
      product: {
        id: productId,
        owner,
        repositoryName,
        ...restProductData,
      },
      user: { username: issue.user.login, avatarUrl: issue.user.avatar_url },
      state: issue.state,
      createdAt: new Date(issue.created_at).getTime(),
      updatedAt: new Date(issue.updated_at).getTime(),
    };
  });

  return sanitizedFeedbacks;
}

export async function getFeedback(
  args: QueryFeedbackArgs,
  context: ContextWithDBModel
) {
  const { productUrl, issueNumber } = args;

  const product = await context.db.Product.findOne({ url: productUrl })
    .populate("owner")
    .lean();

  if (!product) {
    throw new Error("invalid product");
  }

  const { _id: productId, owner, repositoryName, ...restProductData } = product;

  const appInstallationAccessToken = await app.getInstallationAccessToken({
    installationId: owner.installationId,
  });

  const [repoOwner, repoName] = repositoryName.split("/");

  const response = await request(
    "GET /repos/:owner/:repo/issues/:issue_number",
    {
      owner: repoOwner,
      repo: repoName,
      issue_number: issueNumber,
      headers: {
        authorization: `token ${appInstallationAccessToken}`,
      },
    }
  );

  const issue = response.data;

  const sanitizedFeedbacks = {
    id: `${issue.number}`,
    title: issue.title,
    description: issue.body,
    product: {
      id: productId,
      owner,
      repositoryName,
      ...restProductData,
    },
    user: { username: issue.user.login, avatarUrl: issue.user.avatar_url },
    state: issue.state,
    createdAt: new Date(issue.created_at).getTime(),
    updatedAt: new Date(issue.updated_at).getTime(),
  };

  return sanitizedFeedbacks;
}
