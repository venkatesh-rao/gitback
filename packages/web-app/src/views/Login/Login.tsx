import { useMutation, useLazyQuery } from "@apollo/client";
import React, { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { RouteChildrenProps } from "react-router-dom";
import DeveloperActivity from "../../assets/img/developer-activity.png";
import { AUTH_TOKEN } from "../../constants";
import { useQueryParams } from "../../utils";
import { GITHUB_USER_AUTHENTICATE_QUERY } from "./query";
import {
  GithubUserAuthenticateData,
  GithubUserAuthenticateVars,
} from "./types";
import { LOGGED_IN_USER_QUERY } from "../../components/EnhancedRoutes/query";

const {
  REACT_APP_GITHUB_OAUTH_CLIENT_ID,
  REACT_APP_REDIRECT_URI,
} = process.env;

interface IFeature {
  title: string;
  description: string;
}

const features: IFeature[] = [
  {
    title: "Collect Feature/Feedback",
    description: "Keep track of features and feedbacks from the users",
  },
  {
    title: "Plan your next features to work on",
    description: "Show what's upcoming and in progress",
  },
  {
    title: "Share updates",
    description:
      "Let the users know about what feature/feedback they care about",
  },
];

interface ILoginProps extends RouteChildrenProps {}

const Login: FC<ILoginProps> = (props) => {
  const queryParams = useQueryParams();

  const code = queryParams.get("code");

  const [getLoggedInUser] = useLazyQuery(LOGGED_IN_USER_QUERY);

  const [
    githubUserAuthenticate,
    { loading: githubUserAuthenticateLoading },
  ] = useMutation<GithubUserAuthenticateData, GithubUserAuthenticateVars>(
    GITHUB_USER_AUTHENTICATE_QUERY,
    {
      onCompleted: () => {
        props.history.push("/");
      },
    }
  );

  const loginAsUser = React.useCallback(
    async (code: string) => {
      try {
        await githubUserAuthenticate({
          variables: {
            code,
          },
          refetchQueries: [{ query: LOGGED_IN_USER_QUERY }],
          awaitRefetchQueries: true,
          update: (_, { data }) => {
            if (!data) return;
            localStorage.setItem(AUTH_TOKEN, data.githubUserAuthenticate);
          },
        });
      } catch (error) {}
    },
    [githubUserAuthenticate]
  );

  React.useEffect(() => {
    if (code) {
      loginAsUser(code);
      return;
    }
  }, [loginAsUser, code]);

  if (githubUserAuthenticateLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="bg-purple-100 min-h-screen flex items-center">
      <div
        className="h-screen md:h-auto bg-white max-w-5xl rounded overflow-hidden m-auto"
        style={{
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 -4px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex-none md:flex md:justify-between md:items-center">
          <div className="flex-1 text-center p-2 md:p-10">
            <h1 className="text-2xl text-purple-700 uppercase font-bold mb-8 mt-8 md:mt-0">
              Gitback
            </h1>
            <img
              src={DeveloperActivity}
              alt="Login with github"
              style={{
                maxWidth: "60%",
                margin: "0 auto 20px",
              }}
            />
            <a
              className="bg-gray-800 text-white duration-300 ease-in-out font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center transform hover:-translate-y-px hover:scale-105"
              href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&scope=user,repo`}
            >
              <FaGithub className="mr-2" />
              Login with Github
            </a>
          </div>
          <div className="flex-1 border-l-0 md:border-l py-2 px-6 md:p-10">
            {features.map((feature: IFeature, index: number) => {
              return (
                <div key={index} className="my-10">
                  <h5 className="text-base text-xl text-gray-800 font-semibold">
                    {feature.title}
                  </h5>
                  <p className="text-base text-md text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
