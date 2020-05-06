import Axios from "axios";

export async function get(reqPath: string, accessToken: string) {
  const response = await Axios.get(`https://api.github.com${reqPath}`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const { data } = response;

  return data;
}
