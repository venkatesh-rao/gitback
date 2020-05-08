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

const Query: QueryResolvers = {
  me: (_parent, _args, context: ContextWithDBModel) => {
    if (!context.req.githubUserAccessToken) {
      throw new Error("Unauthorized user request");
    }

    return getLoggedInUser(context.req.githubUserAccessToken);
  },
  listAppRepositories: (_parent, _args, context: ContextWithDBModel) => {
    if (!context.req.githubAppAccessToken) {
      throw new Error("Unauthorized app request");
    }

    return getAppRepositories(context.req.githubAppAccessToken);
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

    const loggedInUser = await getLoggedInUser(githubUserAccessToken);

    const query = {
      name: loggedInUser.name,
      username: loggedInUser.username,
      avatarUrl: loggedInUser.avatarUrl,
      publicEmail: loggedInUser.publicEmail,
      // userType is 0 for normal user
      userType: 0,
    };

    const update = { expire: new Date() };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    await context.db.User.findOneAndUpdate(query, update, options);

    // create tokens to set in cokkies
    const token = createToken({ githubUserAccessToken });

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
    const { code, installationId } = args;

    const githubUserAccessToken = await authenticate(code, "app");

    const githubAppAccessToken = await app.getInstallationAccessToken({
      installationId,
    });

    const loggedInUser = await getLoggedInUser(githubUserAccessToken);

    const query = {
      name: loggedInUser.name,
      username: loggedInUser.username,
      avatarUrl: loggedInUser.avatarUrl,
      publicEmail: loggedInUser.publicEmail,
      // only app/product owner has installation id
      installationId,
      // userType is 1 for app/product owner
      userType: 1,
    };

    const update = { expire: new Date() };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    await context.db.User.findOneAndUpdate(query, update, options);

    // create tokens to set in cokkies
    const token = createToken({ githubUserAccessToken, githubAppAccessToken });

    /* Store the tokens in cookies  */
    let cookieAttributes = {};

    context.res.cookie("gitback-at", token, {
      ...cookieAttributes,
      // expires in 40 days
      maxAge: 3456000000,
    });

    return token;
  },
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query,
  Mutation,
};

export default resolvers;
