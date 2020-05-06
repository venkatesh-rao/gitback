interface AuthPayload {
  accessToken: string;
  refreshToken?: string;
}

export interface GithubAuthenticateData {
  githubAuthenticate: AuthPayload;
}

export interface GithubAuthenticateVars {
  code: string;
}
