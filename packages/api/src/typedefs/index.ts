import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs: DocumentNode = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    username: String!
    avatarUrl: String!
    name: String
    publicEmail: String
  }

  type Repository {
    id: Float!
    nodeId: String!
    name: String!
    fullName: String!
    private: Boolean!
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    me: User!
    listAppRepositories: [Repository!]!
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each.
  type Mutation {
    githubUserAuthenticate(code: String!): String!
    githubAppAuthenticate(code: String!, installationId: String!): String!
  }
`;

export default typeDefs;
