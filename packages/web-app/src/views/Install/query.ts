import { gql } from "@apollo/client";

export const GITHUB_APP_AUTHENTICATE_QUERY = gql`
  mutation GithubAppAuthenticate($installationId: Float!) {
    githubAppAuthenticate(installationId: $installationId)
  }
`;
