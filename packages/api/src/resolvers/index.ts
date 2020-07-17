import {
  MutationCreateFeedbackArgs,
  MutationCreateProductArgs,
  MutationGithubAppAuthenticateArgs,
  MutationGithubUserAuthenticateArgs,
  MutationResolvers,
  QueryCommentsArgs,
  QueryFeedbacksArgs,
  QueryFeedbackArgs,
  QueryProductArgs,
  QueryResolvers,
  Resolvers,
  MutationCreateCommentArgs,
} from "../generated/graphql";
import { ContextWithDBModel } from "../types";
import createToken from "../utils/create-token";
import { app, authenticate } from "../utils/github";
import { addNewFeedback, getProductFeedbacks, getFeedback } from "./feedback";
import {
  createNewProduct,
  getAllProductsByApp,
  getProductDetails,
} from "./product";
import { getAppRepositories } from "./repositories";
import { getLoggedInUser, getLoggedInUserFromGithub } from "./user";
import { getComments, addNewComment } from "./comments";

const Query: QueryResolvers = {
  me: (_parent, _args, context: ContextWithDBModel) => {
    // if no user logged-in fail silently
    if (!context.req.githubUserAccessToken || !context.req.userId) {
      return null;
    }

    return getLoggedInUser(context);
  },

  repositories: async (_parent, _args, context: ContextWithDBModel) => {
    if (!context.req.userId) {
      throw new Error("Unauthorized app request");
    }

    return getAppRepositories(context);
  },

  products: async (_parent, _args, context: ContextWithDBModel) => {
    if (!context.req.userId) {
      throw new Error("Unauthorized user");
    }

    return getAllProductsByApp(context);
  },
  product: async (
    _parent,
    args: QueryProductArgs,
    context: ContextWithDBModel
  ) => {
    return getProductDetails(args, context);
  },
  feedbacks: async (
    _parent,
    args: QueryFeedbacksArgs,
    context: ContextWithDBModel
  ) => {
    return getProductFeedbacks(args, context);
  },
  feedback: async (
    _parent,
    args: QueryFeedbackArgs,
    context: ContextWithDBModel
  ) => {
    return getFeedback(args, context);
  },

  comments: async (
    _parent,
    args: QueryCommentsArgs,
    context: ContextWithDBModel
  ) => {
    return getComments(args, context);
  },
};

const Mutation: MutationResolvers = {
  githubUserAuthenticate: async (
    _parent,
    args: MutationGithubUserAuthenticateArgs,
    context: ContextWithDBModel
  ) => {
    const { code } = args;

    const githubUserAccessToken = await authenticate(code, "user");

    const githubUser = await getLoggedInUserFromGithub(githubUserAccessToken);

    if (!githubUser) {
      throw new Error("Github user not found");
    }

    const { name, username, avatarUrl, publicEmail } = githubUser;

    const query = {
      name,
      username,
      avatarUrl,
      publicEmail,
      // userType is 0 for normal user
      userType: 0,
    };

    // Find the document
    let user = await context.db.User.findOne({
      username,
    });

    if (!user) {
      user = await new context.db.User(query).save();
    }

    const { _id: userId } = user;

    // create tokens to set in cokkies
    const token = createToken({
      userId,
      username,
      githubUserAccessToken,
    });

    /* Store the tokens in cookies  */
    let cookieAttributes = {};

    context.res.cookie("gitback-at", token, {
      ...cookieAttributes,
      // expires in 40 days
      maxAge: 3456000000,
    });

    return token;
  },
  githubAppAuthenticate: async (
    _parent,
    args: MutationGithubAppAuthenticateArgs,
    context: ContextWithDBModel
  ) => {
    const { installationId } = args;

    const { userId } = context.req;

    if (!userId) {
      throw new Error("Unauthorized user request");
    }

    const query = {
      _id: userId,
    };

    const update = { installationId, userType: 1 };

    // Find the document
    const updatedUser = await context.db.User.findOneAndUpdate(query, update);

    if (!updatedUser) {
      return false;
    }

    return true;
  },
  logout: (_parent, _args, context: ContextWithDBModel) => {
    context.res.clearCookie("gitback-at");
    return true;
  },

  createProduct: async (
    _parent,
    args: MutationCreateProductArgs,
    context: ContextWithDBModel
  ) => {
    if (!context.req.userId) {
      throw new Error("Unauthorized request");
    }

    const createdProduct = await createNewProduct(args, context);

    return createdProduct;
  },

  createFeedback: async (
    _parent,
    args: MutationCreateFeedbackArgs,
    context: ContextWithDBModel
  ) => {
    const createdFeedback = await addNewFeedback(args, context);

    return createdFeedback;
  },

  createComment: async (
    _parent,
    args: MutationCreateCommentArgs,
    context: ContextWithDBModel
  ) => {
    const createComment = await addNewComment(args, context);

    return createComment;
  },
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query,
  Mutation,
};

export default resolvers;
