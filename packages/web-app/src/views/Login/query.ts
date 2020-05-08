import { gql } from "@apollo/client";

export const GITHUB_USER_AUTHENTICATE_QUERY = gql`
  mutation GithubUserAuthenticate($code: String!) {
    githubUserAuthenticate(code: $code)
  }
`;

export const GITHUB_APP_AUTHENTICATE_QUERY = gql`
  mutation GithubAppAuthenticate($code: String!, $installationId: String!) {
    githubAppAuthenticate(code: $code, installationId: $installationId)
  }
`;
