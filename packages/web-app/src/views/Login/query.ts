import { gql } from "@apollo/client";

export const GITHUB_USER_AUTHENTICATE_QUERY = gql`
  mutation GithubUserAuthenticate($code: String!) {
    githubUserAuthenticate(code: $code)
  }
`;
