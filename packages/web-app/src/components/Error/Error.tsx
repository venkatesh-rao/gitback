import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface IErrorProps {
  errorType: string;
}

interface ErrorImage {
  [key: string]: string;
}

const errorImage: ErrorImage = {
  "404": require("../../assets/img/page-not-found.png"),
  bug: require("../../assets/img/bug-fixing.png"),
};

const Error: React.FC<IErrorProps> = (props) => {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center">
      <img
        className="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto"
        src={errorImage[props.errorType]}
      />
      <p className="my-8 text-2xl text-purple-700">
        Sorry for the inconvenience
      </p>
      <Link
        className="inline-flex items-center rounded-md bg-purple-200 p-2 text-purple-800 hover:shadow-sm"
        to="/"
      >
        <FaArrowLeft className="mr-2" />
        Go Back
      </Link>
    </div>
  );
};

export default Error;
