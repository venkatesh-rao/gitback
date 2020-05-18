import { gql } from "@apollo/client";

export const COMMENTS_QUERY = gql`
  query Comments($productId: String!, $issueNumber: Float!) {
    comments(productId: $productId, issueNumber: $issueNumber) {
      id
      body
      user
      createdAt
      updatedAt
    }
  }
`;
