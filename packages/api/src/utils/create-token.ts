import { sign } from "jsonwebtoken";

function createToken(githubAccessToken: string) {
  const { ACCESS_TOKEN_SECRET = "" } = process.env;
  const accessToken = sign({ githubAccessToken }, ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return accessToken;
}

export default createToken;
