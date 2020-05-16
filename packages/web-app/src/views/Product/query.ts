import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query Product($productSlug: String!) {
    product(productSlug: $productSlug) {
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
