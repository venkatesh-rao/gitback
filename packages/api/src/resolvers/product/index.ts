import { ContextWithDBModel } from "../../types";
import {
  MutationCreateProductArgs,
  QueryGetProductArgs,
} from "../../generated/graphql";
import slugify from "slugify";
import shortid from "shortid";

export async function createNewProduct(
  args: MutationCreateProductArgs,
  context: ContextWithDBModel
) {
  const { productName, repositoryName: repository } = args;

  const newSlug = slugify(`${productName}-${shortid.generate()}`);

  let product = await new context.db.Product({
    name: productName,
    slug: newSlug,
    repositoryName: repository,
    owner: context.req.userId,
    developers: [context.req.userId],
  }).save();

  product = await product
    .populate("owner")
    .populate("developers")
    .execPopulate();

  const { _id: id, name, slug, repositoryName, owner, developers } = product;

  return {
    id,
    name,
    slug,
    repositoryName,
    owner,
    developers,
  };
}

export async function getProductDetails(
  args: QueryGetProductArgs,
  context: ContextWithDBModel
) {
  const { productSlug } = args;

  let product = await context.db.Product.findOne({ slug: productSlug });

  if (!product) {
    throw new Error("no such product");
  }

  product = await product
    .populate("owner")
    .populate("developers")
    .execPopulate();

  const { _id: id, name, slug, repositoryName, owner, developers } = product;

  return {
    id,
    name,
    slug,
    repositoryName,
    owner,
    developers,
  };
}
