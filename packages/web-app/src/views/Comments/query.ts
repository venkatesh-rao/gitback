import { gql } from "@apollo/client";

export const COMMENTS_QUERY = gql`
  query Comments(
    $productUrl: String!
    $issueNumber: Float!
    $limit: Float
    $offset: Float!
  ) {
    comments(
      productUrl: $productUrl
      issueNumber: $issueNumber
      limit: $limit
      offset: $offset
    ) {
      id
      body
      user {
        username
        avatarUrl
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment(
    $productUrl: String!
    $issueNumber: Float!
    $commentBody: String!
  ) {
    createComment(
      productUrl: $productUrl
      issueNumber: $issueNumber
      commentBody: $commentBody
    ) {
      id
      body
      user {
        username
        avatarUrl
      }
      createdAt
      updatedAt
    }
  }
`;

export const FEEDBACK_QUERY = gql`
  query Feedback($productUrl: String!, $issueNumber: Float!) {
    feedback(productUrl: $productUrl, issueNumber: $issueNumber) {
      id
      title
      description
      user {
        username
        avatarUrl
      }
      product {
        url
        name
      }
      state
      createdAt
      updatedAt
    }
  }
`;
