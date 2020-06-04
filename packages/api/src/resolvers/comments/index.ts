import { ContextWithDBModel } from "../../types";
import {
  QueryCommentsArgs,
  MutationCreateCommentArgs,
} from "../../generated/graphql";
import { request } from "@octokit/request";
import { app } from "../../utils/github";

export async function getComments(
  args: QueryCommentsArgs,
  context: ContextWithDBModel
) {
  const { productUrl, issueNumber, limit = 10, offset } = args;

  const product = await context.db.Product.findOne({ url: productUrl })
    .populate("owner")
    .lean();

  if (!product) {
    throw new Error("Product not found!");
  }

  const { owner, repositoryName } = product;

  const appInstallationAccessToken = await app.getInstallationAccessToken({
    installationId: owner.installationId,
  });

  const [repoOwner, repoName] = repositoryName.split("/");

  const commentsResponse = await request(
    "GET /repos/:owner/:repo/issues/:issue_number/comments",
    {
      owner: repoOwner,
      repo: repoName,
      issue_number: issueNumber,
      per_page: limit!,
      page: offset,
      headers: {
        authorization: `token ${appInstallationAccessToken}`,
      },
    }
  );

  const { data: comments } = commentsResponse;

  return comments.map((comment) => ({
    id: comment.id,
    body: comment.body,
    user: { username: comment.user.login, avatarUrl: comment.user.avatar_url },
    createdAt: new Date(comment.created_at).getTime(),
    updatedAt: new Date(comment.updated_at).getTime(),
  }));
}

export async function addNewComment(
  args: MutationCreateCommentArgs,
  context: ContextWithDBModel
) {
  const { productUrl, issueNumber, commentBody } = args;

  const { githubUserAccessToken } = context.req;

  const product = await context.db.Product.findOne({ url: productUrl })
    .populate("owner")
    .lean();

  if (!product) {
    throw new Error("Product not found!");
  }

  const { owner, repositoryName } = product;

  let accessToken = githubUserAccessToken;

  if (!accessToken) {
    accessToken = await app.getInstallationAccessToken({
      installationId: owner.installationId,
    });
  }

  const [repoOwner, repoName] = repositoryName.split("/");

  const commentResponse = await request(
    "POST /repos/:owner/:repo/issues/:issue_number/comments",
    {
      owner: repoOwner,
      repo: repoName,
      issue_number: issueNumber,
      body: commentBody,
      headers: {
        authorization: `token ${accessToken}`,
      },
    }
  );

  const { data: comment } = commentResponse;

  return {
    id: comment.id,
    body: comment.body,
    user: {
      username: comment.user.login,
      avatarUrl: comment.user.avatar_url,
    },
    createdAt: new Date(comment.created_at).getTime(),
    updatedAt: new Date(comment.updated_at).getTime(),
  };
}
