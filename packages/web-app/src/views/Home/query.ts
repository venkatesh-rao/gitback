import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      url
      repositoryName
      developers {
        username
      }
    }
  }
`;
