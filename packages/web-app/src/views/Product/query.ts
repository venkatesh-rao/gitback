import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query Product($productUrl: String!) {
    product(productUrl: $productUrl) {
      id
      name
      url
      repositoryName
      owner {
        username
        avatarUrl
      }
      developers {
        username
      }
    }
  }
`;
