import { gql } from "@apollo/client";

export const FEEDBACKS_QUERY = gql`
  query Feedbacks($productId: String!) {
    feedbacks(productId: $productId) {
      id
      title
      description
      product
      user
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
      product
      user
      state
      createdAt
      updatedAt
    }
  }
`;
