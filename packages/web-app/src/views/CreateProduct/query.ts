import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $productName: String!
    $productUrl: String!
    $repositoryName: String!
  ) {
    createProduct(
      productName: $productName
      productUrl: $productUrl
      repositoryName: $repositoryName
    ) {
      id
      name
      url
      repositoryName
      owner {
        username
      }
      developers {
        username
      }
    }
  }
`;
