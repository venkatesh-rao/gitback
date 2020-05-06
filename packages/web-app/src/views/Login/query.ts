import { gql } from "@apollo/client";

export const GITHUB_AUTHENTICATE_QUERY = gql`
  mutation GithubAuthenticate($code: String!) {
    githubAuthenticate(code: $code)
  }
`;
