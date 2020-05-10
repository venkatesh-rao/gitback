import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from "../generated/graphql";
import { ContextWithDBModel } from "../types";
import createToken from "../utils/create-token";
import { authenticate, app } from "../utils/github";
import { getLoggedInUser } from "./user";
import { getAppRepositories } from "./repositories";
import { createNewProduct } from "./product";

const Query: QueryResolvers = {
  me: (_parent, _args, context: ContextWithDBModel) => {
    if (!context.req.githubUserAccessToken || !context.req.userId) {
      throw new Error("Unauthorized user request");
    }

    return getLoggedInUser(context);
  },
  listAppRepositories: async (_parent, _args, context: ContextWithDBModel) => {
    if (!context.req.installationId) {
      throw new Error("Unauthorized app request");
    }

    const githubAppAccessToken = await app.getInstallationAccessToken({
      installationId: context.req.installationId,
    });

    return getAppRepositories(githubAppAccessToken);
  },
};

const Mutation: MutationResolvers = {
  githubUserAuthenticate: async (
    _parent,
    args,
    context: ContextWithDBModel
  ) => {
    const { code } = args;

    const githubUserAccessToken = await authenticate(code, "user");

    const loggedInUser = await getLoggedInUser(context);

    const query = {
      name: loggedInUser.name,
      username: loggedInUser.username,
      avatarUrl: loggedInUser.avatarUrl,
      publicEmail: loggedInUser.publicEmail,
      // userType is 0 for normal user
      userType: 0,
    };

    // Find the document
    let user = await context.db.User.findOne({
      username: loggedInUser.username,
    });

    if (!user) {
      user = await new context.db.User(query).save();
    }

    const { _id: userId, username, installationId } = user;

    // create tokens to set in cokkies
    const token = createToken({
      userId,
      username,
      installationId,
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
  githubAppAuthenticate: async (_parent, args, context: ContextWithDBModel) => {
    const { installationId } = args;

    const loggedInUser = context.req;

    if (!loggedInUser.userId || !loggedInUser.username) {
      throw new Error("Unauthorized user request");
    }

    const query = {
      _id: loggedInUser.userId,
      username: loggedInUser.username,
    };

    const update = { installationId, userType: 1 };

    // Find the document
    await context.db.User.findOneAndUpdate(query, update);

    // create tokens to set in cokkies
    const token = createToken({
      userId: loggedInUser.userId,
      username: loggedInUser.username,
      githubUserAccessToken: loggedInUser.githubUserAccessToken,
      installationId,
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

  createProduct: async (_parent, args, context: ContextWithDBModel) => {
    if (!context.req.userId || !context.req.installationId) {
      throw new Error("Unauthorized request");
    }

    const createdProduct = await createNewProduct(args, context);

    return createdProduct;
  },
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query,
  Mutation,
};

export default resolvers;
