import { request } from "@octokit/request";
import {
  MutationCreateProductArgs,
  QueryProductArgs,
} from "../../generated/graphql";
import { ContextWithDBModel } from "../../types";
import { app } from "../../utils/github";

export async function createNewProduct(
  args: MutationCreateProductArgs,
  context: ContextWithDBModel
) {
  const { productName, productUrl, repositoryName: repository } = args;

  let product = await new context.db.Product({
    name: productName,
    url: productUrl,
    repositoryName: repository,
    owner: context.req.userId,
    developers: [context.req.userId],
  }).save();

  product = await product
    .populate("owner")
    .populate("developers")
    .execPopulate();

  const { _id: id, name, url, repositoryName, owner, developers } = product;

  const appInstallationAccessToken = await app.getInstallationAccessToken({
    installationId: owner.installationId,
  });

  const [repoOwner, repoName] = repository.split("/");

  await request("POST /repos/:owner/:repo/labels", {
    owner: repoOwner,
    repo: repoName,
    name: "public",
    color: "6b46c1",
    description: "This issue has been created by or visible to your app users",
    headers: {
      authorization: `token ${appInstallationAccessToken}`,
    },
  });

  return {
    id,
    name,
    url,
    repositoryName,
    owner,
    developers,
  };
}

export async function getProductDetails(
  args: QueryProductArgs,
  context: ContextWithDBModel
) {
  const { productUrl } = args;

  let product = await context.db.Product.findOne({ url: productUrl });

  if (!product) {
    throw new Error("no such product");
  }

  product = await product
    .populate("owner")
    .populate("developers")
    .execPopulate();

  const { _id: id, name, url, repositoryName, owner, developers } = product;

  return {
    id,
    name,
    url,
    repositoryName,
    owner,
    developers,
  };
}

export async function getAllProductsByApp(context: ContextWithDBModel) {
  const products = await context.db.Product.find({
    developers: { $in: [context.req.userId] },
  })
    .populate("owner")
    .populate("developers")
    .lean();

  return products.map((product) => {
    const { _id: id, name, url, repositoryName, owner, developers } = product;

    return {
      id,
      name,
      url,
      repositoryName,
      owner,
      developers,
    };
  });
}
