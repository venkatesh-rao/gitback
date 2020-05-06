import { get } from "../../utils/http-request";

export async function getLoggedInUser(accessToken: string) {
  const userData = await get("/user", accessToken);

  return {
    username: userData.login,
    avatarUrl: userData.avatar_url,
    name: userData.name,
    email: userData.email,
  };
}
