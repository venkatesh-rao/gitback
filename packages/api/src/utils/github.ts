import { App } from "@octokit/app";
import Axios from "axios";
import fs from "fs";
import path from "path";
import querystring from "querystring";

const {
  APP_CLIENT_ID,
  APP_CLIENT_SECRET,
  APP_ID,

  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,

  OAUTH_HOST = "github.com",
  OAUTH_PATH = "/login/oauth/access_token",
} = process.env;

export function authenticate(code: string, type: string): Promise<string> {
  const data = {
    client_id: type === "app" ? APP_CLIENT_ID : OAUTH_CLIENT_ID,
    client_secret: type === "app" ? APP_CLIENT_SECRET : OAUTH_CLIENT_SECRET,
    code: code,
  };

  return Axios.post(`https://${OAUTH_HOST}${OAUTH_PATH}`, data).then((res) => {
    const resObj = querystring.parse(res.data);
    const { access_token = "" } = resObj;

    if (!access_token) {
      throw new Error("invalid access token");
    }

    if (Array.isArray(access_token)) {
      return access_token[0];
    }

    return access_token;
  });
}

const PRIVATE_KEY = process.env.PRIVATE_KEY
  ? process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
  : fs.readFileSync(
      path.join(__dirname, `../../${process.env.PEM_FILE_NAME_WITH_EXTENSION}`),
      "utf8"
    );

export const app = new App({ id: Number(APP_ID), privateKey: PRIVATE_KEY });
