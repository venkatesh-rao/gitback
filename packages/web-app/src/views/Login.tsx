import React from "react";
import { FaGithub } from "react-icons/fa";
import DeveloperActivity from "../assets/img/developer-activity.png";

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

function Login() {
  return (
    <div className="bg-gray-100 h-screen flex items-center">
      <div
        className="bg-white max-w-5xl rounded overflow-hidden m-auto"
        style={{
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 -4px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex-none md:flex md:justify-between md:items-center">
          <div className="flex-1 text-center p-10">
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
              href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_OAUTH_CLIENT_ID}&scope=user&redirect_uri=${REACT_APP_REDIRECT_URI}`}
            >
              <FaGithub className="mr-2" />
              Login with Github
            </a>
          </div>
          <div className="flex-1 border-l-0 md:border-l p-10">
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
}

export default Login;