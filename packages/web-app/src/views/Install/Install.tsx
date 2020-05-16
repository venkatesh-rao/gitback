import React from "react";
import { useQueryParams } from "../../utils";
import { GithubAppAuthenticateData, GithubAppAuthenticateVars } from "./types";
import { GITHUB_APP_AUTHENTICATE_QUERY } from "./query";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";

const Install: React.FC<any> = () => {
  const queryParams = useQueryParams();

  const installationId = queryParams.get("installation_id");

  const [isSuccess, setSuccess] = React.useState(false);

  const [
    githubAppAuthenticate,
    { loading: githubAppAuthenticateLoading },
  ] = useMutation<GithubAppAuthenticateData, GithubAppAuthenticateVars>(
    GITHUB_APP_AUTHENTICATE_QUERY
  );

  const loginAsApp = React.useCallback(
    async (installationId: number) => {
      try {
        const response = await githubAppAuthenticate({
          variables: {
            installationId,
          },
        });

        if (response && response.data && response.data.githubAppAuthenticate) {
          setSuccess(true);
        }
      } catch (error) {}
    },
    [githubAppAuthenticate]
  );

  React.useEffect(() => {
    if (installationId) {
      loginAsApp(Number(installationId));
      return;
    }
  }, [loginAsApp, installationId]);

  if (isSuccess) {
    return <Redirect to="/repos" />;
  }

  if (githubAppAuthenticateLoading) {
    return <p>loading...</p>;
  }

  return <div>{typeof installationId}</div>;
};

export default Install;
