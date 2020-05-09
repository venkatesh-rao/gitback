import { gql } from "@apollo/client";

export const LIST_REPOSITORIES_QUERY = gql`
  query ListAppRepositories {
    listAppRepositories {
      id
      nodeId
      name
      fullName
      private
      description
    }
  }
`;
