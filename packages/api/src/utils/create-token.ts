import { sign } from "jsonwebtoken";
import { AccessToken } from "../types";

function createToken(params: AccessToken) {
  const { ACCESS_TOKEN_SECRET = "" } = process.env;
  const accessToken = sign(params, ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return accessToken;
}

export default createToken;
