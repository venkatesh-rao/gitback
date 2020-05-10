import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($productName: String!, $repositoryName: String!) {
    createProduct(productName: $productName, repositoryName: $repositoryName) {
      id
      name
      slug
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
