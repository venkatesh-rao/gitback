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
    installationId: Float
  }

  type Repository {
    id: Float!
    nodeId: String!
    name: String!
    fullName: String!
    private: Boolean!
    description: String
  }

  type Product {
    id: ID!
    name: String!
    url: String!
    repositoryName: String!
    owner: User!
    developers: [User!]
  }

  type Feedback {
    id: ID!
    title: String!
    description: String
    product: Product
    user: GihubUser!
    state: String!
    createdAt: Float!
    updatedAt: Float!
  }

  type Comment {
    id: Int!
    body: String!
    user: GihubUser!
    createdAt: Float!
    updatedAt: Float!
  }

  type GihubUser {
    username: String!
    avatarUrl: String!
  }

  input FeedbackInput {
    title: String!
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    me: User!

    repositories: [Repository!]!

    products: [Product!]
    product(productUrl: String!): Product!
    feedbacks(productId: String!, limit: Float, offset: Float!): [Feedback!]!
    feedback(productUrl: String!, issueNumber: Float!): Feedback!

    comments(
      productUrl: String!
      issueNumber: Float!
      limit: Float
      offset: Float!
    ): [Comment!]!
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each.
  type Mutation {
    githubUserAuthenticate(code: String!): String!
    githubAppAuthenticate(installationId: Float!): Boolean!
    logout: Boolean!

    createProduct(
      productName: String!
      productUrl: String!
      repositoryName: String!
    ): Product!

    createFeedback(productId: ID!, feedback: FeedbackInput!): Feedback!
  }
`;

export default typeDefs;
