import { gql } from "@apollo/client";

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($productSlug: String!) {
    getProduct(productSlug: $productSlug) {
      id
      name
      slug
      repositoryName
      owner {
        avatarUrl
      }
      developers {
        username
      }
    }
  }
`;

export const GET_PRODUCT_FEEDBACKS_QUERY = gql`
  query GetProductFeedbacks($productId: String!) {
    getProductFeedbacks(productId: $productId) {
      id
      title
      description
      product {
        id
        name
        slug
        repositoryName
      }
      status {
        slug
        label
      }
      owner {
        username
      }
    }
  }
`;

export const ADD_PRODUCT_FEEDBACK_MUTATION = gql`
  mutation AddProductFeedback($productId: ID!, $feedback: FeedbackInput!) {
    addProductFeedback(productId: $productId, feedback: $feedback) {
      id
      title
      description
      product {
        id
        name
        slug
        repositoryName
      }
      status {
        slug
        label
      }
      owner {
        username
      }
    }
  }
`;
