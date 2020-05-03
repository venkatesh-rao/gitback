import { authenticate } from "../utils/github";
import {
  QueryResolvers,
  MutationResolvers,
  Resolvers,
} from "../generated/graphql";

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

    return {
      accessToken,
    };
  },
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query,
  Mutation,
};

export default resolvers;
