import { ContextWithDBModel } from "../../types";
import {
  MutationAddProductFeedbackArgs,
  QueryGetProductFeedbacksArgs,
} from "../../generated/graphql";
import { createIssue } from "../../utils/http-request";
import { app } from "../../utils/github";

export async function addNewFeedback(
  args: MutationAddProductFeedbackArgs,
  context: ContextWithDBModel
) {
  const {
    productId,
    feedback: { title, description },
  } = args;
  const { userId, githubUserAccessToken } = context.req;

  const status = await context.db.Status.findOne({
    slug: "feedback-open",
  }).lean();

  let newFeedback = await new context.db.Feedback({
    title,
    description,
    product: productId,
    owner: userId,
    status: status?._id,
    issueNumber: 0,
  }).save();

  newFeedback = await newFeedback
    .populate("status")
    .populate({
      path: "product",
      populate: {
        path: "owner",
      },
    })
    .populate("owner")
    .execPopulate();

  const {
    _id: id,
    title: newTitle,
    description: newDescription,
    owner,
    product,
    status: newStatus,
  } = newFeedback;

  let accessToken = githubUserAccessToken;

  if (!accessToken) {
    accessToken = await app.getInstallationAccessToken({
      installationId: product.owner.installationId,
    });
  }

  const [repoOwner, repoName] = product.repositoryName.split("/");

  const createdIssue = await createIssue(accessToken, {
    title,
    body: description || "",
    repo: repoName,
    owner: repoOwner,
  });

  await context.db.Feedback.findByIdAndUpdate(id, {
    issueNumber: createdIssue.number,
  });

  return {
    id,
    title: newTitle,
    description: newDescription,
    product,
    owner,
    status: newStatus,
  };
}

export async function getProductFeedbacks(
  args: QueryGetProductFeedbacksArgs,
  context: ContextWithDBModel
) {
  const { productId } = args;

  const feedbacks = await context.db.Feedback.find({
    product: productId,
  })
    .populate("status")
    .populate("product")
    .populate("owner")
    .exec();

  return feedbacks.map((feedback) => {
    const {
      _id: id,
      title: newTitle,
      description: newDescription,
      product,
      owner,
      status: newStatus,
    } = feedback;

    return {
      id,
      title: newTitle,
      description: newDescription,
      product,
      owner,
      status: newStatus,
    };
  });
}
