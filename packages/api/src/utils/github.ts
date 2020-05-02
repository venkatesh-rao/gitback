import Axios from "axios";
import querystring from "querystring";

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_HOST,
  OAUTH_PATH,
} = process.env;

export function authenticate(code: string): Promise<string> {
  const data = {
    client_id: OAUTH_CLIENT_ID,
    client_secret: OAUTH_CLIENT_SECRET,
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
