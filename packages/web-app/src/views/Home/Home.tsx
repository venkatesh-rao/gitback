import React from "react";
import { IHomeProps } from "./types";

const Home: React.FC<IHomeProps> = (props) => {
  const { loggedInUser } = props;
  return <div>code: {JSON.stringify(loggedInUser, null, 2)}</div>;
};

export default Home;
