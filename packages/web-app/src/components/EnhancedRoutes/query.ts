import { gql } from "@apollo/client";

export const LOGGED_IN_USER_QUERY = gql`
  query {
    me {
      name
      username
      publicEmail
      avatarUrl
    }
  }
`;
