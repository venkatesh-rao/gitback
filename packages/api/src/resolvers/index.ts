import { authenticate } from "../utils/github";
import {
  QueryResolvers,
  MutationResolvers,
  Resolvers,
} from "../generated/graphql";
import createToken from "../utils/create-token";

const Query: QueryResolvers = {
  me: (_parent, _args, _context) => {
    return {
      name: "User",
    };
  },
};

const Mutation: MutationResolvers = {
  githubAuthenticate: async (_parent, _args, _context) => {
    const { code } = _args;
    const accessToken = await authenticate(code);

    // create tokens to set in cokkies
    const token = createToken(accessToken);

    /* Store the tokens in cookies  */
    let cookieAttributes = {};

    _context.res.cookie("gitback-at", token, {
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
