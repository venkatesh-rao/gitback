import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GITHUB_AUTHENTICATE_QUERY } from "./query";
import { GithubAuthenticateVars, GithubAuthenticateData } from "./types";
import Login from "../Login";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const code = query.get("code");

  const [error, setError] = React.useState(false);

  const [githubAuthenticate, { loading, data }] = useMutation<
    GithubAuthenticateData,
    GithubAuthenticateVars
  >(GITHUB_AUTHENTICATE_QUERY);

  async function login(code: string) {
    try {
      await githubAuthenticate({
        variables: {
          code,
        },
      });
    } catch (error) {
      setError(true);
    }
  }

  React.useEffect(() => {
    if (code) {
      login(code);
    }
  }, []);

  if (!code || !error) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return <div>code: {JSON.stringify(data, null, 2)}</div>;
};

export default Home;
