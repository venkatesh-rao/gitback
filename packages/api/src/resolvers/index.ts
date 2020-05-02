import { authenticate } from "../utils/github";
import { QueryResolvers, Resolvers } from "../generated/graphql";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const Query: QueryResolvers = {
  books: (_parent, _args, _context) => books,
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
};

export default resolvers;
