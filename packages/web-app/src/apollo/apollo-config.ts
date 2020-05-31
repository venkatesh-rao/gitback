import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { AUTH_TOKEN } from "../constants";

const setAuthorizationLink = setContext(() => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: { authorization: token || "" },
  };
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
  // credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthorizationLink.concat(httpLink),
});

export default client;
