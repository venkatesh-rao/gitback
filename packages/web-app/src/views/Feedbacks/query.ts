import { gql } from "@apollo/client";

export const FEEDBACKS_QUERY = gql`
  query Feedbacks($productId: String!, $limit: Float, $offset: Float!) {
    feedbacks(productId: $productId, limit: $limit, offset: $offset) {
      id
      title
      description
      user {
        username
        avatarUrl
      }
      state
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_FEEDBACK_MUTATION = gql`
  mutation CreateFeedback($productId: ID!, $feedback: FeedbackInput!) {
    createFeedback(productId: $productId, feedback: $feedback) {
      id
      title
      description
      user {
        username
        avatarUrl
      }
      state
      createdAt
      updatedAt
    }
  }
`;
