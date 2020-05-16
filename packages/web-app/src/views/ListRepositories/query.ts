import { gql } from "@apollo/client";

export const REPOSITORIES_QUERY = gql`
  query Repositories {
    repositories {
      id
      nodeId
      name
      fullName
      private
      description
    }
  }
`;
